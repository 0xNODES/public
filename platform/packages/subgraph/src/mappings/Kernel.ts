import {
  log,
  dataSource,
  ethereum,
  ByteArray,
  Bytes,
  BigInt,
  Address,
} from '@graphprotocol/graph-ts';
import { ERC20 } from '../../generated/Kernel/ERC20';
import {
  ClaimBiosRewards,
  DistributeEth,
  EthDistributionWeightsUpdated,
  TokenAdded,
  Withdraw,
} from '../../generated/Kernel/Kernel';
import { TokenAdded as TokenAddedLegacy } from '../../generated/LegacyKernel/LegacyKernel';
import {
  DistributionWeighting,
  PlatformData,
  Strategy,
  StrategyTokenBalance,
  StrategyYield,
  Token,
  User,
} from '../../generated/schema';
import { IntegrationMap } from '../../generated/UserPositions/IntegrationMap';
import { getAddress } from '../addresses';
import { BIG_INT_SEC_PER_YEAR, BIG_INT_ZERO } from '../constants';

export function handleClaimBiosRewards(event: ClaimBiosRewards): void {
  const id = `${dataSource.network()}#${event.params.user.toHex()}`;
  let user = User.load(id);
  if (user == null) {
    user = new User(id);
    user.address = event.params.user.toHex();
    user.claimedBiosRewards = BIG_INT_ZERO;
    user.claimedEthRewards = BIG_INT_ZERO;
  }

  user.claimedBiosRewards = user.claimedBiosRewards.plus(
    event.params.biosRewards
  );
  user.save();
}

export function handleEthDistributionWeightsUpdated(
  event: EthDistributionWeightsUpdated
): void {
  const id = dataSource.network();
  log.info('[Kernel] EthDistributionWeightsUpdated: {}, {}, {}, {}, {}', [
    id,
    event.params.biosBuyBackEthWeight.toString(),
    event.params.treasuryEthWeight.toString(),
    event.params.protocolFeeEthWeight.toString(),
    event.params.rewardsEthWeight.toString(),
  ]);

  let distributionWeighting = DistributionWeighting.load(id);

  if (distributionWeighting != null) {
    // update DistributionWeights
    distributionWeighting.biosBuyBack = event.params.biosBuyBackEthWeight;
    distributionWeighting.treasury = event.params.treasuryEthWeight;
    distributionWeighting.protocol = event.params.protocolFeeEthWeight;
    distributionWeighting.strategy = event.params.rewardsEthWeight;
    distributionWeighting.total = distributionWeighting.biosBuyBack
      .plus(distributionWeighting.treasury)
      .plus(distributionWeighting.protocol)
      .plus(distributionWeighting.strategy);
    distributionWeighting.lastUpdatedBlock = event.block.number;
    distributionWeighting.lastUpdatedTime = event.block.timestamp;

    distributionWeighting.save();
  } else {
    log.error(
      `[Kernel] EthDistributionWeightsUpdated: Expected DistributionWeights to exist for {}`,
      [id]
    );
  }
}

// "tuple" prefix (function params are arrays, not tuples)
// https://ethereum.stackexchange.com/questions/114582/the-graph-nodes-cant-decode-abi-encoded-data-containing-arrays
const tuplePrefix = ByteArray.fromHexString(
  '0x0000000000000000000000000000000000000000000000000000000000000020'
);

export function handleDistributeEth(event: DistributeEth): void {
  // remove the function selector
  const functionInput = event.transaction.input.subarray(4);

  // convert to tuple and add prefix
  const functionInputAsTuple = new Uint8Array(
    tuplePrefix.length + functionInput.length
  );
  functionInputAsTuple.set(tuplePrefix, 0);
  functionInputAsTuple.set(functionInput, tuplePrefix.length);

  // convert to bytes and decode
  const tupleBytes = Bytes.fromUint8Array(functionInputAsTuple);
  const decoded = ethereum.decode('(uint256[],uint256[],uint256)', tupleBytes);

  if (decoded != null) {
    const distributionWeighting = DistributionWeighting.load(
      dataSource.network()
    );
    if (distributionWeighting == null) {
      log.error(
        '[Kernel] DistributeEth: no DistributionWeighting found for {}',
        [dataSource.network()]
      );
    } else {
      const input = decoded.toTuple();
      const strategies = input[0].toBigIntArray();
      log.info('[Kernel] DistributeEth: length {}', [
        strategies.length.toString(),
      ]);
      for (let i = 0; i < strategies.length; i++) {
        distributeEthForStrategy(strategies[i], distributionWeighting, event);
      }
    }
  } else {
    // this happens on the very first few harvest events, but shouldn't after that...
    log.warning('[Kernel] DistributeEth: decoded is null D:', []);
  }
}

function distributeEthForStrategy(
  strategy: BigInt,
  weights: DistributionWeighting,
  event: DistributeEth
): void {
  log.info('[Kernel] DistributeEth: strategy {}', [strategy.toString()]);
  const strategyId = `${dataSource.network()}#${strategy.toString()}`;
  let strategyYield = StrategyYield.load(strategyId);

  if (strategyYield != null) {
    // we skip the update if no distribution amount
    if (strategyYield.pendingDistributionAmount.gt(BIG_INT_ZERO)) {
      updateStrategyYield(strategy, strategyYield, weights, event);
    }
  } else {
    log.error('[Kernel] DistributeEth: bad state', [strategyId]);
  }
}

function updateStrategyYield(
  strategy: BigInt,
  strategyYield: StrategyYield,
  weights: DistributionWeighting,
  event: DistributeEth
): void {
  // pendingDistributionAmount has been accumulating since last distribution
  const amount = strategyYield.pendingDistributionAmount;
  strategyYield.pendingDistributionAmount = BIG_INT_ZERO;

  // use weightings to calculate the distributions
  const biosBuyBackAmount = amount
    .times(weights.biosBuyBack)
    .div(weights.total);
  const treasuryAmount = amount.times(weights.treasury).div(weights.total);
  const protocolAmount = amount.times(weights.protocol).div(weights.total);
  // strategy gets the rounding dust
  const strategyAmount = amount
    .minus(biosBuyBackAmount)
    .minus(treasuryAmount)
    .minus(protocolAmount);

  log.info('[Kernel] distributeEth: {}, {}, {}, {}, {}', [
    strategy.toString(),
    biosBuyBackAmount.toString(),
    treasuryAmount.toString(),
    protocolAmount.toString(),
    strategyAmount.toString(),
  ]);

  // update the distribution totals
  strategyYield.lastDistributedAmount = amount;
  strategyYield.totalDistributedAmount =
    strategyYield.totalDistributedAmount.plus(amount);

  strategyYield.lastBiosBuyBackAmount = biosBuyBackAmount;
  strategyYield.totalBiosBuyBackAmount =
    strategyYield.totalBiosBuyBackAmount.plus(biosBuyBackAmount);

  strategyYield.lastTreasuryAmount = treasuryAmount;
  strategyYield.totalTreasuryAmount =
    strategyYield.totalTreasuryAmount.plus(treasuryAmount);

  strategyYield.lastProtocolAmount = protocolAmount;
  strategyYield.totalProtocolAmount =
    strategyYield.totalProtocolAmount.plus(protocolAmount);

  strategyYield.lastStrategyAmount = strategyAmount;
  strategyYield.totalStrategyAmount =
    strategyYield.totalStrategyAmount.plus(strategyAmount);

  // update calculated stats
  if (strategyYield.distributionCount == BIG_INT_ZERO) {
    strategyYield.firstDistributionBlock = event.block.number;
    strategyYield.firstDistributionTime = event.block.timestamp;
  } else {
    strategyYield.lastPeriod = event.block.timestamp.minus(
      strategyYield.lastDistributionTime
    );

    // we get the average from the time between now and the genesis distribution,
    // dividing by the distribution count BEFORE it has been incremented.
    // This excludes the initial genesis distribution from this statistic.
    strategyYield.averagePeriod = event.block.timestamp
      .minus(strategyYield.firstDistributionTime)
      .div(strategyYield.distributionCount);

    strategyYield.lastEffectiveAPRX10000 = calculateAPR(
      strategy,
      strategyAmount,
      strategyYield.lastPeriod
    );
    strategyYield.lastEffectiveAPRX1000 =
      strategyYield.lastEffectiveAPRX10000.div(BigInt.fromI32(10));

    // update the recent APR list so we can update the average
    let recent = strategyYield.recentEffectiveAPRX10000;
    // new APR goes to the front of the array
    recent.unshift(strategyYield.lastEffectiveAPRX10000);
    // remove the oldest APR from the end of the array if full
    if (recent.length > 7) recent.pop();
    strategyYield.recentEffectiveAPRX10000 = recent;
    strategyYield.averageEffectiveAPRX10000 = calculateAverage(recent);
  }

  // update other stats
  strategyYield.distributionCount = strategyYield.distributionCount.plus(
    BigInt.fromI32(1)
  );
  strategyYield.lastStrategyAmount = strategyAmount;
  strategyYield.lastDistributionBlock = event.block.number;
  strategyYield.lastDistributionTime = event.block.timestamp;

  strategyYield.save();
}

function calculateAverage(data: BigInt[]): BigInt {
  return calculateSum(data).div(BigInt.fromI32(data.length));
}

function calculateSum(data: BigInt[]): BigInt {
  return data.reduce((acc, each) => acc.plus(each), BIG_INT_ZERO);
}

function calculateAPR(
  strategyId: BigInt,
  amount: BigInt,
  period: BigInt
): BigInt {
  const strategy = Strategy.load(
    `${dataSource.network()}#${strategyId.toString()}`
  );
  if (strategy == null) {
    log.error(
      '[Kernel] calculateAPR: could not load strategy for strategy {}!',
      [strategyId.toString()]
    );
    return BIG_INT_ZERO;
  }

  if (strategy.tokens.length != 1) {
    log.warning(
      'Kernel] calculateAPR: cannot calculate APR for non single token strategy! {} tokens found.',
      [strategy.tokens.length.toString()]
    );
    return BIG_INT_ZERO;
  }

  const tokenBalance = StrategyTokenBalance.load(
    `${strategy.id}#${strategy.tokens[0]}`
  );
  if (tokenBalance == null) {
    log.error(
      '[Kernel] calculateAPR: could not load tokenBalance for strategy {}, token {}',
      [strategy.id, strategy.tokens[0]]
    );
    return BIG_INT_ZERO;
  } else if (tokenBalance.amount.equals(BIG_INT_ZERO)) {
    log.error(
      '[Kernel] calculateAPR: cannot calculate APR for strategy with 0 balance! {}, {}',
      [strategy.id, strategy.tokens[0]]
    );
    return BigInt.fromI32(1111111);
  }

  // the multiplication factor to get to one year and X10000
  const factor = BIG_INT_SEC_PER_YEAR.times(BigInt.fromI32(10000)).div(period);

  const effectiveAPRX10000 = amount.times(factor).div(tokenBalance.amount);

  return effectiveAPRX10000;
}

export function handleTokenAdded(event: TokenAdded): void {
  const token = event.params.tokenAddress.toHex();
  addToken(
    token,
    event.params.acceptingDeposits,
    event.params.acceptingWithdrawals,
    event.params.acceptingLping,
    event.params.acceptingBridging,
    event.params.biosRewardWeight
  );
}

export function handleTokenAddedLegacy(event: TokenAddedLegacy): void {
  const token = event.params.tokenAddress.toHex();
  addToken(
    token,
    event.params.acceptingDeposits,
    event.params.acceptingWithdrawals,
    false,
    false,
    event.params.biosRewardWeight
  );
}

export function addToken(
  token: string,
  acceptingDeposits: boolean,
  acceptingWithdrawals: boolean,
  acceptingLPing: boolean,
  acceptingBridging: boolean,
  biosRewardWeight: BigInt
): Token {
  let platformData = getPlatformData();

  // load token contract
  const tokenContract = ERC20.bind(Address.fromString(token));

  // create or update Token entity
  const id = `${dataSource.network()}#${token}`;
  let tokenData = Token.load(id);
  if (!tokenData) {
    tokenData = new Token(id);
    tokenData.ref = platformData.id;
    tokenData.address = token;
    tokenData.name = tokenContract.name();
    tokenData.symbol = tokenContract.symbol();
    tokenData.decimals = BigInt.fromI32(tokenContract.decimals());
    tokenData.amount = BIG_INT_ZERO;
  }
  tokenData.depositsEnabled = acceptingDeposits;
  tokenData.withdrawalsEnabled = acceptingWithdrawals;
  tokenData.LPEnabled = acceptingLPing;
  tokenData.bridgingEnabled = acceptingBridging;
  tokenData.biosRewardWeight = biosRewardWeight;
  tokenData.save();

  log.info('[Kernel] addToken: adding token {} {}', [id, tokenData.symbol]);

  return tokenData;
}

export function getPlatformData(): PlatformData {
  const chain = dataSource.network();
  let platformData = PlatformData.load(chain);

  if (!platformData) {
    // init PlatformData if first time
    log.info('[Kernel] getPlatformData: initializing PlatformData for {}', [
      chain,
    ]);
    platformData = initializePlatformData(chain);
  }

  return platformData;
}

function initializePlatformData(chain: string): PlatformData {
  let platformData = new PlatformData(chain);
  platformData.save();

  const addressZero = Address.zero().toHex();
  const integrationMapAddress = getAddress('integrationMap');
  if (integrationMapAddress) {
    const integrationMap = IntegrationMap.bind(
      Address.fromString(integrationMapAddress)
    );

    // add wrapped native token
    const wnativeToken = integrationMap.getWethTokenAddress().toHex();
    if (wnativeToken != addressZero) {
      log.info('[Kernel] initializePlatformData: adding wnativeToken {}', [
        wnativeToken,
      ]);
      addToken(wnativeToken, true, true, false, false, BIG_INT_ZERO);
    } else {
      log.error('[Kernel] initializePlatformData: no wnativeToken!', []);
    }

    // add BIOS if it exists
    // AND is not the wrapped native address... :)
    const biosToken = integrationMap.getBiosTokenAddress().toHex();
    if (biosToken != addressZero && biosToken != wnativeToken) {
      log.info('[Kernel] initializePlatformData: adding BIOS {}', [biosToken]);
      addToken(biosToken, true, true, false, false, BIG_INT_ZERO);
    } else {
      log.warning('[Kernel] initializePlatformData: no BIOS token is set', []);
    }
  } else {
    log.error(
      '[Kernel] initializePlatformData: no integration map address found!',
      []
    );
  }

  return platformData;
}

export function handleWithdraw(event: Withdraw): void {
  // const user = event.params.user.toHex();
  const tokens = event.params.tokens;
  const amounts = event.params.tokenAmounts;
  const ethAmount = event.params.ethAmount;

  // make sure platform data has been initialized
  getPlatformData();

  for (let i = 0; i < tokens.length; i++) {
    withdrawToken(tokens[i].toHex(), amounts[i]);
  }

  if (ethAmount.gt(BIG_INT_ZERO)) {
    // native token gets accounted as wrapped native
    const integrationMapAddress = getAddress('integrationMap');
    if (integrationMapAddress) {
      const integrationMap = IntegrationMap.bind(
        Address.fromString(integrationMapAddress)
      );
      const wnativeToken = integrationMap.getWethTokenAddress();
      withdrawToken(wnativeToken.toHex(), ethAmount);
    } else {
      log.error('[Kernel] handleWithdraw: no integration map found!', []);
    }
  }
}

// NOTE the reason this can go negative is due to the UserPositions migration
// This handles withdraws since the start, however deposits older than a certain age
// are skipped and are handled during the migration transaction's events
// This does mean that these values are not valid prior to the UserPositions migration (block #? 13643835 ish)
function withdrawToken(token: string, amount: BigInt): void {
  const id = `${dataSource.network()}#${token}`;
  let tokenData = Token.load(id);
  if (tokenData) {
    log.info('[Kernel] withdrawToken: {}, {}', [token, amount.toString()]);
    tokenData.amount = tokenData.amount.minus(amount);
    tokenData.save();
  } else {
    log.error('[Kernel] withdrawToken: no Token found for {}!', [id]);
  }
}

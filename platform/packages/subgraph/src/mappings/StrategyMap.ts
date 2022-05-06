import { BigInt, log, dataSource, Address } from '@graphprotocol/graph-ts';
import {
  NewStrategy,
  UpdateName,
} from '../../generated/StrategyMap/StrategyMap';
import {
  DistributionWeighting,
  Strategy,
  StrategyIntegration,
  StrategyTokenBalance,
  StrategyYield,
} from '../../generated/schema';
import { YieldManager } from '../../generated/YieldManager/YieldManager';
import { BIG_INT_ZERO as ZERO } from '../constants';
import { getAddress } from '../addresses';

export function handleNewStrategy(event: NewStrategy): void {
  const strategyId = `${dataSource.network()}#${event.params.id.toString()}`;
  log.info('[StrategyMap] NewStrategy: {} {}', [
    event.params.id.toString(),
    event.params.name,
  ]);

  // create strategy
  let strategy = new Strategy(strategyId);
  strategy.name = event.params.name;

  const strategyTokens = [] as string[];
  for (let i = 0; i < event.params.tokens.length; i++) {
    const token = event.params.tokens[i].token.toHex();
    if (!strategyTokens.includes(token)) {
      // push to tokens array and create a StrategyTokenBalance
      strategyTokens.push(token);

      let strategyTokenBalance = new StrategyTokenBalance(
        `${strategy.id}#${token}`
      );
      strategyTokenBalance.strategy = strategy.id;
      strategyTokenBalance.token = token;
      strategyTokenBalance.amount = BigInt.fromI32(0);
      strategyTokenBalance.save();
    }
  }
  strategy.tokens = strategyTokens;

  // create strategy integrations
  // event.params.integrations.forEach(({ integration, ammPoolID }, idx) => {
  for (let i = 0; i < event.params.integrations.length; i++) {
    const integration = event.params.integrations[i];
    let strategyIntegration = new StrategyIntegration(
      `${
        strategy.id
      }.${integration.integration.toHex()}.${integration.ammPoolID.toString()}`
    );
    strategyIntegration.strategy = strategy.id;
    strategyIntegration.integration = integration.integration.toHex();
    strategyIntegration.pool = integration.ammPoolID;
    const index = BigInt.fromI32(i);
    for (let tokenIdx = 0; tokenIdx < event.params.tokens.length; tokenIdx++) {
      const token = event.params.tokens[tokenIdx];
      if (token.integrationPairIdx.equals(index)) {
        strategyIntegration.weight = token.weight;
      }
    }
    strategyIntegration.save();
  }

  // create StrategyYield
  let strategyYield = new StrategyYield(strategy.id);
  strategyYield.strategy = strategy.id;
  strategyYield.totalHarvestedAmount = ZERO;
  strategyYield.totalDistributedAmount = ZERO;
  strategyYield.totalBiosBuyBackAmount = ZERO;
  strategyYield.totalTreasuryAmount = ZERO;
  strategyYield.totalProtocolAmount = ZERO;
  strategyYield.totalStrategyAmount = ZERO;
  strategyYield.lastDistributedAmount = ZERO;
  strategyYield.lastBiosBuyBackAmount = ZERO;
  strategyYield.lastTreasuryAmount = ZERO;
  strategyYield.lastProtocolAmount = ZERO;
  strategyYield.lastStrategyAmount = ZERO;
  strategyYield.lastDistributionBlock = ZERO;
  strategyYield.lastDistributionTime = ZERO;
  strategyYield.lastEffectiveAPRX10000 = ZERO;
  strategyYield.firstDistributionBlock = ZERO;
  strategyYield.firstDistributionTime = ZERO;
  strategyYield.lastPeriod = ZERO;
  strategyYield.averagePeriod = ZERO;
  strategyYield.distributionCount = ZERO;
  strategyYield.pendingDistributionAmount = ZERO;
  strategyYield.save();

  // assign to strat
  strategy.strategyYield = strategyYield.id;

  // save strategy
  strategy.save();

  // hook into eth distribution weight sync
  initDistributionWeighting(event);
}

// Eth distribution weights are initially set at YieldManager deployment.
// Unfortunately no event was emitted. To avoid the cost of using call handlers,
// we sync this value later time. Doing it at time of strategy creation uses an
// infrequent event and ensures that distribution weights are mapped before any
// harvests or distributions occur
function initDistributionWeighting(event: NewStrategy): void {
  const id = dataSource.network();
  let distributionWeighting = DistributionWeighting.load(id);

  // we only need to do this once :)
  if (distributionWeighting == null) {
    distributionWeighting = new DistributionWeighting(id);

    let yieldManagerAddress = getAddress('yieldManager');

    if (yieldManagerAddress) {
      let yieldManager = YieldManager.bind(
        Address.fromString(yieldManagerAddress)
      );
      let response = yieldManager.getEthDistributionWeights();

      distributionWeighting.biosBuyBack = response.value0;
      distributionWeighting.treasury = response.value1;
      distributionWeighting.protocol = response.value2;
      distributionWeighting.strategy = response.value3;
      distributionWeighting.total = distributionWeighting.biosBuyBack
        .plus(distributionWeighting.treasury)
        .plus(distributionWeighting.protocol)
        .plus(distributionWeighting.strategy);
      distributionWeighting.lastUpdatedBlock = event.block.number;
      distributionWeighting.lastUpdatedTime = event.block.timestamp;

      // save
      distributionWeighting.save();

      // log
      log.info(
        '[StrategyMap] NewStrategy.initDistributionWeighting: {} | {}, {}, {}, {}',
        [
          id,
          response.value0.toString(),
          response.value1.toString(),
          response.value2.toString(),
          response.value3.toString(),
        ]
      );
    } else {
      log.error(
        '[StrategyMap] NewStrategy.initDistributionWeighting: Bad yield manager address in config!',
        []
      );
    }
  }
}

export function handleUpdateName(event: UpdateName): void {
  log.info('[StrategyMap] UpdateName: {} | {}', [
    event.params.id.toString(),
    event.params.name,
  ]);
  const strategyId = `${dataSource.network()}#${event.params.id.toString()}`;
  let strategy = Strategy.load(strategyId);
  if (strategy) {
    strategy.name = event.params.name;
    strategy.save();
  } else {
    log.error('[StrategyMap] Expected strategyId to exist: {}', [strategyId]);
  }
}

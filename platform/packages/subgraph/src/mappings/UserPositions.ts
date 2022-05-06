import { Address, BigInt, dataSource, log } from '@graphprotocol/graph-ts';
import { StrategyTokenBalance, Token } from '../../generated/schema';
import {
  Deposit,
  EnterStrategy,
  ExitStrategy,
} from '../../generated/UserPositions/UserPositions';
import { IntegrationMap } from '../../generated/UserPositions/IntegrationMap';
import { getAddress } from '../addresses';
import { BIG_INT_ZERO } from '../constants';
import { addToken, getPlatformData } from './Kernel';

// TODO these should also update user stats and global stats
export function handleEnterStrategy(event: EnterStrategy): void {
  log.info('[UserPositions] EnterStrategy: {} {} {} {}', [
    event.params.id.toHex(),
    event.params.user.toHex(),
    event.params.tokens[0].token.toHex(),
    event.params.tokens[0].amount.toHex(),
  ]);

  for (let i = 0; i < event.params.tokens.length; i++) {
    const token = event.params.tokens[i];
    const id = `${dataSource.network()}#${event.params.id.toString()}#${token.token.toHex()}`;
    let strategyTokenBalance = StrategyTokenBalance.load(id);
    if (strategyTokenBalance != null) {
      // strategy token balance was created during strategy creation/update and
      // should always exist during this event
      log.info('adding strat entry: {}', [token.amount.toString()]);
      strategyTokenBalance.amount = strategyTokenBalance.amount.plus(
        token.amount
      );
      strategyTokenBalance.save();
    } else {
      log.error(
        `[UserPositions] EnterStrategy: Expected strategyTokenBalance to exist for {}`,
        [id]
      );
    }
  }
}

// TODO these should also update user stats and global stats
export function handleExitStrategy(event: ExitStrategy): void {
  log.info('[UserPositions] ExitStrategy: {} {} {} {}', [
    event.params.id.toHex(),
    event.params.user.toHex(),
    event.params.tokens[0].token.toHex(),
    event.params.tokens[0].amount.toHex(),
  ]);

  for (let i = 0; i < event.params.tokens.length; i++) {
    const token = event.params.tokens[i];
    const id = `${dataSource.network()}#${event.params.id.toString()}#${token.token.toHex()}`;
    let strategyTokenBalance = StrategyTokenBalance.load(id);
    if (strategyTokenBalance != null) {
      // strategy token balance was created during strategy creation/update and
      // should always exist during this event
      strategyTokenBalance.amount = strategyTokenBalance.amount.minus(
        token.amount
      );
      strategyTokenBalance.save();
    } else {
      log.error(
        `[UserPositions] ExitStrategy: Expected strategyTokenBalance to exist for {}`,
        [id]
      );
    }
  }
}

export function handleDeposit(event: Deposit): void {
  // const user = event.params.user.toHex();
  const tokens = event.params.tokens;
  const amounts = event.params.tokenAmounts;
  const ethAmount = event.params.ethAmount;

  for (let i = 0; i < tokens.length; i++) {
    depositToken(tokens[i].toHex(), amounts[i]);
  }

  if (ethAmount.gt(BIG_INT_ZERO)) {
    // native token gets accounted as wrapped native
    const integrationMapAddress = getAddress('integrationMap');
    if (integrationMapAddress) {
      const integrationMap = IntegrationMap.bind(
        Address.fromString(integrationMapAddress)
      );
      const wnativeToken = integrationMap.getWethTokenAddress();
      depositToken(wnativeToken.toHex(), ethAmount);
    } else {
      log.error('[UserPositions] handleDeposit: no integration map found!', []);
    }
  }
}

function depositToken(token: string, amount: BigInt): void {
  log.info('[UserPositions] depositToken: {}, {}', [token, amount.toString()]);

  const id = `${dataSource.network()}#${token}`;

  // make sure platform data has been initialized
  getPlatformData();

  let tokenData = Token.load(id);

  if (!tokenData) {
    log.warning('[UserPositions] depositToken: no Token found for {}!', [id]);
    tokenData = addToken(token, true, true, false, false, BIG_INT_ZERO);
  }

  tokenData.amount = tokenData.amount.plus(amount);
  tokenData.save();
}

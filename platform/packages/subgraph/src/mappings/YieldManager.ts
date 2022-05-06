import { log, dataSource } from '@graphprotocol/graph-ts';
import { StrategyYield } from '../../generated/schema';
import { HarvestYield } from '../../generated/YieldManager/YieldManager';

export function handleHarvestYield(event: HarvestYield): void {
  // strategyYieldId is strategy.id
  const id = `${dataSource.network()}#${event.params.strategyId.toString()}`;
  let strategyYield = StrategyYield.load(id);

  if (strategyYield != null) {
    // strategyYield was created during strategy creation and
    // should always exist during this event
    log.info('[YieldManager] HarvestYield: {}, {}', [
      event.params.strategyId.toString(),
      event.params.amount.toString(),
    ]);

    strategyYield.totalHarvestedAmount =
      strategyYield.totalHarvestedAmount.plus(event.params.amount);
    strategyYield.pendingDistributionAmount =
      strategyYield.pendingDistributionAmount.plus(event.params.amount);

    strategyYield.save();
  } else {
    log.error(
      '[YieldManager] HarvestYield: expected strategyYield to exist for {}',
      [id]
    );
  }
}

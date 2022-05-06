import { log, dataSource } from '@graphprotocol/graph-ts';
import { Token } from '../../generated/schema';
import { TokenSettingToggled } from '../../generated/UserPositions/IntegrationMap';

export function handleTokenSettingToggled(event: TokenSettingToggled): void {
  const token = event.params.token.toHex();
  const id = `${dataSource.network()}#${token}`;
  const settingName = event.params.settingName;
  const newValue = event.params.newValue;
  log.info('[IntegrationMap] TokenSettingToggled: {}, {}, {}, {}', [
    id,
    token,
    settingName.toString(),
    newValue.toString(),
  ]);

  let tokenData = Token.load(id);

  if (tokenData != null) {
    // update Token
    if (settingName == 5) {
      log.info(
        '[IntegrationMap] TokenSettingToggled: {} depositsEnabled updated to {}',
        [token, newValue.toString()]
      );
      tokenData.depositsEnabled = newValue;
    } else if (settingName == 6) {
      log.info(
        '[IntegrationMap] TokenSettingToggled: {} withdrawalsEnabled updated to {}',
        [token, newValue.toString()]
      );
      tokenData.withdrawalsEnabled = newValue;
    } else if (settingName == 7) {
      log.info(
        '[IntegrationMap] TokenSettingToggled: {} LPEnabled updated to {}',
        [token, newValue.toString()]
      );
      tokenData.LPEnabled = newValue;
    } else if (settingName == 8) {
      log.info(
        '[IntegrationMap] TokenSettingToggled: {} bridgingEnabled updated to {}',
        [token, newValue.toString()]
      );
      tokenData.bridgingEnabled = newValue;
    } else {
      log.error(
        '[IntegrationMap] TokenSettingToggled: unrecognized setting! {} {}',
        [settingName.toString(), newValue.toString()]
      );
    }
    tokenData.save();
  } else {
    log.error(
      `[IntegrationMap] TokenSettingToggled: Expected TokenData to exist for {}`,
      [id]
    );
  }
}

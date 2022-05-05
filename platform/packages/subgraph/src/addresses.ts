import { json, JSONValueKind } from '@graphprotocol/graph-ts';
import { config } from '../config/current';

export function getAddress(key: string): string | null {
  const addressMap = json.fromString(config).toObject().get('address');
  const address = addressMap && addressMap.toObject().get(key);
  return address && address.kind == JSONValueKind.STRING
    ? address.toString()
    : null;
}

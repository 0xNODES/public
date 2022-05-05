// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class BiosAddressUpdated extends ethereum.Event {
  get params(): BiosAddressUpdated__Params {
    return new BiosAddressUpdated__Params(this);
  }
}

export class BiosAddressUpdated__Params {
  _event: BiosAddressUpdated;

  constructor(event: BiosAddressUpdated) {
    this._event = event;
  }

  get newAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get oldAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class TokenSettingToggled extends ethereum.Event {
  get params(): TokenSettingToggled__Params {
    return new TokenSettingToggled__Params(this);
  }
}

export class TokenSettingToggled__Params {
  _event: TokenSettingToggled;

  constructor(event: TokenSettingToggled) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get settingName(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get newValue(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class TokenSettingUpdated extends ethereum.Event {
  get params(): TokenSettingUpdated__Params {
    return new TokenSettingUpdated__Params(this);
  }
}

export class TokenSettingUpdated__Params {
  _event: TokenSettingUpdated;

  constructor(event: TokenSettingUpdated) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get settingName(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get newValue(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class IntegrationMap extends ethereum.SmartContract {
  static bind(address: Address): IntegrationMap {
    return new IntegrationMap("IntegrationMap", address);
  }

  controllers(param0: BigInt): Address {
    let result = super.call("controllers", "controllers(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_controllers(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "controllers",
      "controllers(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getAllControllers(): Array<Address> {
    let result = super.call(
      "getAllControllers",
      "getAllControllers():(address[])",
      []
    );

    return result[0].toAddressArray();
  }

  try_getAllControllers(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getAllControllers",
      "getAllControllers():(address[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getBiosRewardWeightSum(): BigInt {
    let result = super.call(
      "getBiosRewardWeightSum",
      "getBiosRewardWeightSum():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getBiosRewardWeightSum(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getBiosRewardWeightSum",
      "getBiosRewardWeightSum():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getBiosTokenAddress(): Address {
    let result = super.call(
      "getBiosTokenAddress",
      "getBiosTokenAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getBiosTokenAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getBiosTokenAddress",
      "getBiosTokenAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getIntegrationAddress(integrationId: BigInt): Address {
    let result = super.call(
      "getIntegrationAddress",
      "getIntegrationAddress(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(integrationId)]
    );

    return result[0].toAddress();
  }

  try_getIntegrationAddress(
    integrationId: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getIntegrationAddress",
      "getIntegrationAddress(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(integrationId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getIntegrationAddressesLength(): BigInt {
    let result = super.call(
      "getIntegrationAddressesLength",
      "getIntegrationAddressesLength():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getIntegrationAddressesLength(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getIntegrationAddressesLength",
      "getIntegrationAddressesLength():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getIntegrationName(integrationAddress: Address): string {
    let result = super.call(
      "getIntegrationName",
      "getIntegrationName(address):(string)",
      [ethereum.Value.fromAddress(integrationAddress)]
    );

    return result[0].toString();
  }

  try_getIntegrationName(
    integrationAddress: Address
  ): ethereum.CallResult<string> {
    let result = super.tryCall(
      "getIntegrationName",
      "getIntegrationName(address):(string)",
      [ethereum.Value.fromAddress(integrationAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getIsIntegrationAdded(integrationAddress: Address): boolean {
    let result = super.call(
      "getIsIntegrationAdded",
      "getIsIntegrationAdded(address):(bool)",
      [ethereum.Value.fromAddress(integrationAddress)]
    );

    return result[0].toBoolean();
  }

  try_getIsIntegrationAdded(
    integrationAddress: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getIsIntegrationAdded",
      "getIsIntegrationAdded(address):(bool)",
      [ethereum.Value.fromAddress(integrationAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getIsTokenAdded(tokenAddress: Address): boolean {
    let result = super.call(
      "getIsTokenAdded",
      "getIsTokenAdded(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBoolean();
  }

  try_getIsTokenAdded(tokenAddress: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getIsTokenAdded",
      "getIsTokenAdded(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getReserveRatioDenominator(): BigInt {
    let result = super.call(
      "getReserveRatioDenominator",
      "getReserveRatioDenominator():(uint32)",
      []
    );

    return result[0].toBigInt();
  }

  try_getReserveRatioDenominator(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getReserveRatioDenominator",
      "getReserveRatioDenominator():(uint32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTargetLiquidityRatioDenominator(): BigInt {
    let result = super.call(
      "getTargetLiquidityRatioDenominator",
      "getTargetLiquidityRatioDenominator():(uint32)",
      []
    );

    return result[0].toBigInt();
  }

  try_getTargetLiquidityRatioDenominator(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTargetLiquidityRatioDenominator",
      "getTargetLiquidityRatioDenominator():(uint32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenAcceptingBridging(tokenAddress: Address): boolean {
    let result = super.call(
      "getTokenAcceptingBridging",
      "getTokenAcceptingBridging(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBoolean();
  }

  try_getTokenAcceptingBridging(
    tokenAddress: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getTokenAcceptingBridging",
      "getTokenAcceptingBridging(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getTokenAcceptingDeposits(tokenAddress: Address): boolean {
    let result = super.call(
      "getTokenAcceptingDeposits",
      "getTokenAcceptingDeposits(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBoolean();
  }

  try_getTokenAcceptingDeposits(
    tokenAddress: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getTokenAcceptingDeposits",
      "getTokenAcceptingDeposits(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getTokenAcceptingLping(tokenAddress: Address): boolean {
    let result = super.call(
      "getTokenAcceptingLping",
      "getTokenAcceptingLping(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBoolean();
  }

  try_getTokenAcceptingLping(
    tokenAddress: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getTokenAcceptingLping",
      "getTokenAcceptingLping(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getTokenAcceptingWithdrawals(tokenAddress: Address): boolean {
    let result = super.call(
      "getTokenAcceptingWithdrawals",
      "getTokenAcceptingWithdrawals(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBoolean();
  }

  try_getTokenAcceptingWithdrawals(
    tokenAddress: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getTokenAcceptingWithdrawals",
      "getTokenAcceptingWithdrawals(address):(bool)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getTokenAddress(tokenId: BigInt): Address {
    let result = super.call(
      "getTokenAddress",
      "getTokenAddress(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );

    return result[0].toAddress();
  }

  try_getTokenAddress(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getTokenAddress",
      "getTokenAddress(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getTokenAddressesLength(): BigInt {
    let result = super.call(
      "getTokenAddressesLength",
      "getTokenAddressesLength():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getTokenAddressesLength(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenAddressesLength",
      "getTokenAddressesLength():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenBiosRewardWeight(tokenAddress: Address): BigInt {
    let result = super.call(
      "getTokenBiosRewardWeight",
      "getTokenBiosRewardWeight(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBigInt();
  }

  try_getTokenBiosRewardWeight(
    tokenAddress: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenBiosRewardWeight",
      "getTokenBiosRewardWeight(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenId(tokenAddress: Address): BigInt {
    let result = super.call("getTokenId", "getTokenId(address):(uint256)", [
      ethereum.Value.fromAddress(tokenAddress)
    ]);

    return result[0].toBigInt();
  }

  try_getTokenId(tokenAddress: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getTokenId", "getTokenId(address):(uint256)", [
      ethereum.Value.fromAddress(tokenAddress)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenReserveRatioNumerator(tokenAddress: Address): BigInt {
    let result = super.call(
      "getTokenReserveRatioNumerator",
      "getTokenReserveRatioNumerator(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBigInt();
  }

  try_getTokenReserveRatioNumerator(
    tokenAddress: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenReserveRatioNumerator",
      "getTokenReserveRatioNumerator(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenTargetLiquidityRatioNumerator(tokenAddress: Address): BigInt {
    let result = super.call(
      "getTokenTargetLiquidityRatioNumerator",
      "getTokenTargetLiquidityRatioNumerator(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBigInt();
  }

  try_getTokenTargetLiquidityRatioNumerator(
    tokenAddress: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenTargetLiquidityRatioNumerator",
      "getTokenTargetLiquidityRatioNumerator(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenTransferFeeKValueNumerator(tokenAddress: Address): BigInt {
    let result = super.call(
      "getTokenTransferFeeKValueNumerator",
      "getTokenTransferFeeKValueNumerator(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBigInt();
  }

  try_getTokenTransferFeeKValueNumerator(
    tokenAddress: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenTransferFeeKValueNumerator",
      "getTokenTransferFeeKValueNumerator(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenTransferFeePlatformRatioNumerator(tokenAddress: Address): BigInt {
    let result = super.call(
      "getTokenTransferFeePlatformRatioNumerator",
      "getTokenTransferFeePlatformRatioNumerator(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );

    return result[0].toBigInt();
  }

  try_getTokenTransferFeePlatformRatioNumerator(
    tokenAddress: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenTransferFeePlatformRatioNumerator",
      "getTokenTransferFeePlatformRatioNumerator(address):(uint256)",
      [ethereum.Value.fromAddress(tokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTransferFeeKValueDenominator(): BigInt {
    let result = super.call(
      "getTransferFeeKValueDenominator",
      "getTransferFeeKValueDenominator():(uint32)",
      []
    );

    return result[0].toBigInt();
  }

  try_getTransferFeeKValueDenominator(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTransferFeeKValueDenominator",
      "getTransferFeeKValueDenominator():(uint32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTransferFeePlatformRatioDenominator(): BigInt {
    let result = super.call(
      "getTransferFeePlatformRatioDenominator",
      "getTransferFeePlatformRatioDenominator():(uint32)",
      []
    );

    return result[0].toBigInt();
  }

  try_getTransferFeePlatformRatioDenominator(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTransferFeePlatformRatioDenominator",
      "getTransferFeePlatformRatioDenominator():(uint32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getWethTokenAddress(): Address {
    let result = super.call(
      "getWethTokenAddress",
      "getWethTokenAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getWethTokenAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getWethTokenAddress",
      "getWethTokenAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isController(controller: Address): boolean {
    let result = super.call("isController", "isController(address):(bool)", [
      ethereum.Value.fromAddress(controller)
    ]);

    return result[0].toBoolean();
  }

  try_isController(controller: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isController", "isController(address):(bool)", [
      ethereum.Value.fromAddress(controller)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  moduleMap(): Address {
    let result = super.call("moduleMap", "moduleMap():(address)", []);

    return result[0].toAddress();
  }

  try_moduleMap(): ethereum.CallResult<Address> {
    let result = super.tryCall("moduleMap", "moduleMap():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class AddControllerCall extends ethereum.Call {
  get inputs(): AddControllerCall__Inputs {
    return new AddControllerCall__Inputs(this);
  }

  get outputs(): AddControllerCall__Outputs {
    return new AddControllerCall__Outputs(this);
  }
}

export class AddControllerCall__Inputs {
  _call: AddControllerCall;

  constructor(call: AddControllerCall) {
    this._call = call;
  }

  get controller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddControllerCall__Outputs {
  _call: AddControllerCall;

  constructor(call: AddControllerCall) {
    this._call = call;
  }
}

export class AddIntegrationCall extends ethereum.Call {
  get inputs(): AddIntegrationCall__Inputs {
    return new AddIntegrationCall__Inputs(this);
  }

  get outputs(): AddIntegrationCall__Outputs {
    return new AddIntegrationCall__Outputs(this);
  }
}

export class AddIntegrationCall__Inputs {
  _call: AddIntegrationCall;

  constructor(call: AddIntegrationCall) {
    this._call = call;
  }

  get contractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get name(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class AddIntegrationCall__Outputs {
  _call: AddIntegrationCall;

  constructor(call: AddIntegrationCall) {
    this._call = call;
  }
}

export class AddTokenCall extends ethereum.Call {
  get inputs(): AddTokenCall__Inputs {
    return new AddTokenCall__Inputs(this);
  }

  get outputs(): AddTokenCall__Outputs {
    return new AddTokenCall__Outputs(this);
  }
}

export class AddTokenCall__Inputs {
  _call: AddTokenCall;

  constructor(call: AddTokenCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get acceptingDeposits(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }

  get acceptingWithdrawals(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }

  get acceptingLping(): boolean {
    return this._call.inputValues[3].value.toBoolean();
  }

  get acceptingBridging(): boolean {
    return this._call.inputValues[4].value.toBoolean();
  }

  get biosRewardWeight(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get reserveRatioNumerator(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get targetLiquidityRatioNumerator(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }

  get transferFeeKValueNumerator(): BigInt {
    return this._call.inputValues[8].value.toBigInt();
  }

  get transferFeePlatformRatioNumerator(): BigInt {
    return this._call.inputValues[9].value.toBigInt();
  }
}

export class AddTokenCall__Outputs {
  _call: AddTokenCall;

  constructor(call: AddTokenCall) {
    this._call = call;
  }
}

export class DisableTokenBridgingCall extends ethereum.Call {
  get inputs(): DisableTokenBridgingCall__Inputs {
    return new DisableTokenBridgingCall__Inputs(this);
  }

  get outputs(): DisableTokenBridgingCall__Outputs {
    return new DisableTokenBridgingCall__Outputs(this);
  }
}

export class DisableTokenBridgingCall__Inputs {
  _call: DisableTokenBridgingCall;

  constructor(call: DisableTokenBridgingCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DisableTokenBridgingCall__Outputs {
  _call: DisableTokenBridgingCall;

  constructor(call: DisableTokenBridgingCall) {
    this._call = call;
  }
}

export class DisableTokenDepositsCall extends ethereum.Call {
  get inputs(): DisableTokenDepositsCall__Inputs {
    return new DisableTokenDepositsCall__Inputs(this);
  }

  get outputs(): DisableTokenDepositsCall__Outputs {
    return new DisableTokenDepositsCall__Outputs(this);
  }
}

export class DisableTokenDepositsCall__Inputs {
  _call: DisableTokenDepositsCall;

  constructor(call: DisableTokenDepositsCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DisableTokenDepositsCall__Outputs {
  _call: DisableTokenDepositsCall;

  constructor(call: DisableTokenDepositsCall) {
    this._call = call;
  }
}

export class DisableTokenLpingCall extends ethereum.Call {
  get inputs(): DisableTokenLpingCall__Inputs {
    return new DisableTokenLpingCall__Inputs(this);
  }

  get outputs(): DisableTokenLpingCall__Outputs {
    return new DisableTokenLpingCall__Outputs(this);
  }
}

export class DisableTokenLpingCall__Inputs {
  _call: DisableTokenLpingCall;

  constructor(call: DisableTokenLpingCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DisableTokenLpingCall__Outputs {
  _call: DisableTokenLpingCall;

  constructor(call: DisableTokenLpingCall) {
    this._call = call;
  }
}

export class DisableTokenWithdrawalsCall extends ethereum.Call {
  get inputs(): DisableTokenWithdrawalsCall__Inputs {
    return new DisableTokenWithdrawalsCall__Inputs(this);
  }

  get outputs(): DisableTokenWithdrawalsCall__Outputs {
    return new DisableTokenWithdrawalsCall__Outputs(this);
  }
}

export class DisableTokenWithdrawalsCall__Inputs {
  _call: DisableTokenWithdrawalsCall;

  constructor(call: DisableTokenWithdrawalsCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DisableTokenWithdrawalsCall__Outputs {
  _call: DisableTokenWithdrawalsCall;

  constructor(call: DisableTokenWithdrawalsCall) {
    this._call = call;
  }
}

export class EnableTokenBridgingCall extends ethereum.Call {
  get inputs(): EnableTokenBridgingCall__Inputs {
    return new EnableTokenBridgingCall__Inputs(this);
  }

  get outputs(): EnableTokenBridgingCall__Outputs {
    return new EnableTokenBridgingCall__Outputs(this);
  }
}

export class EnableTokenBridgingCall__Inputs {
  _call: EnableTokenBridgingCall;

  constructor(call: EnableTokenBridgingCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class EnableTokenBridgingCall__Outputs {
  _call: EnableTokenBridgingCall;

  constructor(call: EnableTokenBridgingCall) {
    this._call = call;
  }
}

export class EnableTokenDepositsCall extends ethereum.Call {
  get inputs(): EnableTokenDepositsCall__Inputs {
    return new EnableTokenDepositsCall__Inputs(this);
  }

  get outputs(): EnableTokenDepositsCall__Outputs {
    return new EnableTokenDepositsCall__Outputs(this);
  }
}

export class EnableTokenDepositsCall__Inputs {
  _call: EnableTokenDepositsCall;

  constructor(call: EnableTokenDepositsCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class EnableTokenDepositsCall__Outputs {
  _call: EnableTokenDepositsCall;

  constructor(call: EnableTokenDepositsCall) {
    this._call = call;
  }
}

export class EnableTokenLpingCall extends ethereum.Call {
  get inputs(): EnableTokenLpingCall__Inputs {
    return new EnableTokenLpingCall__Inputs(this);
  }

  get outputs(): EnableTokenLpingCall__Outputs {
    return new EnableTokenLpingCall__Outputs(this);
  }
}

export class EnableTokenLpingCall__Inputs {
  _call: EnableTokenLpingCall;

  constructor(call: EnableTokenLpingCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class EnableTokenLpingCall__Outputs {
  _call: EnableTokenLpingCall;

  constructor(call: EnableTokenLpingCall) {
    this._call = call;
  }
}

export class EnableTokenWithdrawalsCall extends ethereum.Call {
  get inputs(): EnableTokenWithdrawalsCall__Inputs {
    return new EnableTokenWithdrawalsCall__Inputs(this);
  }

  get outputs(): EnableTokenWithdrawalsCall__Outputs {
    return new EnableTokenWithdrawalsCall__Outputs(this);
  }
}

export class EnableTokenWithdrawalsCall__Inputs {
  _call: EnableTokenWithdrawalsCall;

  constructor(call: EnableTokenWithdrawalsCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class EnableTokenWithdrawalsCall__Outputs {
  _call: EnableTokenWithdrawalsCall;

  constructor(call: EnableTokenWithdrawalsCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get controllers_(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get moduleMap_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get wethTokenAddress_(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get biosTokenAddress_(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class UpdateBiosTokenAddressCall extends ethereum.Call {
  get inputs(): UpdateBiosTokenAddressCall__Inputs {
    return new UpdateBiosTokenAddressCall__Inputs(this);
  }

  get outputs(): UpdateBiosTokenAddressCall__Outputs {
    return new UpdateBiosTokenAddressCall__Outputs(this);
  }
}

export class UpdateBiosTokenAddressCall__Inputs {
  _call: UpdateBiosTokenAddressCall;

  constructor(call: UpdateBiosTokenAddressCall) {
    this._call = call;
  }

  get biosAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateBiosTokenAddressCall__Outputs {
  _call: UpdateBiosTokenAddressCall;

  constructor(call: UpdateBiosTokenAddressCall) {
    this._call = call;
  }
}

export class UpdateTokenReserveRatioNumeratorCall extends ethereum.Call {
  get inputs(): UpdateTokenReserveRatioNumeratorCall__Inputs {
    return new UpdateTokenReserveRatioNumeratorCall__Inputs(this);
  }

  get outputs(): UpdateTokenReserveRatioNumeratorCall__Outputs {
    return new UpdateTokenReserveRatioNumeratorCall__Outputs(this);
  }
}

export class UpdateTokenReserveRatioNumeratorCall__Inputs {
  _call: UpdateTokenReserveRatioNumeratorCall;

  constructor(call: UpdateTokenReserveRatioNumeratorCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get reserveRatioNumerator(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateTokenReserveRatioNumeratorCall__Outputs {
  _call: UpdateTokenReserveRatioNumeratorCall;

  constructor(call: UpdateTokenReserveRatioNumeratorCall) {
    this._call = call;
  }
}

export class UpdateTokenRewardWeightCall extends ethereum.Call {
  get inputs(): UpdateTokenRewardWeightCall__Inputs {
    return new UpdateTokenRewardWeightCall__Inputs(this);
  }

  get outputs(): UpdateTokenRewardWeightCall__Outputs {
    return new UpdateTokenRewardWeightCall__Outputs(this);
  }
}

export class UpdateTokenRewardWeightCall__Inputs {
  _call: UpdateTokenRewardWeightCall;

  constructor(call: UpdateTokenRewardWeightCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get rewardWeight(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateTokenRewardWeightCall__Outputs {
  _call: UpdateTokenRewardWeightCall;

  constructor(call: UpdateTokenRewardWeightCall) {
    this._call = call;
  }
}

export class UpdateTokenTargetLiquidityRatioNumeratorCall extends ethereum.Call {
  get inputs(): UpdateTokenTargetLiquidityRatioNumeratorCall__Inputs {
    return new UpdateTokenTargetLiquidityRatioNumeratorCall__Inputs(this);
  }

  get outputs(): UpdateTokenTargetLiquidityRatioNumeratorCall__Outputs {
    return new UpdateTokenTargetLiquidityRatioNumeratorCall__Outputs(this);
  }
}

export class UpdateTokenTargetLiquidityRatioNumeratorCall__Inputs {
  _call: UpdateTokenTargetLiquidityRatioNumeratorCall;

  constructor(call: UpdateTokenTargetLiquidityRatioNumeratorCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get targetLiquidityRatioNumerator(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateTokenTargetLiquidityRatioNumeratorCall__Outputs {
  _call: UpdateTokenTargetLiquidityRatioNumeratorCall;

  constructor(call: UpdateTokenTargetLiquidityRatioNumeratorCall) {
    this._call = call;
  }
}

export class UpdateTokenTransferFeeKValueNumeratorCall extends ethereum.Call {
  get inputs(): UpdateTokenTransferFeeKValueNumeratorCall__Inputs {
    return new UpdateTokenTransferFeeKValueNumeratorCall__Inputs(this);
  }

  get outputs(): UpdateTokenTransferFeeKValueNumeratorCall__Outputs {
    return new UpdateTokenTransferFeeKValueNumeratorCall__Outputs(this);
  }
}

export class UpdateTokenTransferFeeKValueNumeratorCall__Inputs {
  _call: UpdateTokenTransferFeeKValueNumeratorCall;

  constructor(call: UpdateTokenTransferFeeKValueNumeratorCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get transferFeeKValueNumerator(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateTokenTransferFeeKValueNumeratorCall__Outputs {
  _call: UpdateTokenTransferFeeKValueNumeratorCall;

  constructor(call: UpdateTokenTransferFeeKValueNumeratorCall) {
    this._call = call;
  }
}

export class UpdateTokenTransferFeePlatformRatioNumeratorCall extends ethereum.Call {
  get inputs(): UpdateTokenTransferFeePlatformRatioNumeratorCall__Inputs {
    return new UpdateTokenTransferFeePlatformRatioNumeratorCall__Inputs(this);
  }

  get outputs(): UpdateTokenTransferFeePlatformRatioNumeratorCall__Outputs {
    return new UpdateTokenTransferFeePlatformRatioNumeratorCall__Outputs(this);
  }
}

export class UpdateTokenTransferFeePlatformRatioNumeratorCall__Inputs {
  _call: UpdateTokenTransferFeePlatformRatioNumeratorCall;

  constructor(call: UpdateTokenTransferFeePlatformRatioNumeratorCall) {
    this._call = call;
  }

  get tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get transferFeePlatformRatioNumerator(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateTokenTransferFeePlatformRatioNumeratorCall__Outputs {
  _call: UpdateTokenTransferFeePlatformRatioNumeratorCall;

  constructor(call: UpdateTokenTransferFeePlatformRatioNumeratorCall) {
    this._call = call;
  }
}
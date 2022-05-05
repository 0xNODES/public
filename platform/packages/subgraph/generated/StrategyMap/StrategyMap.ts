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

export class AddIntegration extends ethereum.Event {
  get params(): AddIntegration__Params {
    return new AddIntegration__Params(this);
  }
}

export class AddIntegration__Params {
  _event: AddIntegration;

  constructor(event: AddIntegration) {
    this._event = event;
  }

  get strategyId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get integration(): AddIntegrationIntegrationStruct {
    return changetype<AddIntegrationIntegrationStruct>(
      this._event.parameters[1].value.toTuple()
    );
  }

  get token(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class AddIntegrationIntegrationStruct extends ethereum.Tuple {
  get integration(): Address {
    return this[0].toAddress();
  }

  get ammPoolID(): BigInt {
    return this[1].toBigInt();
  }
}

export class DeleteStrategy extends ethereum.Event {
  get params(): DeleteStrategy__Params {
    return new DeleteStrategy__Params(this);
  }
}

export class DeleteStrategy__Params {
  _event: DeleteStrategy;

  constructor(event: DeleteStrategy) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class IntegrationWeightAdjustment extends ethereum.Event {
  get params(): IntegrationWeightAdjustment__Params {
    return new IntegrationWeightAdjustment__Params(this);
  }
}

export class IntegrationWeightAdjustment__Params {
  _event: IntegrationWeightAdjustment;

  constructor(event: IntegrationWeightAdjustment) {
    this._event = event;
  }

  get strategyId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get sourceIndex(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get destinationIndex(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get rebalance(): boolean {
    return this._event.parameters[4].value.toBoolean();
  }
}

export class NewStrategy extends ethereum.Event {
  get params(): NewStrategy__Params {
    return new NewStrategy__Params(this);
  }
}

export class NewStrategy__Params {
  _event: NewStrategy;

  constructor(event: NewStrategy) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get integrations(): Array<NewStrategyIntegrationsStruct> {
    return this._event.parameters[1].value.toTupleArray<
      NewStrategyIntegrationsStruct
    >();
  }

  get tokens(): Array<NewStrategyTokensStruct> {
    return this._event.parameters[2].value.toTupleArray<
      NewStrategyTokensStruct
    >();
  }

  get name(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class NewStrategyIntegrationsStruct extends ethereum.Tuple {
  get integration(): Address {
    return this[0].toAddress();
  }

  get ammPoolID(): BigInt {
    return this[1].toBigInt();
  }
}

export class NewStrategyTokensStruct extends ethereum.Tuple {
  get integrationPairIdx(): BigInt {
    return this[0].toBigInt();
  }

  get token(): Address {
    return this[1].toAddress();
  }

  get weight(): BigInt {
    return this[2].toBigInt();
  }
}

export class RemoveIntegration extends ethereum.Event {
  get params(): RemoveIntegration__Params {
    return new RemoveIntegration__Params(this);
  }
}

export class RemoveIntegration__Params {
  _event: RemoveIntegration;

  constructor(event: RemoveIntegration) {
    this._event = event;
  }

  get strategyId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get integrationIndex(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get token(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class UpdateName extends ethereum.Event {
  get params(): UpdateName__Params {
    return new UpdateName__Params(this);
  }
}

export class UpdateName__Params {
  _event: UpdateName;

  constructor(event: UpdateName) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class StrategyMap__getClosablePositionsResultValue0Struct extends ethereum.Tuple {
  get integration(): Address {
    return this[0].toAddress();
  }

  get ammPoolID(): BigInt {
    return this[1].toBigInt();
  }

  get amount(): BigInt {
    return this[2].toBigInt();
  }
}

export class StrategyMap__getMultipleStrategiesResultValue0Struct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get integrations(): Array<
    StrategyMap__getMultipleStrategiesResultValue0IntegrationsStruct
  > {
    return this[1].toTupleArray<
      StrategyMap__getMultipleStrategiesResultValue0IntegrationsStruct
    >();
  }

  get tokens(): Array<
    StrategyMap__getMultipleStrategiesResultValue0TokensStruct
  > {
    return this[2].toTupleArray<
      StrategyMap__getMultipleStrategiesResultValue0TokensStruct
    >();
  }
}

export class StrategyMap__getMultipleStrategiesResultValue0IntegrationsStruct extends ethereum.Tuple {
  get integration(): Address {
    return this[0].toAddress();
  }

  get ammPoolID(): BigInt {
    return this[1].toBigInt();
  }
}

export class StrategyMap__getMultipleStrategiesResultValue0TokensStruct extends ethereum.Tuple {
  get integrationPairIdx(): BigInt {
    return this[0].toBigInt();
  }

  get token(): Address {
    return this[1].toAddress();
  }

  get weight(): BigInt {
    return this[2].toBigInt();
  }
}

export class StrategyMap__getStrategyResultValue0Struct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get integrations(): Array<
    StrategyMap__getStrategyResultValue0IntegrationsStruct
  > {
    return this[1].toTupleArray<
      StrategyMap__getStrategyResultValue0IntegrationsStruct
    >();
  }

  get tokens(): Array<StrategyMap__getStrategyResultValue0TokensStruct> {
    return this[2].toTupleArray<
      StrategyMap__getStrategyResultValue0TokensStruct
    >();
  }
}

export class StrategyMap__getStrategyResultValue0IntegrationsStruct extends ethereum.Tuple {
  get integration(): Address {
    return this[0].toAddress();
  }

  get ammPoolID(): BigInt {
    return this[1].toBigInt();
  }
}

export class StrategyMap__getStrategyResultValue0TokensStruct extends ethereum.Tuple {
  get integrationPairIdx(): BigInt {
    return this[0].toBigInt();
  }

  get token(): Address {
    return this[1].toAddress();
  }

  get weight(): BigInt {
    return this[2].toBigInt();
  }
}

export class StrategyMap__getStrategyBalancesResultStrategyBalancesStruct extends ethereum.Tuple {
  get strategyID(): BigInt {
    return this[0].toBigInt();
  }

  get tokens(): Array<
    StrategyMap__getStrategyBalancesResultStrategyBalancesTokensStruct
  > {
    return this[1].toTupleArray<
      StrategyMap__getStrategyBalancesResultStrategyBalancesTokensStruct
    >();
  }
}

export class StrategyMap__getStrategyBalancesResultStrategyBalancesTokensStruct extends ethereum.Tuple {
  get token(): Address {
    return this[0].toAddress();
  }

  get balance(): BigInt {
    return this[1].toBigInt();
  }
}

export class StrategyMap__getStrategyBalancesResultGeneralBalancesStruct extends ethereum.Tuple {
  get token(): Address {
    return this[0].toAddress();
  }

  get balance(): BigInt {
    return this[1].toBigInt();
  }
}

export class StrategyMap__getStrategyBalancesResult {
  value0: Array<StrategyMap__getStrategyBalancesResultStrategyBalancesStruct>;
  value1: Array<StrategyMap__getStrategyBalancesResultGeneralBalancesStruct>;

  constructor(
    value0: Array<StrategyMap__getStrategyBalancesResultStrategyBalancesStruct>,
    value1: Array<StrategyMap__getStrategyBalancesResultGeneralBalancesStruct>
  ) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromTupleArray(this.value0));
    map.set("value1", ethereum.Value.fromTupleArray(this.value1));
    return map;
  }
}

export class StrategyMap extends ethereum.SmartContract {
  static bind(address: Address): StrategyMap {
    return new StrategyMap("StrategyMap", address);
  }

  TOKEN_WEIGHT(): BigInt {
    let result = super.call("TOKEN_WEIGHT", "TOKEN_WEIGHT():(uint32)", []);

    return result[0].toBigInt();
  }

  try_TOKEN_WEIGHT(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("TOKEN_WEIGHT", "TOKEN_WEIGHT():(uint32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  getClosablePositions(
    token: Address,
    index: BigInt
  ): StrategyMap__getClosablePositionsResultValue0Struct {
    let result = super.call(
      "getClosablePositions",
      "getClosablePositions(address,uint256):((address,uint32,uint256))",
      [
        ethereum.Value.fromAddress(token),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );

    return changetype<StrategyMap__getClosablePositionsResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getClosablePositions(
    token: Address,
    index: BigInt
  ): ethereum.CallResult<StrategyMap__getClosablePositionsResultValue0Struct> {
    let result = super.tryCall(
      "getClosablePositions",
      "getClosablePositions(address,uint256):((address,uint32,uint256))",
      [
        ethereum.Value.fromAddress(token),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<StrategyMap__getClosablePositionsResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getDeployAmount(
    integration: Address,
    poolID: BigInt,
    token: Address
  ): BigInt {
    let result = super.call(
      "getDeployAmount",
      "getDeployAmount(address,uint32,address):(int256)",
      [
        ethereum.Value.fromAddress(integration),
        ethereum.Value.fromUnsignedBigInt(poolID),
        ethereum.Value.fromAddress(token)
      ]
    );

    return result[0].toBigInt();
  }

  try_getDeployAmount(
    integration: Address,
    poolID: BigInt,
    token: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getDeployAmount",
      "getDeployAmount(address,uint32,address):(int256)",
      [
        ethereum.Value.fromAddress(integration),
        ethereum.Value.fromUnsignedBigInt(poolID),
        ethereum.Value.fromAddress(token)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getMaximumCap(id: BigInt, token: Address): BigInt {
    let result = super.call(
      "getMaximumCap",
      "getMaximumCap(uint256,address):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(id), ethereum.Value.fromAddress(token)]
    );

    return result[0].toBigInt();
  }

  try_getMaximumCap(id: BigInt, token: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getMaximumCap",
      "getMaximumCap(uint256,address):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(id), ethereum.Value.fromAddress(token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getMultipleStrategies(
    ids: Array<BigInt>
  ): Array<StrategyMap__getMultipleStrategiesResultValue0Struct> {
    let result = super.call(
      "getMultipleStrategies",
      "getMultipleStrategies(uint256[]):((string,(address,uint32)[],(uint256,address,uint32)[])[])",
      [ethereum.Value.fromUnsignedBigIntArray(ids)]
    );

    return result[0].toTupleArray<
      StrategyMap__getMultipleStrategiesResultValue0Struct
    >();
  }

  try_getMultipleStrategies(
    ids: Array<BigInt>
  ): ethereum.CallResult<
    Array<StrategyMap__getMultipleStrategiesResultValue0Struct>
  > {
    let result = super.tryCall(
      "getMultipleStrategies",
      "getMultipleStrategies(uint256[]):((string,(address,uint32)[],(uint256,address,uint32)[])[])",
      [ethereum.Value.fromUnsignedBigIntArray(ids)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<
        StrategyMap__getMultipleStrategiesResultValue0Struct
      >()
    );
  }

  getStrategy(id: BigInt): StrategyMap__getStrategyResultValue0Struct {
    let result = super.call(
      "getStrategy",
      "getStrategy(uint256):((string,(address,uint32)[],(uint256,address,uint32)[]))",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );

    return changetype<StrategyMap__getStrategyResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getStrategy(
    id: BigInt
  ): ethereum.CallResult<StrategyMap__getStrategyResultValue0Struct> {
    let result = super.tryCall(
      "getStrategy",
      "getStrategy(uint256):((string,(address,uint32)[],(uint256,address,uint32)[]))",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<StrategyMap__getStrategyResultValue0Struct>(value[0].toTuple())
    );
  }

  getStrategyBalances(
    _strategies: Array<BigInt>,
    _tokens: Array<Address>
  ): StrategyMap__getStrategyBalancesResult {
    let result = super.call(
      "getStrategyBalances",
      "getStrategyBalances(uint256[],address[]):((uint256,(address,uint256)[])[],(address,uint256)[])",
      [
        ethereum.Value.fromUnsignedBigIntArray(_strategies),
        ethereum.Value.fromAddressArray(_tokens)
      ]
    );

    return new StrategyMap__getStrategyBalancesResult(
      result[0].toTupleArray<
        StrategyMap__getStrategyBalancesResultStrategyBalancesStruct
      >(),
      result[1].toTupleArray<
        StrategyMap__getStrategyBalancesResultGeneralBalancesStruct
      >()
    );
  }

  try_getStrategyBalances(
    _strategies: Array<BigInt>,
    _tokens: Array<Address>
  ): ethereum.CallResult<StrategyMap__getStrategyBalancesResult> {
    let result = super.tryCall(
      "getStrategyBalances",
      "getStrategyBalances(uint256[],address[]):((uint256,(address,uint256)[])[],(address,uint256)[])",
      [
        ethereum.Value.fromUnsignedBigIntArray(_strategies),
        ethereum.Value.fromAddressArray(_tokens)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new StrategyMap__getStrategyBalancesResult(
        value[0].toTupleArray<
          StrategyMap__getStrategyBalancesResultStrategyBalancesStruct
        >(),
        value[1].toTupleArray<
          StrategyMap__getStrategyBalancesResultGeneralBalancesStruct
        >()
      )
    );
  }

  getStrategyTokenBalance(id: BigInt, token: Address): BigInt {
    let result = super.call(
      "getStrategyTokenBalance",
      "getStrategyTokenBalance(uint256,address):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(id), ethereum.Value.fromAddress(token)]
    );

    return result[0].toBigInt();
  }

  try_getStrategyTokenBalance(
    id: BigInt,
    token: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getStrategyTokenBalance",
      "getStrategyTokenBalance(uint256,address):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(id), ethereum.Value.fromAddress(token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getStrategyTokenLength(strategy: BigInt): BigInt {
    let result = super.call(
      "getStrategyTokenLength",
      "getStrategyTokenLength(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(strategy)]
    );

    return result[0].toBigInt();
  }

  try_getStrategyTokenLength(strategy: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getStrategyTokenLength",
      "getStrategyTokenLength(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(strategy)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenTotalBalance(token: Address): BigInt {
    let result = super.call(
      "getTokenTotalBalance",
      "getTokenTotalBalance(address):(uint256)",
      [ethereum.Value.fromAddress(token)]
    );

    return result[0].toBigInt();
  }

  try_getTokenTotalBalance(token: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTokenTotalBalance",
      "getTokenTotalBalance(address):(uint256)",
      [ethereum.Value.fromAddress(token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  idCounter(): BigInt {
    let result = super.call("idCounter", "idCounter():(uint256)", []);

    return result[0].toBigInt();
  }

  try_idCounter(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("idCounter", "idCounter():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

export class AddPairToStrategyCall extends ethereum.Call {
  get inputs(): AddPairToStrategyCall__Inputs {
    return new AddPairToStrategyCall__Inputs(this);
  }

  get outputs(): AddPairToStrategyCall__Outputs {
    return new AddPairToStrategyCall__Outputs(this);
  }
}

export class AddPairToStrategyCall__Inputs {
  _call: AddPairToStrategyCall;

  constructor(call: AddPairToStrategyCall) {
    this._call = call;
  }

  get strategyId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get integration(): AddPairToStrategyCallIntegrationStruct {
    return changetype<AddPairToStrategyCallIntegrationStruct>(
      this._call.inputValues[1].value.toTuple()
    );
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class AddPairToStrategyCall__Outputs {
  _call: AddPairToStrategyCall;

  constructor(call: AddPairToStrategyCall) {
    this._call = call;
  }
}

export class AddPairToStrategyCallIntegrationStruct extends ethereum.Tuple {
  get integration(): Address {
    return this[0].toAddress();
  }

  get ammPoolID(): BigInt {
    return this[1].toBigInt();
  }
}

export class AddStrategyCall extends ethereum.Call {
  get inputs(): AddStrategyCall__Inputs {
    return new AddStrategyCall__Inputs(this);
  }

  get outputs(): AddStrategyCall__Outputs {
    return new AddStrategyCall__Outputs(this);
  }
}

export class AddStrategyCall__Inputs {
  _call: AddStrategyCall;

  constructor(call: AddStrategyCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get integrations(): Array<AddStrategyCallIntegrationsStruct> {
    return this._call.inputValues[1].value.toTupleArray<
      AddStrategyCallIntegrationsStruct
    >();
  }

  get tokens(): Array<AddStrategyCallTokensStruct> {
    return this._call.inputValues[2].value.toTupleArray<
      AddStrategyCallTokensStruct
    >();
  }

  get maxCap(): Array<BigInt> {
    return this._call.inputValues[3].value.toBigIntArray();
  }
}

export class AddStrategyCall__Outputs {
  _call: AddStrategyCall;

  constructor(call: AddStrategyCall) {
    this._call = call;
  }
}

export class AddStrategyCallIntegrationsStruct extends ethereum.Tuple {
  get integration(): Address {
    return this[0].toAddress();
  }

  get ammPoolID(): BigInt {
    return this[1].toBigInt();
  }
}

export class AddStrategyCallTokensStruct extends ethereum.Tuple {
  get integrationPairIdx(): BigInt {
    return this[0].toBigInt();
  }

  get token(): Address {
    return this[1].toAddress();
  }

  get weight(): BigInt {
    return this[2].toBigInt();
  }
}

export class ClearClosablePositionsCall extends ethereum.Call {
  get inputs(): ClearClosablePositionsCall__Inputs {
    return new ClearClosablePositionsCall__Inputs(this);
  }

  get outputs(): ClearClosablePositionsCall__Outputs {
    return new ClearClosablePositionsCall__Outputs(this);
  }
}

export class ClearClosablePositionsCall__Inputs {
  _call: ClearClosablePositionsCall;

  constructor(call: ClearClosablePositionsCall) {
    this._call = call;
  }

  get tokens(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }
}

export class ClearClosablePositionsCall__Outputs {
  _call: ClearClosablePositionsCall;

  constructor(call: ClearClosablePositionsCall) {
    this._call = call;
  }
}

export class ClosePositionsForWithdrawalCall extends ethereum.Call {
  get inputs(): ClosePositionsForWithdrawalCall__Inputs {
    return new ClosePositionsForWithdrawalCall__Inputs(this);
  }

  get outputs(): ClosePositionsForWithdrawalCall__Outputs {
    return new ClosePositionsForWithdrawalCall__Outputs(this);
  }
}

export class ClosePositionsForWithdrawalCall__Inputs {
  _call: ClosePositionsForWithdrawalCall;

  constructor(call: ClosePositionsForWithdrawalCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ClosePositionsForWithdrawalCall__Outputs {
  _call: ClosePositionsForWithdrawalCall;

  constructor(call: ClosePositionsForWithdrawalCall) {
    this._call = call;
  }
}

export class DecreaseDeployAmountChangeCall extends ethereum.Call {
  get inputs(): DecreaseDeployAmountChangeCall__Inputs {
    return new DecreaseDeployAmountChangeCall__Inputs(this);
  }

  get outputs(): DecreaseDeployAmountChangeCall__Outputs {
    return new DecreaseDeployAmountChangeCall__Outputs(this);
  }
}

export class DecreaseDeployAmountChangeCall__Inputs {
  _call: DecreaseDeployAmountChangeCall;

  constructor(call: DecreaseDeployAmountChangeCall) {
    this._call = call;
  }

  get integration(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get poolID(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class DecreaseDeployAmountChangeCall__Outputs {
  _call: DecreaseDeployAmountChangeCall;

  constructor(call: DecreaseDeployAmountChangeCall) {
    this._call = call;
  }
}

export class DecreaseStrategyCall extends ethereum.Call {
  get inputs(): DecreaseStrategyCall__Inputs {
    return new DecreaseStrategyCall__Inputs(this);
  }

  get outputs(): DecreaseStrategyCall__Outputs {
    return new DecreaseStrategyCall__Outputs(this);
  }
}

export class DecreaseStrategyCall__Inputs {
  _call: DecreaseStrategyCall;

  constructor(call: DecreaseStrategyCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get tokens(): Array<DecreaseStrategyCallTokensStruct> {
    return this._call.inputValues[1].value.toTupleArray<
      DecreaseStrategyCallTokensStruct
    >();
  }
}

export class DecreaseStrategyCall__Outputs {
  _call: DecreaseStrategyCall;

  constructor(call: DecreaseStrategyCall) {
    this._call = call;
  }
}

export class DecreaseStrategyCallTokensStruct extends ethereum.Tuple {
  get token(): Address {
    return this[0].toAddress();
  }

  get amount(): BigInt {
    return this[1].toBigInt();
  }
}

export class DeleteStrategyCall extends ethereum.Call {
  get inputs(): DeleteStrategyCall__Inputs {
    return new DeleteStrategyCall__Inputs(this);
  }

  get outputs(): DeleteStrategyCall__Outputs {
    return new DeleteStrategyCall__Outputs(this);
  }
}

export class DeleteStrategyCall__Inputs {
  _call: DeleteStrategyCall;

  constructor(call: DeleteStrategyCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DeleteStrategyCall__Outputs {
  _call: DeleteStrategyCall;

  constructor(call: DeleteStrategyCall) {
    this._call = call;
  }
}

export class IncreaseStrategyCall extends ethereum.Call {
  get inputs(): IncreaseStrategyCall__Inputs {
    return new IncreaseStrategyCall__Inputs(this);
  }

  get outputs(): IncreaseStrategyCall__Outputs {
    return new IncreaseStrategyCall__Outputs(this);
  }
}

export class IncreaseStrategyCall__Inputs {
  _call: IncreaseStrategyCall;

  constructor(call: IncreaseStrategyCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get tokens(): Array<IncreaseStrategyCallTokensStruct> {
    return this._call.inputValues[1].value.toTupleArray<
      IncreaseStrategyCallTokensStruct
    >();
  }
}

export class IncreaseStrategyCall__Outputs {
  _call: IncreaseStrategyCall;

  constructor(call: IncreaseStrategyCall) {
    this._call = call;
  }
}

export class IncreaseStrategyCallTokensStruct extends ethereum.Tuple {
  get token(): Address {
    return this[0].toAddress();
  }

  get amount(): BigInt {
    return this[1].toBigInt();
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
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MovePairWeightCall extends ethereum.Call {
  get inputs(): MovePairWeightCall__Inputs {
    return new MovePairWeightCall__Inputs(this);
  }

  get outputs(): MovePairWeightCall__Outputs {
    return new MovePairWeightCall__Outputs(this);
  }
}

export class MovePairWeightCall__Inputs {
  _call: MovePairWeightCall;

  constructor(call: MovePairWeightCall) {
    this._call = call;
  }

  get strategyId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get sourceIndex(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get destinationIndex(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get vectorAmount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get rebalance(): boolean {
    return this._call.inputValues[5].value.toBoolean();
  }
}

export class MovePairWeightCall__Outputs {
  _call: MovePairWeightCall;

  constructor(call: MovePairWeightCall) {
    this._call = call;
  }
}

export class RemovePairFromStrategyCall extends ethereum.Call {
  get inputs(): RemovePairFromStrategyCall__Inputs {
    return new RemovePairFromStrategyCall__Inputs(this);
  }

  get outputs(): RemovePairFromStrategyCall__Outputs {
    return new RemovePairFromStrategyCall__Outputs(this);
  }
}

export class RemovePairFromStrategyCall__Inputs {
  _call: RemovePairFromStrategyCall;

  constructor(call: RemovePairFromStrategyCall) {
    this._call = call;
  }

  get strategyId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get integrationIndex(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class RemovePairFromStrategyCall__Outputs {
  _call: RemovePairFromStrategyCall;

  constructor(call: RemovePairFromStrategyCall) {
    this._call = call;
  }
}

export class SetAvailableTokensCall extends ethereum.Call {
  get inputs(): SetAvailableTokensCall__Inputs {
    return new SetAvailableTokensCall__Inputs(this);
  }

  get outputs(): SetAvailableTokensCall__Outputs {
    return new SetAvailableTokensCall__Outputs(this);
  }
}

export class SetAvailableTokensCall__Inputs {
  _call: SetAvailableTokensCall;

  constructor(call: SetAvailableTokensCall) {
    this._call = call;
  }

  get strategyId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get available(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class SetAvailableTokensCall__Outputs {
  _call: SetAvailableTokensCall;

  constructor(call: SetAvailableTokensCall) {
    this._call = call;
  }
}

export class SetMaximumCapCall extends ethereum.Call {
  get inputs(): SetMaximumCapCall__Inputs {
    return new SetMaximumCapCall__Inputs(this);
  }

  get outputs(): SetMaximumCapCall__Outputs {
    return new SetMaximumCapCall__Outputs(this);
  }
}

export class SetMaximumCapCall__Inputs {
  _call: SetMaximumCapCall;

  constructor(call: SetMaximumCapCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get maxCap(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SetMaximumCapCall__Outputs {
  _call: SetMaximumCapCall;

  constructor(call: SetMaximumCapCall) {
    this._call = call;
  }
}

export class UpdateDeployAmountCall extends ethereum.Call {
  get inputs(): UpdateDeployAmountCall__Inputs {
    return new UpdateDeployAmountCall__Inputs(this);
  }

  get outputs(): UpdateDeployAmountCall__Outputs {
    return new UpdateDeployAmountCall__Outputs(this);
  }
}

export class UpdateDeployAmountCall__Inputs {
  _call: UpdateDeployAmountCall;

  constructor(call: UpdateDeployAmountCall) {
    this._call = call;
  }

  get integration(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get poolID(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get add(): boolean {
    return this._call.inputValues[4].value.toBoolean();
  }
}

export class UpdateDeployAmountCall__Outputs {
  _call: UpdateDeployAmountCall;

  constructor(call: UpdateDeployAmountCall) {
    this._call = call;
  }
}

export class UpdateNameCall extends ethereum.Call {
  get inputs(): UpdateNameCall__Inputs {
    return new UpdateNameCall__Inputs(this);
  }

  get outputs(): UpdateNameCall__Outputs {
    return new UpdateNameCall__Outputs(this);
  }
}

export class UpdateNameCall__Inputs {
  _call: UpdateNameCall;

  constructor(call: UpdateNameCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get name(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class UpdateNameCall__Outputs {
  _call: UpdateNameCall;

  constructor(call: UpdateNameCall) {
    this._call = call;
  }
}
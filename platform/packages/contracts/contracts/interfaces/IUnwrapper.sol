// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "../interfaces/IWeth9.sol";

// Some native tokens can't be unwrapped by upgradeable contracts...
// https://forum.openzeppelin.com/t/msg-sender-transfer-runs-out-of-gas-on-a-payable-upgradeable-proxy-contract/3766

interface IUnwrapper {
    /// @dev transfer token and then unwrap
    // Allows you to unwrap the token in cases where Istanbul causes gas issues
    function unwrap(uint256 amount) external;
}

// SPDX-License-Identifier: GPL-2.0
pragma solidity 0.8.4;

interface IAMMIntegration {
    struct Pool {
        address tokenA;
        address tokenB;
        uint256 positionID; // Used for Uniswap V3
    }

    /// Events
    event CreatePool(address indexed tokenA, address indexed tokenB, uint32 poolID);
    event YieldHarvested(uint32 poolID);
    event Deposit(address token, uint256 amount, uint32 poolID);
    event HarvestYieldError(uint32 indexed poolID);

    event TransferBetweenPools(uint32 source, uint32 destination, uint256[] amounts, address[] tokens);

    /// @dev IMPORTANT: poolID must start at 1 for all amm integrations. A poolID of 0 is used to designate a non amm integration.

    /// @param token The address of the deposited token
    /// @param amount The amount of token being deposited
    /// @param poolID  The id of the pool to deposit into
    function deposit(
        address token,
        uint256 amount,
        uint32 poolID
    ) external;

    /// @param token  the token to withdraw
    /// @param amount The amount of token in the pool to withdraw
    /// @param poolID  the pool to withdraw from
    function withdraw(
        address token,
        uint256 amount,
        uint32 poolID
    ) external;

    /// @dev Deploys all the tokens for the specified pools
    function deploy(uint32 poolID) external;

    /// @dev Harvests token yield from the integration
    function harvestYield() external;
}

// SPDX-License-Identifier: GPL-2.0
pragma solidity 0.8.4;

interface IKernel {
    struct WithdrawAllAndClaimResponse {
        uint256[] tokenAmounts;
        uint256 ethWithdrawn;
        uint256 ethClaimed;
        uint256 biosClaimed;
    }
    event Withdraw(address indexed user, address[] tokens, uint256[] tokenAmounts, uint256 ethAmount);
    event ClaimEthRewards(address indexed user, uint256[] strategies, uint256 ethRewards);
    event ClaimBiosRewards(address indexed user, uint256 biosRewards);
    event WithdrawAllAndClaim(
        address indexed user,
        address[] tokens,
        uint256[] strategies,
        bool withdrawWethAsEth,
        uint256[] tokenAmounts,
        uint256 ethWithdrawn,
        uint256 ethRewards,
        uint256 biosRewards
    );
    event TokenAdded(
        address indexed tokenAddress,
        bool acceptingDeposits,
        bool acceptingWithdrawals,
        bool acceptingLping,
        bool acceptingBridging,
        uint256 biosRewardWeight,
        uint256 reserveRatioNumerator,
        uint256 targetLiquidityRatioNumerator,
        uint256 transferFeeKValueNumerator,
        uint256 transferFeePlatformRatioNumerator
    );

    event GasAccountUpdated(address gasAccount);
    event TreasuryAccountUpdated(address treasuryAccount);
    event IntegrationAdded(address indexed contractAddress, string name);
    event SetBiosRewardsDuration(uint32 biosRewardsDuration);
    event SeedBiosRewards(uint256 biosAmount);
    event Deploy();
    event HarvestYield();
    event DistributeEth();
    event BiosBuyBack();
    event EthDistributionWeightsUpdated(
        uint32 biosBuyBackEthWeight,
        uint32 treasuryEthWeight,
        uint32 protocolFeeEthWeight,
        uint32 rewardsEthWeight
    );
    event GasAccountTargetEthBalanceUpdated(uint256 gasAccountTargetEthBalance);

    /// @param account The address of the account to check if they are a manager
    /// @return Bool indicating whether the account is a manger
    function isManager(address account) external view returns (bool);

    /// @param account The address of the account to check if they are an owner
    /// @return Bool indicating whether the account is an owner
    function isOwner(address account) external view returns (bool);

    /// @param account The address of the account to check if they are a liquidity provider
    /// @return Bool indicating whether the account is a liquidity provider
    function isLiquidityProvider(address account) external view returns (bool);
}

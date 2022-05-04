// SPDX-License-Identifier: GPL-2.0
pragma solidity 0.8.4;

import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
//import "../interfaces/IBiosRewards.sol";
import "../interfaces/IBiosEmitter.sol";
import "../interfaces/IKernel.sol";
import "../interfaces/IIntegrationMap.sol";
import "../interfaces/IUserPositions.sol";
import "../interfaces/IYieldManager.sol";
import "../interfaces/IInterconnects.sol";
import "../interfaces/IWeth9.sol";
import "../interfaces/IUniswapTrader.sol";
import "../interfaces/ISushiSwapTrader.sol";
import "../interfaces/IStrategyMap.sol";
import "../interfaces/IUnwrapper.sol";
import "./ModuleMapConsumer.sol";

/// @title Kernel
/// @notice Allows users to deposit/withdraw erc20 tokens
/// @notice Allows a system admin to control which tokens are depositable
contract Kernel is
    Initializable,
    AccessControlEnumerableUpgradeable,
    ModuleMapConsumer,
    IKernel,
    ReentrancyGuardUpgradeable
{
    using SafeERC20Upgradeable for IERC20MetadataUpgradeable;

    // constants
    bytes32 public constant OWNER_ROLE = 0x72fed0a30cb639f27f755e6f7c6edf975db0859d96eb67b27d2695c6486b1be0; //keccak256("owner_role");
    bytes32 public constant MANAGER_ROLE = 0x45a03fb503c1bf173e1a78fdc6b62e74bfc9c0cac4b0db3c4a667287a0fb7b9d; //keccak256("manager_role");
    uint256 private constant FTM_CHAIN_ID = 250;
    uint256 private constant BSC_CHAIN_ID = 56;

    uint256 private lastDeployTimestamp;

    uint256 private lastHarvestYieldTimestamp;

    uint256 private lastDistributeEthTimestamp;
    uint256 private lastLastDistributeEthTimestamp;
    uint256 private lastBiosBuyBackTimestamp;
    uint256 private initializationTimestamp;

    bool private lpWhitelistEnabled;

    bytes32 public constant LIQUIDITY_PROVIDER_ROLE =
        0x6d53deaa1363a9a09a38da6f41ec59fc13a00b08c43141d19c181ddb970e9d2a; //keccak256("liquidity_provider_role");

    modifier onlyGasAccount() {
        require(
            msg.sender == IYieldManager(moduleMap.getModuleAddress(Modules.YieldManager)).getGasAccount(),
            "Caller is not gas account"
        );
        _;
    }

    modifier onlyLpWhitelist() {
        require(
            !lpWhitelistEnabled || hasRole(LIQUIDITY_PROVIDER_ROLE, msg.sender),
            "Caller is not whitelisted as a liquidity provider"
        );
        _;
    }

    receive() external payable {}

    /// @notice Initializes contract - used as a replacement for a constructor
    /// @param admin_ default administrator, a cold storage address
    /// @param owner_ single owner account, used to manage the managers
    /// @param moduleMap_ Module Map address
    function initialize(
        address admin_,
        address owner_,
        address manager_,
        address liquidityProvider_,
        address moduleMap_
    ) external initializer {
        require(admin_ != address(0), "bad address");
        require(owner_ != address(0), "bad address");
        require(manager_ != address(0), "bad address");
        require(moduleMap_ != address(0), "bad address");
        require(liquidityProvider_ != address(0), "bad address");

        __ModuleMapConsumer_init(moduleMap_);
        __ReentrancyGuard_init();
        __AccessControl_init();
        // make the "admin_" address the default admin role
        _setupRole(DEFAULT_ADMIN_ROLE, admin_);

        // make the "owner_" address the owner of the system
        _setupRole(OWNER_ROLE, owner_);

        // give the "owner_" address the manager role, too
        _setupRole(MANAGER_ROLE, manager_);

        // give the "owner_" address the liquidity provider role, too
        _setupRole(LIQUIDITY_PROVIDER_ROLE, liquidityProvider_);

        // owners are admins of managers
        _setRoleAdmin(MANAGER_ROLE, OWNER_ROLE);

        // managers are admins of liquidity providers
        _setRoleAdmin(LIQUIDITY_PROVIDER_ROLE, MANAGER_ROLE);

        initializationTimestamp = block.timestamp;
        lpWhitelistEnabled = true;
    }

    /// @dev DEPRECATED -
    // /// @param biosRewardsDuration The duration in seconds for a BIOS rewards period to last
    // function setBiosRewardsDuration(uint32 biosRewardsDuration) external onlyRole(MANAGER_ROLE) {
    //     IBiosRewards(moduleMap.getModuleAddress(Modules.BiosRewards)).setBiosRewardsDuration(biosRewardsDuration);

    //     emit SetBiosRewardsDuration(biosRewardsDuration);
    // }

    /// @dev DEPRECATED -
    // /// @param biosAmount The amount of BIOS to add to the rewards
    // function seedBiosRewards(uint256 biosAmount) external onlyRole(MANAGER_ROLE) {
    //     IBiosRewards(moduleMap.getModuleAddress(Modules.BiosRewards)).seedBiosRewards(msg.sender, biosAmount);

    //     emit SeedBiosRewards(biosAmount);
    // }

    /// @notice This function is used after tokens have been added, and a weight array should be included
    /// @param contractAddress The address of the integration contract
    /// @param name The name of the protocol being integrated to
    function addIntegration(address contractAddress, string memory name) external onlyRole(MANAGER_ROLE) {
        IIntegrationMap(moduleMap.getModuleAddress(Modules.IntegrationMap)).addIntegration(contractAddress, name);

        emit IntegrationAdded(contractAddress, name);
    }

    /// @param tokenAddress The address of the ERC20 token contract
    /// @param acceptingDeposits Whether token deposits are enabled
    /// @param acceptingWithdrawals Whether token withdrawals are enabled
    /// @param biosRewardWeight Token weight for BIOS rewards
    /// @param reserveRatioNumerator Number that gets divided by reserve ratio denominator to get reserve ratio
    function addToken(
        address tokenAddress,
        bool acceptingDeposits,
        bool acceptingWithdrawals,
        bool acceptingLping,
        bool acceptingBridging,
        uint256 biosRewardWeight,
        uint256 reserveRatioNumerator,
        uint256 targetLiquidityRatioNumerator,
        uint256 transferFeeKValueNumerator,
        uint256 transferFeePlatformRatioNumerator
    ) external onlyRole(MANAGER_ROLE) {
        IIntegrationMap(moduleMap.getModuleAddress(Modules.IntegrationMap)).addToken(
            tokenAddress,
            acceptingDeposits,
            acceptingWithdrawals,
            acceptingLping,
            acceptingBridging,
            biosRewardWeight,
            reserveRatioNumerator,
            targetLiquidityRatioNumerator,
            transferFeeKValueNumerator,
            transferFeePlatformRatioNumerator
        );

        if (
            IERC20MetadataUpgradeable(tokenAddress).allowance(
                moduleMap.getModuleAddress(Modules.Kernel),
                moduleMap.getModuleAddress(Modules.YieldManager)
            ) == 0
        ) {
            IERC20MetadataUpgradeable(tokenAddress).safeApprove(
                moduleMap.getModuleAddress(Modules.YieldManager),
                type(uint256).max
            );
        }

        if (
            IERC20MetadataUpgradeable(tokenAddress).allowance(
                moduleMap.getModuleAddress(Modules.Kernel),
                moduleMap.getModuleAddress(Modules.UserPositions)
            ) == 0
        ) {
            IERC20MetadataUpgradeable(tokenAddress).safeApprove(
                moduleMap.getModuleAddress(Modules.UserPositions),
                type(uint256).max
            );
        }

        if (
            IERC20MetadataUpgradeable(tokenAddress).allowance(
                moduleMap.getModuleAddress(Modules.Kernel),
                moduleMap.getModuleAddress(Modules.SwapManager)
            ) == 0
        ) {
            IERC20MetadataUpgradeable(tokenAddress).safeApprove(
                moduleMap.getModuleAddress(Modules.SwapManager),
                type(uint256).max
            );
        }

        emit TokenAdded(
            tokenAddress,
            acceptingDeposits,
            acceptingWithdrawals,
            acceptingLping,
            acceptingBridging,
            biosRewardWeight,
            reserveRatioNumerator,
            targetLiquidityRatioNumerator,
            transferFeeKValueNumerator,
            transferFeePlatformRatioNumerator
        );
    }

    /// @param biosBuyBackEthWeight The relative weight of ETH to send to BIOS buy back
    /// @param treasuryEthWeight The relative weight of ETH to send to the treasury
    /// @param protocolFeeEthWeight The relative weight of ETH to send to protocol fee accrual
    /// @param rewardsEthWeight The relative weight of ETH to send to user rewards
    function updateEthDistributionWeights(
        uint32 biosBuyBackEthWeight,
        uint32 treasuryEthWeight,
        uint32 protocolFeeEthWeight,
        uint32 rewardsEthWeight
    ) external onlyRole(MANAGER_ROLE) {
        IYieldManager(moduleMap.getModuleAddress(Modules.YieldManager)).updateEthDistributionWeights(
            biosBuyBackEthWeight,
            treasuryEthWeight,
            protocolFeeEthWeight,
            rewardsEthWeight
        );

        emit EthDistributionWeightsUpdated(
            biosBuyBackEthWeight,
            treasuryEthWeight,
            protocolFeeEthWeight,
            rewardsEthWeight
        );
    }

    /// @notice Gives the UserPositions contract approval to transfer BIOS from Kernel
    function tokenApprovals() external onlyRole(MANAGER_ROLE) {
        IIntegrationMap integrationMap = IIntegrationMap(moduleMap.getModuleAddress(Modules.IntegrationMap));
        IERC20MetadataUpgradeable bios = IERC20MetadataUpgradeable(integrationMap.getBiosTokenAddress());
        IERC20MetadataUpgradeable weth = IERC20MetadataUpgradeable(integrationMap.getWethTokenAddress());

        if (bios.allowance(address(this), moduleMap.getModuleAddress(Modules.BiosRewards)) == 0) {
            bios.safeApprove(moduleMap.getModuleAddress(Modules.BiosRewards), type(uint256).max);
        }
        if (bios.allowance(address(this), moduleMap.getModuleAddress(Modules.YieldManager)) == 0) {
            bios.safeApprove(moduleMap.getModuleAddress(Modules.YieldManager), type(uint256).max);
        }

        if (weth.allowance(address(this), moduleMap.getModuleAddress(Modules.UserPositions)) == 0) {
            weth.safeApprove(moduleMap.getModuleAddress(Modules.UserPositions), type(uint256).max);
        }

        if (weth.allowance(address(this), moduleMap.getModuleAddress(Modules.YieldManager)) == 0) {
            weth.safeApprove(moduleMap.getModuleAddress(Modules.YieldManager), type(uint256).max);
        }
    }

    function enableLpWhitelist() external onlyRole(MANAGER_ROLE) {
        lpWhitelistEnabled = true;
    }

    function disableLpWhitelist() external onlyRole(MANAGER_ROLE) {
        lpWhitelistEnabled = false;
    }

    /// @param gasAccount The address of the account to send ETH to gas for executing bulk system functions
    function updateGasAccount(address payable gasAccount) external onlyRole(MANAGER_ROLE) {
        IYieldManager(moduleMap.getModuleAddress(Modules.YieldManager)).updateGasAccount(gasAccount);

        emit GasAccountUpdated(gasAccount);
    }

    /// @param treasuryAccount The address of the system treasury account
    function updateTreasuryAccount(address payable treasuryAccount) external onlyRole(MANAGER_ROLE) {
        IYieldManager(moduleMap.getModuleAddress(Modules.YieldManager)).updateTreasuryAccount(treasuryAccount);

        emit TreasuryAccountUpdated(treasuryAccount);
    }

    /// @param gasAccountTargetEthBalance The target ETH balance of the gas account
    function updateGasAccountTargetEthBalance(uint256 gasAccountTargetEthBalance) external onlyRole(MANAGER_ROLE) {
        IYieldManager(moduleMap.getModuleAddress(Modules.YieldManager)).updateGasAccountTargetEthBalance(
            gasAccountTargetEthBalance
        );

        emit GasAccountTargetEthBalanceUpdated(gasAccountTargetEthBalance);
    }

    /// @notice User is allowed to deposit whitelisted tokens
    /// @param tokens Array of token the token addresses
    /// @param amounts Array of token amounts
    function deposit(address[] memory tokens, uint256[] memory amounts) external payable nonReentrant {
        if (msg.value > 0) {
            // Convert ETH to WETH
            address wethAddress = IIntegrationMap(moduleMap.getModuleAddress(Modules.IntegrationMap))
                .getWethTokenAddress();
            IWeth9(wethAddress).deposit{value: msg.value}();
        }

        IUserPositions(moduleMap.getModuleAddress(Modules.UserPositions)).deposit(
            msg.sender,
            tokens,
            amounts,
            msg.value,
            false
        );
    }

    /// @notice User is allowed to withdraw tokens
    /// @param tokens Array of token the token addresses
    /// @param amounts Array of token amounts
    /// @param withdrawWethAsEth Boolean indicating whether should receive WETH balance as ETH
    function withdraw(
        address[] memory tokens,
        uint256[] memory amounts,
        bool withdrawWethAsEth
    ) external nonReentrant {
        uint256 ethWithdrawn = IUserPositions(moduleMap.getModuleAddress(Modules.UserPositions)).withdraw(
            msg.sender,
            tokens,
            amounts,
            withdrawWethAsEth
        );

        if (ethWithdrawn > 0) {
            // unwrap the wnative
            _unwrapWnative(
                ethWithdrawn,
                IIntegrationMap(moduleMap.getModuleAddress(Modules.IntegrationMap)).getWethTokenAddress()
            );

            // send to user
            _transferAmount(ethWithdrawn, msg.sender);
        }

        emit Withdraw(msg.sender, tokens, amounts, ethWithdrawn);
    }

    /// @notice Allows a user to withdraw entire undeployed balances of the specified tokens and claim rewards
    /// @param tokens Array of token address that user is exiting positions from
    /// @param strategies Array of strategyIDs that user is claiming rewards from
    /// @param withdrawWethAsEth Boolean indicating whether should receive WETH balance as ETH
    /// @return tokenAmounts The amounts of each token being withdrawn
    /// @return ethWithdrawn The amount of WETH balance being withdrawn as ETH
    /// @return ethClaimed The amount of ETH being claimed from rewards
    /// @return biosClaimed The amount of BIOS being claimed from rewards
    function withdrawAllAndClaim(
        address[] calldata tokens,
        uint256[] calldata strategies,
        bool withdrawWethAsEth
    )
        external
        returns (
            uint256[] memory tokenAmounts,
            uint256 ethWithdrawn,
            uint256 ethClaimed,
            uint256 biosClaimed
        )
    {
        IUserPositions.WithdrawAllAndClaimResponse memory _withdrawAllAndClaimResponse = IUserPositions(
            moduleMap.getModuleAddress(Modules.UserPositions)
        ).withdrawAllAndClaim(msg.sender, tokens, strategies, withdrawWethAsEth);

        tokenAmounts = _withdrawAllAndClaimResponse.tokenAmounts;
        ethWithdrawn = _withdrawAllAndClaimResponse.ethWithdrawn;
        ethClaimed = _withdrawAllAndClaimResponse.ethClaimed;
        biosClaimed = _withdrawAllAndClaimResponse.biosClaimed;

        if (ethWithdrawn > 0) {
            _unwrapWnative(
                ethWithdrawn,
                IIntegrationMap(moduleMap.getModuleAddress(Modules.IntegrationMap)).getWethTokenAddress()
            );
        }

        if (ethWithdrawn + ethClaimed > 0) {
            _transferAmount(ethWithdrawn + ethClaimed, msg.sender);
        }

        emit WithdrawAllAndClaim(
            msg.sender,
            tokens,
            strategies,
            withdrawWethAsEth,
            tokenAmounts,
            ethWithdrawn,
            ethClaimed,
            biosClaimed
        );
    }

    /// @notice User is allowed to LP whitelisted tokens
    /// @param tokens Array of token the token addresses
    /// @param amounts Array of token amounts
    function provideLiquidity(address[] memory tokens, uint256[] memory amounts) external onlyLpWhitelist nonReentrant {
        IInterconnects(moduleMap.getModuleAddress(Modules.Interconnects)).provideLiquidity(msg.sender, tokens, amounts);
    }

    /// @param tokens Array of token the token addresses
    /// @param amounts Array of token amounts
    function takeLiquidity(address[] memory tokens, uint256[] memory amounts) external onlyLpWhitelist nonReentrant {
        IInterconnects(moduleMap.getModuleAddress(Modules.Interconnects)).takeLiquidity(msg.sender, tokens, amounts);
    }

    /// @param tokens Array of token the token addresses
    function claimLpFees(address[] memory tokens) external onlyLpWhitelist nonReentrant {
        IInterconnects(moduleMap.getModuleAddress(Modules.Interconnects)).claimLpFeeRewards(msg.sender, tokens);
    }

    /// @notice Allows user to claim their ETH rewards
    /// @param strategies Array of strategy IDs to claim rewards from. 0 for BIOS PFA!
    /// @return ethClaimed The amount of ETH claimed by the user
    function claimEthRewards(uint256[] calldata strategies) public nonReentrant returns (uint256 ethClaimed) {
        return _claimEthRewards(strategies);
    }

    function _claimEthRewards(uint256[] calldata strategies) private returns (uint256 ethClaimed) {
        ethClaimed = IUserPositions(moduleMap.getModuleAddress(Modules.UserPositions)).claimEthRewards(
            msg.sender,
            strategies
        );

        _transferAmount(ethClaimed, msg.sender);

        emit ClaimEthRewards(msg.sender, strategies, ethClaimed);
    }

    /// @notice Allows user to claim their BIOS rewards
    /// @return biosClaimed The amount of BIOS claimed by the user
    function claimBiosRewards() external nonReentrant returns (uint256 biosClaimed) {
        return _claimBiosRewards(msg.sender);
    }

    function _claimBiosRewards(address user) private returns (uint256 biosClaimed) {
        biosClaimed = IBiosEmitter(moduleMap.getModuleAddress(Modules.BiosEmitter)).harvestAll(user);
        emit ClaimBiosRewards(user, biosClaimed);
    }

    /// @notice Allows user to claim their ETH and BIOS rewards
    /// @param strategies Array of strategy IDs to claim eth rewards from
    /// @return ethClaimed The amount of ETH claimed by the user
    /// @return biosClaimed The amount of BIOS claimed by the user
    function claimAllRewards(uint256[] calldata strategies)
        external
        nonReentrant
        returns (uint256 ethClaimed, uint256 biosClaimed)
    {
        ethClaimed = _claimEthRewards(strategies);
        biosClaimed = _claimBiosRewards(msg.sender);
    }

    /// @notice Deploys all tokens to all integrations according to configured weights
    function deploy(IYieldManager.DeployRequest[] calldata deployments) external onlyGasAccount {
        IYieldManager(moduleMap.getModuleAddress(Modules.YieldManager)).deploy(deployments);
        lastDeployTimestamp = block.timestamp;
        emit Deploy();
    }

    /// @notice Distributes WETH to the gas account, BIOS buy back, treasury, protocol fee accrual, and user rewards
    function distributeEth(
        uint256[] calldata strategies,
        uint256[] calldata positions,
        uint256 biosAmount
    ) external onlyGasAccount {
        IYieldManager(moduleMap.getModuleAddress(Modules.YieldManager)).distributeEth(
            strategies,
            positions,
            biosAmount
        );
        lastLastDistributeEthTimestamp = lastDistributeEthTimestamp;
        lastDistributeEthTimestamp = block.timestamp;
        emit DistributeEth();
    }

    /// @notice Uses any WETH held in the SushiSwap integration to buy back BIOS which is sent to the Kernel
    /// @param ratioX1000 BIOS/WETH ratio for front runner protection
    function biosBuyBack(uint256 ratioX1000) external onlyGasAccount {
        IYieldManager(moduleMap.getModuleAddress(Modules.YieldManager)).biosBuyBack(ratioX1000);
        lastBiosBuyBackTimestamp = block.timestamp;
        emit BiosBuyBack();
    }

    /// @param account The address of the account to check if they are a manager
    /// @return Bool indicating whether the account is a manger
    function isManager(address account) public view override returns (bool) {
        return hasRole(MANAGER_ROLE, account);
    }

    /// @param account The address of the account to check if they are an owner
    /// @return Bool indicating whether the account is an owner
    function isOwner(address account) public view override returns (bool) {
        return hasRole(OWNER_ROLE, account);
    }

    /// @param account The address of the account to check if they are a liquidity provider
    /// @return Bool indicating whether the account is a liquidity provider
    function isLiquidityProvider(address account) public view override returns (bool) {
        return hasRole(LIQUIDITY_PROVIDER_ROLE, account);
    }

    /// @return The timestamp the deploy function was last called
    function getLastDeployTimestamp() external view returns (uint256) {
        return lastDeployTimestamp;
    }

    /// @return The timestamp the distributeEth function was last called
    function getLastDistributeEthTimestamp() external view returns (uint256) {
        return lastDistributeEthTimestamp;
    }

    /// @return The timestamp the biosBuyBack function was last called
    function getLastBiosBuyBackTimestamp() external view returns (uint256) {
        return lastBiosBuyBackTimestamp;
    }

    /// @return ethRewardsTimePeriod The number of seconds between the last two ETH payouts
    function getEthRewardsTimePeriod() external view returns (uint256 ethRewardsTimePeriod) {
        if (lastDistributeEthTimestamp > 0) {
            if (lastLastDistributeEthTimestamp > 0) {
                ethRewardsTimePeriod = lastDistributeEthTimestamp - lastLastDistributeEthTimestamp;
            } else {
                ethRewardsTimePeriod = lastDistributeEthTimestamp - initializationTimestamp;
            }
        } else {
            ethRewardsTimePeriod = 0;
        }
    }

    function getLpWhitelistEnabled() external view returns (bool) {
        return lpWhitelistEnabled;
    }

    function _transferAmount(uint256 amount, address to) internal {
        (bool sent, ) = payable(to).call{value: amount}("");
        require(sent, "Failed to transfer value");
    }

    function _unwrapWnative(uint256 amount, address wnativeAddress) internal {
        // just add some ORs on here to check for more chains...
        if (block.chainid == FTM_CHAIN_ID || block.chainid == BSC_CHAIN_ID) {
            // we are on a chain with wnative unwrapping issues

            // get unwrapper address
            address unwrapper = moduleMap.getModuleAddress(Modules.Unwrapper);

            // send wnative to unwrapper and unwrap
            IERC20MetadataUpgradeable(wnativeAddress).safeTransfer(unwrapper, amount);
            IUnwrapper(unwrapper).unwrap(amount);
        } else {
            // we are on a chain with working wnative unwrapping, so just do it
            IWeth9(wnativeAddress).withdraw(amount);
        }
    }
}

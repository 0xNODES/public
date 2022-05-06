// SPDX-License-Identifier: GPL-2.0
pragma solidity 0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../interfaces/IModuleMap.sol";

contract ModuleMap is IModuleMap, Initializable, OwnableUpgradeable {
    mapping(Modules => address) private _moduleMap;

    function initialize() external initializer {
        __Ownable_init_unchained();
    }

    function getModuleAddress(Modules key) public view override returns (address) {
        return _moduleMap[key];
    }

    function setModuleAddress(Modules key, address value) external onlyOwner {
        _moduleMap[key] = value;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "forge-std/Script.sol";
import "../src/CrowdFunding.sol";

contract DeployCrowdFunding is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        new CrowdFunding();
        vm.stopBroadcast();
    }
} 
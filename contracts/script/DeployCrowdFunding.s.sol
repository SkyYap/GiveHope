// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "forge-std/Script.sol";
import "../src/CrowdFunding.sol";

contract DeployCrowdFunding is Script {
    function run() public returns (CrowdFunding) {
        vm.startBroadcast();

        CrowdFunding crowdfunding = new CrowdFunding();

        vm.stopBroadcast();

        return crowdfunding;
    }
} 
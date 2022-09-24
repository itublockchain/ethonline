// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {LibRLP} from "./libraries/LibRLP.sol";
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import "../src/AtomXSource.sol";

contract DeploySource is Script {
    //optimism goerli = 1735356532  
    address constant deployer = 0x11dc744F9b69b87a1eb19C3900e0fF85B6853990;
    address targetAddress = LibRLP.computeAddress(deployer, 82);
    IConnextHandler connext = IConnextHandler(0xB4C1340434920d70aD774309C75f9a4B679d801e);

    function run() public {
        vm.broadcast();
        new AtomXSource(connext, targetAddress, 1735356532, 1735353714);
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {LibRLP} from "./libraries/LibRLP.sol";
import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import "../src/AtomXTarget.sol";

contract DeployTarget is Script {
    //goerli = 1735353714
    address constant deployer = 0x11dc744F9b69b87a1eb19C3900e0fF85B6853990;
    address originAddress = LibRLP.computeAddress(deployer, 3);
    IConnextHandler connext = IConnextHandler(0xB4C1340434920d70aD774309C75f9a4B679d801e);

    function run() public {
        vm.broadcast();
        new AtomXTarget(originAddress, connext, 1735356532);
    }

    function listNFT() public {
        AtomXTarget marketplace = AtomXTarget(0xb930B84bc86A2F8e522df848423995e92259AeD2);

    }
}

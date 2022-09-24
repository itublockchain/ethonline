// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {CallParams, XCallArgs} from "nxtp/core/connext/libraries/LibConnextStorage.sol";


contract AtomXSource {
    address immutable marketplaceAddress;
    uint256 immutable targetDomain;

    constructor(address _marketplaceAddress, uint256 _targetDomain) {
        marketplaceAddress = _marketplaceAddress;
        targetDomain = _targetDomain;
    }
}
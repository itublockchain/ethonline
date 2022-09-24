// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import {IConnextHandler} from "nxtp/core/connext/interfaces/IConnextHandler.sol";
import {CallParams, XCallArgs} from "nxtp/core/connext/libraries/LibConnextStorage.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract AtomXSource {
    IERC20 constant public paymentToken = IERC20(0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1); //DAI
    IConnextHandler immutable connext;
    address immutable marketplaceAddress;
    uint32 immutable sourceDomain;
    uint32 immutable targetDomain;

    constructor(
        IConnextHandler _connext,
        address _marketplaceAddress,
        uint32 _sourceDomain,
        uint32 _targetDomain
    ) {
        connext = _connext;
        marketplaceAddress = _marketplaceAddress;
        sourceDomain = _sourceDomain;
        targetDomain = _targetDomain;
    }

    function xChainUpdate(
        address seller,
        uint256 price, 
        address nftAddress,
        uint256 tokenId
    ) external payable {
        bool success = paymentToken.transferFrom(msg.sender, seller, price);
        require(success);

        bytes4 selector = bytes4(keccak256("buyItemXChain(address,address,uint256,address,uint256)"));
        bytes memory callData = abi.encodeWithSelector(selector, msg.sender, seller, price, nftAddress, tokenId);

        CallParams memory callParams = CallParams({
            to: marketplaceAddress,
            callData: callData,
            originDomain: sourceDomain,
            destinationDomain: targetDomain,
            agent: msg.sender, // address allowed to execute transaction on destination side in addition to relayers
            recovery: msg.sender, // fallback address to send funds to if execution fails on destination side
            forceSlow: true, // this must be true for authenticated calls
            receiveLocal: false, // option to receive the local bridge-flavored asset instead of the adopted asset
            callback: address(0), // zero address because we don't expect a callback
            callbackFee: 0, // fee paid to relayers for the callback; no fees on testnet
            relayerFee: 0, // fee paid to relayers for the forward call; no fees on testnet
            destinationMinOut: 0 // not sending funds so minimum can be 0
        });

        XCallArgs memory xcallArgs = XCallArgs({
            params: callParams,
            transactingAsset: address(0), // 0 address is the native gas token
            transactingAmount: 0, // not sending funds with this calldata-only xcall
            originMinOut: 0 // not sending funds so minimum can be 0
        });

        connext.xcall(xcallArgs);
    }
}

import { ADDRESSES } from "constants/Address";
import { useAccount } from "hooks/useAccount";
import { MaxUint256 } from "@ethersproject/constants";
import { useMarketplaceContract } from "hooks/useMarketplaceContract";

export const useMarketplaceFunctions = () => {
  const MARKETPLACE = useMarketplaceContract();
  const { auth, address } = useAccount();

  const listItem = async (
    _NFTAddress: string,
    _tokenId: string,
    _price: string
  ) => {
    if (!auth) {
      return;
    }
    console.log(auth);
    await MARKETPLACE?.listItem(_NFTAddress, _tokenId, _price, {
      gasLimit: 500000,
    });
  };

  const cancelListing = async (_NFTAddress: string, _tokenId: number) => {
    if (!auth) {
      return;
    }
    await MARKETPLACE?.cancelListing(_NFTAddress, _tokenId);
  };

  const buyItem = async (_NFTAddress: string, _tokenId: number) => {
    if (!auth) {
      return;
    }
    await MARKETPLACE?.buyItem(_NFTAddress, _tokenId);
  };

  const buyItemXChain = async (
    _seller: string,
    _price: number,
    _NFTAddress: string,
    _tokenId: number
  ) => {
    if (!auth) {
      return;
    }
    await MARKETPLACE?.buyItemXChain(
      address,
      _seller,
      _price,
      _NFTAddress,
      _tokenId
    );
  };
  const updateListing = async (
    _NFTAddress: string,
    _tokenId: number,
    _price: number
  ) => {
    if (!auth) {
      return;
    }

    await MARKETPLACE?.updateListing(_NFTAddress, _tokenId, _price);
  };

  return {
    listItem,
    cancelListing,
    buyItem,
    buyItemXChain,
    updateListing,
  };
};
// const xd = ()=>{
//   return<></>
// }

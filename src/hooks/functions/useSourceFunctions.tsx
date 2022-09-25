import { useAccount } from "hooks/useAccount";
import { useSourceContract } from "hooks/useSourceContract";

export const useSourceFunctions = () => {
  const SOURCE = useSourceContract();
  const { auth } = useAccount();

  const xChainUpdate = async (
    _seller: string,
    _price: number,
    _NFTAddress: string,
    _tokenId: number
  ) => {
    if (!auth) {
      return;
    }
    await SOURCE?.xChainUpdate(_seller, _price, _NFTAddress, _tokenId);
  };
  return {
    xChainUpdate,
  };
};

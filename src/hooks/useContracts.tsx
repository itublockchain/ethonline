import { ADDRESSES } from "constants/Address";
import { ABIS } from "constants/ABI";
import { ethers } from "ethers";
import { batch, useDispatch } from "react-redux";
import {
  setMarketPlaceContract,
  setSourceContract,
} from "store/slicers/contracts";

export const useContracts = () => {
  const dispatch = useDispatch();

  const setContracts = async (provider: any) => {
    const MARKETPLACE_CONTRACT = new ethers.Contract(
      ADDRESSES.MARKETPLACE,
      ABIS.MARKETPLACE,
      provider
    );
    const SOURCE_CONTRACT = new ethers.Contract(
      ADDRESSES.SOURCE,
      ABIS.SOURCE,
      provider
    );

    //REGISTER CONTRACTS
    batch(() => {
      dispatch(setMarketPlaceContract(MARKETPLACE_CONTRACT));
      dispatch(setSourceContract(SOURCE_CONTRACT));
    });
  };

  return { setContracts };
};

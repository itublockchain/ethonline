import { useTypedSelector } from "store";

export const useMarketplaceContract = () => {
  const contract = useTypedSelector((state) => state.contracts.MARKETPLACE);
  return contract;
};

import { useTypedSelector } from "store";

export const useSourceContract = () => {
  const contract = useTypedSelector((state) => state.contracts.SOURCE);
  return contract;
};

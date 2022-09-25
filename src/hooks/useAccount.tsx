import { useTypedSelector } from "store";

export const useAccount = () => {
  const { auth, web3 } = useTypedSelector((state) => state.account);

  return {
    auth,
    address: web3?.address,
    provider: web3?.provider,
    signer: web3?.signer,
    chain: web3?.chain,
  };
};

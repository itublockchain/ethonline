import { ethers } from "ethers";
import { useContracts } from "hooks/useContracts";
import { batch, useDispatch } from "react-redux";
import { setAuth, setWeb3 } from "store/slicers/account";

declare let window: any & Window;

export default function useSetAccount() {
  const dispatch = useDispatch();
  const { setContracts } = useContracts();

  const requestAccountsFunction = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const _chain = await window.ethereum.request({ method: "eth_chainId" });

    try {
      await provider.send("eth_requestAccounts", []);

      let signer = await provider.getSigner();
      const address = await signer.getAddress();

      provider.on("network", (_newNetwork, oldNetwork) => {
        if (oldNetwork) window.location.reload();
      });

      setInterval(() => {
        const fetch = async () => {
          await provider.send("eth_requestAccounts", []);
          let signer = await provider.getSigner();
          const newAddress = await signer.getAddress();
          if (newAddress !== address) {
            window.location.reload();
          }
        };
        fetch();
      }, 1000);

      setContracts(provider);

      batch(() => {
        //SET STATE
        dispatch(
          setWeb3({
            signer: signer,
            address: address,
            provider: provider,
            chain: _chain,
          })
        );
        dispatch(setAuth(true));
      });

      return signer;
    } catch {
      return false;
    }
  };

  const requestAccounts = async () => {
    await requestAccountsFunction();
  };

  return { requestAccounts };
}

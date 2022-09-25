import { useState } from "react";
import styles from "./ListItem.module.scss";
import { useMarketplaceFunctions } from "hooks/functions/useMarketplaceFunctions";
import { useTypedSelector } from "store";
import { useAccount } from "hooks/useAccount";
import { ethers } from "ethers";
import { ADDRESSES } from "constants/Address";
import { ABIS } from "constants/ABI";
const ListItem = () => {
  const contract = useTypedSelector((state) => state.contracts.MARKETPLACE);
  const [NFTAddress, setNFTAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const { listItem } = useMarketplaceFunctions();
  const { signer } = useAccount();
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>ListItem</div>
      <div className={styles.inputs}>
        <div>
          <span>NFT Address:</span>
          <input
            onChange={(value) => {
              setNFTAddress(value.target.value);
            }}
          ></input>
        </div>
        <div>
          <span>Token Id:</span>
          <input
            onChange={(value) => {
              setTokenId(value.target.value);
            }}
          ></input>
        </div>
        <div>
          <span>Price:</span>
          <input
            onChange={(value) => {
              setPrice(value.target.value);
            }}
          ></input>
        </div>
      </div>
      <button
        onClick={() => {
          // listItem(NFTAddress, tokenId, price);
          const sd = async () => {
            const xd = new ethers.Contract(
              ADDRESSES.MARKETPLACE,
              ABIS.MARKETPLACE,
              signer
            );
            const x = xd.connect(signer);
            await xd.listItem(NFTAddress, tokenId, price, { gasLimit: 500000 });
          };
          sd();
        }}
      >
        List Item
      </button>
    </div>
  );
};
export { ListItem };

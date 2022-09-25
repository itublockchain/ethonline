import styles from "./NFT.module.scss";
import { ethers } from "ethers";
import { useAccount } from "hooks/useAccount";
import { ADDRESSES } from "constants/Address";
import { ABIS } from "constants/ABI";
interface NFT {
  seller: string;
  NFTAddress: string;
  tokenId: string;
  price: string;
}
const NFT = ({ seller, NFTAddress, tokenId, price }: NFT) => {
  const hexToDecimal = (hex: any) => parseInt(hex, 16);
  const deleteZeros = (data: string) => {
    let addr = data.slice(26);
    return "0x" + addr;
  };

  const { provider, signer, chain } = useAccount();
  const buyItem = async () => {
    const contract = new ethers.Contract(
      ADDRESSES.MARKETPLACE,
      ABIS.MARKETPLACE,
      provider
    );

    await contract
      .connect(signer)
      .buyItem(NFTAddress, tokenId, { value: price });
  };

  const buyItemXChain = async () => {
    const contract = new ethers.Contract(
      "0xAF4dC4a50B141b8e39334101C726D40BDCf76834",
      ABIS.SOURCE,
      provider
    );

    // console.log(NFTAddress)

    const tx = await contract
      .connect(signer)
      .xChainUpdate(
        deleteZeros(seller),
        price,
        deleteZeros(NFTAddress),
        tokenId,
        { gasLimit: 999999 }
      );
    console.log(tx.wait());
  };

  const approveDAI = async () => {
    const contract = new ethers.Contract(ADDRESSES.DAI, ABIS.DAI, provider);

    await contract
      .connect(signer)
      .approve(ADDRESSES.SOURCE, "99999999999999999999999999999999");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.infos}>
        <div>Seller Address: {deleteZeros(seller)}</div>
        <div>NFT Address: {deleteZeros(NFTAddress)}</div>
        <div>Token Id: {hexToDecimal(tokenId)}</div>
        <div>NFT Price: {hexToDecimal(price)} Wei</div>
      </div>
      <div className={styles.buttons}>
        {chain === "0x5" && <button>XChainUpdate</button>}
        {chain === "0x1a4" && (
          <>
            <button onClick={approveDAI}>DAI Approve</button>
            {/* <button onClick={buyItem}>Buy Item</button> */}
            <button onClick={buyItemXChain}>Buy Item X Chain</button>
          </>
        )}
      </div>
    </div>
  );
};

export { NFT };

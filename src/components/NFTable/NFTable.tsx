import styles from "./NFTable.module.scss";
import { ethers } from "ethers";
import { useAccount } from "hooks/useAccount";
import { ADDRESSES } from "constants/Address";
import { useMarketplaceContract } from "hooks/useMarketplaceContract";
import axios from "axios";
import { NFT } from "components/NFTable/NFT/NFT";
import { useEffect, useState } from "react";

const NFTable = () => {
  const { provider } = useAccount();
  const MARKETPLACE = useMarketplaceContract();
  const [NFTInfos, setNFTInfos] = useState([]);
  const getEvents = async () => {
    // const events = await MARKETPLACE?.filters.listItem(null, null, null);
    // console.log(events);
    await axios
      .get<any>(
        `https://api-goerli.etherscan.io/api?module=logs&action=getLogs&address=${ADDRESSES.MARKETPLACE}&fromBlock=7651692&apikey=7SCE2M6REH3GT4U6HZ3QH6DQRMIPWXSJD5`
      )
      .then((res: any) => {
        setNFTInfos(res.data.result);
      });
  };
  useEffect(() => {
    const getEvents = async () => {
      // const events = await MARKETPLACE?.filters.listItem(null, null, null);
      // console.log(events);
      await axios
        .get<any>(
          `https://api-goerli.etherscan.io/api?module=logs&action=getLogs&address=${ADDRESSES.MARKETPLACE}&fromBlock=7651692&apikey=7SCE2M6REH3GT4U6HZ3QH6DQRMIPWXSJD5`
        )
        .then((res: any) => {
          setNFTInfos(res.data.result);
        });
    };
    getEvents();
  }, []);
  const hexToDecimal = (hex: any) => parseInt(hex, 16);
  const deleteZeros = (data: string) => {
    let addr = data.slice(26);
    return "0x" + addr;
  };
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.header}
        onClick={() => {
          getEvents();
        }}
      >
        Hey
      </div>
      <div>
        {NFTInfos.map((data: any, i: number) => {
          return (
            // <div>
            //   <div>{deleteZeros(data.topics[1])}</div>
            //   <div>{deleteZeros(data.topics[2])}</div>
            //   <div>{hexToDecimal(data.topics[3])}</div>
            //   <div>{hexToDecimal(data.data)}</div>
            // </div>
            <NFT key={i}
              seller={data.topics[1]}
              NFTAddress={data.topics[2]}
              tokenId={data.topics[3]}
              price={data.data}
            />
          );
        })}
      </div>
    </div>
  );
};

export { NFTable };

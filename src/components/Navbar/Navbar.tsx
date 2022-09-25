import styles from "./Navbar.module.scss";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { useTheme } from "hooks/useTheme";
import LOGO from "assets/logo.png";
import useSetAccount from "hooks/useSetAccount";
import { useAccount } from "hooks/useAccount";
import { parseAddress } from "utils/parseAddress";
const Navbar = () => {
  const { requestAccounts } = useSetAccount();

  const { auth, address, chain } = useAccount();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={LOGO}></img>
        <div>Atomic NFT Marketplace</div>
      </div>

      <div className={styles.buttons}>
        <div
          className={styles.themeChanger}
          onClick={toggleTheme}
          style={theme === "light" ? { color: "white" } : { color: "black" }}
        >
          {theme === "dark" ? <IoMdMoon size={22} /> : <IoMdSunny size={22} />}
        </div>
        {auth && (
          <div
            className={styles.connect}
          >
          {chain === "0x5" ? "Goerli" : chain === "0x1a4" ? "Optimism Goerli" : "Unknown Network"}
          </div>
        )}
        <div
          className={styles.connect}
          onClick={() => {
            requestAccounts();
          }}
        >
          {auth ? parseAddress(address) : "Connect Wallet"}
        </div>
      </div>
    </div>
  );
};
export { Navbar };

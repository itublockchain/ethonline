import styles from "./Main.module.scss";
import { Navbar, Listing, NFTable } from "components";

const Main = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Listing />
      <NFTable />
    </div>
  );
};
export { Main };

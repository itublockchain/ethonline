import styles from "./Listing.module.scss";
import { useState } from "react";
import { ListItem, UpdateListing, CancelListing } from "components";
enum LISTING {
  "LISTITEM",
  "CANCELLISTING",
  "UPDATELISTING",
}
const Listing = () => {
  const [modal, setModal] = useState<LISTING>(LISTING.LISTITEM);
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <div className={styles.button} onClick={() => setModal(LISTING.LISTITEM)}>List Item</div>
        <div className={styles.button}  onClick={() => setModal(LISTING.UPDATELISTING)}>Update Item</div>
        <div className={styles.button}  onClick={() => setModal(LISTING.CANCELLISTING)}>Cancel Item</div>
      </div>
      <div className={styles.modal}>
        {modal === LISTING.LISTITEM ? (
          <ListItem />
        ) : modal === LISTING.CANCELLISTING ? (
          <CancelListing />
        ) : (
          <UpdateListing />
        )}
      </div>
    </div>
  );
};
export { Listing };

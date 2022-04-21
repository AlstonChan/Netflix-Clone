import styles from "../../styles/yourAccount.module.css";
import stylesProfile from "../../styles/browse/secondaryHeader.module.css";
import navArrow from "../../public/images/icons/misc/nav_arrow black.svg";

import Image from "next/image";

import ImageRender from "../ImageRender";
import { useState } from "react";

export default function UserBar({ userData }) {
  const [open, setOpen] = useState(false);

  const openList = () => {
    if (open) {
      setOpen(false);
    } else setOpen(true);
  };

  return (
    <div className={styles.userBoxContainer}>
      <div className={styles.userBox} onClick={openList}>
        <div className={styles.imgContainer}>
          <ImageRender
            src={userData.pic}
            width="160"
            height="160"
            objectFit="cover"
            className={stylesProfile.profilePic}
          />
        </div>
        <h4 className={styles.userName}>{userData.name}</h4>
        <div
          className={open ? styles.arrowContainerOpen : styles.arrowContainer}
        >
          <Image src={navArrow} />
        </div>
      </div>
      {open ? (
        <>
          <hr className={styles.divider} />
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <h4 className={styles.infoHeaderTxt}>Language</h4>
                <p className={styles.infoHeaderPara}>English</p>
              </div>
              <div className={styles.infoLinksDisabled}>
                <a>Change</a>
              </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <h4 className={styles.infoHeaderTxt}>Ratings</h4>
              </div>
              <div className={styles.infoLinks}>
                <a>View</a>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

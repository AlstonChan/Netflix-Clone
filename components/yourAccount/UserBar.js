import styles from "../../styles/yourAccount/yourAccount.module.css";
import stylesProfile from "../../styles/browse/secondaryHeader.module.css";
import navArrow from "../../public/images/icons/arrow/nav_arrow black.svg";

import Image from "next/image";
import Link from "next/link";

import aes from "crypto-js/aes";
import ImageRender from "../ImageRender";
import { useEffect, useState } from "react";

export default function UserBar({ userData, currentUser }) {
  const [open, setOpen] = useState(false);
  const [routeId, setRouteId] = useState(null);

  const openList = () => {
    if (open) {
      setOpen(false);
    } else setOpen(true);
  };

  useEffect(() => {
    const encrypted = aes
      .encrypt(currentUser, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
      .toString();
    setRouteId(encrypted.replace(/\//g, "$"));
  }, [userData]);

  return (
    <div className={styles.userBoxContainer}>
      <div className={styles.userBox} onClick={openList}>
        <div className={styles.imgContainer}>
          <ImageRender
            src={
              userData.pic.length > 3
                ? userData.pic
                : `/images/profile pic/${userData.pic}.png`
            }
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
                <Link href={routeId ? `/yourAccount/ratings/${routeId}` : ""}>
                  <a>View</a>
                </Link>
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

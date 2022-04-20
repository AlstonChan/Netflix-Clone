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
      <div className={open ? styles.arrowContainerOpen : styles.arrowContainer}>
        <Image src={navArrow} />
      </div>
    </div>
  );
}

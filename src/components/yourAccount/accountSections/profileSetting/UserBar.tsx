// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./profileSetting.module.scss";
import navArrow from "@/public/images/icons/arrow/nav_arrow black.svg";

import Image from "next/image";
import Link from "next/link";

import aes from "crypto-js/aes";
import ImageRender from "@chan_alston/image";
import { useEffect, useState } from "react";
import { fill } from "@/styles/cssStyle";

import type { DocumentData } from "firebase/firestore";

interface UserBarProps {
  userData: DocumentData;
  currentUser: string;
}

export default function UserBar({ userData, currentUser }: UserBarProps) {
  const [open, setOpen] = useState(false);
  const [routeId, setRouteId] = useState<string | null>(null);

  const openList = () => {
    if (open) {
      setOpen(false);
    } else setOpen(true);
  };

  useEffect(() => {
    const nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";

    const encrypted = aes.encrypt(currentUser, nonce).toString();
    setRouteId(encrypted.replace(/\//g, "$"));
  }, [userData, currentUser]);

  const profilePicSrc =
    userData.pic.length > 3 ? userData.pic : `/images/profile-pic/${userData.pic}.png`;
  const profilePicStyle = { ...fill, borderRadius: "8px" };

  return (
    <>
      <div className={styles.userBox} onClick={openList}>
        <div className={styles.imgContainer}>
          <ImageRender
            src={profilePicSrc}
            alt=""
            w="160"
            h="160"
            style={{ ...profilePicStyle, objectFit: "cover" }}
          />
        </div>
        <h4 className={styles.username}>{userData.name}</h4>
        <div className={`${styles.arrBox} ${open && styles.open}`}>
          <Image src={navArrow} alt="" />
        </div>
      </div>
      {/* dropdown menu */}
      <div className={`${styles.dropdown} ${open && styles.open}`}>
        <div className={styles.content}>
          <hr className={styles.divider} />
          {/* user info */}
          <div className={styles.infoContainer}>
            {/* language row */}
            <div className={styles.info}>
              <div className={styles.left}>
                <h4 className={styles.title}>Language</h4>
                <p className={styles.subTitle}>English</p>
              </div>

              <a className={`${styles.infoLinks} ${styles.disabled}`}>Change</a>
            </div>
            <hr className={styles.divider} />
            {/*  ratings row */}
            <div className={styles.info}>
              <div className={styles.left}>
                <h4 className={styles.title}>Ratings</h4>
              </div>

              <Link
                className={styles.infoLinks}
                href={routeId ? `/yourAccount/ratings/${routeId}` : ""}
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./userComponent.module.scss";

import NavArrowBold from "@/public/images/icons/arrow/nav_arrow_bold.svg";

import Image from "next/image";
import router from "next/router";

import { useState } from "react";
import ImageRender from "@chan_alston/image";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import useIsomorphicLayoutEffect from "src/hooks/useIsomorphicLayout";
import useUserData from "src/hooks/firestore/useUserData";

import UserDropDownList from "./UserDropDownList";

import type { MouseEvent } from "react";

export default function UserComponent() {
  const [userData, dbError] = useUserData();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [delay, setDelay] = useState<NodeJS.Timeout | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.sessionStorage.getItem("profile");
      if (!data) {
        setCurrentUser("user-main");
      } else {
        const nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";

        setCurrentUser(aes.decrypt(data, nonce).toString(CryptoJS.enc.Utf8));
      }
    }
  }, [userData]);

  function toggleNavUser(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    if (e.type === "mouseenter") {
      if (delay) clearTimeout(delay);
      setShowUserDropdown(true);
    } else if (e.type === "mouseleave") {
      setDelay(
        setTimeout(() => {
          setShowUserDropdown(false);
        }, 400)
      );
    }
  }

  function switchProfile(user: string) {
    if (typeof window !== "undefined") {
      const nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";

      const encrypted = aes.encrypt(user, nonce).toString();
      window.sessionStorage.setItem("profile", encrypted);
      router.reload();
      setCurrentUser(user);
    }
  }

  const profilePicSrc = (userData: any, userId: string): string => {
    const src =
      userData[userId].pic.length > 3
        ? userData[userId].pic
        : `/images/profile-pic/${userData[userId].pic}.png`;

    return src;
  };

  return (
    <div className={styles.container}>
      <div
        onMouseEnter={(e) => toggleNavUser(e)}
        onMouseLeave={(e) => toggleNavUser(e)}
        style={{ display: "flex" }}
      >
        {userData && currentUser && (
          <ImageRender
            src={profilePicSrc(userData, currentUser)}
            w="35"
            h="35"
            className={styles.profilePic}
            alt="user profile"
          />
        )}
        <Image src={NavArrowBold} className={styles.icon} alt="" />
      </div>
      {showUserDropdown && (
        <div
          className={styles.userDropDown}
          onMouseEnter={(e) => toggleNavUser(e)}
          onMouseLeave={(e) => toggleNavUser(e)}
        >
          <div className={styles.arrBox}>
            <Image
              src={NavArrowBold}
              width="20"
              height="20"
              className={styles.arr}
              alt=""
            />
          </div>
          <UserDropDownList
            switchProfile={switchProfile}
            currentUser={currentUser}
            profilePicSrc={profilePicSrc}
          />
        </div>
      )}
    </div>
  );
}

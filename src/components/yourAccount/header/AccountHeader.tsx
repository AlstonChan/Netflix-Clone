// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./accountHeader.module.scss";
import NetflixLogo from "@/public/images/logo.png";

import Image from "next/image";
import Link from "next/link";

import UserComponent from "@/components/browse/header/userComponent/UserComponent";
import { responsive } from "@/styles/cssStyle";

export default function AccountHeader() {
  const imgStyles = {
    display: "inline-block",
    verticalAlign: "middle",
    ...responsive,
  };

  return (
    <>
      <header className={styles.container}>
        <Link className={styles.logoContainer} href="/browse">
          <Image
            src={NetflixLogo}
            className={styles.netflixLogo}
            alt="Netflix-Clone logo"
            width="160"
            height="43.6"
            style={imgStyles}
            priority
          />
        </Link>
        <div className={styles.userHeader}>
          <UserComponent />
        </div>
      </header>
    </>
  );
}

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./browse.module.scss";
import NetflixLogo from "@/public/images/logo.png";
import Spinner from "@/public/images/browse/spinner.png";

import Image from "next/image";

import useUserData from "src/hooks/firestore/useUserData";
import ImageRender from "@chan_alston/image";
import { fill } from "@/styles/cssStyle";

export default function LoadingBrowse({ profile }: any) {
  const [userData, dbError] = useUserData();

  return (
    <div className={styles.loadingBg}>
      <header className={styles.header}>
        <div className={styles.netflixLogoContainer}>
          <Image src={NetflixLogo} alt="Netflix logo" style={fill} />
        </div>
      </header>
      <main className={styles.mainLoading}>
        <div className={styles.profilePicCenter}>
          {userData && profile ? (
            <ImageRender
              src={
                userData[profile].pic.length > 3
                  ? userData[profile].pic
                  : `/images/profile-pic/${userData[profile].pic}.png`
              }
              w="320px"
              h="320px"
              className={styles.profilePic}
              alt="User profile"
              style={fill}
            />
          ) : (
            ""
          )}
          <div className={styles.spinnerContain}>
            <Image
              src={Spinner}
              alt="loading spinner"
              unoptimized
              style={fill}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

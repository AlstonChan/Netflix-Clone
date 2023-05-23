// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/components/yourAccount/ratings/ratings.module.scss";

import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import { useEffect, useState } from "react";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import ImageRender from "@chan_alston/image";
import useUserData from "src/hooks/firestore/useUserData";
import useMovieData from "src/hooks/firestore/useMovieData";

import { fill } from "@/styles/cssStyle";

import MovieInfoBar from "@/components/yourAccount/ratings/MovieInfoBar";
import AccountHeader from "@/components/yourAccount/header/AccountHeader";
import FooterStyle2 from "@/components/footer/FooterStyle2";
import Loader from "@/components/common/Loader/Loader";
import SnackBar from "@/components/common/snackbar/SnackBar";

import type { UserDataType } from "src/hooks/browse/fetchMovieHook/helper";
import type { DocumentData } from "firebase/firestore";
import type { SnackBarStateType } from "@/components/common/snackbar/types";

export default function UserRating() {
  const [userData] = useUserData();
  const [movieData] = useMovieData();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const router = useRouter();
  const { userId } = router.query;

  const closeSnackBar: SnackBarStateType = {
    isOpen: false,
    msg: "",
    title: "",
    variant: "error",
  };
  const [snackBarState, setSnackBarState] =
    useState<SnackBarStateType>(closeSnackBar);

  useEffect(() => {
    if (userId && typeof userId === "string") {
      const copy = userId.slice();

      const nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";

      setCurrentUser(
        aes.decrypt(copy.replace(/\$/g, "/"), nonce).toString(CryptoJS.enc.Utf8)
      );
    }
  }, [userId]);

  // close function for snackbar
  const onClose = () => {
    setSnackBarState(closeSnackBar);
  };

  const profilePicSrc = (userData: DocumentData, currentUser: string) => {
    return userData[currentUser].pic.length > 3
      ? userData[currentUser].pic
      : `/images/profile-pic/${userData[currentUser].pic}.png`;
  };

  return (
    <>
      <Head>
        <title>Movie Ratings | Netflix-Clone</title>
        <meta
          name="title"
          content="Movie Ratings | Netflix-Clone"
          key="title"
        />
      </Head>

      <SnackBar
        variant={snackBarState.variant || "error"}
        title={snackBarState.title}
        message={snackBarState.msg}
        isOpen={snackBarState.isOpen}
        onClose={onClose}
      />

      <main className={styles.main}>
        <div style={{ backgroundColor: "#000" }}>
          <AccountHeader />
        </div>
        {userData && currentUser && movieData ? (
          <article className={styles.centerContent}>
            {/* header  */}
            <div className={styles.headerBlock}>
              <h1>Activity for {userData[currentUser].name}</h1>
              <div className={styles.picContainer}>
                <ImageRender
                  src={profilePicSrc(userData, currentUser)}
                  className={styles.roundBorder}
                  alt={userData[currentUser].name}
                  style={fill}
                />
              </div>
            </div>

            <hr className={`${styles.divider} ${styles.always}`} />
            {movieData[currentUser].map(
              (movDetails: UserDataType, index: number) => {
                return (
                  <MovieInfoBar
                    key={index}
                    movDetails={movDetails}
                    currentUser={currentUser}
                    setSnackBarState={setSnackBarState}
                    userAllMovData={movieData[currentUser]}
                  />
                );
              }
            )}

            <Link href="/yourAccount" className={styles.backBtn}>
              Back to Your Account
            </Link>
          </article>
        ) : (
          <Loader padding="top" fit mode="light" />
        )}

        <FooterStyle2 />
      </main>
    </>
  );
}

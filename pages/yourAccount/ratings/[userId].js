import baseStyles from "../../../styles/yourAccount.module.css";
import styles from "../../../styles/ratings.module.css";
import stylesSpin from "../../../styles/loader.module.css";
import Spinner from "../../../public/images/browse/spinner.png";

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import ImageRender from "../../../components/ImageRender";
import { UserContext } from "../../_app";

import MovieInfoBar from "../../../components/yourAccount/ratings/MovieInfoBar";
import AccountHeader from "../../../components/yourAccount/AccountHeader";
import FooterStyle2 from "../../../components/footer/FooterStyle2";

export default function UserRating() {
  const { userData, listMovieData } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (userId) {
      const copy = userId.slice();
      setCurrentUser(
        aes
          .decrypt(
            copy.replace(/\$/g, "/"),
            process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE
          )
          .toString(CryptoJS.enc.Utf8)
      );
    }
  }, [userId]);

  return (
    <>
      <Head>
        <title>Netflix Clone - Movie Ratings</title>
      </Head>
      <main className={baseStyles.main}>
        <div style={{ backgroundColor: "#000" }}>
          <AccountHeader />
        </div>
        {userData && currentUser && listMovieData ? (
          <article className={baseStyles.centerContent}>
            <div className={styles.headerBlock}>
              <h1>Activity for {userData[currentUser].name}</h1>
              <div className={styles.picContainer}>
                <ImageRender
                  src={
                    userData[currentUser].pic.length > 3
                      ? userData[currentUser].pic
                      : `/images/profile pic/${userData[currentUser].pic}.png`
                  }
                  className={styles.roundBorder}
                  objectFit="cover"
                />
              </div>
            </div>
            <hr className={baseStyles.divider} />
            {listMovieData.data()[currentUser].map((movDetails, index) => {
              return <MovieInfoBar key={index} movDetails={movDetails} />;
            })}
            <button className={styles.backBtn}>
              <Link href="/yourAccount">
                <a className={styles.backBtnTxt}>Back to Your Account</a>
              </Link>
            </button>
          </article>
        ) : (
          <main className={stylesSpin.mainLoader}>
            <div className={stylesSpin.profilePicCenter}>
              <div className={stylesSpin.spinnerContain}>
                <Image src={Spinner} alt="loading spinner" />
              </div>
            </div>
          </main>
        )}

        <FooterStyle2 />
      </main>
    </>
  );
}

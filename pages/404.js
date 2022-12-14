import styles from "@/styles/404.module.css";
import NetflixLogo from "@/public/images/logo.png";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <Head>
        <title>Netflix Clone - Not Found</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.imgLogo}>
            <Image
              src={NetflixLogo}
              width="100"
              height="27.25"
              alt="netflix logo"
            />
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.mainContain}>
            <div className={styles.errorMsg}>
              <h1 className={styles.errorMsgHead}>Lost your way?</h1>
              <p className={styles.errorMsgPara}>
                Sorry, we can&apos;t find that page. You&apos;ll find lots to
                explore on the home page.{" "}
              </p>
              <button className={styles.homeBtn}>
                <Link className={styles.homeBtnTxt} href="/">
                  Netflix Home
                </Link>
              </button>
            </div>
            <div className={styles.errorCode}>
              <p className={styles.errorCodeMsg}>
                Error Code <strong>404</strong>
              </p>
            </div>
          </div>
          <div className={styles.movieName}>
            <p className={styles.movieNameMsg}>
              FROM <strong>LOST IN SPACE</strong>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

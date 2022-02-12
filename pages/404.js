import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/404.module.css";

export default function NotFound() {
  return (
    <div className="container">
      <Head>
        <title>Netflix - clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.imgLogo}>
            <Image
              src="/images/NetflixLogo.png"
              width="100px"
              height="27.25px"
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
                <Link href="/">
                  <a className={styles.homeBtnTxt}>Netflix Home</a>
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

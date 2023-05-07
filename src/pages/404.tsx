// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/styles/errorPage.module.scss";
import NetflixLogo from "@/public/images/logo.png";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found | Netflix-Clone</title>
        <meta name="title" content="Not Found | Netflix-Clone<" key="title" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <Image
            src={NetflixLogo}
            width="150"
            height="40.875"
            alt="netflix logo"
          />
        </header>
        <main className={styles.main}>
          <div className={styles.content}>
            <article className={styles.errorMsg}>
              <h1 className={styles.title}>Lost your way?</h1>
              <p className={styles.subTitle}>
                Sorry, we can&apos;t find that page. You&apos;ll find lots to
                explore on the home page.{" "}
              </p>

              <Link className={styles.btn} href="/">
                Netflix Home
              </Link>
            </article>
            <div className={styles.errorCode}>
              <p className={styles.errorCodeMsg}>
                Error Code <strong>404</strong>
              </p>
            </div>
          </div>
          <footer className={styles.movieName}>
            <p className={styles.movieNameMsg}>
              FROM <strong>LOST IN SPACE</strong>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}

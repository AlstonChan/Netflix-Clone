// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/styles/logout.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect } from "react";

import Header from "@/components/common/header/Header";
import Footer from "@/components/footer/FooterStyle2";

export default function LogOut() {
  const router = useRouter();
  useEffect(() => {
    let timerForceHome = setTimeout(() => router.push("/"), 30000);
    return () => {
      // to clear timeout when user leave this page
      clearTimeout(timerForceHome);
    };
  }, [router]);

  function leaveNow() {
    router.push("/");
  }

  const btnStyles = `${styles.btn} ${styles.fill} ${styles.blue} ${styles.smaller}`;

  return (
    <>
      <Head>
        <title>Logout | Netflix-Clone</title>
        <meta name="title" content="Logout | Netflix-Clone" key="title" />
      </Head>

      <div className={styles.container}>
        <Header logoClickHome />
        <main className={styles.main}>
          <h1 className={styles.title}>Leaving So Soon?</h1>
          <p className={styles.desc}>
            Just so you know, you don&apos;t always need to sign out of Netflix. It&apos;s
            only necessary if you&apos;re on a shared or public computer
          </p>
          <p className={styles.desc}>
            You&apos;ll be redirected to Homepage in 30 seconds
          </p>

          <button onClick={leaveNow} type="button" className={btnStyles}>
            Go Now
          </button>
        </main>
        <Footer />
      </div>
    </>
  );
}

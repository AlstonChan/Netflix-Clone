import styles from "@/styles/logout.module.css";

import Head from "next/head";
import router from "next/router";

import { useEffect } from "react";

import Header from "@/components/Header";
import Footer from "@/components/footer/FooterStyle2";

export default function LogOut() {
  useEffect(() => {
    let timerForceHome = setTimeout(() => router.push("/"), 30000);
    return () => {
      // to clear timeout when user leave this page
      clearTimeout(timerForceHome);
    };
  }, []);

  function leaveNow(e) {
    e.preventDefault();
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Netflix Clone - Logout</title>
      </Head>

      <div className="container">
        <div className={styles.mainComp}>
          <Header logoClickHome={true} />
          <main className={styles.main}>
            <h1 className={styles.headings}>Leaving So Soon?</h1>
            <p className={styles.mainMsg}>
              Just so you know, you don&apos;t always need to sign out of
              Netflix. It&apos;s only necessary if you&apos;re on a shared or
              public computer
            </p>
            <p className={styles.redirectMsg}>
              You&apos;ll be redirected to Homepage in 30 seconds
            </p>
            <div className={styles.maxBtn}>
              <button
                onClick={(e) => leaveNow(e)}
                type="button"
                className={styles.goNowBtn}
              >
                Go Now
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

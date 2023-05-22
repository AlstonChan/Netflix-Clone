import styles from "@/styles/yourAccount/yourAccount.module.css";

import Head from "next/head";

import { useEffect, useState } from "react";
import useUserData from "src/hooks/firestore/useUserData";
import useAuthState from "src/hooks/useAuthState";

import FooterStyle2 from "@/components/footer/FooterStyle2";
import Membership from "@/components/yourAccount/Membership";
import PlanDetails from "@/components/yourAccount/PlanDetails";
import ProfileSetting from "@/components/yourAccount/ProfileSetting";
import AccountHeader from "@/components/yourAccount/AccountHeader";
import AccountLoader from "@/components/yourAccount/AccountLoader";

export default function YourAccount() {
  const [user, isLoading, error] = useAuthState();
  const [userData, dbError] = useUserData();
  const [divider, setDivider] = useState(true);

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  function handleWindowResize() {
    if (!divider) {
      if (window.innerWidth > 500) {
        setDivider(true);
      }
    }
    if (window.innerWidth < 500) {
      setDivider(false);
    }
  }

  return (
    <>
      <Head>
        <title>Netflix Clone - Account Setting</title>
      </Head>

      <main className={styles.main}>
        <div style={{ backgroundColor: "#000" }}>
          <AccountHeader />
        </div>
        <article className={styles.centerContent}>
          {userData && user ? (
            <>
              <section className={styles.headings}>
                <h2 className={styles.mainHeaders}>Account</h2>
                <div className={styles.memContainer}>
                  <p className={styles.memberSince}>
                    Member Since {userData.createdAt}
                  </p>
                </div>
              </section>
              <div className={styles.mobileContainer}>
                {divider ? <hr className={styles.divider} /> : ""}
                <Membership user={user} divider={divider} />
              </div>
              <div className={styles.mobileContainer}>
                {divider ? <hr className={styles.divider} /> : ""}
                <PlanDetails userData={userData} divider={divider} />
              </div>
              <div className={styles.mobileContainer}>
                {divider ? <hr className={styles.divider} /> : ""}
                <ProfileSetting userData={userData} />
              </div>
            </>
          ) : (
            <AccountLoader />
          )}
        </article>
        <FooterStyle2 />
      </main>
    </>
  );
}

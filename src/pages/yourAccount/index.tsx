// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/components/yourAccount/yourAccount.module.scss";

import Head from "next/head";

import { useState } from "react";
import useUserData from "src/hooks/firestore/useUserData";
import useAuthState from "src/hooks/useAuthState";

import FooterStyle2 from "@/components/footer/FooterStyle2";
import Membership from "@/components/yourAccount/accountSections/membership/Membership";
import PlanDetails from "@/components/yourAccount/accountSections/planDetails/PlanDetails";
import ProfileSetting from "@/components/yourAccount/accountSections/profileSetting/ProfileSetting";
import AccountHeader from "@/components/yourAccount/header/AccountHeader";
import Loader from "@/components/common/Loader/Loader";
import SnackBar from "@/components/common/snackbar/SnackBar";
import ProtectedArea from "@/components/layout/ProtectedArea";

import type { SnackBarStateType } from "@/components/common/snackbar/types";
import type { ReactElement } from "react";

export default function YourAccount() {
  const [user, isLoading, error] = useAuthState();
  const [userData, dbError] = useUserData();

  const closeSnackBar: SnackBarStateType = {
    isOpen: false,
    msg: "",
    title: "",
    variant: "error",
  };
  const [snackBarState, setSnackBarState] =
    useState<SnackBarStateType>(closeSnackBar);

  // close function for snackbar
  const onClose = () => {
    setSnackBarState(closeSnackBar);
  };

  return (
    <>
      <Head>
        <title>Account Setting | Netflix-Clone</title>
        <meta
          name="title"
          content="Account Setting | Netflix-Clone"
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
        <article className={styles.centerContent}>
          {userData && user && !isLoading ? (
            <>
              <section className={styles.headings}>
                <h2 className={styles.mainHeaders}>Account</h2>
                <div className={styles.memContainer}>
                  <p className={styles.memberSince}>
                    Member Since {userData.createdAt}
                  </p>
                </div>
              </section>

              <Membership user={user} setSnackBarState={setSnackBarState} />
              <PlanDetails userData={userData} />
              <ProfileSetting userData={userData} />
            </>
          ) : (
            <Loader padding="top" fit mode="light" />
          )}
        </article>
        <FooterStyle2 />
      </main>
    </>
  );
}

YourAccount.getLayout = (page: ReactElement) => {
  return <ProtectedArea>{page}</ProtectedArea>;
};

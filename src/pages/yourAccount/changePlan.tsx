// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/components/yourAccount/changePlan/changePlan.module.scss";

import Head from "next/head";

import { createContext, useEffect, useState } from "react";
import useUserData from "src/hooks/firestore/useUserData";
import useAuthState from "src/hooks/useAuthState";

import FooterStyle2 from "@/components/footer/FooterStyle2";
import PlanConfirmModal from "@/components/yourAccount/changePlan/modal/PlanConfirmModal";
import AccountHeader from "@/components/yourAccount/header/AccountHeader";
import Loader from "@/components/common/Loader/Loader";
import MainChangePlan from "@/components/yourAccount/changePlan/MainChangePlan";
import ProtectedArea from "@/components/layout/ProtectedArea";

import type { ReactElement } from "react";

interface ChangePlanContext {
  chosenBar: any | null;
  setChosenBar: any | null;
  openModal: any | null;
  setOpenModal: any | null;
}

export const ChangePlanContext = createContext<ChangePlanContext>({
  chosenBar: null,
  setChosenBar: null,
  openModal: null,
  setOpenModal: null,
});

export default function ChangePlan() {
  const [user, isLoading, error] = useAuthState();
  const [userData, dbError] = useUserData();
  const [chosenBar, setChosenBar] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (userData) setChosenBar(userData.plan);
  }, [userData]);

  if (!userData || !user) return <Loader />;

  const contextValue = {
    chosenBar,
    setChosenBar,
    openModal,
    setOpenModal,
  };

  return (
    <>
      <Head>
        <title>Account Setting | Netflix-Clone</title>
        <meta name="title" content="Account Setting | Netflix-Clone" key="title" />
      </Head>

      <ChangePlanContext.Provider value={contextValue}>
        {openModal && <PlanConfirmModal currentPlan={userData.plan} user={user} />}
        <main className={styles.main} style={openModal ? { overflow: "hidden" } : {}}>
          <div style={{ backgroundColor: "#000" }}>
            <AccountHeader />
          </div>

          <article className={styles.centerContent}>
            {userData && user && !isLoading ? (
              <>
                <section className={styles.headings}>
                  <h2 className={styles.mainHeaders}>Change Streaming Plan</h2>
                </section>
                <MainChangePlan userData={userData} />
              </>
            ) : (
              <Loader padding="top" fit mode="light" />
            )}
          </article>
          <FooterStyle2 />
        </main>
      </ChangePlanContext.Provider>
    </>
  );
}

ChangePlan.getLayout = (page: ReactElement) => {
  return <ProtectedArea>{page}</ProtectedArea>;
};

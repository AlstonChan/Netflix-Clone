// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./planConfirmModal.module.scss";
import CancelSvg from "../../../icons/CancelSvg";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { planDetails } from "../plan";
import { ChangePlanContext } from "@/pages/yourAccount/changePlan";
import { useContext } from "react";

import type { User } from "firebase/auth";
import type { PlanType } from "../types";

interface PlanConfirmModal {
  currentPlan: PlanType;
  user: User;
}

export default function PlanConfirmModal(props: PlanConfirmModal) {
  const { currentPlan, user } = props;
  const { chosenBar, setOpenModal } = useContext(ChangePlanContext);

  const updatePlan = async () => {
    await updateDoc(doc(db, "Acc", user.uid), {
      plan: chosenBar,
    });
    setOpenModal(false);
  };

  return (
    <div className={styles.back}>
      <div className={styles.modalBox}>
        <div className={styles.btnBox} onClick={() => setOpenModal(false)}>
          <CancelSvg stColor="#222" />
        </div>
        <header className={styles.modalHeader}>
          <h1>Change Streaming Plan</h1>
        </header>
        {/* preview panel */}
        <main className={styles.modalMain}>
          {/* current plan */}
          <section className={styles.planSection}>
            <h4>CURRENT PLAN:</h4>
            <p style={{ margin: 0 }}>
              {currentPlan}{" "}
              {planDetails.map((planDetail) => {
                if (planDetail.plan === currentPlan) {
                  return planDetail.fee;
                }
              })}
            </p>
          </section>

          {/* new plan  */}
          <section className={styles.planSection}>
            <h4 className={styles.new}>NEW PLAN:</h4>
            <p className={styles.new}>
              {chosenBar}{" "}
              {planDetails.map((planDetail) => {
                if (planDetail.plan === chosenBar) {
                  return planDetail.fee;
                }
              })}
            </p>
          </section>
        </main>

        {/* footer  */}
        <footer className={styles.modalFooter}>
          <div className={styles.btnGroupEnd}>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.btn} ${styles.save}`}
                onClick={updatePlan}
                style={{ whiteSpace: "nowrap" }}
              >
                Confirm Changes
              </button>
              <button
                className={`${styles.btn} ${styles.cancel}`}
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

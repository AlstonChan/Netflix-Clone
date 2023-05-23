// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./changePlan.module.scss";

import Link from "next/link";

import { useContext } from "react";
import { planDetails } from "./plan";

import StreamPlanBar from "./streamPlanBar/StreamPlanBar";

import type { DocumentData } from "firebase/firestore";
import { ChangePlanContext } from "@/pages/yourAccount/changePlan";

interface MainChangePlan {
  userData: DocumentData;
}

export default function MainChangePlan({ userData }: MainChangePlan) {
  const { chosenBar, setOpenModal } = useContext(ChangePlanContext);

  const confirmModal = () => {
    if (userData.plan === chosenBar) return;
    setOpenModal(true);
  };

  const saveButtonClass = `${styles.btn} ${styles.save}  ${
    userData.plan === chosenBar && styles.disabled
  }`;

  return (
    <>
      <ul className={styles.listContainer}>
        {planDetails.map((plan, index) => {
          return (
            <StreamPlanBar
              planDetails={plan}
              currentPlan={userData.plan}
              key={index}
            />
          );
        })}
      </ul>
      {/* captchaTerm */}
      <p className={styles.captchaTerm} style={{ color: "#000" }}>
        HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
        to your internet service and device capabilities. Not all content is
        available in all resolutions. See our{" "}
        <Link href="" className={styles.link}>
          Terms of Use&nbsp;
        </Link>
        for more details.
      </p>
      {/* captchaTerm */}
      <p className={styles.captchaTerm} style={{ color: "#000" }}>
        Only people who live with you may use your account. Watch on 4 different
        devices at the same time with Premium, 2 with Standard and 1 with Basic.
      </p>
      {/* buttons  */}
      <div className={styles.buttonGroup}>
        <button
          className={saveButtonClass}
          onClick={confirmModal}
          disabled={userData.plan === chosenBar}
        >
          Continue
        </button>
        <Link href="/yourAccount" className={`${styles.btn} ${styles.cancel}`}>
          Go Back
        </Link>
      </div>
    </>
  );
}

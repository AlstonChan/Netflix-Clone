// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./planDetails.module.scss";

import Link from "next/link";

import type { DocumentData } from "firebase/firestore";

interface PlanDetailsProps {
  userData: DocumentData;
}

export default function PlanDetails({ userData }: PlanDetailsProps) {
  return (
    <div className={styles.container}>
      <hr className={`${styles.divider} ${styles.invert}`} />
      <section className={styles.content}>
        <div className={styles.left}>
          <h2 className={styles.title}>PLAN DETAILS</h2>
        </div>
        <div className={styles.right}>
          <div className={styles.userInfo}>
            <div>
              <p className={styles.header}>
                {userData.plan.charAt(0).toUpperCase() + userData.plan.slice(1)}
              </p>
            </div>
            <hr className={styles.divider} />
            <div className={styles.userInfoLink}>
              <Link className={styles.link} href="/yourAccount/changePlan">
                Change plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

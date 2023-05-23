// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./streamPlanBar.module.scss";
import CheckMarkSvg from "../../../icons/CheckMarkSvg";

import { useContext } from "react";
import { ChangePlanContext } from "@/pages/yourAccount/changePlan";

import type { PlanDetailsType } from "../plan";
import type { PlanType } from "../types";

interface StreamPlanBarProps {
  planDetails: PlanDetailsType;
  currentPlan: PlanType;
}

export default function StreamPlanBar(props: StreamPlanBarProps) {
  const { planDetails, currentPlan } = props;
  const { chosenBar, setChosenBar } = useContext(ChangePlanContext);

  const ifPlanIsChosen = chosenBar === planDetails.plan;
  const ifCurrentPlanIsChosen = currentPlan === planDetails.plan;

  const listItemClass = `${styles.bar} ${ifPlanIsChosen && styles.selected}`;

  return (
    <li
      className={listItemClass}
      onClick={() => setChosenBar(planDetails.plan)}
    >
      <div className={`${styles.header} ${ifPlanIsChosen && styles.selected}`}>
        <h3 className={`${styles.txt} ${ifPlanIsChosen && styles.selected}`}>
          {ifCurrentPlanIsChosen && (
            <p className={styles.showCurrentPlan}>CURRENT PLAN:</p>
          )}
          <p className={styles.plan}>{planDetails.plan}</p>
        </h3>
      </div>
      <div className={styles.barDetails}>
        <p className={`${styles.txt} ${styles.desc}`}>
          {planDetails.desc}&nbsp;
          <span className={`${styles.txt} ${styles.fee}`}>
            {planDetails.fee}
          </span>
        </p>
      </div>
      {ifPlanIsChosen && (
        <div className={styles.checkedContainer}>
          <CheckMarkSvg stWidth="3" />
        </div>
      )}
    </li>
  );
}

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./pricingTable.module.scss";
import CheckMarkSvg from "../../icons/CheckMarkSvg";
import ArrRed from "@/public/images/icons/arrow/nav_arrow_bold red.svg";

import Image from "next/image";

import { useState } from "react";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import useIsomorphicLayoutEffect from "src/hooks/useIsomorphicLayout";

import type { MutableRefObject, MouseEvent } from "react";
import type { PackagePlanType } from "./types";

interface PricingTableTypes {
  planRef: MutableRefObject<PackagePlanType | null>;
}

export default function PricingTable({ planRef }: PricingTableTypes) {
  const packagePlan: PackagePlanType[] = ["Basic", "Standard", "Premium"];

  const monthlyPrices: string[] = ["RM35", "RM45", "RM55"];
  const videoQuality: string[] = ["Good", "Better", "Best"];
  const resolutions: string[] = ["480p", "1080p", "4K+HDR"];
  const tableVal = [
    { "Monthly prices": monthlyPrices },
    { "Video quality": videoQuality },
    { Resolutions: resolutions },
  ];

  type SelectedColType = {
    plan: PackagePlanType;
    plannum: number;
  };
  const [selectedCol, setSelectedCol] = useState<SelectedColType>({
    plan: "Standard",
    plannum: 1,
  });

  function selectPlan(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    const { plan, plannum } = e.currentTarget.dataset;

    if (!plan || !plannum) {
      return console.error("Dataset plan or plannum is undefined!");
    }
    planRef.current = plan as PackagePlanType;

    if (packagePlan.includes(plan as PackagePlanType)) {
      setSelectedCol({
        plan: plan as PackagePlanType,
        plannum: Number(plannum),
      });
    } else throw new Error("Dataset plan have invalid value");
  }

  useIsomorphicLayoutEffect(() => {
    const data = window.sessionStorage.getItem("plan");

    if (data) {
      let nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";
      const plan = aes.decrypt(data, nonce).toString(CryptoJS.enc.Utf8);

      if (packagePlan.includes(plan as PackagePlanType)) {
        planRef.current = plan as PackagePlanType;
      } else throw new Error("Dataset plan have invalid value");

      const plannum =
        planRef.current === "Basic"
          ? 0
          : planRef.current === "Standard"
          ? 1
          : 2;

      setSelectedCol({ plan: planRef.current, plannum });
    }
  }, []);

  return (
    <>
      <div className={styles.planBox}>
        {packagePlan.map((txt, index) => {
          return (
            <button
              key={index}
              data-plannum={index}
              data-plan={txt}
              className={`${styles.box} ${
                selectedCol.plan === txt && styles.active
              }`}
              onClick={(e) => selectPlan(e)}
            >
              <p className={styles.txt}>{txt} </p>
              {selectedCol.plan === txt && (
                <div className={styles.arr}>
                  <Image src={ArrRed} alt="red check mark" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <table className={styles.pricingTable}>
        <colgroup span={1} className={styles.colHead} />
        <colgroup span={3} className={styles.colBody} />
        <tbody>
          {tableVal.map((row: any, index) => {
            const title: string[] = Object.keys(row);
            const rowData: string[] = row[title[0]];

            return (
              <tr key={index} className={styles.row}>
                <td className={styles.rowHead}>{title[0]} </td>
                {rowData.map((txt: string, num: Number) => {
                  return (
                    <td
                      key={txt}
                      className={`${styles.rowData} ${
                        selectedCol.plannum === num && styles.active
                      }`}
                    >
                      {txt}{" "}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr className={styles.row}>
            <td className={styles.rowHead}>
              Watch on your TV, computer, mobile phone and tablet
            </td>
            {packagePlan.map((txt, index) => {
              return (
                <td key={index} className={styles.rowData}>
                  {selectedCol.plannum === index ? (
                    <CheckMarkSvg stColor="rgb(212, 60, 60)" />
                  ) : (
                    <CheckMarkSvg stColor="#737373" />
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
}

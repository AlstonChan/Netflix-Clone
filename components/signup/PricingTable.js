import styles from "../../styles/signup.module.css";
import CheckRed from "../../public/images/icons/misc/icons_check red.svg";
import CheckGray from "../../public/images/icons/misc/icons_check gray.svg";
import ArrRed from "../../public/images/icons/misc/nav_arrow_bold red.svg";

import Image from "next/image";

import { useState } from "react";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import useIsomorphicLayoutEffect from "../../lib/useIsomorphicLayout";

export default function PricingTable({ plan }) {
  const packagePlan = ["Basic", "Standard", "Premium"];
  const monthlyPrices = ["RM35", "RM45", "RM55"];
  const videoQuality = ["Good", "Better", "Best"];
  const resolutions = ["480p", "1080p", "4K+HDR"];

  const [selectedCol, setSelectedCol] = useState({
    stylesBox: `${styles.box} ${styles.boxActive}`,
    stylesCol: `${styles.rowDataStyle} ${styles.rowDataStyleActive}`,
    plan: "Standard",
    plannum: "1",
  });

  function selectPlan(e) {
    plan.current = e.currentTarget.dataset.plan;
    setSelectedCol({
      stylesBox: `${styles.box} ${styles.boxActive}`,
      stylesCol: `${styles.rowDataStyle} ${styles.rowDataStyleActive}`,
      plan: e.currentTarget.dataset.plan,
      plannum: e.currentTarget.dataset.plannum,
    });
  }

  useIsomorphicLayoutEffect(() => {
    const data = window.sessionStorage.getItem("plan");
    if (data) {
      plan.current = aes
        .decrypt(data, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
        .toString(CryptoJS.enc.Utf8);
      setSelectedCol({
        stylesBox: `${styles.box} ${styles.boxActive}`,
        stylesCol: `${styles.rowDataStyle} ${styles.rowDataStyleActive}`,
        plan:
          plan.current === "Basic"
            ? "Basic"
            : plan.current === "Standard"
            ? "Standard"
            : "Premium",
        plannum:
          plan.current === "Basic" ? 0 : plan.current === "Standard" ? 1 : 2,
      });
    }
  }, []);

  return (
    <>
      <div className={styles.planBoxContainer}>
        <div className={styles.planBox}>
          {packagePlan.map((txt, index) => {
            return (
              <div
                key={index}
                data-plannum={index}
                data-plan={txt}
                className={
                  selectedCol.plan == txt ? selectedCol.stylesBox : styles.box
                }
                onClick={(e) => selectPlan(e)}
              >
                <p className={styles.boxTxt}>{txt} </p>
                {selectedCol.plan == txt ? (
                  <div className={styles.boxArrContainer}>
                    <Image src={ArrRed} alt="red check mark" unoptimized />
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
      <table className={styles.pricingTable}>
        <colgroup span="1" className={styles.columnHeader} />
        <colgroup span="2" className={styles.columnContent} />
        <tbody>
          <tr className={`${styles.rowGroupStyle} ${styles.rowGroupBor}`}>
            <td className={styles.rowHeadDataStyle}>Monthly prices</td>
            {monthlyPrices.map((txt, index) => {
              return (
                <td
                  key={index}
                  className={
                    selectedCol.plannum == index
                      ? selectedCol.stylesCol
                      : styles.rowDataStyle
                  }
                >
                  {txt}{" "}
                </td>
              );
            })}
          </tr>
          <tr className={`${styles.rowGroupStyle} ${styles.rowGroupBor}`}>
            <td className={styles.rowHeadDataStyle}>Video quality</td>
            {videoQuality.map((txt, index) => {
              return (
                <td
                  key={index}
                  className={
                    selectedCol.plannum == index
                      ? selectedCol.stylesCol
                      : styles.rowDataStyle
                  }
                >
                  {txt}{" "}
                </td>
              );
            })}
          </tr>
          <tr className={`${styles.rowGroupStyle} ${styles.rowGroupBor}`}>
            <td className={styles.rowHeadDataStyle}>Resolutions</td>
            {resolutions.map((txt, index) => {
              return (
                <td
                  key={index}
                  className={
                    selectedCol.plannum == index
                      ? selectedCol.stylesCol
                      : styles.rowDataStyle
                  }
                >
                  {txt}{" "}
                </td>
              );
            })}
          </tr>
          <tr className={`${styles.rowGroupStyle}`}>
            <td className={styles.rowHeadDataStyle}>
              Watch on your TV, computer, mobile phone and tablet
            </td>
            {packagePlan.map((txt, index) => {
              return (
                <td key={index} className={styles.rowDataStyle}>
                  {selectedCol.plannum == index ? (
                    <Image src={CheckRed} alt="red check mark" unoptimized />
                  ) : (
                    <Image src={CheckGray} alt="gray check mark" unoptimized />
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

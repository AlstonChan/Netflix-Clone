import styles from "../../styles/signup/signup.module.css";
import Layout from "../layout";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CheckRed from "../../public/images/icons/misc/icons_check red.svg";

import Footer from "../../components/footer/footerStyle2";
import Header from "../../components/signup/header";
import { useState } from "react";

const benefitTxt = [
  "Watch all you want. Advert-free.",
  "Recommendations just for you.",
  "Change or cancel your plan anytime.",
];

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function Registration() {
  return (
    <div className={styles.container}>
      <Header logoClickHome={true} />
      <motion.main
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: "linear" }} // Set the transition to linear
        className={styles.main}
      >
        <div className={styles.centerPlanform}>
          <div style={{ width: "fit-content" }}>
            <p className={styles.stepsCount}>STEP 1 OF 3</p>
          </div>
          <div style={{ width: "fit-content" }}>
            <h1 className={styles.stepsHeadings}>
              Choose the plan that's right for you.
            </h1>
          </div>
          <div>
            {benefitTxt.map((txt, index) => {
              return (
                <li key={index} className={styles.benefitListItem}>
                  <Image src={CheckRed} />
                  <span className={styles.benefitListItemTxt}>{txt}</span>
                </li>
              );
            })}
            <br />
            <PricingTable />
            <div className={styles.termsCondition}>
              <small style={{ padding: "0 150px 0 0" }}>
                HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
                subject to your internet service and device capabilities. Not
                all content is available in all resolutions. See our{" "}
                <a href="" className={styles.termsOfUse}>
                  Terms of Use
                </a>{" "}
                for more details.
              </small>
            </div>
            <div className={styles.termsCondition}>
              <small style={{ padding: "0 150px 0 0" }}>
                Only people who live with you may use your account. Watch on 4
                different devices at the same time with Premium, 2 with Standard
                and 1 with Basic.
              </small>
            </div>
            <div className={styles.btnContainerNext}>
              <Link href="/signup">
                <a className={styles.nextButton}>Next</a>
              </Link>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}

export function PricingTable() {
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
    setSelectedCol({
      stylesBox: `${styles.box} ${styles.boxActive}`,
      stylesCol: `${styles.rowDataStyle} ${styles.rowDataStyleActive}`,
      plan: e.target.dataset.plan,
      plannum: e.target.dataset.plannum,
    });
  }

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
                  <Image src={CheckRed} />
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
}

Registration.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>{page}</AnimatePresence>
    </Layout>
  );
};

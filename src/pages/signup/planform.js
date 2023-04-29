import styles from "@/styles/signup.module.css";
import CheckMarkSvg from "@/components/icons/CheckMarkSvg";

import Head from "next/head";
import Link from "next/link";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import aes from "crypto-js/aes";

import PricingTable from "@/components/signup/PricingTable";
import Footer from "@/components/footer/FooterStyle2";
import Header from "@/components/signup/HeaderSignUp";
import Loader from "@/components/Loader";
import Layout from "../layout";

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

export function PlanForm() {
  const selectedPlan = useRef();

  const updatePlan = () => {
    const encrypted = aes
      .encrypt(selectedPlan.current, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
      .toString();
    sessionStorage.setItem("plan", encrypted);
  };

  return (
    <>
      <Head>
        <title>Netflix Clone - Plan Form</title>
      </Head>

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
              <p className={styles.stepsCount}>STEP 1 OF 2</p>
            </div>
            <div style={{ width: "fit-content" }}>
              <h1
                className={styles.stepsHeadings}
                style={{ textAlign: "left" }}
              >
                Choose the plan that&apos;s right for you.
              </h1>
            </div>
            <div>
              {benefitTxt.map((txt, index) => {
                return (
                  <li key={index} className={styles.benefitListItem}>
                    <CheckMarkSvg stColor="rgb(212, 60, 60)" />
                    <span className={styles.benefitListItemTxt}>{txt}</span>
                  </li>
                );
              })}
              <br />
              <PricingTable plan={selectedPlan} />
              <div className={styles.termsCondition}>
                <small className={styles.termsConditionSmall}>
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
                <small className={styles.termsConditionSmall}>
                  Only people who live with you may use your account. Watch on 4
                  different devices at the same time with Premium, 2 with
                  Standard and 1 with Basic.
                </small>
              </div>
              <div className={styles.btnContainerNext}>
                <Link
                  href="/signup/registration"
                  className={styles.nextButton}
                  onClick={updatePlan}
                >
                  Next
                </Link>
              </div>
            </div>
          </div>
        </motion.main>
        <Footer />
      </div>
    </>
  );
}

PlanForm.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AnimatePresence mode="wait">{page}</AnimatePresence>
    </Layout>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(PlanForm);

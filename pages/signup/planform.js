import styles from "../../styles/signup.module.css";
import Layout from "../layout";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CheckRed from "../../public/images/icons/misc/icons_check red.svg";

import PricingTable from "../../components/signup/pricingTable";
import Footer from "../../components/footer/footerStyle2";
import Header from "../../components/signup/header";

import Loader from "../../components/Loader";
import { withAuthUser, AuthAction } from "next-firebase-auth";

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
            <h1 className={styles.stepsHeadings} style={{ textAlign: "left" }}>
              Choose the plan that&apos;s right for you.
            </h1>
          </div>
          <div>
            {benefitTxt.map((txt, index) => {
              return (
                <li key={index} className={styles.benefitListItem}>
                  <Image src={CheckRed} alt="a red check mark" />
                  <span className={styles.benefitListItemTxt}>{txt}</span>
                </li>
              );
            })}
            <br />
            <PricingTable />
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
                different devices at the same time with Premium, 2 with Standard
                and 1 with Basic.
              </small>
            </div>
            <div className={styles.btnContainerNext}>
              <Link href="/signup/registration">
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

PlanForm.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>{page}</AnimatePresence>
    </Layout>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(PlanForm);

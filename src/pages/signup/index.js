import styles from "@/styles/signup.module.css";
import CheckMark from "@/public/images/icons/misc/rounded-checkmark.png";
import CheckMarkSvg from "@/components/icons/CheckMarkSvg";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { responsive } from "@/styles/cssStyle";

import Footer from "@/components/footer/FooterStyle2";
import Header from "@/components/signup/HeaderSignUp";
import Loader from "@/components/Loader";
import Layout from "../layout";

const benefitTxt = [
  "No commitments, cancel at any time.",
  "Everything on Netflix for one low price.",
  "Unlimited viewing on all your devices.",
];

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};
export function SignUp() {
  return (
    <>
      <Head>
        <title>Netflix Clone - SignUp</title>
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
          <div className={styles.centerDiv}>
            <section className={styles.mainContent}>
              <div className={styles.imgContainer}>
                <Image src={CheckMark} alt="check Mark" style={responsive} />
              </div>
              <p className={styles.stepsCount}>STEP 1 OF 2</p>
              <h1 className={styles.stepsHeadings}>Choose your plan.</h1>
              <div>
                {benefitTxt.map((txt, index) => {
                  return (
                    <li key={index} className={styles.benefitListItem}>
                      <CheckMarkSvg stColor="rgb(212, 60, 60)" />
                      <span className={styles.benefitListItemTxt}>{txt}</span>
                    </li>
                  );
                })}
              </div>
            </section>
            <Link href="/signup/planform" className={styles.nextButton}>
              Next
            </Link>
          </div>
        </motion.main>
        <Footer />
      </div>
    </>
  );
}

SignUp.getLayout = function getLayout(page) {
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
})(SignUp);

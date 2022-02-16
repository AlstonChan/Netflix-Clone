import styles from "../../styles/signup/signup.module.css";
import Layout from "../layout";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CheckMark from "../../public/images/icons/misc/Checkmark.png";
import CheckRed from "../../public/images/icons/misc/icons_check red.svg";

import Footer from "../../components/footer/footerStyle2";
import Header from "../../components/signup/header";

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
export default function SignUp() {
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
        <div className={styles.centerDiv}>
          <section className={styles.mainContent}>
            <div className={styles.imgContainer}>
              <Image src={CheckMark} />
            </div>
            <p className={styles.stepsCount}>STEP 1 OF 3</p>
            <h1 className={styles.stepsHeadings}>Choose your plan.</h1>
            <div>
              {benefitTxt.map((txt, index) => {
                return (
                  <li key={index} className={styles.benefitListItem}>
                    <Image src={CheckRed} />
                    <span className={styles.benefitListItemTxt}>{txt}</span>
                  </li>
                );
              })}
            </div>
          </section>
          <Link href="/signup/planform">
            <a className={styles.nextButton}>Next</a>
          </Link>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}

SignUp.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>{page}</AnimatePresence>
    </Layout>
  );
};

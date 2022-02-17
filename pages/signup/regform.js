import styles from "../../styles/signup/signup.module.css";
import Layout from "../layout";

import { motion, AnimatePresence } from "framer-motion";

import Footer from "../../components/footer/footerStyle2";
import Header from "../../components/signup/header";
import RegFormInput from "../../components/signup/regFormInput";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};
export default function RegForm() {
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
        <div className={styles.centerDivRegForm}>
          <section className={styles.mainContentRegForm}>
            <div style={{ width: "fit-content" }}>
              <p className={styles.stepsCount}>STEP 2 OF 3</p>
            </div>
            <div style={{ width: "fit-content" }}>
              <h1
                style={{ textAlign: "left" }}
                className={styles.stepsHeadings}
              >
                Create a password to start your membership
              </h1>
              <p className={styles.descriptionRegForm}>
                Just a few more steps and you're finished! <br />
                We hate paperwork, too.
              </p>
            </div>
            <RegFormInput />
          </section>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}

RegForm.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AnimatePresence exitBeforeEnter>{page}</AnimatePresence>
    </Layout>
  );
};

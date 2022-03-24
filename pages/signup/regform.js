import styles from "../../styles/signup.module.css";

import { motion, AnimatePresence } from "framer-motion";
import { withAuthUser, AuthAction } from "next-firebase-auth";

import Footer from "../../components/footer/footerStyle2";
import Header from "../../components/signup/header";
import RegFormInput from "../../components/signup/regFormInput";
import Loader from "../../components/Loader";
import Layout from "../layout";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};
export function RegForm() {
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
            <br />
            <div style={{ width: "fit-content" }}>
              <p className={styles.stepsCount}>STEP 2 OF 2</p>
            </div>
            <div style={{ width: "fit-content" }}>
              <h1
                style={{ textAlign: "left" }}
                className={styles.stepsHeadings}
              >
                Create a password to start your membership
              </h1>
              <p className={styles.descriptionRegForm}>
                Just a few more steps and you&apos;re finished! <br />
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

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(RegForm);

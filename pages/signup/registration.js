import styles from "../../styles/signup.module.css";
import Layout from "../layout";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Devices from "../../public/images/Devices.png";

import Footer from "../../components/footer/footerStyle2";
import Header from "../../components/signup/header";

import Loader from "../../components/Loader";
import { withAuthUser, AuthAction } from "next-firebase-auth";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};
export function Registration() {
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
          <section className={styles.mainContentReg}>
            <div className={styles.imgDevicesContainer}>
              <Image src={Devices} alt="" />
            </div>
            <p className={styles.stepsCount}>STEP 2 OF 3</p>
            <h1 className={styles.stepsHeadings}>
              Finish setting up your account
            </h1>
            <p style={{ padding: "0 15px" }} className={styles.descriptionStep}>
              Netflix is personalised for you. Create a password to watch on any
              device at any time.
            </p>
          </section>
          <Link href="/signup/regform">
            <a className={styles.nextButton}>Next</a>
          </Link>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}

Registration.getLayout = function getLayout(page) {
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
})(Registration);

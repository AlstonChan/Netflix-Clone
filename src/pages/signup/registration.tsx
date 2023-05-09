// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/styles/signup.module.scss";
import Devices from "@/public/images/Devices.png";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { responsive } from "@/styles/cssStyle";

import Loader from "@/components/Loader";
import SignUpLayout, { variants } from "@/components/signup/SignUpLayout";

import type { ReactNode } from "react";

export function Registration() {
  const btnClasses = `${styles.btn} ${styles.fill} ${styles.fillRedLink}`;

  return (
    <>
      <Head>
        <title>Registration | Netflix-Clone</title>
        <meta name="title" content="Registration | Netflix-Clone" key="title" />
      </Head>

      <motion.main
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: "linear" }} // Set the transition to linear
        className={styles.main}
      >
        <div className={styles.center}>
          <section className={styles.mainContentReg}>
            <div className={styles.imgContainer}>
              <Image src={Devices} alt="" style={responsive} />
            </div>
            <p className={styles.steps}>STEP 2 OF 2</p>
            <h1 className={styles.title}>Finish setting up your account</h1>
            <p style={{ padding: "0 15px" }} className={styles.desc}>
              Netflix is personalized for you. Create a password to watch on any
              device at any time.
            </p>
          </section>
          <Link href="/signup/regform" className={btnClasses}>
            Next
          </Link>
        </div>
      </motion.main>
    </>
  );
}

Registration.getLayout = function getLayout(children: ReactNode) {
  return <SignUpLayout>{children}</SignUpLayout>;
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(Registration);

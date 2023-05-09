// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/styles/signup.module.scss";

import Head from "next/head";

import { motion } from "framer-motion";
import { withAuthUser, AuthAction } from "next-firebase-auth";

import RegFormInput from "@/components/signup/RegFormInput";
import Loader from "@/components/Loader";
import SignUpLayout, { variants } from "@/components/signup/SignUpLayout";

import type { ReactNode } from "react";

export function RegForm() {
  return (
    <>
      <Head>
        <title>Reg Form | Netflix-Clone</title>
        <meta name="title" content="Reg Form | Netflix-Clone" key="title" />
      </Head>

      <motion.main
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: "linear" }} // Set the transition to linear
        className={styles.main}
      >
        <section className={styles.regForm}>
          <br />
          <p className={`${styles.steps} ${styles.left}`}>STEP 2 OF 2</p>
          <h1 className={`${styles.title} ${styles.left}`}>
            Create a password to start your membership
          </h1>
          <p className={styles.descriptionRegForm}>
            Just a few more steps and you&apos;re finished! <br />
            We hate paperwork, too.
          </p>
          <RegFormInput />
        </section>
      </motion.main>
    </>
  );
}

RegForm.getLayout = function getLayout(children: ReactNode) {
  return <SignUpLayout>{children}</SignUpLayout>;
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(RegForm);

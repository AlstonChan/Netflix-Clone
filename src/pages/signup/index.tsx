// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/styles/signup.module.scss";
import CheckMark from "@/public/images/icons/misc/rounded-checkmark.png";
import CheckMarkSvg from "@/components/icons/CheckMarkSvg";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { withAuthUser, AuthAction } from "next-firebase-auth";

import Loader from "@/components/Loader";
import SignUpLayout, { variants } from "@/components/signup/SignUpLayout";

import type { ReactNode } from "react";

const benefits = [
  "No commitments, cancel at any time.",
  "Everything on Netflix for one low price.",
  "Unlimited viewing on all your devices.",
];

export function SignUp() {
  const btnClasses = `${styles.btn} ${styles.fill} ${styles.fillRedLink}`;

  return (
    <>
      <Head>
        <title>Sign Up | Netflix-Clone</title>
        <meta name="title" content="Sign Up | Netflix-Clone" key="title" />
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
          <section className={styles.content}>
            <Image src={CheckMark} alt="check Mark" width="50" height="50" />
            <p className={styles.steps}>STEP 1 OF 2</p>
            <h1 className={styles.title}>Choose your plan.</h1>
            <div>
              {benefits.map((txt) => {
                return (
                  <li key={txt} className={styles.listItem}>
                    <CheckMarkSvg stColor="rgb(212, 60, 60)" />
                    <span className={styles.txt}>{txt}</span>
                  </li>
                );
              })}
            </div>
          </section>
          <Link href="/signup/planform" className={btnClasses}>
            Next
          </Link>
        </div>
      </motion.main>
    </>
  );
}

SignUp.getLayout = function getLayout(children: ReactNode) {
  return <SignUpLayout>{children}</SignUpLayout>;
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(SignUp);

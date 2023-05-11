// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/styles/signup.module.scss";
import CheckMarkSvg from "@/components/icons/CheckMarkSvg";

import Head from "next/head";
import Link from "next/link";

import { useRef } from "react";
import { motion } from "framer-motion";
import aes from "crypto-js/aes";

import PricingTable from "@/components/signup/pricingTable/PricingTable";
import SignUpLayout, { variants } from "@/components/signup/SignUpLayout";

import type { ReactNode } from "react";
import type { PackagePlanType } from "@/components/signup/pricingTable/types";

const benefits = [
  "Watch all you want. Advert-free.",
  "Recommendations just for you.",
  "Change or cancel your plan anytime.",
];

export default function PlanForm() {
  const selectedPlan = useRef<null | PackagePlanType>(null);

  const updatePlan = () => {
    const ref = selectedPlan.current;

    if (!ref) throw new Error("selectedPlan.current is falsy!");
    let nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";

    const encrypted = aes.encrypt(ref, nonce).toString();
    sessionStorage.setItem("plan", encrypted);
  };

  const btnClasses = `${styles.btn} ${styles.fill} ${styles.fillRedLink}`;

  return (
    <>
      <Head>
        <title>Choose Plan | Netflix-Clone</title>
        <meta name="title" content="Choose Plan | Netflix-Clone" key="title" />
      </Head>

      <motion.main
        variants={variants} // Pass the variant object into Framer Motion
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit" // Exit state (used later) to variants.exit
        transition={{ type: "linear" }} // Set the transition to linear
        className={styles.main}
      >
        <div className={styles.centerSmall}>
          <p className={`${styles.steps} ${styles.left}`}>STEP 1 OF 2</p>
          <h1 className={`${styles.title} ${styles.left}`}>
            Choose the plan that&apos;s right for you.
          </h1>
          <div>
            {benefits.map((txt) => {
              return (
                <li key={txt} className={styles.listItem}>
                  <CheckMarkSvg stColor="rgb(212, 60, 60)" />
                  <span className={styles.txt}>{txt}</span>
                </li>
              );
            })}
            <br />
            <PricingTable planRef={selectedPlan} />
            <div className={styles.terms}>
              <small className={styles.txt}>
                HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
                subject to your internet service and device capabilities. Not
                all content is available in all resolutions. See our{" "}
                <a href="" className={styles.link}>
                  Terms of Use
                </a>{" "}
                for more details.
              </small>
            </div>
            <div className={`${styles.terms} ${styles.last}`}>
              <small className={styles.txt}>
                Only people who live with you may use your account. Watch on 4
                different devices at the same time with Premium, 2 with Standard
                and 1 with Basic.
              </small>
            </div>
            <div className={styles.btnContainerNext}>
              <Link
                href="/signup/registration"
                className={btnClasses}
                onClick={updatePlan}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
}

PlanForm.getLayout = function getLayout(children: ReactNode) {
  return <SignUpLayout>{children}</SignUpLayout>;
};

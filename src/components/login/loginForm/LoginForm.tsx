// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./LoginForm.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";

import { useRef, useState } from "react";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AnimatePresence, motion } from "framer-motion";

import InputEmail from "@/components/common/input/InputEmail";
import InputPassword from "@/components/common/input/InputPassword";

import type { FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passInputRef = useRef<HTMLInputElement | null>(null);
  const rememberMeRef = useRef<HTMLInputElement | null>(null);

  const [showErrorBox, setShowErrorBox] = useState<boolean>(false);

  async function formSubmit(e: FormEvent) {
    e.preventDefault();

    const emailRef = emailInputRef.current;
    const passwordRef = passInputRef.current;
    const rememberRef = rememberMeRef.current;

    const loginHandler = async (email: string, password: string) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Logged in!\n", userCredential);
        router.replace("./browse");
        setShowErrorBox(false);
      } catch (error: any) {
        setShowErrorBox(true);
        console.error(error);
      }
    };

    if (emailRef !== null && passwordRef !== null && rememberRef !== null) {
      const email = emailRef.value;
      const password = passwordRef.value;
      const rememberMe = rememberRef.checked;

      //validation of email and password
      const passwordLength = password.length > 5 && password.length < 60;
      const regexValidateEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email.match(regexValidateEmail)) {
        if (passwordLength) {
          if (rememberMe) {
            loginHandler(email, password);
          } else {
            setPersistence(auth, browserSessionPersistence).then(() => {
              return loginHandler(email, password);
            });
          }
        } else passwordRef.focus();
      } else emailRef.focus();
    } else {
      const err =
        "email input, password input or remember me checkbox can't be found!";
      throw new Error(err);
    }
  }

  const warningBoxVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <>
      {/* login error message box  */}
      <AnimatePresence mode="wait">
        {showErrorBox && (
          <motion.div
            variants={warningBoxVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <p className={styles.content}>
              Sorry, we can&apos;t find an account with this email address or
              the password is incorrect. Please try again or{" "}
              <Link href="/" className={styles.createAccLink}>
                create a new account
              </Link>
              .
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <form className={styles.formFlex} onSubmit={(e) => formSubmit(e)}>
        <InputEmail
          ref={emailInputRef}
          inputId="signInFormInputEml"
          mode="dark"
          useLocalStorageData={false}
        />
        <InputPassword
          ref={passInputRef}
          inputId={"signInFormInputPas"}
          mode="dark"
          showHidePassword
          warnings="Your password must contain between 6 and 60 characters."
        />
        <div className={styles.btnContain}>
          <button
            className={`${styles.btn} ${styles.fillRounded} ${styles.lg}`}
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div className={styles.inputFoot}>
          <div className={styles.checkBoxContain}>
            <input
              ref={rememberMeRef}
              type="checkbox"
              name="checkRemember"
              id="checkRemember"
            />
            <label className={styles.rememberMe} htmlFor="checkRemember">
              Remember me
            </label>
          </div>
          <Link href="/" className={styles.helpLink}>
            Need Help?
          </Link>
        </div>
      </form>
    </>
  );
}

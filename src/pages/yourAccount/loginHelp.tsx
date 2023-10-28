// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston
import styles from "@/styles/loginHelp.module.scss";

import Head from "next/head";

import { useRef, useState } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

import Header from "@/components/common/header/Header";
import FooterStyle1 from "@/components/footer/FooterStyle2";
import InputEmail from "@/components/common/input/InputEmail";

import type { FormEvent } from "react";

export default function LoginHelp() {
  const [popUp, setPopUp] = useState<{
    isSuccess: boolean;
    msg: string;
    isVisible: boolean;
  }>({ isSuccess: false, msg: "", isVisible: false });
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailInputRef.current) throw new Error("Input Element is null!");

    const email = emailInputRef.current.value;

    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regexValidateEmail)) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setPopUp({
            isSuccess: true,
            msg: "a password reset email has sent to your inbox",
            isVisible: true,
          });
        })
        .catch(() => {
          setPopUp({
            isSuccess: false,
            msg: "An error occured when trying to send the mail",
            isVisible: true,
          });
        });
    } else emailInputRef.current.focus();
  };

  return (
    <>
      <Head>
        <title>Reset Password | Netflix-Clone</title>
        <meta
          name="title"
          content="Reset Password | Netflix-Clone"
          key="title"
        />
      </Head>

      <div className={styles.container}>
        <Header logoClickHome />
        <main className={styles.main}>
          <h1 className={styles.title}>Forgot Passowrd</h1>
          <p className={styles.desc}>
            We will send you an email with instructions on how to reset your
            password.
          </p>
          <form onSubmit={handleForm}>
            <InputEmail
              ref={emailInputRef}
              inputId="LoginHelpResetPassword"
              mode="light"
              warnings="Email should be between 5 and 50 characters."
              useLocalStorageData={false}
            />
            {/* buttons  */}
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.btn} ${styles.fill} ${styles.fillBlue}`}
                type="submit"
              >
                Email Me
              </button>
            </div>
          </form>
          {popUp.isVisible && (
            <div
              className={`${styles.popUp} ${
                popUp.isSuccess ? styles.success : styles.fail
              }`}
            >
              <p>{popUp.msg}</p>
            </div>
          )}
        </main>
        <FooterStyle1 />
      </div>
    </>
  );
}

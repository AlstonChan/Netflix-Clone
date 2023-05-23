// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/components/yourAccount/password.module.scss";

import Head from "next/head";
import Link from "next/link";

import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

import { useRef, useState } from "react";
import useUserData from "src/hooks/firestore/useUserData";
import useAuthState from "src/hooks/useAuthState";

import InputPassword from "@/components/common/input/InputPassword";
import FooterStyle2 from "@/components/footer/FooterStyle2";
import AccountHeader from "@/components/yourAccount/header/AccountHeader";
import Loader from "@/components/common/Loader/Loader";
import SnackBar from "@/components/common/snackbar/SnackBar";

import type { SnackBarStateType } from "@/components/common/snackbar/types";
import type { FormEvent } from "react";
import type { InputWarningRefType } from "@/components/common/input/InputPassword";

export default function Password() {
  const [user, isLoading, error] = useAuthState();
  const [userData, dbError] = useUserData();
  // warning state
  const [inputWarn, setInputWarn] = useState<InputWarningRefType>({
    name: "current",
    state: false,
    err: "none",
  });
  const [inputWarnNew, setInputWarnNew] = useState<InputWarningRefType>({
    name: "new",
    state: false,
    err: "none",
  });
  const [inputWarnConf, setInputWarnConf] = useState<InputWarningRefType>({
    name: "confirm",
    state: false,
    err: "none",
  });

  // input ref
  const currentPassword = useRef<HTMLInputElement | null>(null);
  const newPassword = useRef<HTMLInputElement | null>(null);
  const confirmPassword = useRef<HTMLInputElement | null>(null);

  const closeSnackBar: SnackBarStateType = {
    isOpen: false,
    msg: "",
    variant: "error",
  };
  const [snackBarState, setSnackBarState] =
    useState<SnackBarStateType>(closeSnackBar);

  // close function for snackbar
  const onClose = () => {
    setSnackBarState(closeSnackBar);
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentPasswordElement = currentPassword.current;
    const newPasswordElement = newPassword.current;
    const confirmPasswordElement = confirmPassword.current;

    if (
      !currentPasswordElement ||
      !newPasswordElement ||
      !confirmPasswordElement
    )
      throw new Error("Input Element is null!");

    let cuPass = currentPasswordElement.value;
    let newPass = newPasswordElement.value;
    let conPass = confirmPasswordElement.value;

    if (user) {
      const providers: string[] = [];
      user.providerData.forEach((provider) => {
        providers.push(provider.providerId);
      });

      try {
        if (cuPass.length <= 0) return;
        if (newPass.length >= 6 && newPass.length <= 60) {
          if (newPass === conPass) {
            if (providers.includes("password") && user.email) {
              const credential = EmailAuthProvider.credential(
                user.email,
                cuPass
              );
              await reauthenticateWithCredential(user, credential);
              await updatePassword(user, newPass);
              setSnackBarState({
                isOpen: true,
                msg: "Password Changed",
                variant: "success",
              });
              cuPass = "";
              newPass = "";
              conPass = "";
            }
          } else {
            confirmPasswordElement.focus();
            setInputWarnConf({
              name: "confirm",
              state: true,
              err: "",
            });
          }
        } else {
          newPasswordElement.focus();
          setInputWarnNew({
            name: "new",
            state: true,
            err: "",
          });
        }
      } catch (error: any) {
        currentPasswordElement.focus();
        if (error.message.includes("auth/wrong-password")) {
          setInputWarn({
            name: "current",
            state: true,
            err: "auth/wrong-password",
          });
        }
        if (error.message.includes("auth/too-many-requests")) {
          setInputWarn({
            name: "current",
            state: true,
            err: "auth/too-many-requests",
          });
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Account Setting | Netflix-Clone</title>
        <meta
          name="title"
          content="Account Setting | Netflix-Clone"
          key="title"
        />
      </Head>

      <SnackBar
        variant={snackBarState.variant || "error"}
        message={snackBarState.msg}
        isOpen={snackBarState.isOpen}
        onClose={onClose}
      />

      <main className={styles.main}>
        <div style={{ backgroundColor: "#000" }}>
          <AccountHeader />
        </div>
        <article className={styles.centerContent}>
          {userData && user && !isLoading ? (
            <div style={{ maxWidth: "500px" }}>
              {/* header  */}
              <section className={styles.headings}>
                <h2 className={styles.mainHeaders}>Change Password</h2>
              </section>
              <br />
              {/* forms  */}
              <form onSubmit={(e) => handleForm(e)}>
                <InputPassword
                  ref={currentPassword}
                  inputId="currentP"
                  mode="light"
                  showHidePassword={false}
                  warningsRef={inputWarn}
                  label="Current Password"
                  caption="Forgot password?"
                  warnings="Incorrect Password"
                />
                <br />
                <InputPassword
                  ref={newPassword}
                  inputId="newP"
                  mode="light"
                  showHidePassword={false}
                  warningsRef={inputWarnNew}
                  label="New password (6-60 characters)"
                />
                <br />
                <InputPassword
                  ref={confirmPassword}
                  inputId="confirmP"
                  mode="light"
                  showHidePassword={false}
                  warningsRef={inputWarnConf}
                  label="Confirm new password"
                  warnings="Your password does not match"
                  matchPass={newPassword}
                />
                <br />
                {/* buttons  */}
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.btn} ${styles.save}`}
                    type="submit"
                  >
                    Save
                  </button>
                  <Link
                    className={`${styles.btn} ${styles.cancel}`}
                    href="/yourAccount"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <Loader padding="top" fit mode="light" />
          )}
        </article>
        <FooterStyle2 />
      </main>
    </>
  );
}

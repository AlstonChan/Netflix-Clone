// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import signUpStyles from "@/styles/signup.module.scss";

import { useRef } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import { db, auth } from "@/lib/firebase";

import InputEmail from "@/components/common/input/InputEmail";
import InputPassword from "@/components/common/input/InputPassword";

import type { FormEvent } from "react";

export default function RegFormInput() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passInputRef = useRef<HTMLInputElement | null>(null);

  function formSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const emailElement = emailInputRef.current;
    const passwordElement = passInputRef.current;

    if (emailElement === null) {
      throw new Error("emailInputRef.current is null!");
    }
    if (passwordElement === null) {
      throw new Error("emailInputRef.current is null!");
    }

    const email = emailElement.value;
    const password = passwordElement.value;
    const sessionData = window.sessionStorage.getItem("plan");

    if (!sessionData) {
      return console.error("No plan is chosen");
    }
    let nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";
    const plan = aes.decrypt(sessionData, nonce).toString(CryptoJS.enc.Utf8);
    //validation of email and password
    const passwordLength = password.length > 5 && password.length < 60;

    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regexValidateEmail)) {
      if (passwordLength && plan) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            if (userCredential.user.email)
              setDoc(doc(db, "Acc", userCredential.user.uid), {
                uid: userCredential.user.uid,
                createdAt: Date(),
                plan,
                "user-main": {
                  name: userCredential.user.email.split("@").shift(),
                  pic: Math.ceil(Math.random() * 4),
                },
              });
          })
          .then(() => window.sessionStorage.removeItem("user"))
          .then(() => window.sessionStorage.removeItem("plan"))
          .catch((error) => {
            const { code, message } = error;
            console.error(message);
          });
      } else passwordElement.focus();
    } else emailElement.focus();
  }

  const btnClasses = `${signUpStyles.btn} ${signUpStyles.fill} ${signUpStyles.fillRedLink}`;

  return (
    <form className={signUpStyles.formFlex} onSubmit={(e) => formSubmit(e)}>
      <InputEmail
        ref={emailInputRef}
        inputId={"RegFormInputEml"}
        mode="light"
        warnings="Email should be between 5 and 50 characters."
        useLocalStorageData
      />
      <InputPassword
        ref={passInputRef}
        inputId={"RegFormInputPas"}
        mode="light"
        showHidePassword={false}
      />

      <button className={btnClasses} type="submit">
        Next
      </button>
    </form>
  );
}

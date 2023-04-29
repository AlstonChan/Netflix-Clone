import signUpStyles from "@/styles/signup.module.css";

import { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import { db, auth } from "@/lib/firebase";

import InputEmail from "../login/InputEmail";
import InputPassword from "../login/InputPassword";

export default function RegFormInput() {
  const emailInputRef = useRef();
  const passInputRef = useRef();

  function formSubmit(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;
    const sessionData = window.sessionStorage.getItem("plan");
    const plan = aes
      .decrypt(sessionData, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
      .toString(CryptoJS.enc.Utf8);
    //validation of email and password
    const passwordLength = password.length > 5 && password.length < 60;

    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regexValidateEmail)) {
      if (passwordLength && plan) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
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
      } else passInputRef.current.focus();
    } else emailInputRef.current.focus();
  }
  return (
    <form className={signUpStyles.formFlex} onSubmit={(e) => formSubmit(e)}>
      <InputEmail
        setRef={emailInputRef}
        inputId={"RegFormInputEml"}
        mode="light"
        warnings="Email should be between 5 and 50 characters."
        useLocalStorageData
      />
      <InputPassword
        setRef={passInputRef}
        inputId={"RegFormInputPas"}
        mode="light"
        showHidePassword={false}
      />

      <button className={`${signUpStyles.nextButton}`} type="submit">
        Next
      </button>
    </form>
  );
}

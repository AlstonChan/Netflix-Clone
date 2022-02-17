import { useRef, useState } from "react";
import router from "next/router";

import styles from "../../styles/login.module.css";
import Link from "next/link";
import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LoginForm() {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const rememberMeRef = useRef();

  const [logInErrorClass, setLogInErrorClass] = useState(
    `${styles.logInErrorBox}`
  );

  function formSubmit(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;
    const rememberMe = rememberMeRef.current.checked;

    //validation of email and password
    const passwordLength = password.length > 5 && password.length < 60;
    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regexValidateEmail)) {
      if (passwordLength) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("Logged in");
            router.replace("./browse");
          })
          .catch((error) => {
            const { code, message } = error;
            if (
              code === "auth/user-not-found" ||
              code === "auth/wrong-password"
            ) {
              setLogInErrorClass(`${styles.warnShow} ${styles.logInErrorBox}`);
            }
            console.log(message);
          });
      } else passInputRef.current.focus();
    } else emailInputRef.current.focus();
  }
  return (
    <>
      <div className={logInErrorClass}>
        <p className={styles.logInErrorClassContent}>
          Sorry, we can&apos;t find an account with this email address. Please
          try again or{" "}
          <Link href="/">
            <a className={styles.createAccLink}>create a new account</a>
          </Link>
          .
        </p>
      </div>
      <form
        action="/login"
        className={styles.formFlex}
        onSubmit={(e) => formSubmit(e)}
      >
        <InputEmail
          setRef={emailInputRef}
          inputId={"signInFormInputEml"}
          page={"LoginForm"}
        />
        <InputPassword
          setRef={passInputRef}
          inputId={"signInFormInputPas"}
          page={"LoginForm"}
        />
        <div className={styles.btnContain}>
          <button className={`netflixBtn ${styles.submitBtn}`} type="submit">
            Sign In
          </button>
        </div>
        <div className={styles.inputFoot}>
          <div className={styles.checkBoxContain}>
            <input
              className={styles.checkRememberInput}
              ref={rememberMeRef}
              type="checkbox"
              name="checkRemember"
              id="checkRemember"
            />
            <label
              className={styles.checkRememberLabel}
              htmlFor="checkRemember"
            >
              Remember me
            </label>
          </div>
          <Link href="/">
            <a className={styles.helpLink}>Need Help?</a>
          </Link>
        </div>
      </form>
    </>
  );
}

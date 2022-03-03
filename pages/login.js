import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "../styles/login.module.css";
import Footer from "../components/footer/footerStyle2";
import LoginForm from "../components/login/loginForm";

import Loader from "../components/Loader";

import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../lib/firebase";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Login() {
  async function loginGoogleEvent(e) {
    e.preventDefault();
    const credentials = await signInWithPopup(auth, provider);
    const { uid, displayName, email, photoURL } = credentials.user;

    const docRef = await getDoc(doc(db, "Acc", uid));

    if (docRef.exists() === false) {
      setDoc(doc(db, "Acc", uid), {
        uid,
        "user-main": {
          name: displayName ? displayName : email.split("@").shift(),
          pic: photoURL ? photoURL : Math.ceil(Math.random() * 4),
        },
      });
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.shade}>
          <header className={styles.head}>
            <div className={styles.netflixLogoContainer}>
              <Link href="/">
                <a>
                  <Image
                    src="/images/NetflixLogo.png"
                    className={styles.netflixLogo}
                    alt="Netflix logo"
                    width="166px"
                    height="49.6px"
                    priority
                  />
                </a>
              </Link>
            </div>
          </header>
          <div className={styles.loginContainer}>
            <h1 className={styles.loginHead}>Sign In</h1>
            <LoginForm />
            <div className={styles.containerFoot}>
              <div
                className={styles.loginGoogle}
                onClick={(e) => loginGoogleEvent(e)}
              >
                <Image
                  src="/images/Google Logo.png"
                  className={styles.googleIcon}
                  alt="Netflix logo"
                  width="25"
                  height="20"
                />
                <span className={styles.loginTxt}>Login with Google</span>
              </div>
              <div className={styles.singUpContainer}>
                <p>New to Netflix?</p>
                <Link href="/">
                  <a>Sign up now</a>
                </Link>
              </div>
              <GoogleCaptcha />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(Login);

export function GoogleCaptcha() {
  const [showCaptchaClass, setShowCaptchaClass] = useState({
    txt: `${styles.captchaContent}`,
    btn: `${styles.googleCaptchaBtn}`,
  });

  function showCaptchaContent(e) {
    e.preventDefault();
    setShowCaptchaClass({
      txt: `${styles.captchaContent} ${styles.captchaShow}`,
      btn: `${styles.googleCaptchaBtn} ${styles.btnHide}`,
    });
  }
  return (
    <>
      <div className={styles.googleCaptcha}>
        <span className={styles.googleCaptchaTxt}>
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a
          bot.
        </span>
        <button
          onClick={(e) => showCaptchaContent(e)}
          className={showCaptchaClass.btn}
        >
          Learn more
        </button>
      </div>
      <div className={showCaptchaClass.txt}>
        <p className={styles.captchaTerm}>
          The information collected by Google reCAPTCHA is subject to the
          Google&nbsp;
          <a
            href="https://policies.google.com/privacy"
            rel="noreferrer nofollow"
            className={styles.captchLink}
          >
            Privacy Policy
          </a>{" "}
          and&nbsp;
          <a
            href="https://policies.google.com/terms"
            rel="noreferrer nofollow"
            className={styles.captchLink}
          >
            Terms of Service
          </a>{" "}
          , and is used for providing, maintaining, and improving the reCAPTCHA
          service and for general security purposes (it is not used for
          personalized advertising by Google).
        </p>
      </div>
    </>
  );
}

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "../styles/login.module.css";
import Footer from "../components/footer/footerStyle2";
import LoginForm from "../components/login/loginForm";
import router from "next/router";

import Loader from "../components/Loader";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import { withAuthUser, AuthAction } from "next-firebase-auth";

function Login() {
  function loginGoogleEvent(e) {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        router.replace("./browse");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
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

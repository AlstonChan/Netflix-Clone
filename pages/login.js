import styles from "@/styles/login.module.css";
import NetflixLogo from "@/public/images/logo.png";
import GoogleLogo from "@/public/images/google.png";

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "@/lib/firebase";
import { responsive } from "@/styles/cssStyle";

import Footer from "@/components/footer/FooterStyle2";
import LoginForm from "@/components/login/LoginForm";
import Loader from "@/components/Loader";

export function Login() {
  async function loginGoogleEvent(e) {
    e.preventDefault();
    try {
      const credentials = await signInWithPopup(auth, provider);
      const { uid, displayName, email, photoURL } = credentials.user;

      const docRef = await getDoc(doc(db, "Acc", uid));

      if (docRef.exists() === false) {
        setDoc(doc(db, "Acc", uid), {
          uid,
          createdAt: Date(),
          plan: "Standard",
          "user-main": {
            name: displayName ? displayName : email.split("@").shift(),
            pic: photoURL ? photoURL : Math.ceil(Math.random() * 4),
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>Netflix Clone - Login</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.shade}>
          <header className={styles.head}>
            <div className={styles.netflixLogoContainer}>
              <Link href="/">
                <Image
                  src={NetflixLogo}
                  className={styles.NetflixLogo}
                  alt="Netflix logo"
                  width={166}
                  height={49.6}
                  priority
                  style={responsive}
                />
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
                <div className={styles.googleIconContainer}>
                  <Image
                    src={GoogleLogo}
                    alt="Google Logo"
                    width={25}
                    height={20}
                    style={responsive}
                    unoptimized
                  />
                </div>
                <span className={styles.loginTxt}>Login with Google</span>
              </div>
              <div className={styles.singUpContainer}>
                <p>New to Netflix?</p>
                <Link href="/">Sign up now</Link>
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

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/styles/login.module.scss";
import GoogleLogo from "@/public/images/google.png";

import Link from "next/link";
import Head from "next/head";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Image from "@chan_alston/image";
import { auth, db, provider } from "@/lib/firebase";

import SnackBar from "@/components/common/snackbar/SnackBar";
import Footer from "@/components/footer/FooterStyle2";
import LoginForm from "@/components/login/loginForm/LoginForm";
import Loader from "@/components/Loader";
import GoogleCaptcha from "@/components/login/googleCaptcha/GoogleCaptcha";
import Header from "@/components/common/header/Header";

import type { SnackBarStateType } from "@/components/common/snackbar/types";

export function Login() {
  const [snackBarState, setSnackBarState] = useState<SnackBarStateType>({
    isOpen: false,
    msg: "",
  });

  const onClose = () => {
    setSnackBarState({ isOpen: false, msg: "" });
  };

  async function loginGoogleEvent() {
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
            name: displayName ? displayName : email?.split("@").shift(),
            pic: photoURL ? photoURL : Math.ceil(Math.random() * 4),
          },
        });
      }
    } catch (error: any) {
      setSnackBarState({ isOpen: true, msg: error.message });
    }
  }

  return (
    <>
      <Head>
        <title>Login | Netflix-Clone</title>
        <meta name="title" content="Login | Netflix-Clone" key="title" />
      </Head>

      {/* header  */}

      <div className={styles.container}>
        <Header logoClickHome signInBox={false} />

        {/* content  */}
        <section className={styles.loginContainer}>
          <div className={styles.content}>
            <h1 className={styles.title}>Sign In</h1>
            <LoginForm />
            <div className={styles.loginGoogle} onClick={loginGoogleEvent}>
              <Image src={GoogleLogo} alt="Google Logo" w={25} h={20} />
              <span className={styles.loginTxt}>Login with Google</span>
            </div>
            <div className={styles.signUpContainer}>
              <p>New to Netflix?</p>
              <Link href="/">Sign up now</Link>
            </div>
            <GoogleCaptcha />
          </div>
        </section>

        {/* footer  */}
        <div className={styles.highComponent}>
          <Footer />
        </div>
      </div>
      <SnackBar
        variant="error"
        message={snackBarState.msg}
        isOpen={snackBarState.isOpen}
        onClose={onClose}
      />
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

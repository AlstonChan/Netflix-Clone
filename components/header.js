import { useState, useContext, useEffect } from "react";
import useIsomorphicLayoutEffect from "../lib/isomorphic-layout";
import { UserContext } from "../pages/_app";

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

import Image from "next/image";
import styles from "../styles/header.module.css";
import router from "next/router";

export default function Header({ logoClickHome }) {
  const { user, loading } = useContext(UserContext);
  //Set button text according to the auth state (Sign in/Sign out)
  const [isSignIn, setIsSignIn] = useState(false);

  //Make netflix logo have cursor pointer and able to navigate
  //back to homepage
  const [logoPointerActive, setLogoPointerActive] = useState(
    `${styles.netflixLogoContainer}`
  );

  useEffect(() => {
    if (logoClickHome) {
      setLogoPointerActive(
        `${styles.logoPointer} ${styles.netflixLogoContainer}`
      );
    }
  }, [logoClickHome]);

  useIsomorphicLayoutEffect(() => {
    if (user) {
      setIsSignIn(true);
    }
  }, [user]);

  function backToHome(e) {
    e.preventDefault();
    if (logoClickHome) {
      router.push("/");
    }
  }

  function checkIfSignIn(e) {
    e.preventDefault();
    if (loading) return;
    if (user) {
      signOut(auth).then(() => {
        setIsSignIn(false);
        router.push("/logout");
      });
    } else {
      router.push("/login");
    }
  }
  return (
    <>
      <header className={styles.main}>
        <div className={styles.mainContain}>
          <div className={logoPointerActive} onClick={(e) => backToHome(e)}>
            <Image
              src="/images/NetflixLogo.png"
              className={styles.netflixLogo}
              alt="Netflix logo"
              width="160px"
              height="43.6px"
              priority
            />
          </div>
          <button
            onClick={(e) => checkIfSignIn(e)}
            type="submit"
            className={`netflixBtn ${styles.submitBtn}`}
          >
            <span className={styles.btnTxt}>
              {isSignIn ? "Sign Out" : "Sign In"}
            </span>
          </button>
        </div>
      </header>
    </>
  );
}

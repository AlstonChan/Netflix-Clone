import styles from "@/styles/header.module.css";
import NetflixLogo from "@/public/images/logo.png";

import Image from "next/image";
import router from "next/router";

import { useState, useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayout";
import { UserContext } from "../pages/_app";
import { auth } from "../lib/firebase";
import { responsive } from "@/styles/cssStyle";

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
              src={NetflixLogo}
              className={styles.netflixLogo}
              alt="Netflix logo"
              width="160"
              height="43.6"
              priority
              style={responsive}
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

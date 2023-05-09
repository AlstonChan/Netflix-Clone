// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./header.module.scss";
import NetflixLogo from "@/public/images/logo.png";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useContext } from "react";
import { signOut } from "firebase/auth";
import useIsomorphicLayoutEffect from "@/lib/useIsomorphicLayout";
import { UserContext } from "@/pages/_app";
import { auth } from "@/lib/firebase";
import { responsive } from "@/styles/cssStyle";

interface HeaderProps {
  logoClickHome?: boolean;
  signInBox?: boolean;
  mode?: "light" | "dark";
}

export default function Header({
  logoClickHome = false,
  signInBox = true,
  mode = "dark",
}: HeaderProps) {
  const router = useRouter();
  const { user, loading } = useContext(UserContext);
  //Set button text according to the auth state (Sign in/Sign out)
  const [isSignIn, setIsSignIn] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (user) {
      setIsSignIn(true);
    }
  }, [user]);

  function checkIfSignIn() {
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

  const imgStyles = {
    display: "inline-block",
    verticalAlign: "middle",
    ...responsive,
  };

  const headerContainerStyle = `${styles.container} ${
    mode === "light" ? styles.light : ""
  }`;
  const buttonStyle = `${styles.btn} ${styles.right} ${
    mode === "light" ? styles.empty : ""
  }`;

  return (
    <header className={headerContainerStyle}>
      {logoClickHome ? (
        <Link href="/" className={styles.logoContainer}>
          <Image
            src={NetflixLogo}
            alt="Netflix-Clone logo"
            width="160"
            height="43.6"
            priority
            style={imgStyles}
          />
        </Link>
      ) : (
        <div className={styles.logoContainer}>
          <Image
            src={NetflixLogo}
            alt="Netflix-Clone logo"
            width="160"
            height="43.6"
            priority
            style={imgStyles}
          />
        </div>
      )}

      {signInBox && (
        <button onClick={checkIfSignIn} type="submit" className={buttonStyle}>
          {isSignIn ? "Sign Out" : "Sign In"}
        </button>
      )}
    </header>
  );
}

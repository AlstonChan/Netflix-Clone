// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./membership.module.scss";

import Link from "next/link";

import { User, sendEmailVerification } from "firebase/auth";

import type { SnackBarStateType } from "@/components/common/snackbar/types";

interface Membership {
  user: User;
  setSnackBarState: (snackBarOption: SnackBarStateType) => void;
}

export default function Membership({ user, setSnackBarState }: Membership) {
  const verifyUser = async () => {
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      setSnackBarState({
        title: "",
        variant: "success",
        msg: "Verification Email has sent to your inbox",
        isOpen: true,
      });
    }
  };

  const verificationBtnClass = `${styles.link}  ${
    user.emailVerified && styles.disabled
  }`;

  return (
    <div className={styles.container}>
      <hr className={`${styles.divider} ${styles.invert}`} />
      <section className={styles.content}>
        <div className={styles.left}>
          <h2 className={styles.title}>MEMBERSHIP</h2>
        </div>
        <div className={styles.right}>
          <div className={styles.userInfo}>
            {/* left side header  */}
            <div>
              <p className={`${styles.header} ${styles.bold}`}>{user.email}</p>
              <p className={`${styles.header} ${styles.light}`}>
                Email:{" "}
                <span
                  className={user.emailVerified ? styles.success : styles.error}
                >
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </span>
              </p>
              <p className={`${styles.header} ${styles.light}`}>
                Password: ********
              </p>
            </div>

            {/* right side info  */}
            <div className={styles.userInfoLink}>
              <hr className={styles.divider} />
              <button className={`${styles.link} ${styles.disabled}`} disabled>
                Change account email
              </button>
              <hr className={styles.divider} />
              <button
                className={verificationBtnClass}
                onClick={() => verifyUser()}
              >
                Verify email
              </button>
              <hr className={styles.divider} />
              <Link className={styles.link} href="/yourAccount/password">
                Change password
              </Link>
              <hr className={styles.divider} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

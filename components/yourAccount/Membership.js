import styles from "@/styles/yourAccount/yourAccount.module.css";

import Link from "next/link";

import { sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import PasswordModal from "./PasswordModal";

export default function Membership({ user, divider }) {
  const [respondPopup, setRespondPopup] = useState({
    state: "none",
    msg: "none",
  });

  const manageUser = (type) => {
    if (!user.emailVerified && type === "verify") {
      sendEmailVerification(user).then(() =>
        setRespondPopup({ state: "success", msg: "Email verification sent!" })
      );
    }
  };

  if (respondPopup.state === "success") {
    setTimeout(
      () =>
        setRespondPopup({
          state: "none",
          msg: "none",
        }),
      5000
    );
  }

  useEffect(() => {
    if (user.emailVerified) {
      setRespondPopup({
        state: "verified",
        msg: "none",
      });
    }
  }, [user.emailVerified]);

  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.subHeaders}>MEMBERSHIP</h2>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.userInfo}>
          <div className={styles.userInfoTitle}>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userEmailVerified}>
              Email
              {user.emailVerified ? (
                <span className={styles.userEmailVerifiedTrue}>
                  &nbsp;Verified
                </span>
              ) : (
                <span className={styles.userEmailVerifiedFalse}>
                  &nbsp;Not Verified
                </span>
              )}
            </p>
            <p className={styles.userPassword}>Password: ********</p>
          </div>
          <div className={styles.userInfoLink}>
            {divider ? "" : <hr className={styles.divider} />}
            <p className={`${styles.linkUpdate} ${styles.linkUpdateDisabled}`}>
              Change account email
            </p>
            {divider ? "" : <hr className={styles.divider} />}
            <p
              className={`${styles.linkUpdate} ${
                user.emailVerified && styles.linkUpdateDisabled
              }`}
              onClick={() => manageUser("verify")}
            >
              Verify email
            </p>
            {divider ? "" : <hr className={styles.divider} />}
            <p className={styles.linkUpdate}>
              <Link href="/yourAccount/password">Change passowrd</Link>
            </p>
            {divider ? "" : <hr className={styles.divider} />}
          </div>
        </div>
        <AnimatePresence>
          {respondPopup.state === "success" && (
            <PasswordModal content={respondPopup.msg} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import styles from "../../styles/yourAccount/yourAccount.module.css";

import Link from "next/link";

import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";

export default function Membership({ user, divider }) {
  const [respondPopup, setRespondPopup] = useState();

  const manageUser = (type) => {
    if (!user.emailVerified && type === "verify") {
      sendEmailVerification(user).then(() =>
        setRespondPopup({ state: "success", msg: "Email verification sent!" })
      );
    }
  };
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
            <p className={styles.linkUpdate}>Change account email</p>
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
              <Link href="/yourAccount/password">
                <a>Change passowrd</a>
              </Link>
            </p>
            {divider ? "" : <hr className={styles.divider} />}
          </div>
        </div>
      </div>
    </section>
  );
}

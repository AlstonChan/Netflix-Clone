import styles from "../../styles/yourAccount.module.css";

export default function Membership({ user, divider }) {
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
            <p className={styles.linkUpdate}>
              <a href="">Change account email</a>
            </p>
            {divider ? "" : <hr className={styles.divider} />}
            <p className={styles.linkUpdate}>
              <a href="">Verify email</a>
            </p>
            {divider ? "" : <hr className={styles.divider} />}
            <p className={styles.linkUpdate}>
              <a href="">Change passowrd</a>
            </p>
            {divider ? "" : <hr className={styles.divider} />}
          </div>
        </div>
      </div>
    </section>
  );
}

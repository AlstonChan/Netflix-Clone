import styles from "../../styles/yourAccount.module.css";

export default function PlanDetails({ userData }) {
  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.subHeaders}>Plan Details</h2>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.userInfo}>
          <div className={styles.userInfoTitle}>
            <p className={styles.userEmail}>{userData.plan}</p>
          </div>
          <div className={styles.userInfoLink}>
            <p className={styles.linkUpdate}>
              <a href="">Change plan</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

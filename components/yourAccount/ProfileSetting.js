import styles from "../../styles/yourAccount.module.css";

import UserBar from "./UserBar";

export default function ProfileSetting({ userData }) {
  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.subHeaders}>Profile</h2>
      </div>
      <div className={styles.contentContainer}>
        <UserBar userData={userData["user-main"]} />
        <hr className={styles.divider} />
        <UserBar userData={userData["user-sec0"]} />
      </div>
    </section>
  );
}

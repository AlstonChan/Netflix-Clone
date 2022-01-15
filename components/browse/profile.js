import styles from "../../styles/browse/profile.module.css";
import Image from "next/image";
import ProfilePic from "../../public/images/profile pic/1.png";
import ProfileAdd from "../../public/images/netflix-profile-add.png";

export default function Profile({ switchPage }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.imgLogo}>
          <Image
            src="/images/NetflixLogo.png"
            width="150px"
            height="40.875px"
            alt="netflix logo"
          />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.divContainer}>
          <h1 className={styles.headingMain}>Who's watching?</h1>
          <div className={styles.profile}>
            <li
              tabIndex="0"
              onClick={switchPage}
              className={styles.listItemProfile}
            >
              <div className={styles.avatarContainer}>
                <Image src={ProfilePic} className={styles.profilePic} />
              </div>
              <span className={styles.nameContain}>
                <p className={styles.name}>Chan</p>
              </span>
            </li>
            <li tabIndex="0" className={styles.listItemProfile}>
              <div className={styles.avatarContainer}>
                <Image
                  src={ProfileAdd}
                  className={`${styles.profilePic} ${styles.profileAdd}`}
                />
              </div>
              <span className={styles.nameContain}>
                <p className={styles.name}>Add Profile</p>
              </span>
            </li>
          </div>
        </div>
        <div className={styles.manageContainer}>
          <button className={styles.manageProfilesBtn}>Manage Profiles</button>
        </div>
      </main>
    </div>
  );
}

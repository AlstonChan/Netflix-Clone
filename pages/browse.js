import styles from "../styles/browse.module.css";
import Image from "next/image";
import Link from "next/link";
import ProfilePic from "../public/images/netflix-profile-placeholder.png";
import ProfileAdd from "../public/images/netflix-profile-add.png";

export default function Browse() {
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
            <li tabIndex="0" className={styles.listItemProfile}>
              <Link href="">
                <a>
                  <div className={styles.avatarContainer}>
                    <Image src={ProfilePic} className={styles.profilePic} />
                  </div>
                  <span className={styles.nameContain}>
                    <p className={styles.name}>Chan</p>
                  </span>
                </a>
              </Link>
            </li>
            <li tabIndex="0" className={styles.listItemProfile}>
              <Link href="">
                <a>
                  <div className={styles.avatarContainer}>
                    <Image
                      src={ProfileAdd}
                      className={`${styles.profilePic} ${styles.profileAdd}`}
                    />
                  </div>
                  <span className={styles.nameContain}>
                    <p className={styles.name}>Add Profile</p>
                  </span>
                </a>
              </Link>
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

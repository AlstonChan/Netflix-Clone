import styles from "../../styles/browse/profile.module.css";
import Image from "next/image";
import ProfileAdd from "../../public/images/netflix-profile-add.png";

import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../pages/_app";

export default function Profile({ switchPage }) {
  const { userData } = useContext(UserContext);

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
          <h1 className={styles.headingMain}>Who&apos;s watching?</h1>
          <div className={styles.profile}>
            <Link href="/browse">
              <a>
                <li
                  tabIndex="0"
                  onClick={() => switchPage(userData["user-main"].name)}
                  className={styles.listItemProfile}
                >
                  <div className={styles.avatarContainer}>
                    {userData ? (
                      <Image
                        src={userData["user-main"].pic}
                        width="320px"
                        height="320px"
                        className={styles.profilePic}
                        alt="User profile Picture"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <span className={styles.nameContain}>
                    <p className={styles.name}>
                      {userData ? userData["user-main"].name : ""}
                    </p>
                  </span>
                </li>
              </a>
            </Link>
            <li
              tabIndex="0"
              className={styles.listItemProfile}
              style={{ marginRight: "0" }}
            >
              <div className={styles.avatarContainer}>
                <Image
                  src={ProfileAdd}
                  className={`${styles.profilePic} ${styles.profileAdd}`}
                  alt="User profile Picture"
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

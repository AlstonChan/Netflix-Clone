import styles from "../../../styles/browse/profile.module.css";
import Image from "next/image";

import { useState } from "react";

import MainProfile from "./mainProfile";
import AddProfile from "./addProfile";

export default function Profile({ switchPage }) {
  const [profileModal, setProfileModal] = useState(false);
  function addProfile() {
    setProfileModal(true);
  }

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
          {profileModal ? (
            <AddProfile back={setProfileModal} />
          ) : (
            <MainProfile switchPage={switchPage} addProfile={addProfile} />
          )}
        </div>
      </main>
    </div>
  );
}

import styles from "../styles/browse/browse.module.css";
import { useState } from "react";

import Header from "../components/browse/header";
import Profile from "../components/browse/profile";
import Cards from "../components/browse/cards";
import Featured from "../components/browse/featured";

export default function Browse() {
  const [profile, setProfile] = useState(false);

  function switchPage() {
    setProfile(true);
  }

  return profile ? (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <span className={styles.featuredMain}>
            <Featured />
          </span>
          <Cards />
          <div>yes</div>
        </main>
      </div>
    </>
  ) : (
    <Profile switchPage={switchPage} />
  );
}

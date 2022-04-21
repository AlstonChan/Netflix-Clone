import styles from "../../styles/header.module.css";
import baseStyles from "../../styles/yourAccount.module.css";

import Image from "next/image";
import router from "next/router";

import UserComponent from "../browse/header/UserComponent";

export default function AccountHeader() {
  function backToHome(e) {
    e.preventDefault();
    router.push("/browse");
  }

  return (
    <>
      <header className={styles.main}>
        <div className={styles.mainContain}>
          <div
            className={`${styles.logoPointer} ${styles.netflixLogoContainer}`}
            onClick={(e) => backToHome(e)}
          >
            <Image
              src="/images/NetflixLogo.png"
              className={styles.netflixLogo}
              alt="Netflix logo"
              width="160px"
              height="43.6px"
              priority
            />
          </div>
          <div className={baseStyles.userHeader}>
            <UserComponent />
          </div>
        </div>
      </header>
    </>
  );
}

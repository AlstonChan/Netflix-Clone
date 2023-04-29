import styles from "@/styles/header.module.css";
import baseStyles from "@/styles/yourAccount/yourAccount.module.css";
import NetflixLogo from "@/public/images/logo.png";

import Image from "next/image";
import router from "next/router";

import UserComponent from "../browse/header/UserComponent";
import { responsive } from "@/styles/cssStyle";

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
              src={NetflixLogo}
              className={styles.netflixLogo}
              alt="Netflix logo"
              width="160"
              height="43.6"
              priority
              style={responsive}
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

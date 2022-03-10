import Image from "next/image";
import NetflixLogo from "../../public/images/NetflixLogo.png";

import Spinner from "../../public/images/browse/spinner.png";
import styles from "../../styles/browse/browse.module.css";

import { useContext } from "react";
import { UserContext } from "../../pages/_app";

export default function LoadingBrowse() {
  const { userData } = useContext(UserContext);

  return (
    <div className={styles.loadingBg}>
      <header className={styles.header}>
        <div className={styles.netflixLogoContainer}>
          <Image src={NetflixLogo} alt="Netflix logo" />
        </div>
      </header>
      <main className={styles.mainLoading}>
        <div className={styles.profilePicCenter}>
          {userData ? (
            <Image
              src={
                userData["user-main"].pic.length > 3
                  ? userData["user-main"].pic
                  : `/images/profile pic/${userData["user-main"].pic}.png`
              }
              width="320px"
              height="320px"
              className={styles.profilePic}
              alt="User profile Picture"
            />
          ) : (
            ""
          )}
          <div className={styles.spinnerContain}>
            <Image src={Spinner} alt="loading spinner" />
          </div>
        </div>
      </main>
    </div>
  );
}

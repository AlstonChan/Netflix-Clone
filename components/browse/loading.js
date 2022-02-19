import Image from "next/image";
import NetflixLogo from "../../public/images/NetflixLogo.png";
import ProfilePic from "../../public/images/profile pic/1.png";
import Spinner from "../../public/images/browse/spinner.png";
import styles from "../../styles/browse/browse.module.css";

import { useContext } from "react";
import { UserContext } from "../../pages/_app";

export default function LoadingBrowse() {
  const { user, loading } = useContext(UserContext);

  return (
    <div className={styles.loadingBg}>
      <header className={styles.header}>
        <div className={styles.netflixLogoContainer}>
          <Image src={NetflixLogo} alt="Netflix logo" />
        </div>
      </header>
      <main className={styles.mainLoading}>
        <div className={styles.profilePicCenter}>
          <Image
            src={
              !loading && user?.photoURL
                ? user.photoURL
                  ? user.photoURL
                  : ProfilePic
                : ProfilePic
            }
            width="320px"
            height="320px"
            alt="profile icon"
          />
          <div className={styles.spinnerContain}>
            <Image src={Spinner} alt="loading spinner" />
          </div>
        </div>
      </main>
    </div>
  );
}

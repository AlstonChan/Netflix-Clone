import styles from "../../styles/browse/browse.module.css";
import NetflixLogo from "../../public/images/NetflixLogo.png";
import Spinner from "../../public/images/browse/spinner.png";

import Image from "next/image";

import { useContext } from "react";
import ImageRender from "../ImageRender";
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
            <ImageRender
              src={
                userData["user-main"].pic.length > 3
                  ? userData["user-main"].pic
                  : `/images/profile pic/${userData["user-main"].pic}.png`
              }
              width="320"
              height="320"
              objectFit="cover"
              className={styles.profilePic}
              alt="User profile"
            />
          ) : (
            ""
          )}
          <div className={styles.spinnerContain}>
            <Image src={Spinner} alt="loading spinner" unoptimized />
          </div>
        </div>
      </main>
    </div>
  );
}

import Image from "next/image";
import NetflixLogo from "../../public/images/NetflixLogo.png";
import ProfilePic from "../../public/images/profile pic/1.png";
import Spinner from "../../public/images/browse/spinner.png";
import styles from "../../styles/browse/browse.module.css";

export default function LoadingBrowse() {
  return (
    <div className={styles.loadingBg}>
      <header className={styles.header}>
        <div className={styles.netflixLogoContainer}>
          <Image src={NetflixLogo} />
        </div>
      </header>
      <main className={styles.mainLoading}>
        <div className={styles.profilePicCenter}>
          <Image src={ProfilePic} />
          <div className={styles.spinnerContain}>
            <Image src={Spinner} />
          </div>
        </div>
      </main>
    </div>
  );
}

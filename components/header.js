import Image from "next/image";
import Link from "next/link";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <>
      <header className={styles.main}>
        <div className={styles.mainContain}>
          <div className={styles.netflixLogoContainer}>
            <Image
              src="/images/NetflixLogo.png"
              className={styles.netflixLogo}
              alt="Netflix logo"
              width="160px"
              height="43.6px"
              priority
            />
          </div>
          <button type="submit" className={`netflixBtn ${styles.submitBtn}`}>
            <Link href="/login">
              <a className={styles.btnTxt}> Sign In</a>
            </Link>
          </button>
        </div>
      </header>
    </>
  );
}

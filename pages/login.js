import styles from "../styles/login.module.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/footer/footerStyle2";
import LoginForm from "../components/login/loginForm";

console.log(process.env.API_KEY);

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.shade}>
          <header className={styles.head}>
            <div className={styles.netflixLogoContainer}>
              <Link href="/">
                <a>
                  <Image
                    src="/images/NetflixLogo.png"
                    className={styles.netflixLogo}
                    alt="Netflix logo"
                    width="166px"
                    height="49.6px"
                    priority
                  />
                </a>
              </Link>
            </div>
          </header>
          <div className={styles.loginContainer}>
            <h1 className={styles.loginHead}>Sign In</h1>
            <LoginForm />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

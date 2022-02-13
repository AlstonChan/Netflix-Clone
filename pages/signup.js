import styles from "../styles/signup/signup.module.css";

import Image from "next/image";

import CheckMark from "../public/images/icons/misc/Checkmark.png";
import CheckRed from "../public/images/icons/misc/icons_check red.svg";

import Footer from "../components/footer/footerStyle2";
import Header from "../components/signup/header";

const benefitTxt = [
  "No commitments, cancel at any time.",
  "Everything on Netflix for one low price.",
  "Unlimited viewing on all your devices.",
];

export default function SignUp() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.centerDiv}>
          <section className={styles.mainContent}>
            <div className={styles.imgContainer}>
              <Image src={CheckMark} />
            </div>
            <p className={styles.stepsCount}>STEP 1 OF 3</p>
            <h1 className={styles.stepsHeadings}>Choose your plan.</h1>
            <div>
              {benefitTxt.map((txt, index) => {
                return (
                  <li key={index} className={styles.benefitListItem}>
                    <Image src={CheckRed} />
                    <span className={styles.benefitListItemTxt}>{txt}</span>
                  </li>
                );
              })}
            </div>
          </section>
          <button className={styles.nextButton}>Next</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

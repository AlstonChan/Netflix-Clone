import styles from "@/styles/Home/cardFour.module.css";
import baseStyles from "@/styles/Home/card.module.css";
import netflixKid from "@/public/images/home/netflix-kids.png";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

export default function CardFour() {
  return (
    <div className={baseStyles.container}>
      <div className={styles.containerCard}>
        <div className={styles.imgPresentContainer}>
          <Image
            src={netflixKid}
            alt="netflix kid display image"
            unoptimized
            style={responsive}
          />
        </div>
        <div className={`${baseStyles.wordGroup} ${styles.wordGroup}`}>
          <div className={styles.wordGroupContain}>
            <h1 className={styles.wordGroupBig}>Create profiles for kids.</h1>
            <p className={styles.wordGroupSml}>
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

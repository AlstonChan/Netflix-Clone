import Image from "next/image";
import netflixKid from "../../public/images/netflix-kids.png";
import styles from "../../styles/Home/cardFour.module.css";
import cardStyles from "../../styles/Home/card.module.css";

export default function CardFour() {
  return (
    <div className={cardStyles.container}>
      <div className={styles.containerCard}>
        <div className={styles.imgPresentContainer}>
          <Image src={netflixKid} alt="netflix kid display image" />
        </div>
        <div className={`${cardStyles.wordGroup} ${styles.wordGroup}`}>
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

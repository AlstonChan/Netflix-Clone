import Image from "next/image";
import devicePile from "../../public/images/home/device-pile.png";
import styles from "../../styles/Home/cardThree.module.css";
import cardStyles from "../../styles/Home/card.module.css";

export default function CardThree() {
  return (
    <div className={cardStyles.container}>
      <div className={styles.containerCard}>
        <div className={`${cardStyles.wordGroup} ${styles.wordGroup}`}>
          <div className={styles.wordGroupContain}>
            <h1 className={styles.wordGroupBig}>Watch everywhere.</h1>
            <p className={styles.wordGroupSml}>
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV without paying more.
            </p>
          </div>
        </div>
        <div className={styles.imgPresent}>
          <div className={styles.vidPresentContainer}>
            <video
              className={styles.videoTv}
              autoPlay={true}
              loop={true}
              src="/videos/video-devices.m4v"
            ></video>
            <div className={styles.imgPresentContainer}>
              <Image src={devicePile} alt="a pile of device using netflix" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

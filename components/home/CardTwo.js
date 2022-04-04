import styles from "../../styles/Home/cardTwo.module.css";
import baseStyles from "../../styles/Home/card.module.css";
import PhoneImg from "../../public/images/home/netflix-mobile.jpg";
import boxshotImg from "../../public/images/home/boxshot.png";
import downloadImg from "../../public/images/home/download-icon.gif";

import Image from "next/image";

export default function CardTwo() {
  return (
    <div className={baseStyles.container}>
      <div className={styles.containerCard}>
        <div className={styles.imgContainer}>
          <div className={styles.imgPresentContainer}>
            <Image src={PhoneImg} alt="a phone displaying netflix" />
            <div className={styles.smallCard}>
              <div className={styles.smallCardImg}>
                <Image
                  fixed="true"
                  alt="a small netflix film poster"
                  src={boxshotImg}
                  unoptimized={true}
                />
              </div>
              <div className={styles.smallCardTextGrp}>
                <h3>Stranger Things</h3>
                <p>Downloading...</p>
              </div>
              <div className={styles.smallCardDownloading}>
                <Image src={downloadImg} alt="a downloading icon" />
              </div>
            </div>
          </div>
        </div>
        <div className={`${baseStyles.wordGroup} ${styles.wordGroup}`}>
          <div className={styles.wordGroupContain}>
            <h1 className={styles.wordGroupBig}>
              Download your shows to watch offline.
            </h1>
            <p className={styles.wordGroupSml}>
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

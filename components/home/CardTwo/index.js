import styles from "../../../styles/Home/cardTwo.module.css";
import PhoneImg from "../../../public/images/netflix-mobile.jpg";
import boxshotImg from "../../../public/images/boxshot.png";
import downloadImg from "../../../public/images/download-icon.gif";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.containerCard}>
        <div className={styles.imgContainer}>
          <div className={styles.imgPresentContainer}>
            <Image src={PhoneImg} />
            <div className={styles.smallCard}>
              <div className={styles.smallCardImg}>
                <Image fixed={true} src={boxshotImg} />
              </div>
              <div className={styles.smallCardTextGrp}>
                <h3>Stranger Things</h3>
                <p>Downloading...</p>
              </div>
              <div className={styles.smallCardDownloading}>
                <Image src={downloadImg} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wordGroup}>
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

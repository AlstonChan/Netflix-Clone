import styles from "../../styles/browse/browse.module.css";
import Image from "next/image";

import playBtn from "../../public/images/browse/featured/play-button.png";
import info from "../../public/images/browse/featured/info.png";

export default function Featured({ url }) {
  return (
    <div className={styles.featuredSpace}>
      <div className={styles.featuredAbsolute}>
        <div className={styles.feaContainerStatic}>
          <div className={styles.featuredImg}>
            <Image
              src={`/images/browse/featured/featured-pic${
                url == "tvs" ? "Tv" : "Mov"
              }.jpg`}
              width="1280px"
              height="720px"
              alt="The Witcher Series Wallpaper"
              layout="responsive"
              priority
            />
          </div>
          <div className={styles.wordGroup}>
            <div className={styles.featuredTxt}>
              <Image
                src={`/images/browse/featured/featured-txt${
                  url == "tvs" ? "Tv" : "Mov"
                }.png`}
                width="625px"
                height="250px"
                alt="The Witcher Series Text"
                priority
              />
              <p className={styles.feaDescription}>
                Geralt of Rivia, a mutated monster-hunter for hire, journeys
                toward his destiny in a turbulent world where people often prove
                more wicked than beasts
              </p>
              <div className={styles.btnGroup}>
                <button type="button" className={styles.playBtn}>
                  <div className={styles.btnImage}>
                    <Image src={playBtn} alt="" />
                  </div>
                  <span className={styles.playBtnTxt}>Play</span>
                </button>
                <button type="button" className={styles.moreInfoBtn}>
                  <div className={styles.btnImageInfo}>
                    <Image src={info} alt="" />
                  </div>
                  <span className={styles.moreInfoBtnTxt}>More Info</span>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.blend}></div>
        </div>
      </div>
    </div>
  );
}

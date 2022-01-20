import styles from "../../styles/browse/browse.module.css";
import Image from "next/image";

import FeaturedWitcher from "../../public/images/browse/featured/featured-pic.jpg";
import FeaturedWitcherTxt from "../../public/images/browse/featured/featured txt.png";
import playBtn from "../../public/images/browse/featured/play-button.png";
import info from "../../public/images/browse/featured/info.png";

export default function Featured() {
  return (
    <div className={styles.featuredSpace}>
      <div className={styles.featuredAbsolute}>
        <div className={styles.feaContainerStatic}>
          <div className={styles.featuredImg}>
            <Image
              src={FeaturedWitcher}
              alt="The Witcher Series Wallpaper"
              layout="responsive"
            />
          </div>
          <div className={styles.wordGroup}>
            <div className={styles.featuredTxt}>
              <Image src={FeaturedWitcherTxt} alt="The Witcher Series Text" />
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
                  <div className={styles.btnImage}>
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

import styles from "@/styles/browse/browse.module.css";
import playBtn from "@/public/images/browse/featured/play-button.png";
import info from "@/public/images/browse/featured/info.png";

import Image from "next/image";

import ImageRender from "@chan_alston/image";
import { responsive } from "@/styles/cssStyle";

export default function FeaturedBrowse({ url }) {
  return (
    <div className={styles.featuredSpace}>
      <div className={styles.featuredAbsolute}>
        <div className={styles.feaContainerStatic}>
          <div className={styles.featuredImg}>
            <Image
              src={`/images/browse/featured/featured-pic-${
                url == "tvs" ? "tv" : "mov"
              }.jpg`}
              width="1280"
              height="720"
              alt={
                url == "tvs"
                  ? "My Name Series Wallpaper"
                  : "The Witcher Series Wallpaper"
              }
              priority
              unoptimized
              style={responsive}
            />
          </div>
          <div className={styles.wordGroup}>
            <div className={styles.featuredTxt}>
              <ImageRender
                src={`/images/browse/featured/featured-txt-${
                  url == "tvs" ? "tv" : "mov"
                }.png`}
                w="625px"
                h="250px"
                alt={
                  url == "tvs"
                    ? "My Name Series Wallpaper"
                    : "The Witcher Series Wallpaper"
                }
              />
              <p className={styles.feaDescription}>
                Geralt of Rivia, a mutated monster-hunter for hire, journeys
                toward his destiny in a turbulent world where people often prove
                more wicked than beasts
              </p>
              <div className={styles.btnGroup}>
                <button type="button" className={styles.playBtn}>
                  <div className={styles.btnImage}>
                    <Image
                      src={playBtn}
                      alt=""
                      unoptimized
                      style={responsive}
                    />
                  </div>
                  <span className={styles.playBtnTxt}>Play</span>
                </button>
                <button type="button" className={styles.moreInfoBtn}>
                  <div className={styles.btnImageInfo}>
                    <Image src={info} alt="" unoptimized style={responsive} />
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

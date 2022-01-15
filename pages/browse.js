import styles from "../styles/browse/browse.module.css";
import Image from "next/image";
import { useState } from "react";

import Header from "../components/browse/header";
import Profile from "../components/browse/profile";
import Cards from "../components/browse/cards";

import FeaturedWitcher from "../public/images/browse/featured/featured-pic.jpg";
import FeaturedWitcherTxt from "../public/images/browse/featured/featured txt.png";
import playBtn from "../public/images/browse/featured/play-button.png";
import info from "../public/images/browse/featured/info.png";

export default function Browse() {
  const [profile, setProfile] = useState(false);

  function switchPage() {
    setProfile(true);
  }

  return profile ? (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <span className={styles.featuredMain}>
            <div className={styles.featuredSpace}>
              <div className={styles.featuredAbsolute}>
                {/* <div className={styles.feaContainerVid}>
                  <video src="/videos/Featured_Vid.mov"></video>
                </div> */}
                <div className={styles.feaContainerStatic}>
                  <div className={styles.featuredImg}>
                    <Image src={FeaturedWitcher} layout="responsive" />
                  </div>
                  <div className={styles.wordGroup}>
                    <div className={styles.featuredTxt}>
                      <Image src={FeaturedWitcherTxt} />
                      <p className={styles.feaDescription}>
                        Geralt of Rivia, a mutated monster-hunter for hire,
                        journeys toward his destiny in a turbulent world where
                        people often prove more wicked than beasts
                      </p>
                      <div className={styles.btnGroup}>
                        <button type="button" className={styles.playBtn}>
                          <div className={styles.btnImage}>
                            <Image src={playBtn} />
                          </div>
                          <span className={styles.playBtnTxt}>Play</span>
                        </button>
                        <button type="button" className={styles.moreInfoBtn}>
                          <div className={styles.btnImage}>
                            <Image src={info} />
                          </div>
                          <span className={styles.moreInfoBtnTxt}>
                            More Info
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.blend}></div>
                </div>
              </div>
            </div>
          </span>
          <Cards />
        </main>
      </div>
    </>
  ) : (
    <Profile switchPage={switchPage} />
  );
}

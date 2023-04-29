import styles from "./HomeSectionOne.module.scss";
import baseStyles from "../HomeSection.module.scss";
import Tv from "@/public/images/home/tv.png";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

export default function CardOne() {
  return (
    <section className={baseStyles.container}>
      <div className={baseStyles.containerContent}>
        <div className={`${baseStyles.wordGroup} ${baseStyles.left}`}>
          <h1 className={baseStyles.title}>Enjoy on your TV.</h1>
          <p className={baseStyles.subTitle}>
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </p>
        </div>
        <div className={styles.imgPresent}>
          <div className={styles.vidPresentContainer}>
            <video
              className={styles.videoTv}
              autoPlay={true}
              loop={true}
              src="/videos/netflix-video.m4v"
            />
            <div className={styles.imgPresentContainer}>
              <Image
                src={Tv}
                alt="a tv displaying netflix user interface"
                className={styles.tvImg}
                style={responsive}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

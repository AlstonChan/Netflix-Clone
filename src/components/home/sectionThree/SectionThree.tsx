import styles from "./HomeSectionThree.module.scss";
import baseStyles from "../HomeSection.module.scss";
import devicePile from "@/public/images/home/device-pile.png";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

export default function CardThree() {
  return (
    <section className={baseStyles.container}>
      <div className={baseStyles.containerContent}>
        <div className={`${baseStyles.wordGroup} ${baseStyles.left}`}>
          <h1 className={baseStyles.title}>Watch everywhere.</h1>
          <p className={baseStyles.subTitle}>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV without paying more.
          </p>
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
              <Image
                src={devicePile}
                alt="a pile of device using netflix"
                unoptimized
                style={responsive}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

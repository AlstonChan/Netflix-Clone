// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./HomeSectionTwo.module.scss";
import baseStyles from "../HomeSection.module.scss";

import phoneImg from "@/public/images/home/netflix-mobile.jpg";
import boxShotImg from "@/public/images/home/box-shot.png";
import downloadImg from "@/public/images/home/download-icon.gif";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

export default function CardTwo() {
  return (
    <section className={baseStyles.container}>
      <div className={`${baseStyles.containerContent} ${baseStyles.reverse}`}>
        <div className={styles.imgContainer}>
          <div className={styles.imgPresentContainer}>
            <Image
              src={phoneImg}
              alt="a phone displaying netflix"
              style={responsive}
            />
            <div className={styles.smallCard}>
              <div className={styles.smallCardImg}>
                <Image
                  alt="a small netflix film poster"
                  src={boxShotImg}
                  style={responsive}
                />
              </div>
              <div className={styles.smallCardTextGrp}>
                <p>Stranger Things</p>
                <p>Downloading...</p>
              </div>
              <div className={styles.smallCardDownloading}>
                <Image
                  src={downloadImg}
                  alt="a downloading icon"
                  style={responsive}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${baseStyles.wordGroup} ${baseStyles.right}`}>
          <h1 className={baseStyles.title}>
            Download your shows to watch offline.
          </h1>
          <p className={baseStyles.subTitle}>
            Save your favorites easily and always have something to watch.
          </p>
        </div>
      </div>
    </section>
  );
}

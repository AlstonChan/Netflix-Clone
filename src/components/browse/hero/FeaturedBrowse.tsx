// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./featuredBrowse.module.scss";
import playBtn from "@/public/images/browse/featured/play-button.png";
import info from "@/public/images/browse/featured/info.png";

import Image from "next/image";

import ImageRender from "@chan_alston/image";
import { responsive } from "@/styles/cssStyle";

import type { BrowseRoute } from "../types";

interface FeaturedBrowseProps {
  route: BrowseRoute;
}

export default function FeaturedBrowse({ route }: FeaturedBrowseProps) {
  const featuredImageSrc = `/images/browse/featured/featured-pic-${
    route === "tv-shows" ? "tv" : "mov"
  }.jpg`;
  const featuredImageAlt =
    route === "tv-shows"
      ? "My Name Series Wallpaper"
      : "The Witcher Series Wallpaper";

  const featuredImageTitleSrc = `/images/browse/featured/featured-txt-${
    route === "tv-shows" ? "tv" : "mov"
  }.png`;
  const featuredImageTitleAlt =
    route === "tv-shows" ? "My Name Series" : "The Witcher Series";

  const witcherDesc =
    "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts";
  const myNameSeriesDesc =
    "Following her father's murder, a revenge-driven woman puts her trust in a powerful crime boss — and enters the police force under his direction.";

  return (
    <div className={styles.spacing}>
      <div className={styles.absolute}>
        <Image
          src={featuredImageSrc}
          width="1280"
          height="720"
          alt={featuredImageAlt}
          priority
          unoptimized
          style={responsive}
          className={styles.featuredImg}
        />

        <article className={styles.content}>
          <div className={styles.container}>
            <ImageRender
              src={featuredImageTitleSrc}
              w="625px"
              h="250px"
              alt={featuredImageTitleAlt}
              style={responsive}
              className={styles.featuredTxt}
            />
            <p className={styles.desc}>
              {route === "tv-shows" ? myNameSeriesDesc : witcherDesc}
            </p>
            <div className={styles.btnGroup}>
              <button type="button" className={styles.btn}>
                <div className={styles.iconBox}>
                  <Image
                    src={playBtn}
                    alt=""
                    width="20"
                    height="20"
                    className={`${styles.icon} ${styles.sml}`}
                  />
                </div>
                <span className={styles.txt}>Play</span>
              </button>
              <button type="button" className={`${styles.btn} ${styles.info}`}>
                <div className={styles.iconBox}>
                  <Image
                    src={info}
                    alt=""
                    width="23"
                    height="23"
                    className={styles.icon}
                  />
                </div>
                <span className={styles.txt}>More Info</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

import styles from "../../styles/browse/cards.module.css";

import navArrow from "../../public/images/nav_arrow.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Cards() {
  return (
    <section className={styles.rowOfCards}>
      <div className={styles.cardsHeadings}>
        <h1 className={styles.cardH1}>Relentless Crime Thrillers</h1>
      </div>
      <div className={styles.cardsRow}>
        <div className={styles.cards}>
          <span className={`${styles.handle} ${styles.handlelft}`}>
            <div className={styles.navArrowContainer}>
              <Image layout="fill" src={navArrow} />
            </div>
          </span>
          <div className={styles.slider}>
            <div className={styles.sliderItem}>
              <div
                className={`${styles.imgContainer} ${styles.imgContainerCornerLft}`}
              >
                <Image
                  src="/images/browse/cards/crime/army dead/army small.jpg"
                  width="341px"
                  height="192px"
                  layout="responsive"
                  className={styles.pictureCard}
                />
              </div>
            </div>
            <div className={styles.sliderItem}>
              <div
                className={`${styles.imgContainer} ${styles.imgContainerCornerLft}`}
              >
                <Image
                  src="/images/browse/cards/crime/clickbait/clickbait small.jpg"
                  width="341px"
                  height="192px"
                  layout="responsive"
                  className={styles.pictureCard}
                />
              </div>
            </div>
            <div className={styles.sliderItem}>
              <div
                className={`${styles.imgContainer} ${styles.imgContainerCornerLft}`}
              >
                <Image
                  src="/images/browse/cards/crime/the guilty/the guilty small.jpg"
                  width="341px"
                  height="192px"
                  layout="responsive"
                  className={styles.pictureCard}
                />
              </div>
            </div>
            <div className={styles.sliderItem}>
              <div
                className={`${styles.imgContainer} ${styles.imgContainerCornerLft}`}
              >
                <Image
                  src="/images/browse/cards/crime/mindhunter/mindhunter small.jpg"
                  width="341px"
                  height="192px"
                  layout="responsive"
                  className={styles.pictureCard}
                />
              </div>
            </div>
          </div>
          <span className={`${styles.handle} ${styles.handleRgt}`}>
            <div className={styles.navArrowContainer}>
              <Image layout="fill" src={navArrow} />
            </div>
          </span>
        </div>
      </div>
    </section>
  );
}

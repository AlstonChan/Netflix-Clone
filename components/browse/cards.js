import styles from "../../styles/browse/cards.module.css";

import Image from "next/image";
import { useState } from "react";

import SliderHandler from "./sliderHandler";

const movieName = [
  "army dead",
  "clickbait",
  "collateral",
  "mindhunter",
  "money heist",
  "ozark",
  "punisher",
  "shadow",
  "spenser",
  "the guilty",
  "true story",
  "uncut gems",
];

export default function Cards() {
  const [sliderHandleClick, setSliderHandleClick] = useState(
    `${styles.slider}`
  );

  function sliderHandler(e) {
    if (e.currentTarget.dataset.handle == "lft") {
      setTimeout(() => setSliderHandleClick(`${styles.slider}`), 700);
      setSliderHandleClick(`${styles.slider} ${styles.slideLft}`);
    } else if (e.currentTarget.dataset.handle == "Rgt") {
      setTimeout(() => setSliderHandleClick(`${styles.slider}`), 700);
      setSliderHandleClick(`${styles.slider} ${styles.slideRgt}`);
    }
  }

  return (
    <section className={styles.rowOfCards}>
      <div className={styles.cardsHeadings}>
        <h1 className={styles.cardH1}>Relentless Crime Thrillers</h1>
      </div>
      <div className={styles.cardsRow}>
        <div className={styles.cards}>
          <SliderHandler sliderHandler={sliderHandler} direction="lft" />
          <div className={styles.sliderContainer}>
            <div className={sliderHandleClick}>
              {movieName.map((name, index) => {
                return (
                  <div
                    className={`${styles.sliderItem}`}
                    key={index}
                    data-listNum={index + 1}
                  >
                    <div
                      className={`${styles.imgContainer} ${styles.imgContainerCornerLft}`}
                    >
                      <Image
                        src={`/images/browse/cards/crime/${name}/${name} small.jpg`}
                        width="341px"
                        height="192px"
                        layout="responsive"
                        className={styles.pictureCard}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <SliderHandler sliderHandler={sliderHandler} direction="Rgt" />
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";

import styles from "../../../styles/browse/cards.module.css";
import Image from "next/image";

export default function SliderItem({
  width,
  movieSet,
  modal,
  dataNum,
  firstNum,
  lastNum,
  slideOnMoving,
}) {
  const [delay, setDelay] = useState(null);

  function toggleModal(e) {
    if (!slideOnMoving) {
      if (e.type === "mouseenter") {
        const position =
          e.currentTarget.dataset.num == firstNum
            ? "leftEdge"
            : e.currentTarget.dataset.num == lastNum
            ? "rightEdge"
            : "middle";
        setDelay(
          setTimeout(() => {
            modal({ state: e.type }, e, movieSet, position);
          }, 700)
        );
      } else if (e.type === "mouseleave") {
        clearTimeout(delay);
        modal({ state: e.type }, e, movieSet, position);
      }
    }
  }

  return (
    <>
      <div
        className={`${styles.sliderItem}`}
        style={{ width: `${width}%` }}
        onMouseLeave={(e) => toggleModal(e)}
        onMouseEnter={(e) => toggleModal(e)}
        data-num={dataNum}
      >
        <div className={`${styles.imgContainer}`}>
          {movieSet.backdrop_path ? (
            <Image
              src={`http://image.tmdb.org/t/p/w500${movieSet.backdrop_path}`}
              width="341px"
              height="192px"
              layout="responsive"
              className={styles.pictureCard}
              alt="Movie thumbnails"
            />
          ) : (
            <Image
              src={"/images/image-not-found.png"}
              width="341px"
              height="192px"
              layout="responsive"
              className={styles.pictureCard}
              alt="Movie thumbnails"
            />
          )}
        </div>
        <div className={styles.imgLoadingPlaceholder}>
          {movieSet.original_title || movieSet.name}{" "}
        </div>
      </div>
    </>
  );
}

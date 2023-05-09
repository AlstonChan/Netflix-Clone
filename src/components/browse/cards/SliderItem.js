import styles from "@/styles/browse/cards.module.css";
import ImageNotFound from "@/public/images/browse/image-not-found.png";

import { useState } from "react";
import ImageRender from "@chan_alston/image";

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
      const position =
        e.currentTarget.dataset.num == firstNum
          ? "leftEdge"
          : e.currentTarget.dataset.num == lastNum
          ? "rightEdge"
          : "middle";
      if (e.type === "mouseenter") {
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
        className={styles.sliderItem}
        style={width === "constant" ? "" : { width: `${width}%` }}
        onMouseLeave={(e) => toggleModal(e)}
        onMouseEnter={(e) => toggleModal(e)}
        data-num={dataNum}
      >
        <div className={`${styles.imgContainer}`}>
          {movieSet.backdrop_path ? (
            <ImageRender
              src={`https://image.tmdb.org/t/p/w500${movieSet.backdrop_path}`}
              w="341px"
              h="192px"
              className={styles.pictureCard}
              alt="Movie thumbnails"
            />
          ) : (
            <ImageRender
              src={ImageNotFound.src}
              w="341px"
              h="192px"
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

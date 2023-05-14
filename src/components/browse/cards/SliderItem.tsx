import styles from "./cards.module.scss";
import ImageNotFound from "@/public/images/browse/image-not-found.png";

import { useState } from "react";
import ImageRender from "@chan_alston/image";

import type { MouseEvent } from "react";
import type { DataType } from "../types";
import type { ToggleModalType } from "src/hooks/browse/useModal";

interface SliderItemProps {
  width: number;
  movieData: DataType;
  modal: ToggleModalType;
  dataNum: number;
  firstNum: number;
  lastNum: number;
  slideOnMoving: boolean;
}

export default function SliderItem(props: SliderItemProps) {
  const { width, movieData, modal, dataNum, firstNum, lastNum, slideOnMoving } =
    props;

  const [delay, setDelay] = useState<NodeJS.Timeout | null>(null);

  function toggleModal(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    if (!slideOnMoving) {
      const element = e.currentTarget;

      if (!element) throw new Error("The Card Ref does not exists!");

      const eventType = e.type;

      const position =
        element.dataset.num === firstNum.toString()
          ? "leftEdge"
          : element.dataset.num === lastNum.toString()
          ? "rightEdge"
          : "middle";
      if (eventType === "mouseenter") {
        setDelay(
          setTimeout(() => {
            modal(eventType, e, movieData, position);
          }, 700)
        );
      } else if (eventType === "mouseleave") {
        if (delay) clearTimeout(delay);
        modal(eventType, e, movieData, position);
      }
    }
  }

  return (
    <>
      <div
        className={styles.sliderItem}
        style={{ width: `${width}%` }}
        onMouseLeave={(e) => toggleModal(e)}
        onMouseEnter={(e) => toggleModal(e)}
        data-num={dataNum}
      >
        <div className={`${styles.imgContainer}`}>
          {movieData.backdrop_path ? (
            <ImageRender
              src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
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
          {movieData.name || movieData.original_title}{" "}
        </div>
      </div>
    </>
  );
}

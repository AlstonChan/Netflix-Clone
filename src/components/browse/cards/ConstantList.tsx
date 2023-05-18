// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./cards.module.scss";
import ImageNotFound from "@/public/images/browse/image-not-found.png";

import { useState } from "react";
import ImageRender from "@chan_alston/image";
import useCardWindowResize from "src/hooks/browse/useCardWindowResize";

import PlaceholderCard from "./PlaceholderCard";

import type { DataType } from "../types";
import type { MouseEvent, ReactElement } from "react";
import type { ToggleModalType } from "src/hooks/browse/useModal";

export type MovieListType = {
  data: DataType;
};
interface ConstantListProps {
  movieList: MovieListType[];
  modal: ToggleModalType;
}

export default function ConstantList({ modal, movieList }: ConstantListProps) {
  const [delay, setDelay] = useState<NodeJS.Timeout | null>(null);
  const itemsInRow = useCardWindowResize();

  function toggleModal(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    const element = e.currentTarget;

    if (!element) throw new Error("The Card Ref does not exists!");

    const eventType = e.type;

    const position =
      element.dataset.num === "0"
        ? "leftEdge"
        : element.dataset.num === itemsInRow.toString()
        ? "rightEdge"
        : "middle";
    let currentData = movieList.filter((mov) => {
      if (element.dataset.key == mov.data.id.toString()) {
        return mov.data;
      }
    });
    if (eventType === "mouseenter") {
      setDelay(
        setTimeout(() => {
          modal(eventType, e, currentData[0].data, position);
        }, 700)
      );
    } else if (eventType === "mouseleave") {
      if (delay) clearTimeout(delay);
      modal(eventType, e, currentData[0].data, position);
    }
  }

  const renderContent = () => {
    const dataArr: MovieListType[] = [...movieList];
    const contentRow: ReactElement[][] = [];

    for (let i = 0; i < Math.ceil(movieList.length / itemsInRow); i++) {
      const contentColumn: ReactElement[] = [];
      let j = 0;

      while (dataArr.length !== 0 && j < itemsInRow) {
        contentColumn.push(
          <div
            className={styles.sliderItem}
            key={dataArr[0].data.id}
            style={{ width: `${100 / itemsInRow}%` }}
            onMouseLeave={(e) => toggleModal(e)}
            onMouseEnter={(e) => toggleModal(e)}
            data-num={j}
            data-key={dataArr[0].data.id}
          >
            <div className={`${styles.imgContainer}`}>
              {dataArr[0].data.backdrop_path ? (
                <ImageRender
                  src={`https://image.tmdb.org/t/p/w500${dataArr[0].data.backdrop_path}`}
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
              {dataArr[0].data.original_title || dataArr[0].data.name}{" "}
            </div>
          </div>
        );
        dataArr.shift();
        j++;
      }
      contentRow.push(contentColumn);
    }

    return contentRow;
  };

  return movieList ? (
    <>
      {renderContent().length === 1 ? (
        <section className={styles.rowOfCards}>
          <div className={styles.cardsRow}>
            <div className={styles.cards}>
              <div className={styles.sliderContainer}>
                <div className={styles.slider}>{renderContent()}</div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        renderContent().map((row, index) => {
          return (
            <section className={styles.rowOfCards} key={index}>
              <div className={styles.cardsRow}>
                <div className={styles.cards}>
                  <div className={styles.sliderContainer}>
                    <div className={styles.slider}>{row}</div>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      )}
    </>
  ) : (
    <>
      <PlaceholderCard />
      <PlaceholderCard />
    </>
  );
}

import { useState, useEffect } from "react";
import Image from "next/image";

import PlaceholderCard from "./placeholderCard";
import styles from "../../../styles/browse/cards.module.css";

export default function ConstantList({ modal, movieList }) {
  const [itemsInRow, setItemsInRow] = useState(5); // number of items in the slider content changed dynamically on window size

  const [delay, setDelay] = useState(null);

  function toggleModal(e) {
    if (e.type === "mouseenter") {
      const position =
        e.currentTarget.dataset.num == 0
          ? "leftEdge"
          : e.currentTarget.dataset.num == itemsInRow
          ? "rightEdge"
          : "middle";
      let currentData = movieList.filter((mov) => {
        if (e.currentTarget.dataset.key == mov.data.id) {
          return mov.data;
        }
      });
      setDelay(
        setTimeout(() => {
          modal({ state: e.type }, e, currentData[0].data, position);
        }, 700)
      );
    } else if (e.type === "mouseleave") {
      clearTimeout(delay);
      modal({ state: e.type });
    }
  }

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // handle window resize and sets items in row
  const handleWindowResize = () => {
    if (window.innerWidth > 1400) {
      setItemsInRow(6);
    } else if (window.innerWidth >= 1000) {
      setItemsInRow(5);
    } else if (window.innerWidth > 700) {
      setItemsInRow(4);
    } else if (window.innerWidth > 500) {
      setItemsInRow(3);
    } else if (window.innerWidth < 500) {
      setItemsInRow(2);
    }
  };

  const renderContent = () => {
    const dataArr = [...movieList];
    const contentRow = [];

    for (let i = 0; i < Math.ceil(movieList.length / itemsInRow); i++) {
      const contentColumn = [];
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
                <Image
                  src={`http://image.tmdb.org/t/p/w500${dataArr[0].data.backdrop_path}`}
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
    renderContent().length === 1 ? (
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
    )
  ) : (
    <>
      <PlaceholderCard />
      <PlaceholderCard />
    </>
  );
}

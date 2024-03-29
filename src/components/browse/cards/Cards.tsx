// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./cards.module.scss";

import { useState, CSSProperties } from "react";
import useCardWindowResize from "src/hooks/browse/useCardWindowResize";

import SliderHandler from "./SliderHandler";
import SliderItem from "./SliderItem";

import type { ReactElement } from "react";
import type { DataType } from "../types";
import type { ToggleModalType } from "src/hooks/browse/useModal";

// Disclaimer, I didn't write the code below, just
// make a few changes so it can fit my app, all
// credits goes to andrewthamcc.
// Repo: github.com/andrewthamcc/netflix-slider

interface CardsProps {
  movieSet: DataType[];
  movieGenre: string;
  modal: ToggleModalType;
}

export default function Cards({ movieSet, movieGenre, modal }: CardsProps) {
  const [sliderHasMoved, setSliderHasMoved] = useState<boolean>(false); // boolean to display prev arrow
  const [sliderMoving, setSliderMoving] = useState<boolean>(false); // boolean for slider animation
  const [movePercentage, setMovePercentage] = useState<number>(0); // move percentage to shift slider during animation
  const [sliderMoveDirection, setSliderMoveDirection] = useState<
    "left" | "right" | null
  >(null); // direction of movement of animation
  const [lowestVisibleIndex, setLowestVisibleIndex] = useState<number>(0); // lowest visible index of slider content
  const itemsInRow = useCardWindowResize();

  const totalItems: number = movieSet.length;

  if (!movieSet.length) return null;

  const renderSliderContent = () => {
    // gets the indexes to be displayed
    const left: number[] = [];
    const mid: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < itemsInRow; i++) {
      // left
      if (sliderHasMoved) {
        if (lowestVisibleIndex + i - itemsInRow < 0) {
          left.push(totalItems - itemsInRow + lowestVisibleIndex + i);
        } else {
          left.push(i + lowestVisibleIndex - itemsInRow); // issue here
        }
      }

      // mid
      if (i + lowestVisibleIndex >= totalItems) {
        mid.push(i + lowestVisibleIndex - totalItems);
      } else {
        mid.push(i + lowestVisibleIndex);
      }

      // right
      if (i + lowestVisibleIndex + itemsInRow >= totalItems) {
        right.push(i + lowestVisibleIndex + itemsInRow - totalItems);
      } else {
        right.push(i + lowestVisibleIndex + itemsInRow);
      }
    }

    // combine indexes
    const indexToDisplay: number[] = [...left, ...mid, ...right];

    // add on leading and trailing indexes for peek image when sliding
    if (sliderHasMoved) {
      const trailingIndex =
        indexToDisplay[indexToDisplay.length - 1] === totalItems - 1
          ? 0
          : indexToDisplay[indexToDisplay.length - 1] + 1;
      const leadingIndex =
        indexToDisplay[0] === 0 ? totalItems - 1 : indexToDisplay[0] - 1;

      indexToDisplay.unshift(leadingIndex);
      indexToDisplay.push(trailingIndex);
    }

    const sliderContents: ReactElement[] = [];
    if (movieSet) {
      for (let index of indexToDisplay) {
        sliderContents.push(
          <SliderItem
            dataNum={index}
            firstNum={lowestVisibleIndex}
            lastNum={lowestVisibleIndex + itemsInRow - 1}
            movieData={movieSet[index]}
            key={`${movieSet[index].id}${index}`}
            width={100 / itemsInRow}
            modal={modal}
            slideOnMoving={sliderMoving}
          />
        );
      }
    }

    // adds empty divs to take up appropriate spacing when slider at initial position
    if (!sliderHasMoved) {
      for (let i = 0; i < itemsInRow; i++) {
        sliderContents.unshift(
          <div
            className={styles.sliderItem}
            style={{ width: `${100 / itemsInRow}%` }}
            key={i}
          />
        );
      }
    }

    return sliderContents;
  };

  const handlePrev = () => {
    // get the new lowest visible index
    let newIndex: number;
    if (lowestVisibleIndex < itemsInRow && lowestVisibleIndex !== 0) {
      newIndex = 0;
    } else if (lowestVisibleIndex - itemsInRow < 0) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex - itemsInRow;
    }

    // get the move percentage
    let newMovePercentage: number;
    if (lowestVisibleIndex === 0) {
      newMovePercentage = 0;
    } else if (lowestVisibleIndex - newIndex < itemsInRow) {
      newMovePercentage =
        ((itemsInRow - (lowestVisibleIndex - newIndex)) / itemsInRow) * 100;
    } else {
      newMovePercentage = 0;
    }

    setSliderMoving(true);
    setSliderMoveDirection("left");
    setMovePercentage(newMovePercentage);

    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
      setSliderMoving(false);
    }, 750);
  };

  const handleNext = () => {
    // get the new lowest visible index
    let newIndex: number;
    if (lowestVisibleIndex === totalItems - itemsInRow) {
      newIndex = 0;
    } else if (lowestVisibleIndex + itemsInRow > totalItems - itemsInRow) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex + itemsInRow;
    }

    // get the move percentage
    let newMovePercentage;
    if (newIndex !== 0) {
      newMovePercentage = ((newIndex - lowestVisibleIndex) / itemsInRow) * 100;
    } else {
      newMovePercentage = 100;
    }

    setSliderMoving(true);
    setSliderMoveDirection("right");
    setMovePercentage(newMovePercentage);

    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
      setSliderMoving(false);
    }, 750);

    // slider has moved and show the previous arrow
    if (!sliderHasMoved) {
      setSliderHasMoved(true);
    }
  };

  let style: CSSProperties = {};
  if (sliderMoving) {
    let translate = "";
    if (sliderMoveDirection === "right") {
      translate = `translateX(-${100 + movePercentage + 100 / itemsInRow}%)`;
    } else if (sliderMoveDirection === "left") {
      translate = `translateX(-${movePercentage + 100 / itemsInRow}%)`;
    }

    style = {
      transform: translate,
      transitionDuration: "750ms",
    };
  } else {
    style = {
      transform: `translateX(-${
        100 + (sliderHasMoved ? 100 / itemsInRow : 0)
      }%)`,
    };
  }

  return (
    <section className={styles.rowOfCards}>
      <div className={styles.cardsHeadings}>
        <h1 className={styles.title}>{movieGenre}</h1>
      </div>
      <div className={styles.cardsRow}>
        <div className={styles.cards}>
          {sliderHasMoved && (
            <SliderHandler onClick={handlePrev} direction="left" />
          )}
          <div className={styles.sliderContainer}>
            <div className={styles.slider} style={style}>
              {renderSliderContent()}
            </div>
          </div>
          <SliderHandler onClick={handleNext} direction="right" />
        </div>
      </div>
    </section>
  );
}

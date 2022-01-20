import styles from "../../styles/browse/cards.module.css";

import { useState, useEffect } from "react";

import SliderHandler from "./sliderHandler";
import SliderItem from "./sliderItem";

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
  "designated",
  "undercover",
  "outsider",
  "july",
  "wallander",
  "ganglands",
];

// Disclamer, I didn't write the code below, just
// make a few changes so it can fit my app, all
// credits goes to andrewthamcc.
// Repo: github.com/andrewthamcc/netflix-slider

export default function Cards({ movieSet, movieGenre }) {
  const [sliderHasMoved, setSliderHasMoved] = useState(false); // boolean to display prev arrow
  const [sliderMoving, setSliderMoving] = useState(false); // boolean for slider animation
  const [movePercentage, setMovePercentage] = useState(0); // move percentage to shift slider during animation
  const [sliderMoveDirection, setSliderMoveDirection] = useState(null); // direction of movement of animation
  const [lowestVisibleIndex, setLowestVisibleIndex] = useState(0); // lowest visible index of slider content
  const [itemsInRow, setItemsInRow] = useState(5); // number of items in the slider content changed dynamically on window size

  const totalItems = movieName.length;

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

  if (!movieName.length) return null;

  const renderSliderContent = () => {
    // gets the indexes to be displayed
    const left = [];
    const mid = [];
    const right = [];

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
    const indexToDisplay = [...left, ...mid, ...right];

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

    const sliderContents = [];
    if (movieSet) {
      for (let index of indexToDisplay) {
        sliderContents.push(
          <SliderItem
            movieSet={movieSet[index]}
            key={`${movieSet[index].id}${Math.random()}`}
            width={100 / itemsInRow}
          />
        );
      }
    } else {
      for (let index of indexToDisplay) {
        sliderContents.push(
          <SliderItem
            movie={movieName[index]}
            key={Math.random()}
            width={100 / itemsInRow}
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
    let newIndex;
    if (lowestVisibleIndex < itemsInRow && lowestVisibleIndex !== 0) {
      newIndex = 0;
    } else if (lowestVisibleIndex - itemsInRow < 0) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex - itemsInRow;
    }

    // get the move percentage
    let newMovePercentage;
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
    let newIndex;
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

  let style = {};
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
        <h1 className={styles.cardH1}>
          {movieGenre ? movieGenre : "Relentless Crime Thrillers"}
        </h1>
      </div>
      <div className={styles.cardsRow}>
        <div className={styles.cards}>
          {sliderHasMoved ? (
            <SliderHandler onClick={handlePrev} direction="lft" />
          ) : (
            ""
          )}
          <div className={styles.sliderContainer}>
            <div className={`${styles.slider}`} style={style}>
              {renderSliderContent()}
            </div>
          </div>
          <SliderHandler onClick={handleNext} direction="Rgt" />
        </div>
      </div>
    </section>
  );
}

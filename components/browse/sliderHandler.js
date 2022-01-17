import styles from "../../styles/browse/cards.module.css";
import navArrow from "../../public/images/nav_arrow.svg";
import Image from "next/image";

export default function SliderHandler({ sliderHandler, direction }) {
  return (
    <span
      onClick={(e) => sliderHandler(e)}
      className={`${styles.handle} ${
        direction == "lft" ? styles.handlelft : styles.handleRgt
      }`}
      data-handle={direction}
    >
      <div className={styles.navArrowContainer}>
        <Image layout="fill" src={navArrow} />
      </div>
    </span>
  );
}

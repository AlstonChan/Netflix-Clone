import styles from "./cards.module.scss";
import navArrow from "@/public/images/icons/arrow/nav_arrow.svg";

import Image from "next/image";

interface SliderHandlerProps {
  onClick: () => void;
  direction: "left" | "right";
}

export default function SliderHandler({
  onClick,
  direction,
}: SliderHandlerProps) {
  return (
    <span
      onClick={onClick}
      className={`${styles.handle} ${
        direction === "left" ? styles.handlelft : styles.handleRgt
      }`}
      data-handle={direction}
    >
      <div className={styles.navArrowContainer}>
        <Image
          src={navArrow}
          alt=""
          unoptimized
          className={styles.handlerSvg}
          sizes="100vw"
          fill
        />
      </div>
    </span>
  );
}

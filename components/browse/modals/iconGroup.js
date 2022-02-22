import Image from "next/image";

import styles from "../../../styles/browse/modals.module.css";

import thumbsDown from "../../../public/images/icons/misc/thumbs-down.svg";
import thumbsUp from "../../../public/images/icons/misc/thumbs-up.svg";
import plus from "../../../public/images/icons/misc/plus.svg";
import cancel from "../../../public/images/icons/misc/cancel.svg";
import arrow from "../../../public/images/icons/misc/nav_arrow.svg";
import play from "../../../public/images/icons/misc/play-btn.svg";

export default function IconGroup() {
  return (
    <div className={styles.container}>
      <div className={styles.iconGroup}>
        <div
          className={styles.circleContainerPlay}
          style={{ backgroundColor: "white" }}
        >
          <Image src={play} alt="play the movie" />
        </div>
        <div className={styles.circleContainer}>
          <Image src={plus} alt="add the movies to your list" />
        </div>
        <div className={styles.circleContainer}>
          <Image src={thumbsUp} alt="dislikes the movies" />
        </div>
        <div className={styles.circleContainer}>
          <Image src={thumbsDown} alt="likes the movies" />
        </div>
        <div className={styles.circleContainer}>
          <Image src={cancel} alt="remove the movies from your list" />
        </div>
      </div>
      <div className={styles.circleContainerDrop}>
        <div style={{ transform: "rotate(-90deg)" }}>
          <Image src={arrow} alt="show more" />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";

import styles from "../../../styles/browse/modals.module.css";

import thumbsDown from "../../../public/images/icons/misc/thumbs-down.svg";
import thumbsUp from "../../../public/images/icons/misc/thumbs-up.svg";
import cancel from "../../../public/images/icons/misc/cancel.svg";
import arrow from "../../../public/images/icons/misc/nav_arrow.svg";
import play from "../../../public/images/icons/misc/play-btn.svg";

export default function IconGroup() {
  return (
    <div className={styles.iconGroup}>
      <div
        className={styles.circleContainer}
        style={{ backgroundColor: "white" }}
      >
        <Image src={play} />
      </div>
      <div
        className={styles.circleContainer}
        style={{ padding: "6px 6px 2.5px 4px" }}
      >
        <div style={{ transform: "rotate(45deg)" }}>
          <Image src={cancel} />
        </div>
      </div>
      <div className={styles.circleContainer}>
        <Image src={thumbsUp} />
      </div>
      <div className={styles.circleContainer}>
        <Image src={thumbsDown} />
      </div>
      {/* <div
            className={styles.circleContainer}
            style={{ padding: "6px 4px 2.5px 5px" }}
          >
            <Image src={cancel} />
          </div> */}
      <div
        className={styles.circleContainer}
        style={{ padding: "4px 3px 1px 7.5px", marginLeft: "auto" }}
      >
        <div style={{ transform: "rotate(-90deg)" }}>
          <Image src={arrow} />
        </div>
      </div>
    </div>
  );
}

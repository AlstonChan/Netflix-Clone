import styles from "../../styles/browse/cards.module.css";
import Image from "next/image";

export default function SliderItem({ movie, width }) {
  return (
    <>
      <div className={`${styles.sliderItem}`} style={{ width: `${width}%` }}>
        <div
          className={`${styles.imgContainer} ${styles.imgContainerCornerLft}`}
        >
          <Image
            src={`/images/browse/cards/crime/${movie}/${movie} small.jpg`}
            width="341px"
            height="192px"
            layout="responsive"
            className={styles.pictureCard}
            alt="Movie thumbnails"
          />
        </div>
      </div>
    </>
  );
}

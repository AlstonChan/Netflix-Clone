import styles from "../../styles/browse/cards.module.css";
import Image from "next/image";

export default function SliderItem({ movie, width, movieSet }) {
  return (
    <>
      <div className={`${styles.sliderItem}`} style={{ width: `${width}%` }}>
        <div className={`${styles.imgContainer}`}>
          {movie ? (
            <Image
              src={`/images/browse/cards/crime/${movie}/${movie} small.jpg`}
              width="341px"
              height="192px"
              layout="responsive"
              className={styles.pictureCard}
              alt="Movie thumbnails"
            />
          ) : movieSet.backdrop_path ? (
            <Image
              src={`http://image.tmdb.org/t/p/w500${movieSet.backdrop_path}`}
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
      </div>
    </>
  );
}

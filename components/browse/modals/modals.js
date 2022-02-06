import Image from "next/image";

import styles from "../../../styles/browse/modals.module.css";

import IconGroup from "./iconGroup";

import imageNotFound from "../../../public/images/image-not-found.png";
import adult from "../../../public/images/icons/misc/adultOnly.png";
import { useEffect, useState } from "react";

const genres = [
  { id: 28, name: "Action Heroes" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 10751, name: "Family Movies" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror Movies" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romantic Movies" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

export default function BrowseModals({ modalStyle }) {
  const [modalTranslate, setModalTranslate] = useState({});
  const [modalVisibility, setModalVisiblity] = useState(null);
  const [modalWidth, setModalWidth] = useState(null);
  const [delay, setDelay] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setModalWidth(modalStyle.width);
      setModalVisiblity(styles.modalShow);
      setTimeout(() => {
        setModalVisiblity(styles.modalShow);
        setModalWidth(parseInt(modalStyle.width, 10) * 1.4);
        setModalTranslate(
          modalStyle.position == "leftEdge"
            ? "translate(0, -25%)"
            : modalStyle.position == "rightEdge"
            ? "translate(-28.5%, -25%)"
            : "translate(-13%, -25%)"
        );
      }, 100);
    }, 20);
  }, [modalStyle]);

  function toggleModalFunc(e) {
    if (e.type === "mouseenter") {
      clearTimeout(delay);
    } else if (e.type === "mouseleave") {
      setDelay(
        setTimeout(() => {
          setModalWidth(modalStyle.width);
          setModalTranslate("translate(0)");
          setTimeout(() => {
            setModalVisiblity("");
          }, 190);
        }, 100)
      );
    }
  }

  return (
    <div
      className={`${styles.mainModals} ${modalVisibility}`}
      style={modalStyle.mainClass ? modalStyle.mainClass : { display: "none" }}
      onMouseEnter={(e) => toggleModalFunc(e)}
      onMouseLeave={(e) => toggleModalFunc(e)}
    >
      <div
        style={{
          transform: modalTranslate,
          opacity: 1,
          width: modalWidth || "300px",
          maxWidth: "1360px",
        }}
        className={styles.modalsContainer}
      >
        <div className={styles.upperPanel}>
          <div className={styles.mainImageContainer}>
            <Image
              src={
                modalStyle.movieSet?.backdrop_path
                  ? `http://image.tmdb.org/t/p/w500${modalStyle.movieSet.backdrop_path}`
                  : imageNotFound
              }
              width="1364px"
              height="768px"
              className={styles.backdrop_pathStyle}
            />
          </div>
        </div>
        <div className={styles.lowerPanel}>
          <IconGroup />
          {modalStyle.movieSet ? <MovieDetails modalStyle={modalStyle} /> : ""}
        </div>
      </div>
    </div>
  );
}

export const MovieDetails = ({ modalStyle }) => {
  const mov = modalStyle.movieSet;
  return (
    <div>
      <div className={styles.title}>
        <span className={styles.titleName}>{mov.title || mov.name} </span>
      </div>
      <div className={styles.adultMovies}>
        {mov.adult ? (
          <div className={styles.isAdultIcon}>
            <Image src={adult} />{" "}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.releaseDate}>
        <span>{mov.release_date || mov.first_air_date} </span>
      </div>
      <div className={styles.genreDetails}>
        {mov.genre_ids.map((ids, index) => {
          let genreName;
          genres.forEach((obj) => {
            if (obj.id == ids) genreName = obj.name;
          });
          if (index != 0) {
            return (
              <span className={styles.genre} key={index}>
                | {genreName}{" "}
              </span>
            );
          } else {
            return (
              <span className={styles.genre} key={index}>
                {genreName}{" "}
              </span>
            );
          }
        })}
      </div>
    </div>
  );
};

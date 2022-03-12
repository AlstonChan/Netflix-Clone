import Image from "next/image";

import styles from "../../../styles/browse/modals.module.css";

import IconGroup from "./iconGroup";

import imageNotFound from "../../../public/images/image-not-found.png";
import adult from "../../../public/images/icons/misc/adultOnly.png";
import { useEffect, useState } from "react";

import { genres } from "../../../lib/movieGenres";

export default function BrowseModals({ modalStyle }) {
  const [modalTranslate, setModalTranslate] = useState({});
  const [modalVisibility, setModalVisiblity] = useState();
  const [modalWidth, setModalWidth] = useState(null);

  useEffect(() => {
    setModalWidth(modalStyle.width);
    setModalVisiblity(styles.modalShow);
    setTimeout(() => {
      setModalWidth(parseInt(modalStyle.width, 10) * 1.4);
      setModalTranslate(
        modalStyle.position == "leftEdge"
          ? "translate(0, -25%)"
          : modalStyle.position == "rightEdge"
          ? "translate(-28.5%, -25%)"
          : "translate(-13%, -25%)"
      );
    }, 150);
  }, [modalStyle]);

  useEffect(() => {
    setModalVisiblity("");
  }, []);

  function toggleModalFunc(e) {
    if (e.type === "mouseleave") {
      setTimeout(() => {
        setModalWidth(modalStyle.width);
        setModalTranslate("translate(0)");
        setTimeout(() => {
          setModalVisiblity("");
        }, 190);
      }, 100);
    }
    // return;
  }

  return modalVisibility ? (
    <div
      className={`${styles.mainModals} ${modalVisibility}`}
      style={modalStyle.mainClass}
      onMouseEnter={(e) => toggleModalFunc(e)}
      onMouseLeave={(e) => toggleModalFunc(e)}
    >
      <div
        style={{
          width: modalWidth || "300px",
          transform: modalTranslate,
          opacity: 1,
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
              loading="eager"
              width="1364px"
              height="768px"
              className={styles.backdrop_pathStyle}
              alt="movie thumbnails"
            />
            <span className={styles.backdrop_placeholder}></span>
          </div>
        </div>
        <div className={styles.lowerPanel}>
          <IconGroup mov={modalStyle.movieSet} />
          {modalStyle.movieSet ? <MovieDetails modalStyle={modalStyle} /> : ""}
        </div>
      </div>
    </div>
  ) : (
    ""
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
            <Image src={adult} alt="18+ sign" />{" "}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.releaseDate}>
        <span>{mov.release_date || mov.first_air_date} </span>
      </div>
      <div className={styles.genreDetails}>
        {mov.genre_ids
          ? mov.genre_ids.map((ids, index) => {
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
            })
          : mov.genres.map((genre, index) => {
              if (index != 0) {
                return (
                  <span className={styles.genre} key={index}>
                    | {genre.name}{" "}
                  </span>
                );
              } else {
                return (
                  <span className={styles.genre} key={index}>
                    {genre.name}{" "}
                  </span>
                );
              }
            })}
      </div>
    </div>
  );
};

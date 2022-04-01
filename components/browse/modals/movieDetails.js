import styles from "../../../styles/browse/modals.module.css";
import adult from "../../../public/images/icons/misc/adultOnly.png";

import Image from "next/image";

import { genres } from "../../../lib/movieGenres";

export default function MovieDetails({ modalStyle }) {
  const mov = modalStyle.movieSet;
  return (
    <div>
      {/* Movie Title */}
      <div className={styles.title}>
        <span className={styles.titleName}>{mov.title || mov.name} </span>
      </div>

      {/* Show if movie is adult only */}
      {mov.adult ? (
        <div className={styles.adultMovies}>
          <div className={styles.isAdultIcon}>
            <Image src={adult} alt="18+ sign" />{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Movie/Tv shows release date */}
      <div className={styles.releaseDate}>
        <span>{mov.release_date || mov.first_air_date} </span>
      </div>

      {/* Movie/Tv shows genres */}
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
}

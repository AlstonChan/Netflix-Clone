import styles from "@/styles/browse/modals.module.css";
import adult from "@/public/images/icons/misc/adultOnly.png";

import Image from "next/image";

import { genres } from "@/lib/movieGenres";

import ImageRender from "@chan_alston/image";

export default function MovieDetailsOpen({ modalStyle }) {
  const mov = modalStyle.movieSet;
  return (
    <div className={styles.movieDetailsOpen}>
      <div className={styles.movieDetailsOpenLeft}>
        {/* Movie Title */}
        <div className={styles.title}>
          <span className={styles.titleNameOpen}>{mov.title || mov.name} </span>
        </div>

        {/* Show if movie is adult only */}
        <div className={styles.desc}>
          <span className={styles.descContent}>{mov.overview} </span>
        </div>

        {/* Show if movie is adult only */}
        {mov.adult ? (
          <div className={styles.adultMovies}>
            <div className={styles.isAdultIcon}>
              <Image src={adult} alt="18+ sign" unoptimized />{" "}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Movie/Tv shows release date */}
        <div className={styles.headingsOpen}>
          <span>
            <span className={styles.subHead}>Release Date:</span>{" "}
            {mov.release_date || mov.first_air_date}{" "}
          </span>
        </div>

        {/* Movie/Tv shows genres */}
        <div className={styles.headingsOpen}>
          <span className={styles.subHead}>Genres:</span>{" "}
          {mov.genre_ids
            ? mov.genre_ids.map((ids, index) => {
                let genreName;
                genres.forEach((obj) => {
                  if (obj.id == ids) genreName = obj.name;
                });
                if (index != 0) {
                  return (
                    <span className={styles.genre} key={index}>
                      , {genreName}{" "}
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

        {/* Movie/Tv shows Original Language */}
        <div className={styles.headingsOpen}>
          <span>
            <span className={styles.subHead}>Original Language:</span>{" "}
            {mov.original_language.toUpperCase()}{" "}
          </span>
        </div>

        {/* Movie/Tv shows Average user rating Score */}
        <div className={styles.headingsOpen}>
          <span>
            <span className={styles.subHead}>Average User Score:</span>{" "}
            <span
              style={
                mov.vote_average >= 5
                  ? { color: "green" }
                  : { color: "#d61212" }
              }
            >
              <strong>{mov.vote_average} </strong>
            </span>
          </span>
        </div>

        {/* Movie/Tv shows Total user vote */}
        <div className={styles.headingsOpen}>
          <span>
            <span className={styles.subHead}>Total User Vote:</span>{" "}
            <span style={mov.vote_count <= 2000 ? { color: "#de8519" } : {}}>
              {mov.vote_count}{" "}
            </span>
          </span>
        </div>
      </div>
      <div className={styles.movieDetailsOpenRight}>
        <div className={styles.imageContainerPoster}>
          <ImageRender
            src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
            w="500px"
            h="750px"
            alt="Movie Poster"
          />
        </div>
      </div>
    </div>
  );
}

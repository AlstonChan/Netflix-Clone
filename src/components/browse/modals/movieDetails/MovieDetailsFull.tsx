// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./movieDetails.module.scss";
import adult from "@/public/images/icons/misc/adultOnly.png";

import Image from "next/image";

import { genres } from "@/lib/movieGenres";

import ImageRender from "@chan_alston/image";
import { responsive } from "@/styles/cssStyle";

import type { ModalType } from "../../types";

interface MovieDetailsFullProps {
  modalProps: ModalType;
}

export default function MovieDetailsFull(props: MovieDetailsFullProps) {
  const { modalProps } = props;
  const mov = modalProps.movieData;

  return (
    <div className={styles.bigContainer}>
      {/* left side  */}
      <div className={styles.left}>
        {/* Movie Title */}
        <h4 className={`${styles.title} ${styles.big}`}>
          {mov.title || mov.name}
        </h4>

        {/* Show if movie is adult only */}
        <div className={styles.desc}>{mov.overview}</div>

        {/* Show if movie is adult only */}
        {mov.adult && (
          <div className={styles.isAdultIcon}>
            <Image src={adult} alt="18+ sign" width="40" height="40" />
          </div>
        )}

        {/* Movie/Tv shows release date */}
        <div className={styles.header}>
          <span className={styles.subHead}>Release Date:</span>{" "}
          {mov.release_date || mov.first_air_date}{" "}
        </div>

        {/* Movie/Tv shows genres */}
        <div className={styles.header}>
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
            : mov.genres &&
              mov.genres.map((genre, index) => {
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
        <div className={styles.header}>
          <span>
            <span className={styles.subHead}>Original Language:</span>{" "}
            {mov.original_language.toUpperCase()}{" "}
          </span>
        </div>

        {/* Movie/Tv shows Average user rating Score */}
        <div className={styles.header}>
          <span className={styles.subHead}>Average User Score:</span>{" "}
          <span className={mov.vote_average >= 5 ? styles.green : styles.red}>
            <strong>{mov.vote_average} </strong>
          </span>
        </div>

        {/* Movie/Tv shows Total user vote */}
        <div className={styles.header}>
          <span className={styles.subHead}>Total User Vote:</span>{" "}
          <span className={mov.vote_count <= 2000 ? styles.warn : ""}>
            {mov.vote_count}{" "}
          </span>
        </div>
      </div>

      {/* right side  */}
      <div className={styles.right}>
        <div className={styles.imgContainer}>
          <ImageRender
            src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
            w="500px"
            h="750px"
            style={responsive}
            alt="Movie Poster"
          />
        </div>
      </div>
    </div>
  );
}

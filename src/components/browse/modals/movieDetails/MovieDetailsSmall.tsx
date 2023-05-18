// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./movieDetails.module.scss";
import adult from "@/public/images/icons/misc/adultOnly.png";

import Image from "next/image";

import { genres } from "@/lib/movieGenres";

import type { ModalType } from "../../types";

interface MovieDetailsSmallProps {
  modalProps: ModalType;
}

export default function MovieDetailsSmall(props: MovieDetailsSmallProps) {
  const { modalProps } = props;
  const mov = modalProps.movieData;

  console.log(mov);

  return (
    <>
      {/* Movie Title */}
      <h4 className={styles.title}>{mov.title || mov.name}</h4>

      {/* Show if movie is adult only */}
      {mov.adult && (
        <div className={styles.isAdultIcon}>
          <Image src={adult} alt="18+ sign" width="40" height="40" />
        </div>
      )}

      {/* Movie/Tv shows release date */}
      <div className={styles.headings}>
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
    </>
  );
}

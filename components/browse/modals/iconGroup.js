import Image from "next/image";

import styles from "../../../styles/browse/modals.module.css";

import thumbsDown from "../../../public/images/icons/misc/thumbs-down.svg";
import thumbsUp from "../../../public/images/icons/misc/thumbs-up.svg";
import plus from "../../../public/images/icons/misc/plus.svg";
import cancel from "../../../public/images/icons/misc/cancel.svg";
import arrow from "../../../public/images/icons/misc/nav_arrow.svg";
import play from "../../../public/images/icons/misc/play-btn.svg";

import useFetchMyMovie from "../../../lib/useFetchMyMovie";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../pages/_app";

export default function IconGroup({ mov }) {
  const { user, loading, userData } = useContext(UserContext);
  const [movieData, setMovieData] = useFetchMyMovie();

  const { id } = mov;
  const actionToggle = async (e) => {
    if (user && !loading) {
      const action = e.currentTarget.dataset.action;
      setMovieData(id, action);
      console.log(movieData);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconGroup}>
        <div className={styles.circleContainerPlay}>
          <Image src={play} alt="play the movie" />
        </div>
        <div
          onClick={(e) => actionToggle(e)}
          className={styles.circleContainer}
          data-action="plus"
        >
          <Image src={plus} alt="add the movies to your list" />
        </div>
        <div
          onClick={(e) => actionToggle(e)}
          className={styles.circleContainer}
          data-action="thumbsUp"
        >
          <Image src={thumbsUp} alt="dislikes the movies" />
        </div>
        <div
          onClick={(e) => actionToggle(e)}
          className={styles.circleContainer}
          data-action="thumbsDown"
        >
          <Image src={thumbsDown} alt="likes the movies" />
        </div>
        <div
          onClick={(e) => actionToggle(e)}
          className={styles.circleContainer}
          data-action="cancel"
        >
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

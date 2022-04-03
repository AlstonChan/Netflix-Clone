import styles from "../../../styles/browse/modals.module.css";
import browseStyles from "../../../styles/browse/browse.module.css";
import thumbsDown from "../../../public/images/icons/misc/thumbs-down.svg";
import thumbsUp from "../../../public/images/icons/misc/thumbs-up.svg";
import plus from "../../../public/images/icons/misc/plus.svg";
import cancel from "../../../public/images/icons/misc/cancel.svg";
import arrow from "../../../public/images/icons/misc/nav_arrow.svg";
import play from "../../../public/images/icons/misc/play-btn.svg";
import playBtn from "../../../public/images/browse/featured/play-button.png";

import Image from "next/image";

import { useContext } from "react";
import useFetchMyMovie from "../../../lib/useFetchMyMovie";
import { UserContext } from "../../../pages/_app";

export default function IconGroup({ mov, modalToggle, openModal }) {
  const { user, loading } = useContext(UserContext);
  const [currentMovieData, latestData, setMovieData] = useFetchMyMovie(
    mov.id,
    mov
  );

  const actionToggle = async (e) => {
    if (user && !loading) {
      const action = e.currentTarget.dataset.action;
      setMovieData(mov.id, action);
    }
  };

  console.log(currentMovieData, latestData);

  const containerClass = !openModal
    ? styles.container
    : `${styles.container} ${styles.containerOpen}`;

  return (
    <div className={containerClass}>
      <div className={styles.iconGroup}>
        {!openModal ? (
          <div className={styles.circleContainerPlay}>
            <Image src={play} alt="play the movie" />
          </div>
        ) : (
          <button
            type="button"
            className={`${browseStyles.playBtn} ${styles.playBtn}`}
          >
            <div className={browseStyles.btnImage}>
              <Image src={playBtn} alt="" />
            </div>
            <span className={browseStyles.playBtnTxt}>Play</span>
          </button>
        )}
        {currentMovieData.addList ? (
          <div
            onClick={(e) => actionToggle(e)}
            className={styles.circleContainer}
            data-action="cancel"
          >
            <Image src={cancel} alt="remove the movies from your list" />
          </div>
        ) : (
          <div
            onClick={(e) => actionToggle(e)}
            className={styles.circleContainer}
            data-action="plus"
          >
            <Image src={plus} alt="add the movies to your list" />
          </div>
        )}
        <div
          onClick={(e) => actionToggle(e)}
          className={styles.circleContainer}
          data-action="thumbsUp"
          style={
            currentMovieData.like === "Liked"
              ? { border: "2px solid rgb(255, 255, 255, 1)" }
              : { display: "block" }
          }
        >
          <Image src={thumbsUp} alt="dislikes the movies" />
        </div>
        <div
          onClick={(e) => actionToggle(e)}
          className={styles.circleContainer}
          data-action="thumbsDown"
          style={
            currentMovieData.like === "Disliked"
              ? { border: "2px solid rgb(255, 255, 255, 1)" }
              : { display: "block" }
          }
        >
          <Image src={thumbsDown} alt="likes the movies" />
        </div>
      </div>
      {!openModal ? (
        <div className={styles.circleContainerDrop}>
          <div
            style={{ transform: "rotate(-90deg)" }}
            onClick={() => modalToggle("open")}
          >
            <Image src={arrow} alt="show more" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

import styles from "../../../styles/browse/modals.module.css";
import browseStyles from "../../../styles/browse/browse.module.css";
import ThumbsDownSvg from "../../icons/ThumbsDownSvg";
import ThumbsUpSvg from "../../icons/ThumbsUpSvg";
import PlusSvg from "../../icons/PlusSvg";
import CancelSvg from "../../icons/CancelSvg";
import arrow from "../../../public/images/icons/arrow/nav_arrow.svg";
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
      setMovieData(mov.id, mov.title || mov.name, action);
    }
  };

  console.log(currentMovieData);
  console.log(mov.name);

  // console.log(currentMovieData, latestData);

  const containerClass = !openModal
    ? styles.container
    : `${styles.container} ${styles.containerOpen}`;

  return (
    <div className={containerClass}>
      <div className={styles.iconGroup}>
        {!openModal ? (
          <div className={styles.circleContainerPlay}>
            <Image src={play} alt="play the movie" unoptimized />
          </div>
        ) : (
          <button
            type="button"
            className={`${browseStyles.playBtn} ${styles.playBtn}`}
          >
            <div className={browseStyles.btnImage}>
              <Image src={playBtn} alt="" unoptimized />
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
            <CancelSvg />
          </div>
        ) : (
          <div
            onClick={(e) => actionToggle(e)}
            className={styles.circleContainer}
            data-action="plus"
          >
            <PlusSvg />
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
          <ThumbsUpSvg selected={currentMovieData.like === "Liked"} modal />
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
          <ThumbsDownSvg
            selected={currentMovieData.like === "Disliked"}
            modal
          />
        </div>
      </div>
      {!openModal ? (
        <div className={styles.circleContainerDrop}>
          <div
            style={{ transform: "rotate(-90deg)" }}
            onClick={() => modalToggle("open")}
          >
            <Image src={arrow} alt="show more" unoptimized />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

import baseStyles from "../../../styles/yourAccount.module.css";
import modalStyles from "../../../styles/browse/modals.module.css";
import styles from "../../../styles/ratings.module.css";
import thumbsDown from "../../../public/images/icons/misc/thumbs-down.svg";
import thumbsUp from "../../../public/images/icons/misc/thumbs-up.svg";
import plus from "../../../public/images/icons/misc/plus.svg";
import cancel from "../../../public/images/icons/misc/cancel.svg";

import Image from "next/image";

import useFetchMyMovie from "../../../lib/useFetchMyMovie";

export default function MovieInfoBar({ movDetails }) {
  const [currentMovieData, latestData, setMovieData] = useFetchMyMovie(
    movDetails.id,
    movDetails
  );

  const actionToggle = async (e) => {
    if (user && !loading) {
      const action = e.currentTarget.dataset.action;
      setMovieData(mov.id, action);
    }
  };

  if (movDetails.movieID === null) {
    return null;
  }

  const date = new Date(movDetails.lastUpdate);

  return (
    <section className={styles.bar}>
      <p className={styles.movDate}>{date.toLocaleDateString("en-GB")}</p>
      <h3 className={styles.movTitle}>{movDetails.title} </h3>
      <div className={styles.iconGroup}>
        {currentMovieData.addList ? (
          <div
            onClick={(e) => actionToggle(e)}
            className={modalStyles.circleContainer}
            data-action="cancel"
          >
            <Image
              src={cancel}
              alt="remove the movies from your list"
              unoptimized
            />
          </div>
        ) : (
          <div
            onClick={(e) => actionToggle(e)}
            className={modalStyles.circleContainer}
            data-action="plus"
          >
            <Image src={plus} alt="add the movies to your list" unoptimized />
          </div>
        )}
        <div
          onClick={(e) => actionToggle(e)}
          className={modalStyles.circleContainer}
          data-action="thumbsUp"
          style={
            currentMovieData.like === "Liked"
              ? { border: "2px solid rgb(255, 255, 255, 1)" }
              : { display: "block" }
          }
        >
          <Image src={thumbsUp} alt="dislikes the movies" unoptimized />
        </div>
        <div
          onClick={(e) => actionToggle(e)}
          className={modalStyles.circleContainer}
          data-action="thumbsDown"
          style={
            currentMovieData.like === "Disliked"
              ? { border: "2px solid rgb(255, 255, 255, 1)" }
              : { display: "block" }
          }
        >
          <Image src={thumbsDown} alt="likes the movies" unoptimized />
        </div>
      </div>
    </section>
  );
}

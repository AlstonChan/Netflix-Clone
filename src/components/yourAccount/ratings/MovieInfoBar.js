import baseStyles from "@/styles/yourAccount/yourAccount.module.css";
import modalStyles from "@/components/browse/modals/modals.module.scss";
import styles from "@/styles/yourAccount/ratings.module.css";
import ThumbsUpSvg from "../../icons/ThumbsUpSvg";
import ThumbsDownSvg from "../../icons/ThumbsDownSvg";
import PlusSvg from "../../icons/PlusSvg";
import CancelSvg from "../../icons/CancelSvg";

import { useContext } from "react";
import { UserContext } from "@/pages/_app";

export default function MovieInfoBar({ movDetails, currentUser }) {
  // const { user, loading } = useContext(UserContext);
  // const [currentMovieData, latestData, setMovieData] = useFetchMyMovie(
  //   movDetails.movieID,
  //   movDetails,
  //   currentUser
  // );

  // const actionToggle = async (e) => {
  //   if (user && !loading) {
  //     const action = e.currentTarget.dataset.action;
  //     setMovieData(movDetails.movieID, movDetails.title, action);
  //   }
  // };

  // if (movDetails.movieID === null) {
  //   return null;
  // } else if (movDetails.like === "Disliked" && movDetails.addList !== true) {
  //   return null;
  // } else if (movDetails.like === "none" && movDetails.addList !== true) {
  //   return null;
  // }

  // const date = new Date(movDetails.lastUpdate);

  return (
    <>
      <section className={styles.bar}>
        {/* <p className={styles.movDate}>{date.toLocaleDateString("en-GB")}</p>
        <h3 className={styles.movTitle}>{movDetails.title} </h3>
        <div className={styles.iconGroup}>
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
            <ThumbsUpSvg
              stColor="#000"
              selected={currentMovieData.like === "Liked"}
            />
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
            <ThumbsDownSvg
              stColor="#000"
              selected={currentMovieData.like === "Disliked"}
            />
          </div>
          {currentMovieData.addList ? (
            <div
              onClick={(e) => actionToggle(e)}
              className={modalStyles.circleContainer}
              data-action="cancel"
            >
              <CancelSvg stColor="#000" />
            </div>
          ) : (
            <div
              onClick={(e) => actionToggle(e)}
              className={modalStyles.circleContainer}
              data-action="plus"
            >
              <PlusSvg stColor="#000" />
            </div>
          )}
        </div> */}
      </section>
      <hr className={baseStyles.divider} />
    </>
  );
}

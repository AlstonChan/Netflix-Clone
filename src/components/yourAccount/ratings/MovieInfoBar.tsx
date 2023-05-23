// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./ratings.module.scss";
import ThumbsUpSvg from "../../icons/ThumbsUpSvg";
import ThumbsDownSvg from "../../icons/ThumbsDownSvg";
import PlusSvg from "../../icons/PlusSvg";
import CancelSvg from "../../icons/CancelSvg";

import useAuthState from "src/hooks/useAuthState";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import type {
  ActionType,
  MoveLikeDataType,
  UserDataType,
} from "src/hooks/browse/fetchMovieHook/helper";
import type { SnackBarStateType } from "@/components/common/snackbar/types";

const document = "mymovie";

interface MovieInfoBarProps {
  movDetails: UserDataType;
  currentUser: string;
  setSnackBarState: (snackBarOption: SnackBarStateType) => void;
  userAllMovData: UserDataType[];
}

export default function MovieInfoBar(props: MovieInfoBarProps) {
  const { movDetails, currentUser, setSnackBarState, userAllMovData } = props;

  const [user, isLoading] = useAuthState();

  if (movDetails.movieID === null) {
    return null;
  } else if (movDetails.like === "Disliked" && movDetails.addList !== true) {
    return null;
  } else if (movDetails.like === "none" && movDetails.addList !== true) {
    return null;
  }

  const actionToggle = async (action: ActionType) => {
    if (user && !isLoading) {
      // only allow verified account to add lists
      if (!user.emailVerified) {
        const msg =
          "You have to verified your account in order to add movie or tv shows to our list";

        setSnackBarState({
          isOpen: true,
          msg,
          title: "Account Not Yet Verified",
        });
        return;
      }

      const moviesArr = [...userAllMovData];

      const listValue =
        action === "addList"
          ? true
          : action === "rmvList"
          ? false
          : movDetails.addList;

      let likeValue: MoveLikeDataType = movDetails.like;

      if (action === "like" && movDetails.like === "Liked") {
        likeValue = "none";
      } else if (action === "dislike" && movDetails.like === "Disliked") {
        likeValue = "none";
      } else if (action === "dislike") {
        likeValue = "Disliked";
      } else if (action === "like") {
        likeValue = "Liked";
      }

      const content: UserDataType = {
        movieID: movDetails.movieID,
        addList: listValue,
        like: likeValue,
        movType: movDetails.movType,
        lastUpdate: Date(),
        title: movDetails.title,
      };

      const movieIndex = moviesArr.indexOf(movDetails);
      moviesArr[movieIndex] = content;

      // Set Document Data //
      await updateDoc(doc(db, document, user.uid), {
        [currentUser]: moviesArr,
      });
    }
  };

  const date =
    typeof movDetails.lastUpdate === "string"
      ? new Date(movDetails.lastUpdate).toLocaleDateString("en-GB")
      : movDetails.lastUpdate;

  return (
    <>
      <section className={styles.bar}>
        <p className={styles.movDate}>{date}</p>
        <h3 className={styles.movTitle}>{movDetails.title} </h3>
        <div className={styles.iconGroup}>
          <button
            className={styles.iconBox}
            onClick={() => actionToggle("like")}
          >
            <ThumbsUpSvg
              stColor="#000"
              selected={movDetails.like === "Liked"}
            />
          </button>
          <button
            className={styles.iconBox}
            onClick={() => actionToggle("dislike")}
          >
            <ThumbsDownSvg
              stColor="#000"
              selected={movDetails.like === "Disliked"}
            />
          </button>
          {movDetails.addList ? (
            <button
              className={styles.iconBox}
              onClick={() => actionToggle("rmvList")}
            >
              <CancelSvg stColor="#000" />
            </button>
          ) : (
            <button
              className={styles.iconBox}
              onClick={() => actionToggle("addList")}
            >
              <PlusSvg stColor="#000" />
            </button>
          )}
        </div>
      </section>
      <hr className={`${styles.divider} ${styles.always}`} />
    </>
  );
}

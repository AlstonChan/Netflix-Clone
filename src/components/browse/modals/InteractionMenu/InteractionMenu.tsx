// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./interactionMenu.module.scss";
import featuredStyles from "../../hero/featuredBrowse.module.scss";
import ThumbsDownSvg from "@/icons/ThumbsDownSvg";
import ThumbsUpSvg from "@/icons/ThumbsUpSvg";
import PlusSvg from "@/icons/PlusSvg";
import CancelSvg from "@/icons/CancelSvg";
import arrow from "@/public/images/icons/arrow/nav_arrow.svg";
import play from "@/public/images/icons/misc/play-btn.svg";
import playBtn from "@/public/images/browse/featured/play-button.png";

import Image from "next/image";

import { useContext, useEffect } from "react";
import useFetchMyMovie from "src/hooks/browse/fetchMovieHook/useFetchMyMovie";
import { BrowseContext } from "../../common/BrowseContext";
import { UserContext } from "@/pages/_app";
import { responsive } from "@/styles/cssStyle";

import type { SnackBarStateType } from "@/components/common/snackbar/types";
import type { DataType } from "../../types";
import type { ActionType } from "src/hooks/browse/fetchMovieHook/helper";

interface InteractionMenuProps {
  mov: DataType;
  setSnackBarState: (snackBarOption: SnackBarStateType) => void;
}

export default function InteractionMenu(props: InteractionMenuProps) {
  const { mov, setSnackBarState } = props;
  const { modalFull, modalToggle } = useContext(BrowseContext);
  const { user } = useContext(UserContext);
  const [latestData, searchAndUpdate, fetchError] = useFetchMyMovie(mov);

  const actionToggle = async (action: ActionType) => {
    if (user) {
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

      if (action) searchAndUpdate(action);
    }
  };

  useEffect(() => {
    if (fetchError)
      setSnackBarState({
        isOpen: true,
        msg: fetchError,
        title: "Account Not Yet Verified",
      });
  }, [fetchError]);

  if (!latestData || !modalToggle) return null;

  return (
    <div className={`${styles.container} ${modalFull && styles.bigModal}`}>
      <div className={styles.left}>
        {!modalFull ? (
          <div className={styles.iconBox}>
            <Image
              src={play}
              alt="play the movie"
              className={`${styles.icon} ${styles.whiteBg}`}
            />
          </div>
        ) : (
          <div className={styles.btnGroup}>
            <button type="button" className={featuredStyles.btn}>
              <div className={featuredStyles.iconBox}>
                <Image
                  src={playBtn}
                  alt=""
                  width="20"
                  height="20"
                  className={`${styles.icon} ${styles.sml}`}
                />
              </div>
              <span className={featuredStyles.txt}>Play</span>
            </button>
          </div>
        )}
        {latestData.addList ? (
          <button
            onClick={() => actionToggle("rmvList")}
            className={styles.iconBox}
          >
            <CancelSvg className={`${styles.icon}`} />
          </button>
        ) : (
          <button
            onClick={() => actionToggle("addList")}
            className={styles.iconBox}
          >
            <PlusSvg className={`${styles.icon}`} />
          </button>
        )}
        <button onClick={() => actionToggle("like")} className={styles.iconBox}>
          <ThumbsUpSvg
            selected={latestData.like === "Liked"}
            modal
            className={`${styles.icon}`}
          />
        </button>
        <button
          onClick={() => actionToggle("dislike")}
          className={styles.iconBox}
        >
          <ThumbsDownSvg
            selected={latestData.like === "Disliked"}
            modal
            className={`${styles.icon}`}
          />
        </button>
      </div>

      {!modalFull && (
        <div className={styles.right}>
          <button
            onClick={() => modalToggle("open")}
            className={styles.iconBox}
          >
            <Image
              src={arrow}
              alt="show more"
              className={`${styles.icon} ${styles.arr}`}
              width="30"
              height="30"
            />
          </button>
        </div>
      )}
    </div>
  );
}

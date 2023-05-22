import { useRef, useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import { db } from "@/lib/firebase";

import useMovieData from "../../firestore/useMovieData";
import useAuthState from "../../useAuthState";
import useUserData from "../../firestore/useUserData";

import {
  document,
  AddDocument,
  updateDocument,
  DataConditionType,
} from "./helper";
import { yellowBgCyanTxt } from "./helper";

import type { DataType } from "@/components/browse/types";
import type { ActionType, MovieType, UserDataType } from "./helper";

type useFetchMyMovieReturns = [
  null | UserDataType,
  (action: ActionType) => Promise<void>,
  string | null
];

const initMovieData: UserDataType = {
  movieID: null,
  addList: false,
  like: "none",
};

export default function useFetchMyMovie(
  movieDetails: DataType,
  userAccount?: string
): useFetchMyMovieReturns {
  const [user, isLoading, userError] = useAuthState();
  const [userData, userDbError] = useUserData();
  const [movieData, movieDbError] = useMovieData();

  const [latestData, setLatestData] = useState<UserDataType | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const movType = useRef<MovieType | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (userAccount) {
      setCurrentUser(userAccount);
    } else if (typeof window === "object") {
      const data = window.sessionStorage.getItem("profile");
      if (!data) {
        setCurrentUser(null);
      } else {
        const nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";
        setCurrentUser(aes.decrypt(data, nonce).toString(CryptoJS.enc.Utf8));
      }
    }
  }, [userData]);

  useEffect(() => {
    if (currentUser && movieData && user) {
      if (!movieData[currentUser] && currentUser) {
        try {
          setDoc(
            doc(db, document, user.uid),
            { [currentUser]: [initMovieData] },
            { merge: true }
          );
        } catch (error: any) {
          setFetchError(error.message);
        }
      }
    }
  }, [currentUser, movieData]);

  useEffect(() => {
    searchAndUpdate("show");
  }, [currentUser, movieData]);

  useEffect(() => {
    if (movieDbError) {
      console.error(movieDbError);
      setFetchError("There is an error while trying to fetch data");
    }
    if (userError) {
      console.error(userError);
      setFetchError("There is an error while trying to authenticate you");
    }
    if (userDbError) {
      console.error(userDbError);
      setFetchError("There is an error while trying to fetch user data");
    }
  }, [userError, userDbError, movieDbError]);

  const searchAndUpdate = async (action: ActionType): Promise<void> => {
    if (movieData && currentUser && user) {
      const currentUserData: UserDataType[] = movieData[currentUser];

      if (!currentUserData) return;

      if (!movieDetails || !action) return;

      if (movieDetails.release_date) {
        movType.current = "movie";
      } else if (movieDetails.first_air_date) {
        movType.current = "tv";
      }

      let dataIsFound: boolean = false;
      for (let index: number = 0; index < currentUserData.length; index++) {
        const movDataSet = currentUserData[index];
        const isLastArray = currentUserData.length - 1 === index;

        // // Cleanup movie data that is (addList: false) and (like: none)
        // const ifDataIsInitMovieData =
        //   movDataSet.addList === false &&
        //   movDataSet.like === "none" &&
        //   movDataSet.movieID !== null &&
        //   action === "show";

        // if (ifDataIsInitMovieData) {
        //   console.log("%c CLEANUP_EMPTY ", redBgWhiteTxt);
        //   // Temp Array For Document Update //
        //   currentUserData.splice(index, 1);
        //   // Update Document Data //
        //   await updateDoc(doc(db, document, user.uid), {
        //     [currentUser]: currentUserData,
        //   });
        // }

        switch (action) {
          case "show":
            // If movie had already been cleanup
            if (currentUserData.length === 0) return;
            // If movie is logged in user's document
            if (movDataSet.movieID === movieDetails.id) {
              console.log("%c SHOW_DATA_EXISTS", yellowBgCyanTxt);
              setLatestData({
                movieID: movieDetails.id,
                addList: movDataSet.addList,
                like: movDataSet.like,
              });
              dataIsFound = true;
              break;
            }
            // If movie isn't logged in user's document
            if (isLastArray && movDataSet.movieID !== movieDetails.id) {
              console.log("%c SHOW_DATA_NOT_FOUND", yellowBgCyanTxt);
              setLatestData(initMovieData);
              dataIsFound = true;
              break;
            }
            break;
          case "addList":
          case "like":
          case "dislike":
            if (movDataSet.movieID === null) {
              // dataCondition determined if arrayUnion will be
              // used or not, since it indicates if data has just
              // been initialized and is safe to override or is
              // already populated with data and have to merge the
              // new document with arrayUnion
              const dataCondition: DataConditionType = "init";
              const movieType = movType.current;
              if (movieType) {
                const content = await AddDocument(
                  action,
                  movieDetails,
                  currentUser,
                  user,
                  movieType,
                  dataCondition
                );
                setLatestData(content);
                dataIsFound = true;
              }

              break;
            }

            if (isLastArray && movDataSet.movieID !== movieDetails.id) {
              const dataCondition: DataConditionType = "used";
              const movieType = movType.current;
              if (movieType) {
                const content = await AddDocument(
                  action,
                  movieDetails,
                  currentUser,
                  user,
                  movieType,
                  dataCondition
                );
                setLatestData(content);
                dataIsFound = true;
              }
              break;
            }

            if (movDataSet.movieID === movieDetails.id) {
              const content = await updateDocument(
                action,
                movieDetails,
                currentUser,
                user,
                currentUserData,
                index,
                movDataSet
              );
              setLatestData(content);
              dataIsFound = true;
              break;
            }

            break;
          case "rmvList":
            if (movDataSet.movieID === movieDetails.id) {
              const content = await updateDocument(
                action,
                movieDetails,
                currentUser,
                user,
                currentUserData,
                index,
                movDataSet
              );
              setLatestData(content);
              dataIsFound = true;
              break;
            }
            break;
        }
        // break;

        if (dataIsFound) break;
      }
    }
  };

  return [latestData, searchAndUpdate, fetchError];
}

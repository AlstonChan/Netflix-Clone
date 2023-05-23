// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";

import type { DataType } from "@/components/browse/types";
import type { User } from "firebase/auth";
import { db } from "@/lib/firebase";

export type DataConditionType = "init" | "used";
export type MovieType = "tv" | "movie";
export type ActionType = "like" | "dislike" | "addList" | "rmvList" | "show";
export type MoveLikeDataType = "none" | "Disliked" | "Liked";
export type UserDataType = {
  addList: boolean;
  like: MoveLikeDataType;
  movieID: number | null;
  title?: string;
  movType?: MovieType;
  lastUpdate?: string;
};

export const document = "mymovie";

export const yellowBgCyanTxt = "background: #ffef00; color: #00b7eb";
export const pinkBgGreenTxt = "background: #ff00ff; color: #9efd38";
export const redBgWhiteTxt = "background: #b61e27; color: #fff";
export const orangeBgPurpleTxt = "background: #ffa07a; color: #663399";

// For user that have just sign up,
// movieID will set to null to indicate
// a overwrite to user's document is a green
// light, so temp arr isn't needed.

// or //

// Movie is not found in user's document and user already have
// other movie data stored in document. A setDoc with {merge: true}
// can add a new data without overwrite the whole document.
export const AddDocument = async (
  action: ActionType,
  movieDetails: DataType,
  currentUser: string,
  user: User,
  movieType: MovieType,
  dataCondition: DataConditionType
): Promise<UserDataType> => {
  console.log(`%c ${action.toUpperCase()}_ADD `, orangeBgPurpleTxt);

  const listValue = action === "addList" ? true : false;
  const likeValue =
    action === "like" ? "Liked" : action === "dislike" ? "Disliked" : "none";
  const titleValue = movieDetails.title
    ? movieDetails.title
    : movieDetails.name
    ? movieDetails.name
    : "Movie Name Not Found";

  const content: UserDataType = {
    movieID: movieDetails.id,
    addList: listValue,
    like: likeValue,
    movType: movieType,
    lastUpdate: Date(),
    title: titleValue,
  };

  // Set Document Data //
  if (dataCondition === "init") {
    await setDoc(
      doc(db, document, user.uid),
      { [currentUser]: [content] },
      { merge: true }
    );
    return content;
  } else {
    await setDoc(
      doc(db, document, user.uid),
      { [currentUser]: arrayUnion(content) },
      { merge: true }
    );
    return content;
  }
};

// Movie data already exists in user's document, to update data
// in one go, overwrite the entire document is the only options.
// A temp array is needed to achieve that, which is why moviesArr
// is used.
export const updateDocument = async (
  action: ActionType,
  movieDetails: DataType,
  currentUser: string,
  user: User,
  currentUserData: UserDataType[],
  currentIndex: number,
  movDataSet: UserDataType
): Promise<UserDataType> => {
  console.log(`%c ${action.toUpperCase()}_UPD `, orangeBgPurpleTxt);

  const moviesArr = [...currentUserData];

  const listValue =
    action === "addList"
      ? true
      : action === "rmvList"
      ? false
      : movDataSet.addList;

  let likeValue: MoveLikeDataType = moviesArr[currentIndex].like;
  if (action === "like" && movDataSet.like === "Liked") {
    likeValue = "none";
  } else if (action === "dislike" && movDataSet.like === "Disliked") {
    likeValue = "none";
  } else if (action === "dislike") {
    likeValue = "Disliked";
  } else if (action === "like") {
    likeValue = "Liked";
  }

  const content: UserDataType = {
    movieID: movieDetails.id,
    addList: listValue,
    like: likeValue,
    movType: moviesArr[currentIndex].movType,
    lastUpdate: Date(),
    title: movDataSet.title,
  };

  // Temp Array For Document Update //
  moviesArr[currentIndex] = content;

  // Set Document Data //
  await updateDoc(doc(db, document, user.uid), { [currentUser]: moviesArr });
  return content;
};

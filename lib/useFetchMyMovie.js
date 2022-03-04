import { doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";

import { useContext, useRef, useState } from "react";
import { UserContext } from "../pages/_app";
import { db } from "./firebase";

const usefetchMyMovie = (id) => {
  const { user, myMovieData } = useContext(UserContext);
  const [updatedData, setUpdatedData] = useState();
  const currentMovieData = useRef({ addList: false, like: "none" });

  const searchAndUpdate = async (id, action) => {
    if (myMovieData.current.exists() === true) {
      const moviesArr = [...myMovieData.current.data().myMovies];

      if (id === null || action === null)
        return [currentMovieData.current, updatedData, searchAndUpdate];

      for (let index = 0; index < moviesArr.length; index++) {
        if (action === "show") {
          // If movie is logged in user's document
          if (myMovieData.current.data().myMovies[index].movieID == id) {
            // console log //
            console.log(
              "%c SHOW_DATA_EXISTS ",
              "background: #ffef00; color: #00b7eb"
            );

            if (updatedData) {
              currentMovieData.current = updatedData;
            } else {
              // Set Ref Data //
              currentMovieData.current = {
                movieID: id,
                addList: myMovieData.current.data().myMovies[index].addList,
                like: myMovieData.current.data().myMovies[index].like,
              };
            }

            // To exit from Iteration //
            break;
          } else if (
            // If movie did not logged in user's document
            myMovieData.current.data().myMovies.length - 1 == index &&
            myMovieData.current.data().myMovies[index].movieID != id
          ) {
            // console log //
            console.log(
              "%c SHOW_DATA_NOT_FOUND ",
              "background: #ffef00; color: #00b7eb"
            );

            //
            if (updatedData) {
              currentMovieData.current = updatedData;
            } else {
              // Set Ref Data //
              currentMovieData.current = {
                movieID: id,
                addList: false,
                like: "none",
              };
            }
            // To exit from Iteration //
            break;
          }
        } else if (moviesArr[index].movieID === null) {
          // For user that have just sign up,
          // movieID will set to null to indicate
          // a overwrite to user's document is a green
          // light, so temp arr isn't needed.
          console.log(
            "%c REPALCE DOCUMENTS, MOVIEID IS NULL ",
            "background: #fff; color: #663399"
          );

          if (action === "plus") {
            // console log //
            console.log(
              "%c PLUS_MOV_NULL ",
              "background: #ffa07a; color: #663399"
            );

            // Set State Data //
            setUpdatedData({
              movieID: id,
              addList: true,
              like: "none",
            });

            // Set Document Data //
            await setDoc(doc(db, "mymovie", user.uid), {
              myMovies: [
                {
                  movieID: id,
                  addList: true,
                  like: "none",
                },
              ],
            });

            // To exit from Iteration //
            break;
          } else if (action === "thumbsUp") {
            // console log //
            console.log(
              "%c THUMBS_UP_MOV_NULL ",
              "background: #ffa07a; color: #663399"
            );

            // Set State Data //
            setUpdatedData({
              movieID: id,
              addList: false,
              like: "Liked",
            });

            // Set Document Data //
            await setDoc(doc(db, "mymovie", user.uid), {
              myMovies: [
                {
                  movieID: id,
                  addList: false,
                  like: "Liked",
                },
              ],
            });

            // To exit from Iteration //
            break;
          } else if (action === "thumbsDown") {
            // console log //
            console.log(
              "%c THUMBS_DOWN_MOV_NULL ",
              "background: #ffa07a; color: #663399"
            );

            // Set State Data //
            setUpdatedData({
              movieID: id,
              addList: false,
              like: "Disliked",
            });

            // Set Document Data //
            await setDoc(doc(db, "mymovie", user.uid), {
              myMovies: [
                {
                  movieID: id,
                  addList: false,
                  like: "Disliked",
                },
              ],
            });

            // To exit from Iteration //
            break;
          }
        } else if (myMovieData.current.data().myMovies[index].movieID == id) {
          // Movie data already exists in user's document, to update data
          // in one go, overwrite the entire document is the only options.
          // A temp array is needed to acheive that, which is why moviesArr
          // is used.
          console.log(
            "%c DOCUMENTS UPDATE ",
            "background: #fff; color: #00b7eb"
          );

          if (action === "plus") {
            // console log //
            console.log("%c PLUS_UPD ", "background: #ffef00; color: #00b7eb");

            // Temp Array For Document Update //
            moviesArr[index] = {
              movieID: id,
              addList: true,
              like: myMovieData.current.data().myMovies[index].like,
            };

            // Update State Data //
            setUpdatedData({
              movieID: id,
              addList: true,
              like: myMovieData.current.data().myMovies[index].like,
            });

            // Update Document Data //
            await updateDoc(doc(db, "mymovie", user.uid), {
              myMovies: moviesArr,
            });

            // To exit from Iteration //
            break;
          } else if (action === "cancel") {
            // console log //
            console.log(
              "%c CANCEL_UPD ",
              "background: #ffef00; color: #00b7eb"
            );

            // Temp Array For Document Update //
            moviesArr[index] = {
              movieID: id,
              addList: false,
              like: myMovieData.current.data().myMovies[index].like,
            };

            // Update State Data //
            setUpdatedData({
              movieID: id,
              addList: false,
              like: myMovieData.current.data().myMovies[index].like,
            });

            // Update Document Data //
            await updateDoc(doc(db, "mymovie", user.uid), {
              myMovies: moviesArr,
            });

            // To exit from Iteration //
            break;
          } else if (action === "thumbsUp") {
            // console log //
            console.log(
              "%c THUMBS_UP_UPD ",
              "background: #ffef00; color: #00b7eb"
            );

            // Temp Array For Document Update //
            moviesArr[index] = {
              movieID: id,
              addList: myMovieData.current.data().myMovies[index].addList,
              like: "Liked",
            };

            // Update State Data //
            setUpdatedData({
              movieID: id,
              addList: myMovieData.current.data().myMovies[index].addList,
              like: "Liked",
            });

            // Update Document Data //
            updateDoc(doc(db, "mymovie", user.uid), {
              myMovies: moviesArr,
            });

            // To exit from Iteration //
            break;
          } else if (action === "thumbsDown") {
            // console log //
            console.log(
              "%c THUMBS_DOWN_UPD ",
              "background: #ffef00; color: #00b7eb"
            );

            // Temp Array For Document Update //
            moviesArr[index] = {
              movieID: id,
              addList: myMovieData.current.data().myMovies[index].addList,
              like: "Disliked",
            };

            // Update State Data //
            setUpdatedData({
              movieID: id,
              addList: myMovieData.current.data().myMovies[index].addList,
              like: "Disliked",
            });

            // Update Document Data //
            await updateDoc(doc(db, "mymovie", user.uid), {
              myMovies: moviesArr,
            });

            // To exit from Iteration //
            break;
          }
        } else if (
          myMovieData.current.data().myMovies.length - 1 == index &&
          myMovieData.current.data().myMovies[index].movieID != id
        ) {
          // Movie is not found in user's document and user already have
          // other movie data stored in document. A setDoc with {merge: true}
          // can add a new data without overwrite the whole document.
          console.log("%c NEW DOCUMENTS ", "background: #fff; color: #9efd38");

          if (action === "plus") {
            // console log //
            console.log("%c PLUS_NEW ", "background: #ff00ff; color: #9efd38");

            // Update State Data //
            setUpdatedData({
              movieID: id,
              addList: true,
              like: "none",
            });

            // Set New Movie Data //
            await setDoc(
              doc(db, "mymovie", user.uid),
              {
                myMovies: arrayUnion({
                  movieID: id,
                  addList: true,
                  like: "none",
                }),
              },
              { merge: true }
            );

            // To exit from Iteration //
            break;
          } else if (action === "thumbsUp") {
            // console log //
            console.log(
              "%c THUMBS_UP_NEW ",
              "background: #ff00ff; color: #9efd38"
            );

            // Update State Data //
            setUpdatedData({
              movieID: id,
              addList: false,
              like: "Liked",
            });

            // Set New Movie Data //
            await setDoc(
              doc(db, "mymovie", user.uid),
              {
                myMovies: arrayUnion({
                  movieID: id,
                  addList: false,
                  like: "Liked",
                }),
              },
              { merge: true }
            );

            // To exit from Iteration //
            break;
          } else if (action === "thumbsDown") {
            // console log //
            console.log(
              "%c THUMBS_DOWN_NEW ",
              "background: #ff00ff; color: #9efd38"
            );

            // Update State Data //
            setUpdatedData({
              movieID: id,
              addList: false,
              like: "Disliked",
            });

            // Set New Movie Data //
            await setDoc(
              doc(db, "mymovie", user.uid),
              {
                myMovies: arrayUnion({
                  movieID: id,
                  addList: false,
                  like: "Disliked",
                }),
              },
              { merge: true }
            );

            // To exit from Iteration //
            break;
          }
        }
      }
    }
  };

  searchAndUpdate(id, "show");
  return [currentMovieData.current, updatedData, searchAndUpdate];
};

export default usefetchMyMovie;

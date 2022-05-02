import { doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { useContext, useRef, useEffect, useState } from "react";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import useIsomorphicLayoutEffect from "./useIsomorphicLayout";
import { UserContext } from "../pages/_app";
import { db } from "./firebase";

const useFetchMyMovie = (id, type) => {
  const { user, userData, myMovieData } = useContext(UserContext);
  const [updatedData, setUpdatedData] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const currentMovieData = useRef({ addList: false, like: "none" });
  const movType = useRef("");

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "object") {
      const data = window.sessionStorage.getItem("profile");
      if (!data) {
        setCurrentUser(null);
      } else {
        setCurrentUser(
          aes
            .decrypt(data, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
            .toString(CryptoJS.enc.Utf8)
        );
      }
    }
  }, [userData]);

  useEffect(() => {
    if (myMovieData.current.data()) {
      if (!myMovieData.current.data()[currentUser] && currentUser) {
        setDoc(
          doc(db, "mymovie", user.uid),
          {
            [currentUser]: [{ movieID: null, addList: false, like: "none" }],
          },
          { merge: true }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const searchAndUpdate = async (id, title, action) => {
    if (myMovieData.current.exists() === true && currentUser) {
      if (!myMovieData.current.data()[currentUser])
        return [currentMovieData.current, updatedData, searchAndUpdate];

      const moviesArr = [...myMovieData.current.data()[currentUser]];

      if (id === null || action === null)
        return [currentMovieData.current, updatedData, searchAndUpdate];

      if (type.release_date) {
        movType.current = "movie";
      } else if (type.first_air_date) {
        movType.current = "tv";
      }

      for (let index = 0; index < moviesArr.length; index++) {
        //Cleanup movie data that is addList: false and like: none
        if (
          myMovieData.current.data()[currentUser][index].addList === false &&
          myMovieData.current.data()[currentUser][index].like === "none" &&
          myMovieData.current.data()[currentUser][index].movieID !== null &&
          action === "show"
        ) {
          // console log //
          console.log("%c CLEANUP_EMPTY ", "background: #b61e27; color: #fff");

          // Temp Array For Document Update //
          moviesArr.splice(index, 1);

          // Update Document Data //
          await updateDoc(doc(db, "mymovie", user.uid), {
            [currentUser]: moviesArr,
          });
        }
        if (action === "show") {
          // If movie had already been cleanup
          if (
            typeof myMovieData.current.data()[currentUser][index] ===
            "undefined"
          ) {
            break;
          }
          // If movie is logged in user's document
          if (myMovieData.current.data()[currentUser][index].movieID == id) {
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
                addList: myMovieData.current.data()[currentUser][index].addList,
                like: myMovieData.current.data()[currentUser][index].like,
              };
            }

            // To exit from Iteration //
            break;
          } else if (
            // If movie did not logged in user's document
            myMovieData.current.data()[currentUser].length - 1 == index &&
            myMovieData.current.data()[currentUser][index].movieID != id
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
            const content = {
              movieID: id,
              addList: true,
              like: "none",
              movType: movType.current,
              lastUpdate: Date(),
              title,
            };

            // Set State Data //
            setUpdatedData(content);

            // Set Document Data //
            await setDoc(
              doc(db, "mymovie", user.uid),
              {
                [currentUser]: [content],
              },
              { merge: true }
            );

            // To exit from Iteration //
            break;
          } else if (action === "thumbsUp") {
            // console log //
            console.log(
              "%c THUMBS_UP_MOV_NULL ",
              "background: #ffa07a; color: #663399"
            );
            const content = {
              movieID: id,
              addList: false,
              like: "Liked",
              movType: movType.current,
              lastUpdate: Date(),
              title,
            };

            // Set State Data //
            setUpdatedData(content);

            // Set Document Data //
            await setDoc(
              doc(db, "mymovie", user.uid),
              {
                [currentUser]: [content],
              },
              { merge: true }
            );

            // To exit from Iteration //
            break;
          } else if (action === "thumbsDown") {
            // console log //
            console.log(
              "%c THUMBS_DOWN_MOV_NULL ",
              "background: #ffa07a; color: #663399"
            );
            const content = {
              movieID: id,
              addList: false,
              like: "Disliked",
              movType: movType.current,
              lastUpdate: Date(),
              title,
            };

            // Set State Data //
            setUpdatedData(content);

            // Set Document Data //
            await setDoc(
              doc(db, "mymovie", user.uid),
              {
                [currentUser]: [content],
              },
              { merge: true }
            );

            // To exit from Iteration //
            break;
          }
        } else if (
          myMovieData.current.data()[currentUser][index].movieID == id
        ) {
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
            const content = {
              movieID: id,
              addList: true,
              like: myMovieData.current.data()[currentUser][index].like,
              movType:
                movType.current ||
                myMovieData.current.data()[currentUser][index].movType,
              lastUpdate: Date(),
              title,
            };

            // Temp Array For Document Update //
            moviesArr[index] = content;

            // Update State Data //
            setUpdatedData(content);

            // Update Document Data //
            await updateDoc(doc(db, "mymovie", user.uid), {
              [currentUser]: moviesArr,
            });

            // To exit from Iteration //
            break;
          } else if (action === "cancel") {
            // console log //
            console.log(
              "%c CANCEL_UPD ",
              "background: #ffef00; color: #00b7eb"
            );
            const content = {
              movieID: id,
              addList: false,
              like: myMovieData.current.data()[currentUser][index].like,
              movType:
                movType.current ||
                myMovieData.current.data()[currentUser][index].movType,
              lastUpdate: Date(),
              title,
            };

            // Temp Array For Document Update //
            moviesArr[index] = content;

            // Update State Data //
            setUpdatedData(content);

            // Update Document Data //
            await updateDoc(doc(db, "mymovie", user.uid), {
              [currentUser]: moviesArr,
            });

            // To exit from Iteration //
            break;
          } else if (action === "thumbsUp") {
            // console log //
            console.log(
              "%c THUMBS_UP_UPD ",
              "background: #ffef00; color: #00b7eb"
            );

            if (
              myMovieData.current.data()[currentUser][index].like === "Liked"
            ) {
              const content = {
                movieID: id,
                addList: myMovieData.current.data()[currentUser][index].addList,
                like: "none",
                movType:
                  movType.current ||
                  myMovieData.current.data()[currentUser][index].movType,
                lastUpdate: Date(),
                title,
              };

              // Temp Array For Document Update //
              moviesArr[index] = content;

              // Update State Data //
              setUpdatedData(content);

              // Update Document Data //
              await updateDoc(doc(db, "mymovie", user.uid), {
                [currentUser]: moviesArr,
              });
            } else {
              const content = {
                movieID: id,
                addList: myMovieData.current.data()[currentUser][index].addList,
                like: "Liked",
                movType:
                  movType.current ||
                  myMovieData.current.data()[currentUser][index].movType,
                lastUpdate: Date(),
                title,
              };

              // Temp Array For Document Update //
              moviesArr[index] = content;

              // Update State Data //
              setUpdatedData(content);

              // Update Document Data //
              updateDoc(doc(db, "mymovie", user.uid), {
                [currentUser]: moviesArr,
              });
            }

            // To exit from Iteration //
            break;
          } else if (action === "thumbsDown") {
            // console log //
            console.log(
              "%c THUMBS_DOWN_UPD ",
              "background: #ffef00; color: #00b7eb"
            );

            if (
              myMovieData.current.data()[currentUser][index].like === "Disliked"
            ) {
              const content = {
                movieID: id,
                addList: myMovieData.current.data()[currentUser][index].addList,
                like: "none",
                movType:
                  movType.current ||
                  myMovieData.current.data()[currentUser][index].movType,
                lastUpdate: Date(),
                title,
              };
              // Temp Array For Document Update //
              moviesArr[index] = content;

              // Update State Data //
              setUpdatedData(content);

              // Update Document Data //
              await updateDoc(doc(db, "mymovie", user.uid), {
                [currentUser]: moviesArr,
              });
            } else {
              const content = {
                movieID: id,
                addList: myMovieData.current.data()[currentUser][index].addList,
                like: "Disliked",
                movType:
                  movType.current ||
                  myMovieData.current.data()[currentUser][index].movType,
                lastUpdate: Date(),
                title,
              };

              // Temp Array For Document Update //
              moviesArr[index] = content;

              // Update State Data //
              setUpdatedData(content);

              // Update Document Data //
              await updateDoc(doc(db, "mymovie", user.uid), {
                [currentUser]: moviesArr,
              });
            }

            // To exit from Iteration //
            break;
          }
        } else if (
          myMovieData.current.data()[currentUser].length - 1 == index &&
          myMovieData.current.data()[currentUser][index].movieID != id
        ) {
          // Movie is not found in user's document and user already have
          // other movie data stored in document. A setDoc with {merge: true}
          // can add a new data without overwrite the whole document.
          console.log("%c NEW DOCUMENTS ", "background: #fff; color: #9efd38");

          if (action === "plus") {
            // console log //
            console.log("%c PLUS_NEW ", "background: #ff00ff; color: #9efd38");

            const content = {
              movieID: id,
              addList: true,
              like: "none",
              movType: movType.current,
              lastUpdate: Date(),
              title,
            };

            // Update State Data //
            setUpdatedData(content);

            // Set New Movie Data //
            await setDoc(
              doc(db, "mymovie", user.uid),
              {
                [currentUser]: arrayUnion(content),
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

            const content = {
              movieID: id,
              addList: false,
              like: "Liked",
              movType: movType.current,
              lastUpdate: Date(),
              title,
            };

            // Update State Data //
            setUpdatedData(content);

            // Set New Movie Data //
            await setDoc(
              doc(db, "mymovie", user.uid),
              {
                [currentUser]: arrayUnion(content),
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

            const content = {
              movieID: id,
              addList: false,
              like: "Disliked",
              movType: movType.current,
              lastUpdate: Date(),
              title,
            };

            // Update State Data //
            setUpdatedData(content);

            // Set New Movie Data //
            await setDoc(
              doc(db, "mymovie", user.uid),
              {
                [currentUser]: arrayUnion(content),
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

  searchAndUpdate(id, null, "show");
  return [currentMovieData.current, updatedData, searchAndUpdate];
};

export default useFetchMyMovie;

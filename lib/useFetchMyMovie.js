import {
  getDoc,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../pages/_app";
import { db } from "./firebase";

const usefetchMyMovie = () => {
  const { user, loading, error } = useContext(UserContext);
  const [currentMovieData, setCurrentMovieData] = useState({
    movieData: null,
    isLoading: false,
    error: false,
  });
  const [allMovieData, setAllMovieData] = useState();

  if (error) {
    setCurrentMovieData({
      movieData: null,
      isLoading: false,
      error: true,
    });
    return [currentMovieData, searchAndUpdate, allMovieData];
  }

  useEffect(() => {
    searchAndUpdate(null, null);
  }, [user]);

  const searchAndUpdate = async (id, action) => {
    if (id === undefined || action === undefined) {
      setCurrentMovieData({
        movieData: "missing required input",
        isLoading: false,
        error: false,
      });
      return [currentMovieData, searchAndUpdate, allMovieData];
    }

    try {
      const eventSnapshot = onSnapshot(
        doc(db, "mymovie", user.uid),
        async (documents) => {
          if (documents.exists() === false) {
            console.info("no doc found");
            await setDoc(doc(db, "mymovie", user.uid), {
              myMovies: [{ movieID: id, addList: false, like: "none" }],
            });
          } else if (documents.exists() === true) {
            setAllMovieData(documents.data().myMovies);
            const moviesArr = [...documents.data().myMovies];

            if (id === null || action === null) return;

            for (let index = 0; index < moviesArr.length; index++) {
              if (documents.data().myMovies[index].movieID == id) {
                console.log("upd doc");
                if (action === "plus") {
                  console.info("plus");
                  moviesArr[index] = {
                    movieID: id,
                    addList: true,
                    like: documents.data().myMovies[index].like,
                  };
                  await updateDoc(doc(db, "mymovie", user.uid), {
                    myMovies: moviesArr,
                  });
                  setCurrentMovieData({
                    movieID: id,
                    addList: true,
                    like: documents.data().myMovies[index].like,
                  });
                  id = null;
                  break;
                } else if (action === "cancel") {
                  console.info("cancel");
                  moviesArr[index] = {
                    movieID: id,
                    addList: false,
                    like: documents.data().myMovies[index].like,
                  };
                  await updateDoc(doc(db, "mymovie", user.uid), {
                    myMovies: moviesArr,
                  });
                  setCurrentMovieData({
                    movieID: id,
                    addList: false,
                    like: documents.data().myMovies[index].like,
                  });
                  id = null;
                  break;
                } else if (action === "thumbsUp") {
                  console.info("thumbsUp");
                  moviesArr[index] = {
                    movieID: id,
                    addList: documents.data().myMovies[index].addList,
                    like: "Liked",
                  };
                  await updateDoc(doc(db, "mymovie", user.uid), {
                    myMovies: moviesArr,
                  });
                  setCurrentMovieData({
                    movieID: id,
                    addList: documents.data().myMovies[index].addList,
                    like: "Liked",
                  });
                  id = null;
                  break;
                } else if (action === "thumbsDown") {
                  console.info("thumbsDown");
                  moviesArr[index] = {
                    movieID: id,
                    addList: documents.data().myMovies[index].addList,
                    like: "Disliked",
                  };
                  await updateDoc(doc(db, "mymovie", user.uid), {
                    myMovies: moviesArr,
                  });
                  setCurrentMovieData({
                    movieID: id,
                    addList: documents.data().myMovies[index].addList,
                    like: "Disliked",
                  });
                  id = null;
                  break;
                }
              } else if (documents.data().myMovies[index].movieID === null) {
                if (action === "plus") {
                  console.log("plus first");
                  await setDoc(doc(db, "mymovie", user.uid), {
                    myMovies: [
                      {
                        movieID: id,
                        addList: true,
                        like: "none",
                      },
                    ],
                  });
                  setCurrentMovieData({
                    movieID: id,
                    addList: true,
                    like: "none",
                  });
                  id = null;
                } else if (action === "thumbsUp") {
                  console.log("thumbsUp first");
                  await setDoc(doc(db, "mymovie", user.uid), {
                    myMovies: [
                      {
                        movieID: id,
                        addList: false,
                        like: "Liked",
                      },
                    ],
                  });
                  setCurrentMovieData({
                    movieID: id,
                    addList: false,
                    like: "Liked",
                  });
                  id = null;
                } else if (action === "thumbsDown") {
                  console.log("thumbsDown first");
                  await setDoc(doc(db, "mymovie", user.uid), {
                    myMovies: [
                      {
                        movieID: id,
                        addList: false,
                        like: "Disliked",
                      },
                    ],
                  });
                  setCurrentMovieData({
                    movieID: id,
                    addList: false,
                    like: "Disliked",
                  });
                  id = null;
                }
              } else if (
                documents.data().myMovies.length - 1 == index &&
                documents.data().myMovies[index].movieID != id
              ) {
                console.log("new doc");
                if (action === "plus") {
                  console.log("plus newww");
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
                  setCurrentMovieData({
                    movieID: id,
                    addList: true,
                    like: "none",
                  });
                  id = null;
                } else if (action === "thumbsUp") {
                  console.log("thumbsUp newww");
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
                  setCurrentMovieData({
                    movieID: id,
                    addList: false,
                    like: "Liked",
                  });
                  id = null;
                } else if (action === "thumbsDown") {
                  console.log("thumbsDown newww");
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
                  setCurrentMovieData({
                    movieID: id,
                    addList: false,
                    like: "Disliked",
                  });
                  id = null;
                }
              }
            }
          }
        }
      );
    } catch (error) {
      console.error(error);
      setCurrentMovieData({
        movieData: null,
        isLoading: false,
        error: true,
      });
      return [currentMovieData, searchAndUpdate, allMovieData];
    }
  };

  return [currentMovieData, searchAndUpdate, allMovieData];
};

export default usefetchMyMovie;

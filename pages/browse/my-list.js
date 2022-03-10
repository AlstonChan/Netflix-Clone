import styles from "../../styles/browse/browse.module.css";
import React, { useContext, useState } from "react";

import Header from "../../components/browse/header/header.js";
import ConstantList from "../../components/browse/sliderCards/constantList";
import Footer from "../../components/footer/footerBrowse";
import Modals from "../../components/browse/modals/modals";
import Main from "../../components/browse/main";
import PlaceholderCard from "../../components/browse/sliderCards/placeholderCard";

import Loader from "../../components/Loader";

import { withAuthUser, AuthAction } from "next-firebase-auth";
import { useQuery } from "react-query";
import { UserContext } from "../_app";
import getAbsoluteURL from "../../lib/getAbsoluteURL";
import fetchMoviesDB from "../../lib/fetchMoviesDBFunc";

export function MyList() {
  const [modal, setModal] = useState({});
  const { myMovieData } = useContext(UserContext);

  // function that collects the data for modals,
  // determine the width and position of modal
  function toggleModal(state, e, movieSet, position) {
    if (state.state === "mouseenter") {
      const { width, top, bottom, left, right } =
        e.target.getBoundingClientRect();
      const adjustedY = top + window.scrollY;
      // console.table({ top, bottom, left, right, adjustedY });
      setModal({
        mainClass: { top: adjustedY, left, right, bottom },
        width,
        movieSet,
        position,
      });
    }
  }

  const { data } = useQuery(
    ["moviesDBList", "my-list"],
    () =>
      fetchMoviesDB(
        "my-list",
        getAbsoluteURL("/api/fetchmovie"),
        myMovieData.current.data().myMovies
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 10,
    }
  );

  return (
    <div className={styles.container}>
      <Header route={"my-list"} />
      <main className={styles.main}>
        <Modals modalStyle={modal} />
        <Main data={data}>
          <span className={styles.featuredMain}>
            <div className={styles.emptyFea}></div>
          </span>
          <h1 className={styles.listHeader}>My List</h1>
          {data ? (
            <ConstantList modal={toggleModal} movieList={data} />
          ) : (
            <>
              <PlaceholderCard />
              <PlaceholderCard />
            </>
          )}
        </Main>
      </main>
      <Footer />
    </div>
  );
}

// auth
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(MyList);

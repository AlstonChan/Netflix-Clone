import styles from "../../styles/browse/browse.module.css";
import React, { useState } from "react";

import { dehydrate, QueryClient, useQuery } from "react-query";
import fetchMoviesDB from "../../lib/fetchMoviesDBFunc";

import Header from "../../components/browse/header/header.js";
import Cards from "../../components/browse/sliderCards/cards";
import Footer from "../../components/footer/footerBrowse";
import PlaceholderCard from "../../components/browse/sliderCards/placeholderCard";
import Modals from "../../components/browse/modals/modals";
import Main from "../../components/browse/main";

import Loader from "../../components/Loader";

import getAbsoluteURL from "../../lib/getAbsoluteURL";

import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";

export const Trending = () => {
  const [modal, setModal] = useState({});

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
    ["moviesDBTv", "new"],
    () => fetchMoviesDB("new", getAbsoluteURL("/api/fetchmovie")),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 15,
    }
  );

  return (
    <div className={styles.container}>
      <Header route={"new"} />
      <main className={styles.main}>
        <Modals modalStyle={modal} />
        <Main data={data}>
          <span className={styles.featuredMain}>
            <div className={styles.emptyFea}></div>
          </span>
          {data ? (
            data.map((movie, index) => {
              return (
                <Cards
                  movieSet={movie.data.results}
                  movieGenre={movie.genre}
                  key={index}
                  modal={toggleModal}
                />
              );
            })
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
};

// auth
export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(Trending);

// getServerSideProps and auth
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.RENDER,
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (context) => {
  const host = { ...context.req.headers }.host;
  const endpoint = getAbsoluteURL("/api/fetchmovie", host);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["moviesDB", "new"], () =>
    fetchMoviesDB("new", endpoint)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
});

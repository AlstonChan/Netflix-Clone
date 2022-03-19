import styles from "../../styles/browse/browse.module.css";
import React, { useState, useEffect, useRef } from "react";

import { dehydrate, QueryClient, useQuery, useMutation } from "react-query";
import fetchMoviesDB from "../../lib/fetchMoviesDBFunc";

import Loading from "../../components/browse/loading";
import Header from "../../components/browse/header/header.js";
import Profile from "../../components/browse/profile/profile.js";
import Cards from "../../components/browse/sliderCards/cards";
import ConstantList from "../../components/browse/sliderCards/constantList";
import Featured from "../../components/browse/featured";
import Footer from "../../components/footer/footerBrowse";
import PlaceholderCard from "../../components/browse/sliderCards/placeholderCard";
import Modals from "../../components/browse/modals/modals";
import Main from "../../components/browse/main";

import Loader from "../../components/Loader";

import getAbsoluteURL from "../../lib/getAbsoluteURL";

import useIsomorphicLayoutEffect from "../../lib/isomorphic-layout";
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";

export const Browse = () => {
  const [modal, setModal] = useState({});
  const [profile, setProfile] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const searchRef = useRef();
  const [delay, setDelay] = useState();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "object") {
      const data = window.sessionStorage.getItem("profile");
      if (data === null) setProfile(null);
      setProfile(data);
    }
  }, [profile]);

  const searchMutation = useMutation((searc) =>
    fetchMoviesDB("search", getAbsoluteURL("/api/fetchmovie"), null, searc)
  );

  useEffect(() => {
    if (searchRef.current?.value) {
      clearTimeout(delay);
      setDelay(
        setTimeout(() => {
          searchMutation.mutate(searchRef.current.value);
        }, 400)
      );
    }
  }, [searchRef.current?.value]);

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

  const { data, isLoading } = useQuery(
    ["moviesDB", "hom"],
    () => fetchMoviesDB("hom", getAbsoluteURL("/api/fetchmovie")),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 15,
    }
  );

  // make sure loading page only show up when moving
  // from profile page to movies page on initial load
  useEffect(() => {
    if (!isLoading && profile === 1 && data) {
      setFirstLoad(false);
    }
  }, [isLoading, profile, data]);

  function switchPage(name) {
    setProfile(sessionStorage.setItem("profile", name));
  }

  if (firstLoad && profile && (!data || isLoading)) {
    return <Loading />;
  }

  if (!profile) {
    return <Profile switchPage={switchPage} />;
  } else {
    return (
      <div className={styles.container}>
        <Header route={"hom"} searchRef={searchRef} />
        <main className={styles.main}>
          <Modals modalStyle={modal} />
          {searchRef.current?.value ? (
            <Main data={searchMutation.data}>
              <span className={styles.featuredMain}>
                <div className={styles.emptyFea}></div>
              </span>
              {data ? (
                <ConstantList
                  modal={toggleModal}
                  movieList={searchMutation.data}
                />
              ) : (
                <>
                  <PlaceholderCard />
                  <PlaceholderCard />
                </>
              )}
            </Main>
          ) : (
            <Main data={data}>
              <span className={styles.featuredMain}>
                <Featured url={"hom"} />
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
          )}
        </main>
        <Footer />
      </div>
    );
  }
};

// auth
export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(Browse);

// getServerSideProps and auth
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.RENDER,
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (context) => {
  const host = { ...context.req.headers }.host;
  const endpoint = getAbsoluteURL("/api/fetchmovie", host);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["moviesDB", "hom"], () =>
    fetchMoviesDB("hom", endpoint)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
});

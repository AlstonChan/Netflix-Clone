import styles from "../../styles/browse/browse.module.css";

import React, { useContext, useState, useRef, useEffect } from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { useQuery, useMutation } from "react-query";
import { UserContext } from "../_app";
import getAbsoluteURL from "../../lib/getAbsoluteURL";
import fetchMoviesDB from "../../lib/fetchMoviesDBFunc";
import useIsomorphicLayoutEffect from "../../lib/isomorphic-layout";

import Header from "../../components/browse/header/header.js";
import Profile from "../../components/browse/profile/profile.js";
import ConstantList from "../../components/browse/cards/constantList";
import Footer from "../../components/footer/footerBrowse";
import Modals from "../../components/browse/modals/modals";
import Main from "../../components/browse/main";
import PlaceholderCard from "../../components/browse/cards/placeholderCard";
import Loader from "../../components/Loader";

export function MyList() {
  const [modal, setModal] = useState({});
  const [profile, setProfile] = useState(null);
  const { myMovieData } = useContext(UserContext);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function switchPage(name) {
    setProfile(sessionStorage.setItem("profile", name));
  }

  if (!profile) {
    return <Profile switchPage={switchPage} />;
  } else {
    return (
      <div className={styles.container}>
        <Header route={"my-list"} searchRef={searchRef} />
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
          )}
        </main>
        <Footer />
      </div>
    );
  }
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

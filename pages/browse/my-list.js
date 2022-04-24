import styles from "../../styles/browse/browse.module.css";

import Head from "next/head";

import React, { useContext, useState, useRef, useEffect } from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { useMutation } from "react-query";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import { UserContext } from "../_app";
import getAbsoluteURL from "../../lib/getAbsoluteURL";
import fetchMoviesDB from "../../lib/fetchMoviesDBFunc";
import useIsomorphicLayoutEffect from "../../lib/useIsomorphicLayout";

import HeaderBrowse from "../../components/browse/header/HeaderBrowse";
import Profile from "../../components/browse/profile/Profile";
import ConstantList from "../../components/browse/cards/ConstantList";
import FooterBrowse from "../../components/footer/FooterBrowse";
import Modals from "../../components/browse/modals/Modals";
import Main from "../../components/browse/Main";
import PlaceholderCard from "../../components/browse/cards/PlaceholderCard";
import Loader from "../../components/Loader";

export function MyList() {
  const [modal, setModal] = useState({}); // set small modals position, width, movie details and translate
  const [profile, setProfile] = useState(null); // set the current active profile (user)
  const { listMovieData } = useContext(UserContext); // get own movie list to query movie data
  const searchRef = useRef(); // To assist searchMutation hook to query user search using this input
  const delayRef = useRef(); // To assist searchMutation hook avoid overfetching query data
  const [openModal, setOpenModal] = useState(false); // To enlarge small modals to a big modals, and close big modals
  const scrollPosition = useRef(); // To determine the current scroll position of user, used by modal.js
  const [closeBigModal, setCloseBigModal] = useState(false);
  const searchMutation = useMutation((searc) =>
    fetchMoviesDB("search", getAbsoluteURL("/api/fetchmovie"), null, searc)
  ); // To query search data using searchRef hook input
  const [latestData, setLatestData] = useState(null);

  // To get sessionstorage data - "profile" as soon as the possible, and
  // decrypt the data to determine the current user for profile state hook
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "object") {
      const data = window.sessionStorage.getItem("profile");
      if (!data) {
        setProfile(null);
      } else {
        setProfile(
          aes
            .decrypt(data, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
            .toString(CryptoJS.enc.Utf8)
        );
      }
    }
  }, [profile]);

  // To query search data using searchmutation hook with delay
  useEffect(() => {
    if (searchRef.current?.value) {
      clearTimeout(delayRef.current);
      delayRef.current = setTimeout(() => {
        searchMutation.mutate(searchRef.current.value);
      }, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchRef.current?.value]);

  // To toggle BIG modals
  function modalToggle(state) {
    if (openModal && state === "close") {
      setOpenModal(false);
      window.scrollTo({
        top: scrollPosition.current,
        left: 0,
        behavior: "auto",
      });
    } else {
      scrollPosition.current = window.scrollY;
      setOpenModal(true);
    }
  }

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

  useEffect(() => {
    if (listMovieData && profile) {
      if (listMovieData.data()[profile]) {
        myListData.mutate(listMovieData.data()[profile]);
      } else {
        myListData.mutate([
          {
            addList: false,
            like: "none",
            movieID: null,
          },
        ]);
      }
    }
  }, [listMovieData, profile]);

  // To query data for Cards, page main data
  const myListData = useMutation(
    ["moviesDBList", "my-list"],
    (listData) =>
      fetchMoviesDB("my-list", getAbsoluteURL("/api/fetchmovie"), listData),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 10,
    }
  );

  useEffect(() => {
    if (myListData.data) {
      setLatestData(myListData.data);
    }
    console.log(myListData.data);
  }, [myListData.data]);

  // set the current profile (user)
  function switchPage(name) {
    const encrypted = aes
      .encrypt(name, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
      .toString();
    setProfile(sessionStorage.setItem("profile", encrypted));
  }

  const browseStyle = {
    position: "fixed",
    overflow: "hidden",
    width: "100%",
    top: `-${scrollPosition.current}px`,
    paddingRight: "20px",
  };

  if (!profile) {
    return <Profile switchPage={switchPage} />;
  } else {
    return (
      <>
        <Head>
          <title>Netflix Clone - My List</title>
        </Head>
        <Modals
          modalStyle={modal}
          openModal={openModal}
          modalToggle={modalToggle}
          close={closeBigModal}
          setClose={setCloseBigModal}
        />
        {openModal ? (
          <>
            <div
              className={styles.darkBgModal}
              onClick={() => setCloseBigModal(true)}
            ></div>
          </>
        ) : (
          ""
        )}
        <div
          className={styles.container}
          style={openModal ? browseStyle : { position: "static" }}
        >
          <HeaderBrowse
            route={"my-list"}
            searchRef={searchRef}
            openModal={openModal}
          />
          <main className={styles.main}>
            {searchRef.current?.value ? (
              <Main data={searchMutation.data}>
                <span className={styles.featuredMain}>
                  <div className={styles.emptyFea}></div>
                </span>
                {myListData.data ? (
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
              <Main data={latestData}>
                <span className={styles.featuredMain}>
                  <div className={styles.emptyFea}></div>
                </span>
                <h1 className={styles.listHeader}>My List</h1>
                {latestData ? (
                  <ConstantList
                    modal={toggleModal}
                    movieList={myListData.data}
                  />
                ) : (
                  <>
                    <PlaceholderCard />
                    <PlaceholderCard />
                  </>
                )}
              </Main>
            )}
          </main>
          <FooterBrowse />
        </div>
      </>
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

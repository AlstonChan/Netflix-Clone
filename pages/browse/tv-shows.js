import styles from "@/styles/browse/browse.module.css";

import Head from "next/head";

import React, { useEffect, useState, useRef } from "react";
import { flushSync } from "react-dom";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import fetchMoviesDB from "@/lib/fetchMoviesDBFunc";
import getAbsoluteURL from "@/lib/getAbsoluteURL";
import useIsomorphicLayoutEffect from "@/lib/useIsomorphicLayout";

import HeaderBrowse from "@/components/browse/header/HeaderBrowse";
import Profile from "@/components/browse/profile/Profile";
import Cards from "@/components/browse/cards/Cards";
import ConstantList from "@/components/browse/cards/ConstantList";
import FeaturedBrowse from "@/components/browse/FeaturedBrowse";
import FooterBrowse from "@/components/footer/FooterBrowse";
import PlaceholderCard from "@/components/browse/cards/PlaceholderCard";
import Modals from "@/components/browse/modals/Modals";
import Main from "@/components/browse/Main";
import Loader from "@/components/Loader";

export const TvShows = () => {
  const [modal, setModal] = useState({}); // set small modals position, width, movie details and translate
  const [profile, setProfile] = useState(null); // set the current active profile (user)
  const searchRef = useRef(); // To assist searchMutation hook to query user search using this input
  const delayRef = useRef(); // To assist searchMutation hook avoid overfetching query data
  const [openModal, setOpenModal] = useState(false); // To enlarge small modals to a big modals, and close big modals
  const scrollPosition = useRef(); // To determine the current scroll position of user, used by modal.js
  const [closeBigModal, setCloseBigModal] = useState(false);
  const searchMutation = useMutation((searc) =>
    fetchMoviesDB("search", getAbsoluteURL("/api/fetchmovie"), null, searc)
  ); // To query search data using searchRef hook input

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
      // remove react18 automatic batching
      flushSync(() => {
        setOpenModal(false);
      });
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

  // To query data for Cards, page main data
  const { data } = useQuery(
    ["moviesDBTv", "tvs"],
    () => fetchMoviesDB("tvs", getAbsoluteURL("/api/fetchmovie")),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 15,
    }
  );

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
          <title>Netflix Clone - Tv Shows</title>
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
          <HeaderBrowse route={"tvs"} ref={searchRef} openModal={openModal} />
          <main className={styles.main}>
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
                  <FeaturedBrowse url={"tvs"} />
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
          <FooterBrowse />
        </div>
      </>
    );
  }
};

// auth
export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(TvShows);

// getServerSideProps and auth
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.RENDER,
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (context) => {
  const host = { ...context.req.headers }.host;
  const endpoint = getAbsoluteURL("/api/fetchmovie", host);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["moviesDBTv", "tvs"], () =>
    fetchMoviesDB("tvs", endpoint)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
});

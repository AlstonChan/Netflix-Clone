import styles from "../../styles/browse/browse.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import useIsomorphicLayoutEffect from "../../lib/isomorphic-layout";

import axios from "axios";

import Loading from "../../components/browse/loading";
import Header from "../../components/browse/header/header.js";
import Profile from "../../components/browse/profile";
import Cards from "../../components/browse/sliderCards/cards";
import Featured from "../../components/browse/featured";
import Footer from "../../components/footer/footerBrowse";
import PlaceholderCard from "../../components/browse/sliderCards/placeholderCard";
import Modals from "../../components/browse/modals/modals";

import Loader from "../../components/Loader";

import getAbsoluteURL from "../../lib/getAbsoluteURL";

import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from "next-firebase-auth";

function Browse() {
  const router = useRouter();
  const [profile, setProfile] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [modal, setModal] = useState({});
  const [requestedDataRoute, setRequestedDataRoute] = useState(
    () => router.query.fetchmoviedata
  );
  const { data, isLoading } = useQuery(
    ["moviesDB", requestedDataRoute],
    () => fetchMoviesDB(requestedDataRoute, getAbsoluteURL("/api/fetchmovie")),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 15,
    }
  );
  const movieList = useQuery(
    ["movieList", requestedDataRoute],
    () =>
      axios.post(getAbsoluteURL("/api/fetchmymovie"), {
        requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
        requestedData: "myl",
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 2,
    }
  );

  useEffect(() => {
    console.log(movieList);
  }, [movieList]);

  // =========================DEVELOPMENT==========================

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
      if (url.includes("fetchmoviedata")) {
        setRequestedDataRoute(url.slice(-3));
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });

  useIsomorphicLayoutEffect(() => {
    if (
      requestedDataRoute === "hom" ||
      requestedDataRoute === "tvs" ||
      requestedDataRoute === "new" ||
      requestedDataRoute === "myl"
    ) {
      setProfile(2);
      setFirstLoad(false);
    }
  }, []);

  // make sure loading page only show up when moving
  // from profile page to movies page on initial load
  useEffect(() => {
    if (!isLoading && profile === 1) {
      setFirstLoad(false);
    }
  }, [isLoading]);

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

  function switchPage() {
    setProfile(1);
  }

  if (firstLoad && profile && (!data || isLoading)) {
    return <Loading />;
  }

  return profile ? (
    <div className={styles.container}>
      <Header route={requestedDataRoute} />
      <main className={styles.main}>
        <Modals modalStyle={modal} />
        <Main data={data}>
          <span className={styles.featuredMain}>
            {requestedDataRoute == "hom" || requestedDataRoute == "tvs" ? (
              <Featured url={requestedDataRoute} />
            ) : (
              <div className={styles.emptyFea}></div>
            )}
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
  ) : (
    <Profile switchPage={switchPage} />
  );
}

// auth
export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(Browse);

// to prevent rerender when update modal state
export const Main = React.memo(
  ({ children }) => {
    return children;
  },
  // I actually don't know why and how it works, it just works
  (prevProps, nextProps) => {
    if (prevProps.data === nextProps.data) {
      return true;
    } else return false;
  }
);
Main.displayName = "Main";

// function that run on both server and client side
// to connect to the server to fetch movie data
export async function fetchMoviesDB(requestedData, endpoint) {
  if (!requestedData) return;
  const result = await axios.post(endpoint, {
    requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
    requestedData: requestedData,
  });
  return result.data.movies;
}

// getServerSideProps and auth
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.RENDER,
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (context) => {
  const host = { ...context.req.headers }.host;
  const endpoint = getAbsoluteURL("/api/fetchmovie", host);
  const queryClient = new QueryClient();
  let requestedData = "";
  if (context.query.fetchmoviedata == "hom") {
    requestedData = "hom";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData, endpoint)
    );
  } else if (context.query.fetchmoviedata == "tvs") {
    requestedData = "tvs";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData, endpoint)
    );
  } else if (context.query.fetchmoviedata == "new") {
    requestedData = "new";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData, endpoint)
    );
  }

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
});

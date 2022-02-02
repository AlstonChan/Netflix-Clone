import styles from "../styles/browse/browse.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import axios from "axios";

import Loading from "../components/browse/loading";
import Header from "../components/browse/header/header.js";
import Profile from "../components/browse/profile";
import Cards from "../components/browse/cards";
import Featured from "../components/browse/featured";
import Footer from "../components/footer/footerBrowse";

export default function Browse() {
  const router = useRouter();
  const [profile, setProfile] = useState(false);
  const [requestedDataRoute, setRequestedDataRoute] = useState(
    () => router.query.fetchmoviedata
  );
  const { data, isLoading } = useQuery(
    ["moviesDB", requestedDataRoute],
    () => fetchMoviesDB(requestedDataRoute),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 15,
    }
  );

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

  function switchPage() {
    setProfile(true);
  }

  if (profile && isLoading) {
    return <Loading />;
  }

  return profile ? (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div>
            <span className={styles.featuredMain}>
              {requestedDataRoute == "hom" || requestedDataRoute == "tvs" ? (
                <Featured url={requestedDataRoute} />
              ) : (
                ""
              )}
            </span>
            {/* <Cards /> */}
            {data
              ? data.map((movie, index) => {
                  return (
                    <Cards
                      movieSet={movie.data.results}
                      movieGenre={movie.genre}
                      key={index}
                    />
                  );
                })
              : ""}
          </div>
        </main>
        <Footer />
      </div>
    </>
  ) : (
    <Profile switchPage={switchPage} />
  );
}

export async function fetchMoviesDB(requestedData) {
  const result = await axios.post("http://localhost:3000/api/fetchmovie", {
    requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
    requestedData: requestedData,
  });
  return result.data.movies;
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  let requestedData = "";
  if (context.query.fetchmoviedata == "hom") {
    requestedData = "hom";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData)
    );
  } else if (context.query.fetchmoviedata == "tvs") {
    requestedData = "tvs";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData)
    );
  } else if (context.query.fetchmoviedata == "new") {
    requestedData = "new";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData)
    );
  }
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

import styles from "../styles/browse/browse.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import router from "next/router";
const instances = axios.create({
  baseURL: "https://api.themoviedb.org/3/discover",
});

import Loading from "../components/browse/loading";
import Header from "../components/browse/header/header.js";
import Profile from "../components/browse/profile";
import Cards from "../components/browse/cards";
import Featured from "../components/browse/featured";
import Footer from "../components/footer/footerBrowse";

export default function Browse(movies) {
  const [profile, setProfile] = useState(false);

  function switchPage() {
    setProfile(true);
  }

  let loc;

  router.events.on("routeChangeStart", (e) => {
    console.log(e);
    loc = e;
  });

  if (loc === "/browse?fetchhom=true" && profile && movies.length == 0) {
    return <Loading />;
  }

  return profile ? (
    <>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          {window.location.pathname === "/search" ? (
            <h1>hisadads</h1>
          ) : (
            <div>
              <span className={styles.featuredMain}>
                <Featured />
              </span>
              {/* <Cards /> */}
              {movies.movies.map((movie, index) => {
                return (
                  <Cards
                    movieSet={movie.data.results}
                    movieGenre={movie.genre}
                    key={index}
                  />
                );
              })}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  ) : (
    <Profile switchPage={switchPage} />
  );
}

export async function getServerSideProps(context) {
  const movies = [];
  const genres = [
    { id: 28, name: "Action Heroes" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedies" },
    // { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family Movies" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror Movies" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romantic Movies" },
    { id: 878, name: "Science Fiction" },
    // { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western Movies" },
  ];
  console.log(context.res);

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=420"
  );

  if (context.query.fetchhom) {
    let pageIndex = 1;
    for (let x = 0; x < genres.length; x++) {
      if (pageIndex > 4) pageIndex = pageIndex - 1;
      const url = `/movie?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=${genres[x].id}&page=${pageIndex}`;
      pageIndex++;
      const res = await instances.get(url);
      const data = res.data;
      movies.push({ genre: genres[x].name, data });
    }
  }

  return {
    props: { movies },
  };
}

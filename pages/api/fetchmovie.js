import axios from "axios";
const instances = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

import { movieGenres, tvGenres, trendingType } from "../../lib/movieGenres";

export default async function handler(req, res) {
  const { requiredKey, requestedData, myListData } = req.body;
  try {
    if (requiredKey === process.env.FETCH_KEY && req.method === "POST") {
      if (requestedData === "hom") {
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < movieGenres.length; x++) {
          if (pageIndex > 3) pageIndex = pageIndex - 1;
          const url = `/discover/movie?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=${movieGenres[x].id}&page=${pageIndex}`;
          pageIndex++;
          const res = await instances.get(url);
          const data = res.data;
          movies.push({ genre: movieGenres[x].name, data });
        }
        res.status(200).json({ movies });
        res.end();
      } else if (requestedData === "tvs") {
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < tvGenres.length; x++) {
          if (pageIndex > 3) pageIndex = pageIndex - 1;
          if (tvGenres[x].id == 37) pageIndex = 1;
          const url = `/discover/tv?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=${tvGenres[x].id}&page=${pageIndex}`;
          pageIndex++;
          const res = await instances.get(url);
          const data = res.data;
          movies.push({ genre: tvGenres[x].name, data });
        }
        res.status(200).json({ movies });
        res.end();
      } else if (requestedData === "new") {
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < trendingType.length; x++) {
          if (trendingType[x] == "all") {
            pageIndex = 5;
          } else {
            pageIndex = 1;
          }
          const url = `/trending/${trendingType[x]}/week?api_key=${process.env.MOVIE_DB_API_KEY}&page=${pageIndex}`;
          const res = await instances.get(url);
          const data = res.data;
          movies.push({
            genre:
              trendingType[x].charAt(0).toUpperCase() +
              trendingType[x].slice(1),
            data,
          });
        }
        res.status(200).json({ movies });
        res.end();
      } else if (requestedData === "my-list" && myListData !== null) {
        const movies = [];

        for (let x = 0; x < myListData.length; x++) {
          if (myListData[x].addList) {
            const url = `/movie/${myListData[x].movieID}?api_key=${process.env.MOVIE_DB_API_KEY}`;
            const res = await instances.get(url, {
              validateStatus: false,
            });
            const data = res.data;
            if (data.success !== false || typeof data.success === undefined) {
              movies.push({
                data,
              });
            }
          }
        }

        res.status(200).json({ movies });
        res.end();
      } else {
        res.status(400);
        res.end(`Error 400 | Bad Request`);
      }
    } else {
      res.status(403);
      res.end(`Error 403 | Unauthorized`);
    }
  } catch (error) {
    console.group();
    console.log(error);
    console.info("\x1b[33m", `Error Code: ${error.code}`);
    console.log("\x1b[31m", `Error Message: ${error.message}`);
    console.groupEnd();
    res.status(500);
    res.end(`Error 500 | Internal Server Error`);
  }
}

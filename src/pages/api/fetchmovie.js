import axios from "axios";
const instances = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

import { movieGenres, tvGenres, trendingType } from "../../lib/movieGenres";

export default async function handler(req, res) {
  const { requiredKey, requestedData, additionData } = req.body;
  try {
    if (requiredKey === process.env.FETCH_KEY && req.method === "POST") {
      if (requestedData === "hom") {
        // Browse Homepage
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < movieGenres.length; x++) {
          if (pageIndex > 3) pageIndex = pageIndex - 1;
          const url = `/discover/movie?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=${movieGenres[x].id}&page=${pageIndex}&include_adult=true`;
          pageIndex++;
          const res = await instances.get(url);
          const data = res.data;
          movies.push({ genre: movieGenres[x].name, data });
        }
        res.status(200).json({ movies });
        res.end();
      } else if (requestedData === "tvs") {
        // Browse TV Shows page
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < tvGenres.length; x++) {
          if (pageIndex > 3) pageIndex = pageIndex - 1;
          if (tvGenres[x].id == 37) pageIndex = 1;
          const url = `/discover/tv?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=${tvGenres[x].id}&page=${pageIndex}&include_adult=true`;
          pageIndex++;
          const res = await instances.get(url);
          const data = res.data;
          movies.push({ genre: tvGenres[x].name, data });
        }
        res.status(200).json({ movies });
        res.end();
      } else if (requestedData === "new") {
        // Browse Trending page
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < trendingType.length; x++) {
          if (trendingType[x] == "all") {
            pageIndex = 5;
          } else {
            pageIndex = 1;
          }
          const url = `/trending/${trendingType[x]}/week?api_key=${process.env.MOVIE_DB_API_KEY}&page=${pageIndex}&include_adult=true`;
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
      } else if (requestedData === "my-list" && additionData) {
        // Browse My List Page
        const movies = [];
        const movieLists = [];

        if (additionData.last === null) {
          for (let x = 0; x < additionData.new.length; x++) {
            if (additionData.new[x].addList && additionData.new[x].movieID) {
              if (additionData.new[x].movType === "movie") {
                const url = `/movie/${additionData.new[x].movieID}?api_key=${process.env.MOVIE_DB_API_KEY}`;
                const res = await instances.get(url, {
                  validateStatus: false,
                });
                const data = res.data;
                if (
                  data.success !== false ||
                  typeof data.success === undefined
                ) {
                  movies.push({
                    data,
                  });
                }
              } else if (additionData.new[x].movType === "tv") {
                const url = `/tv/${additionData.new[x].movieID}?api_key=${process.env.MOVIE_DB_API_KEY}`;
                const res = await instances.get(url, {
                  validateStatus: false,
                });
                const data = res.data;
                if (
                  data.success !== false ||
                  typeof data.success === undefined
                ) {
                  movies.push({
                    data,
                  });
                }
              }
            }
          }
        } else {
          for (let x = 0; x < additionData.new.length; x++) {
            if (additionData.new[x].addList === true) {
              movieLists.push(additionData.new[x]);
            }
          }

          for (let x = 0; x < additionData.last.length; x++) {
            for (let y = 0; y < movieLists.length; y++) {
              if (
                Object.is(additionData.last[x].data.id, movieLists[y].movieID)
              ) {
                movieLists.splice(y, 1);
                movies.push({
                  data: additionData.last[x].data,
                });
              }
            }
          }

          if (movieLists.length >= 1) {
            for (let x = 0; x < movieLists.length; x++) {
              if (movieLists[x].addList && movieLists[x].movieID) {
                if (movieLists[x].movType === "movie") {
                  const url = `/movie/${movieLists[x].movieID}?api_key=${process.env.MOVIE_DB_API_KEY}`;
                  const res = await instances.get(url, {
                    validateStatus: false,
                  });
                  const data = res.data;
                  if (
                    data.success !== false ||
                    typeof data.success === undefined
                  ) {
                    movies.push({
                      data,
                    });
                  }
                } else if (movieLists[x].movType === "tv") {
                  const url = `/tv/${movieLists[x].movieID}?api_key=${process.env.MOVIE_DB_API_KEY}`;
                  const res = await instances.get(url, {
                    validateStatus: false,
                  });
                  const data = res.data;
                  if (
                    data.success !== false ||
                    typeof data.success === undefined
                  ) {
                    movies.push({
                      data,
                    });
                  }
                }
              }
            }
          }
        }

        res.status(200).json({ movies });
        res.end();
      } else if (
        requestedData === "search" &&
        additionData !== null &&
        additionData !== undefined
      ) {
        const movies = [];
        let totalPage = 1;
        let pageIndex = 1;
        for (let x = 0; x < totalPage; x++) {
          const url = `/search/tv?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${additionData}&page=${pageIndex}&include_adult=false`;
          const res = await instances.get(url);
          const rawData = res.data.results;
          const data = rawData.map((mov) => {
            return { data: mov };
          });
          pageIndex++;
          if (res.data.total_pages >= 2) {
            totalPage = 2;
          } else {
            totalPage = 1;
          }
          movies.push(data);
        }
        for (let x = 0; x < totalPage; x++) {
          const url = `/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${additionData}&page=${pageIndex}&include_adult=false`;
          const res = await instances.get(url);
          const rawData = res.data.results;
          const data = rawData.map((mov) => {
            return { data: mov };
          });
          pageIndex++;
          if (res.data.total_pages >= 2) {
            totalPage = 2;
          } else {
            totalPage = 1;
          }
          movies.push(data);
        }

        res.status(200).json({ movies: movies.flat() });
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

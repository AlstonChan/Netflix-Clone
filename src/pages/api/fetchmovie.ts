// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { BrowseRoute, DataType } from "@/components/browse/types";
import { movieGenres, tvGenres, trendingType } from "../../lib/movieGenres";

import type {
  DataListContentType,
  DataListType,
} from "@/components/browse/types";
import type { NextApiRequest, NextApiResponse } from "next";
import type { UserDataType } from "src/hooks/browse/fetchMovieHook/helper";

const basename = "https://api.themoviedb.org/3";

type ResponseData = {
  movies: DataListType[] | { data: DataType }[];
};

type ListDataType = {
  new: UserDataType[];
  prev: any | null;
};

type RequestBody = {
  requiredKey: string;
  requestedData: BrowseRoute | "search";
  additionData: ListDataType | string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { requiredKey, requestedData, additionData }: RequestBody = JSON.parse(
    req.body
  );
  const fetchKey = process.env.FETCH_KEY || "";
  const apiKey = process.env.MOVIE_DB_API_KEY || "";

  try {
    if (requiredKey === fetchKey && req.method === "POST") {
      switch (requestedData) {
        case "home":
          const movies = [];
          let pageIndexMov = 1;

          for (let x = 0; x < movieGenres.length; x++) {
            if (pageIndexMov > 3) pageIndexMov = pageIndexMov - 1;
            const url = `/discover/movie?api_key=${apiKey}&with_genres=${movieGenres[x].id}&page=${pageIndexMov}&include_adult=true`;
            pageIndexMov++;

            const res = await fetch(`${basename}${url}`, { method: "GET" });
            const data: DataListContentType = await res.json();

            const single: DataListType = { genre: movieGenres[x].name, data };
            movies.push(single);
          }

          res.status(200).json({ movies });
          res.end();
          break;
        case "tv-shows":
          const tvs = [];
          let pageIndexTv = 1;
          for (let x = 0; x < tvGenres.length; x++) {
            if (pageIndexTv > 3) pageIndexTv = pageIndexTv - 1;
            if (tvGenres[x].id == 37) pageIndexTv = 1;
            const url = `/discover/tv?api_key=${apiKey}&with_genres=${tvGenres[x].id}&page=${pageIndexTv}&include_adult=true`;
            pageIndexTv++;

            const res = await fetch(`${basename}${url}`, { method: "GET" });
            const data: DataListContentType = await res.json();

            const single: DataListType = { genre: tvGenres[x].name, data };
            tvs.push(single);
          }
          res.status(200).json({ movies: tvs });
          res.end();
          break;
        case "trending":
          const trending = [];
          let pageIndexTrend = 1;
          for (let x = 0; x < trendingType.length; x++) {
            if (trendingType[x] == "all") {
              pageIndexTrend = 5;
            } else {
              pageIndexTrend = 1;
            }
            const url = `/trending/${trendingType[x]}/week?api_key=${apiKey}&page=${pageIndexTrend}&include_adult=true`;
            const res = await fetch(`${basename}${url}`, {
              method: "GET",
            });
            const data: DataListContentType = await res.json();

            const single: DataListType = {
              genre:
                trendingType[x].charAt(0).toUpperCase() +
                trendingType[x].slice(1),
              data,
            };
            trending.push(single);
          }
          res.status(200).json({ movies: trending });
          res.end();
          break;
        case "my-list":
          if (additionData && typeof additionData !== "string") {
            console.log(additionData);
            const myMovie: { data: DataType }[] = [];
            const movieLists: UserDataType[] = [];
            console.log(additionData);

            const fetchMovById = async (
              dataToLoop: UserDataType[],
              dataToPush: { data: DataType }[]
            ) => {
              for (let x = 0; x < dataToLoop.length; x++) {
                const movAddList = dataToLoop[x].addList;
                const movId = dataToLoop[x].movieID;
                const movType = dataToLoop[x].movType;

                if (movAddList && movId) {
                  switch (movType) {
                    case "movie":
                      const movUrl = `/movie/${movId}?api_key=${apiKey}`;
                      const movRes = await fetch(`${basename}${movUrl}`, {
                        method: "GET",
                      });
                      const movData: DataType = await movRes.json();

                      if (movRes.status === 200)
                        dataToPush.push({ data: movData });

                      break;
                    case "tv":
                      const tvUrl = `/tv/${movId}?api_key=${apiKey}`;
                      const tvRes = await fetch(`${basename}${tvUrl}`, {
                        method: "GET",
                      });
                      const tvData: DataType = await tvRes.json();

                      if (tvRes.status === 200)
                        dataToPush.push({ data: tvData });
                      break;
                  }
                }
              }
            };

            if (additionData.prev === null) {
              await fetchMovById(additionData.new, myMovie);
            } else {
              for (let x = 0; x < additionData.new.length; x++) {
                if (additionData.new[x].addList === true) {
                  movieLists.push(additionData.new[x]);
                }
              }

              for (let x = 0; x < additionData.prev.length; x++) {
                for (let y = 0; y < movieLists.length; y++) {
                  if (
                    Object.is(
                      additionData.prev[x].data.id,
                      movieLists[y].movieID
                    )
                  ) {
                    movieLists.splice(y, 1);
                    myMovie.push({
                      data: additionData.prev[x].data,
                    });
                  }
                }
              }

              if (movieLists.length >= 1) {
                await fetchMovById(movieLists, myMovie);
              }
            }

            console.log(myMovie);
            res.status(200).json({ movies: myMovie });
            res.end();
          } else {
            res.status(400);
            res.end(`Error 400 | Bad Request`);
          }

          break;
        case "search":
          if (additionData && typeof additionData === "string") {
            const searchMovie: { data: DataType }[][] = [];
            let totalPage = 1;
            let pageIndex = 1;

            for (let x = 0; x < totalPage; x++) {
              const url = `/search/tv?api_key=${apiKey}&language=en-US&query=${additionData}&page=${pageIndex}&include_adult=false`;

              const res = await fetch(`${basename}${url}`, {
                method: "GET",
              });
              const rawData: DataListContentType = await res.json();
              const data = rawData.results.map((mov: DataType) => {
                return { data: mov };
              });
              pageIndex++;
              if (rawData.total_pages >= 2) {
                totalPage = 2;
              } else {
                totalPage = 1;
              }
              searchMovie.push(data);
            }
            for (let x = 0; x < totalPage; x++) {
              const url = `/search/movie?api_key=${apiKey}&language=en-US&query=${additionData}&page=${pageIndex}&include_adult=false`;
              const res = await fetch(`${basename}${url}`, {
                method: "GET",
              });
              const rawData: DataListContentType = await res.json();
              const data: { data: DataType }[] = rawData.results.map(
                (mov: DataType) => {
                  return { data: mov };
                }
              );
              pageIndex++;
              if (rawData.total_pages >= 2) {
                totalPage = 2;
              } else {
                totalPage = 1;
              }
              searchMovie.push(data);
            }

            res.status(200).json({ movies: searchMovie.flat() });
            res.end();
          } else {
            res.status(400);
            res.end(`Error 400 | Bad Request`);
          }

          break;
        default:
          break;
      }
    } else {
      res.status(403);
      res.end(`Error 403 | Unauthorized`);
    }
  } catch (error: any) {
    console.group();
    console.log(error);
    console.info("\x1b[33m", `Error Code: ${error.code}`);
    console.log("\x1b[31m", `Error Message: ${error.message}`);
    console.groupEnd();
    res.status(500);
    res.end(`Error 500 | Internal Server Error`);
  }
}

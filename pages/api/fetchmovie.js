import axios from "axios";
const instances = axios.create({
  baseURL: "https://api.themoviedb.org/3/discover",
});

const movieGenres = [
  { id: 28, name: "Action Heroes" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedies" },
  { id: 80, name: "Crime" },
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
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western Movies" },
];

const tvGenres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

const trendingType = ["all", "movie", "tv"];

export default async function handler(req, res) {
  const { requiredKey, requestedData } = req.body;
  try {
    if (requiredKey === process.env.FETCH_KEY && req.method === "POST") {
      if (requestedData === "hom") {
        const movies = [];
        let pageIndex = 1;
        for (let x = 0; x < movieGenres.length; x++) {
          if (pageIndex > 3) pageIndex = pageIndex - 1;
          const url = `/movie?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=${movieGenres[x].id}&page=${pageIndex}`;
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
          const url = `/tv?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=${tvGenres[x].id}&page=${pageIndex}`;
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
          const url = `https://api.themoviedb.org/3/trending/${trendingType[x]}/week?api_key=${process.env.MOVIE_DB_API_KEY}&page=${pageIndex}`;
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
      }
    } else {
      res.status(403);
      res.end(`Error 403`);
    }
  } catch {
    res.status(500);
    res.end(`Error 500`);
  }
}

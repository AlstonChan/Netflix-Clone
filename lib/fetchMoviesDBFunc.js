import axios from "axios";

// function that run on both server and client side
// to connect to the server to fetch movie data
export default async function fetchMoviesDB(requestedData, endpoint) {
  if (!requestedData) return;
  const result = await axios.post(endpoint, {
    requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
    requestedData: requestedData,
  });
  return result.data.movies;
}

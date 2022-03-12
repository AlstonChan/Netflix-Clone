import axios from "axios";

// function that run on both server and client side
// to connect to the server to fetch movie data
export default async function fetchMoviesDB(
  requestedData,
  endpoint,
  myListData = null
) {
  if (!requestedData) return;
  if (myListData === null) {
    const result = await axios.post(endpoint, {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
    });
    return result.data.movies;
  } else {
    const result = await axios.post(endpoint, {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
      myListData: myListData,
    });
    return result.data.movies;
  }
}

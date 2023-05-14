import { BrowseRoute } from "@/components/browse/types";
import axios from "axios";

// function that run on both server and client side
// to connect to the server to fetch movie data
export default async function fetchMoviesDB(
  requestedData: BrowseRoute | "search",
  endpoint: string,
  myListData: any = null,
  searchQuery: string | null = null
) {
  if (!requestedData) return;
  if (myListData === null && searchQuery === null) {
    const result = await axios.post(endpoint, {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
    });
    return result.data.movies;
  } else if (myListData === null && searchQuery !== null) {
    const result = await axios.post(endpoint, {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
      additionData: searchQuery,
    });
    return result.data.movies;
  } else if (myListData !== null && searchQuery === null) {
    const result = await axios.post(endpoint, {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
      additionData: myListData,
    });
    return result.data.movies;
  }
}

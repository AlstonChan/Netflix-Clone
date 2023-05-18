// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import type { BrowseRoute, ListDataType } from "@/components/browse/types";

// function that run on both server and client side
// to connect to the server to fetch movie data
export default async function fetchMoviesDB(
  requestedData: BrowseRoute | "search",
  endpoint: string,
  myListData: ListDataType | null = null,
  searchQuery: string | null = null
) {
  if (!requestedData) return;
  if (myListData === null && searchQuery === null) {
    const bodyData = {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
    };
    const result = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
    const data = await result.json();

    return data.movies;
  }

  if (myListData === null && searchQuery !== null) {
    const bodyData = {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
      additionData: searchQuery,
    };
    const result = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
    const data = await result.json();

    return data.movies;
  }

  if (myListData !== null && searchQuery === null) {
    const bodyData = {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
      additionData: myListData,
    };

    const result = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
    const data = await result.json();

    return data.movies;
  }
}

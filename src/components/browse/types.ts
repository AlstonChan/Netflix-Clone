// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import type { CSSProperties } from "react";
import type { UserDataType } from "src/hooks/browse/fetchMovieHook/helper";
import type { UserRecord } from "firebase-admin/lib/auth/user-record";

export type GenresType = {
  id: number;
  name: string;
};

export type DataType = {
  readonly id: number;
  readonly name?: string;
  readonly title?: string;
  readonly original_title: string;
  readonly overview: string;
  readonly first_air_date?: string;
  readonly release_date?: string;
  readonly genre_ids?: number[];
  readonly genres?: GenresType[];
  readonly original_language: string;
  readonly backdrop_path?: string;
  readonly poster_path: string;
  readonly adult: boolean;
  readonly vote_average: 6.5;
  readonly vote_count: number;
  readonly popularity: number;
  readonly video: false;
};

export type DataListContentType = {
  readonly page: number;
  readonly total_pages: number;
  readonly total_results: number;
  readonly results: DataType[];
};

export type DataListType = {
  readonly data: DataListContentType;
  readonly genre: string;
};

export type SmallModalPositionType = "leftEdge" | "rightEdge" | "middle";

export interface ModalType {
  style: CSSProperties;
  position: SmallModalPositionType;
  width: number;
  movieData: DataType;
}

export type BrowseRoute = "home" | "tv-shows" | "trending" | "my-list";
export type BrowseRouteTxt = "Home" | "TV Shows" | "New & Popular" | "My List";

export type ListDataType = {
  new: UserDataType[];
  prev: DataListType[] | UserDataType[] | null;
};

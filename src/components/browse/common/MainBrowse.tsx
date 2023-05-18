// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { useContext } from "react";
import { BrowseContext } from "./BrowseContext";

import Memo from "@/components/browse/Memo";
import PlaceholderCard from "@/components/browse/cards/PlaceholderCard";
import FeaturedBrowse from "@/components/browse/hero/FeaturedBrowse";
import Cards from "@/components/browse/cards/Cards";

import type { CSSProperties } from "react";
import type { BrowseRoute } from "../types";
import ConstantList, { MovieListType } from "../cards/ConstantList";

interface MainBrowseProps {
  route: BrowseRoute;
}

export default function MainBrowse({ route }: MainBrowseProps) {
  const { data, toggleModal } = useContext(BrowseContext);

  const featuredContainer: CSSProperties = {
    position: "relative",
    display: "inline-block",
    width: "100%",
  };

  const routeIsHomeOrTv = route === "home" || route === "tv-shows";

  return (
    toggleModal && (
      <Memo data={data}>
        <>
          <div style={featuredContainer}>
            {routeIsHomeOrTv ? (
              <FeaturedBrowse route={route} />
            ) : (
              <div style={{ paddingTop: "74px" }}></div>
            )}
          </div>
          {data ? (
            route === "my-list" ? (
              <ConstantList
                modal={toggleModal}
                movieList={data as unknown as MovieListType[]}
              />
            ) : (
              data.map((movie, index) => {
                return (
                  <Cards
                    movieSet={movie.data.results}
                    movieGenre={movie.genre}
                    modal={toggleModal}
                    key={index}
                  />
                );
              })
            )
          ) : (
            <>
              <PlaceholderCard />
              <PlaceholderCard />
            </>
          )}
        </>
      </Memo>
    )
  );
}

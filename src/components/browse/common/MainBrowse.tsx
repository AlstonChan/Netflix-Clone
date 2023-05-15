// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { useContext } from "react";
import { BrowseContext } from "./BrowseContext";

import Memo from "@/components/browse/Memo";
import PlaceholderCard from "@/components/browse/cards/PlaceholderCard";
import FeaturedBrowse from "@/components/browse/FeaturedBrowse";
import Cards from "@/components/browse/cards/Cards";

import type { CSSProperties } from "react";
import type { BrowseRoute } from "../types";

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

  return (
    toggleModal && (
      <Memo data={data}>
        <>
          <div style={featuredContainer}>
            <FeaturedBrowse url={route} />
          </div>
          {data ? (
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

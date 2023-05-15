import { useContext } from "react";
import { BrowseContext } from "./BrowseContext";

import Loader from "@/components/Loader";
import Memo from "@/components/browse/Memo";
import PlaceholderCard from "@/components/browse/cards/PlaceholderCard";
import FeaturedBrowse from "@/components/browse/FeaturedBrowse";
import Cards from "@/components/browse/cards/Cards";
import type { CSSProperties } from "react";

export default function MainBrowse() {
  const { data, toggleModal } = useContext(BrowseContext);

  if (!toggleModal) return <Loader />;

  const featuredContainer: CSSProperties = {
    position: "relative",
    display: "inline-block",
    width: "100%",
  };

  return (
    <Memo data={data}>
      <>
        <div style={featuredContainer}>
          <FeaturedBrowse url={"hom"} />
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
  );
}

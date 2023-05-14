import styles from "@/styles/browse/browse.module.css";

import Memo from "@/components/browse/Memo";
import PlaceholderCard from "@/components/browse/cards/PlaceholderCard";
import { useContext } from "react";
import { BrowseContext } from "@/pages/browse";
import Loader from "@/components/Loader";
import FeaturedBrowse from "@/components/browse/FeaturedBrowse";
import Cards from "@/components/browse/cards/Cards";

export default function MainBrowse() {
  const { data, toggleModal } = useContext(BrowseContext);

  if (!toggleModal) return <Loader />;

  return (
    <Memo data={data}>
      <>
        <span className={styles.featuredMain}>
          <FeaturedBrowse url={"hom"} />
        </span>
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

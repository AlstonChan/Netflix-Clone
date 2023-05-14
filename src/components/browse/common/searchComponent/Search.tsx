import styles from "@/styles/browse/browse.module.css";

import Memo from "@/components/browse/Memo";
import ConstantList from "@/components/browse/cards/ConstantList";
import PlaceholderCard from "@/components/browse/cards/PlaceholderCard";
import { useContext } from "react";
import { BrowseContext } from "@/pages/browse";
import Loader from "@/components/Loader";

export default function Search() {
  const { data, searchMutation, toggleModal } = useContext(BrowseContext);

  if (!searchMutation || !toggleModal) return <Loader />;

  return (
    <Memo data={searchMutation.data}>
      <>
        <span className={styles.featuredMain}>
          <div className={styles.emptyFea}></div>
        </span>
        {data ? (
          <ConstantList modal={toggleModal} movieList={searchMutation.data} />
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

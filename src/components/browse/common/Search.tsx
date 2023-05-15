import { useContext } from "react";
import { BrowseContext } from "./BrowseContext";

import Memo from "@/components/browse/Memo";
import ConstantList from "@/components/browse/cards/ConstantList";
import PlaceholderCard from "@/components/browse/cards/PlaceholderCard";
import Loader from "@/components/Loader";

export default function Search() {
  const { data, searchMutation, toggleModal } = useContext(BrowseContext);

  if (!searchMutation || !toggleModal) return <Loader />;

  return (
    <Memo data={searchMutation.data}>
      <>
        <div style={{ paddingTop: "74px" }}></div>
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

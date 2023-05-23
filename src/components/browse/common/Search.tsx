// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { useContext } from "react";
import { BrowseContext } from "./BrowseContext";

import Memo from "@/components/browse/Memo";
import ConstantList from "@/components/browse/cards/ConstantList";
import PlaceholderCard from "@/components/browse/cards/PlaceholderCard";

export default function Search() {
  const { data, searchMutation, toggleModal } = useContext(BrowseContext);

  return (
    searchMutation &&
    toggleModal && (
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
    )
  );
}

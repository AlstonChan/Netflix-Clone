// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./searchComponent.module.scss";
import Search from "@/public/images/icons/misc/search.svg";
import CancelSvg from "../../../icons/CancelSvg";

import Image from "next/image";
import { useRouter } from "next/router";

import React, { useContext } from "react";
import { useDeferredValue, useEffect, useState } from "react";
import { BrowseContext } from "../../common/BrowseContext";

import type { ChangeEvent } from "react";

// (searchRef) ref forward order as follow:
// browse(index, tv, new, my list) -> HeaderBrowse -> SearchComponent
export default function SearchComponent() {
  const { searchMutation } = useContext(BrowseContext);

  const router = useRouter();
  // Indicate if search input should be shown.
  // The search input is hidden by default.
  const [showInput, setShowInput] = useState<boolean>(false);
  // Indicate the current page the user is on.
  // Possible values are "/browse", "/browse/tv-shows",
  // "/browse/trending" and "/browse/my-list"
  const [currentPage, setCurrentPage] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");
  const deferredSearchValue = useDeferredValue(searchValue);

  // Handle route changes as search input is updated
  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });

  // Set currentPage state
  const handleRouteChange = (
    url: string,
    { shallow }: { shallow: boolean }
  ) => {
    console.log(
      `App is changing to ${url} ${
        shallow ? "with" : "without"
      } shallow routing`
    );
    if (url.includes("?search=")) {
      const page = url.split("?").shift();
      if (page) setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (searchMutation) {
      setTimeout(() => {
        if (searchValue === "") {
          searchMutation.reset();
        } else searchMutation.mutate(deferredSearchValue);
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredSearchValue]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    router.push({ pathname: currentPage, query: `search=${value}` });
    setSearchValue(value);
  }

  // If user clicked elsewhere and does not focus
  // on the search input, the input will be closed
  function toggleSearchInput(e: any, type?: "show") {
    if (type === "show") {
      setShowInput(true);
    }

    if (searchValue) {
      return;
    } else if (e.type === "blur" && e.type !== "click") {
      setShowInput(false);
    }
  }

  function clearQuery() {
    setSearchValue("");
    setShowInput(false);
    router.push({ pathname: currentPage });
  }

  return (
    <form className={`${styles.navIcon} ${styles.searchIcon}`}>
      {showInput ? (
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="search_bar">
            <Image src={Search} alt="search icon" />
          </label>
          <input
            type="search"
            id="search_bar"
            name="search_bar"
            className={styles.input}
            value={searchValue}
            autoFocus
            onBlur={(e) => toggleSearchInput(e)}
            onChange={(e) => handleInputChange(e)}
            placeholder="Titles, people, genres"
          />
          <label
            className={styles.cancel}
            htmlFor="search_bar"
            onClick={clearQuery}
          >
            <CancelSvg />
          </label>
        </div>
      ) : (
        <Image
          src={Search}
          className={styles.icon}
          onClick={(e) => toggleSearchInput(e, "show")}
          alt="search icon"
        />
      )}
    </form>
  );
}

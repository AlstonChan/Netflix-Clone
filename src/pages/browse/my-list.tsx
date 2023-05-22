// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/components/browse/browse.module.scss";

import Head from "next/head";

import React, { useState, useEffect } from "react";
import { BrowseContext } from "@/components/browse/common/BrowseContext";
import { useMutation } from "@tanstack/react-query";
import getAbsoluteURL from "@/lib/getAbsoluteURL";
import fetchMoviesDB from "@/lib/fetchMoviesDBFunc";
import useProfile from "src/hooks/browse/useProfile";
import useModal from "src/hooks/browse/useModal";
import useMovieData from "src/hooks/firestore/useMovieData";

import HeaderBrowse from "@/components/browse/header/HeaderBrowse";
import Profile from "@/components/browse/profile/Profile";
import FooterBrowse from "@/components/footer/FooterBrowse";
import Modals from "@/components/browse/modals/Modals";
import MainBrowse from "@/components/browse/common/MainBrowse";
import Search from "@/components/browse/common/Search";
import Loader from "@/components/Loader";

import type { CSSProperties } from "react";
import type { DataListType, ListDataType } from "@/components/browse/types";

const MyList = () => {
  const [movieData, dbError] = useMovieData();
  const [latestData, setLatestData] = useState<null | DataListType[]>(null);

  // To query search data using searchComponent state
  const searchMutation = useMutation({
    mutationFn: (query: string | null) =>
      fetchMoviesDB("search", getAbsoluteURL("/api/fetchmovie"), null, query),
  });

  const { modal, modalFull, scrollPosition, modalToggle, toggleModal } =
    useModal();
  const { profile, switchPage } = useProfile();

  // To query data for Cards, page main data
  const { data, mutate } = useMutation({
    mutationFn: (listData: ListDataType) =>
      fetchMoviesDB("my-list", getAbsoluteURL("/api/fetchmovie"), listData),
    mutationKey: ["moviesDB", "my-list"],
    cacheTime: 600,
  });

  useEffect(() => {
    if (movieData && profile) {
      if (movieData[profile]) {
        mutate({
          new: movieData[profile],
          prev: latestData,
        });
      } else {
        mutate({
          new: [{ addList: false, like: "none", movieID: null }],
          prev: null,
        });
      }
    }
  }, [movieData, profile]);

  useEffect(() => {
    if (data) {
      setLatestData(data);
    }
  }, [data]);

  const bigModalIsOpen: CSSProperties = {
    position: "fixed",
    overflow: "hidden",
    width: "100%",
    top: `-${scrollPosition && scrollPosition.current}px`,
    paddingRight: "20px",
  };
  const browseContainerStyle: CSSProperties = modalFull
    ? bigModalIsOpen
    : { position: "relative" };

  // On profile switching, even though window.sessionStorage.getItem("profile")
  // did get data from session storage, decrypting it require some time. In the
  // meanwhile, profile remain null and Profile component will flash before
  // browse main page is shown. The following code prevents the flash from happening
  if (profile === "loading") return <Loader />;

  const contextValue = {
    data,
    searchMutation,
    modal,
    modalFull,
    scrollPosition,
    modalToggle,
    toggleModal,
  };

  console.log(data);

  if (!profile) {
    return <Profile switchPage={switchPage} />;
  } else {
    return (
      <>
        <Head>
          <title>My List | Netflix-Clone</title>
          <meta name="title" content="My List | Netflix-Clone" key="title" />
        </Head>
        <BrowseContext.Provider value={contextValue}>
          <>
            <Modals />
            <div className={styles.container} style={browseContainerStyle}>
              <HeaderBrowse route="my-list" modalFull={modalFull} />
              <main className={styles.main}>
                {searchMutation.data || searchMutation.isLoading ? (
                  <Search />
                ) : (
                  <MainBrowse route="my-list" />
                )}
              </main>
              <FooterBrowse />
            </div>
          </>
        </BrowseContext.Provider>
      </>
    );
  }
};

export default MyList;

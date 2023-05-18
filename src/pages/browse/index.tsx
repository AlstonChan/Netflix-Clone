// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/components/browse/browse.module.scss";

import Head from "next/head";

import React, { useState, useEffect } from "react";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import fetchMoviesDB from "@/lib/fetchMoviesDBFunc";
import getAbsoluteURL from "@/lib/getAbsoluteURL";
import useModal from "src/hooks/browse/useModal";
import useProfile from "src/hooks/browse/useProfile";
import { BrowseContext } from "@/components/browse/common/BrowseContext";

import Loading from "@/components/browse/Loading";
import HeaderBrowse from "@/components/browse/header/HeaderBrowse";
import Profile from "@/components/browse/profile/Profile";
import FooterBrowse from "@/components/footer/FooterBrowse";
import Modals from "@/components/browse/modals/Modals";
import Loader from "@/components/Loader";
import Search from "@/components/browse/common/Search";
import MainBrowse from "@/components/browse/common/MainBrowse";

import type { UseQueryResult } from "@tanstack/react-query";
import type { CSSProperties } from "react";
import type { GetServerSideProps } from "next";
import type { DataListType } from "@/components/browse/types";

export default function Browse() {
  // To assist profile state hook, show profile loading when loading
  // for the first time. SO when changing to page "TV Shows or Trending",
  // the loading component will be hid away
  const [firstLoad, setFirstLoad] = useState(true);

  // To query search data using searchComponent state
  const searchMutation = useMutation({
    mutationFn: (query: string | null) =>
      fetchMoviesDB("search", getAbsoluteURL("/api/fetchmovie"), null, query),
  });

  const { modal, modalFull, scrollPosition, modalToggle, toggleModal } =
    useModal();
  const { profile, switchPage } = useProfile();

  // To query data for Cards, page main data
  const { data, isLoading }: UseQueryResult<DataListType[]> = useQuery(
    ["moviesDB", "home"],
    () => fetchMoviesDB("home", getAbsoluteURL("/api/fetchmovie")),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 15,
    }
  );

  // make sure loading page only show up when moving
  // from profile page to movies page on initial load
  useEffect(() => {
    // if (!isLoading && profile === 1 && data) {
    if (!isLoading && data) {
      setFirstLoad(false);
    }
  }, [isLoading, profile, data]);

  if (firstLoad && profile && (!data || isLoading)) {
    return <Loading profile={profile} />;
  }

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

  if (!profile) {
    return <Profile switchPage={switchPage} />;
  } else {
    return (
      <>
        <Head>
          <title>Home | Netflix-Clone</title>
          <meta name="title" content="Home | Netflix-Clone" key="title" />
        </Head>

        <BrowseContext.Provider value={contextValue}>
          <>
            <Modals />
            <div className={styles.container} style={browseContainerStyle}>
              <HeaderBrowse route="home" modalFull={modalFull} />
              <main className={styles.main}>
                {searchMutation.data || searchMutation.isLoading ? (
                  <Search />
                ) : (
                  <MainBrowse route="home" />
                )}
              </main>
              <FooterBrowse />
            </div>
          </>
        </BrowseContext.Provider>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host;

  if (!host) throw new Error("host is not found");

  const endpoint = getAbsoluteURL("/api/fetchmovie", host);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["moviesDB", "home"], () =>
    fetchMoviesDB("home", endpoint)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

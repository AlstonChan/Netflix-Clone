// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "@/components/browse/browse.module.scss";

import Head from "next/head";
import dynamic from "next/dynamic";

import React, { Suspense } from "react";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import fetchMoviesDB from "@/lib/fetchMoviesDBFunc";
import getAbsoluteURL from "@/lib/getAbsoluteURL";
import { BrowseContext } from "@/components/browse/common/BrowseContext";

import HeaderBrowse from "@/components/browse/header/HeaderBrowse";
import Profile from "@/components/browse/profile/Profile";
import FooterBrowse from "@/components/footer/FooterBrowse";
import Modals from "@/components/browse/modals/Modals";
import Loader from "@/components/common/Loader/Loader";
import useProfile from "src/hooks/browse/useProfile";
import useModal from "src/hooks/browse/useModal";
import MainBrowse from "@/components/browse/common/MainBrowse";
import BrowseLayout from "@/components/browse/BrowseLayout";

const Search = dynamic(() => import("@/components/browse/common/Search"), {
  suspense: true,
});

import type { UseQueryResult } from "@tanstack/react-query";
import type { CSSProperties } from "react";
import type { GetServerSideProps } from "next";
import type { DataListType } from "@/components/browse/types";
import type { ReactElement } from "react";

export default function TvShows() {
  // To query search data using searchComponent state
  const searchMutation = useMutation({
    mutationFn: (query: string | null) =>
      fetchMoviesDB("search", getAbsoluteURL("/api/fetchmovie"), null, query),
  });

  const { modal, modalFull, scrollPosition, modalToggle, toggleModal } =
    useModal();
  const { profile, switchPage } = useProfile();

  // To query data for Cards, page main data
  const { data }: UseQueryResult<DataListType[]> = useQuery({
    queryKey: ["moviesDBTv", "tv-shows"],
    queryFn: () => fetchMoviesDB("tv-shows", getAbsoluteURL("/api/fetchmovie")),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    cacheTime: 1000 * 60 * 20,
    staleTime: 1000 * 60 * 15,
  });

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
          <title>Tv Shows | Netflix-Clone</title>
          <meta name="title" content="Tv Shows | Netflix-Clone" key="title" />
        </Head>

        <BrowseContext.Provider value={contextValue}>
          <Modals />

          <div className={styles.container} style={browseContainerStyle}>
            <HeaderBrowse route="tv-shows" modalFull={modalFull} />
            <main className={styles.main}>
              {searchMutation.data || searchMutation.isLoading ? (
                <Suspense fallback="">
                  <Search />
                </Suspense>
              ) : (
                <MainBrowse route="tv-shows" />
              )}
            </main>
            <FooterBrowse />
          </div>
        </BrowseContext.Provider>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = { ...context.req.headers }.host;
  const endpoint = getAbsoluteURL("/api/fetchmovie", host);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["moviesDB", "tv-shows"],
    queryFn: () => fetchMoviesDB("tv-shows", endpoint),
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

TvShows.getLayout = (page: ReactElement) => {
  return <BrowseLayout pageProps={page.props}>{page}</BrowseLayout>;
};

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import "@/styles/globals.scss";

import Head from "next/head";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--Roboto",
});

import { createContext, useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useAuthState from "src/hooks/useAuthState";
import useMovieData from "src/hooks/firestore/useMovieData";
import useUserData from "src/hooks/firestore/useUserData";

import Notice from "@/components/common/notice/Notice";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { User } from "firebase/auth";
import type { UserDataType } from "src/hooks/firestore/useUserData";
import type { MovieDataType } from "src/hooks/firestore/useMovieData";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type UserContextProps = {
  user: null | User;
  error: null | string;
  userData: null | UserDataType;
  movieData: null | MovieDataType;
};

export const UserContext = createContext<UserContextProps>({
  user: null,
  error: null,
  userData: null,
  movieData: null,
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [user, error] = useAuthState();
  const [userData, userDbError] = useUserData();
  const [movieData, movieDbError] = useMovieData();
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <UserContext.Provider
            value={{
              user,
              error,
              userData,
              movieData,
            }}
          >
            <div className={roboto.className}>
              {getLayout(<Component {...pageProps} />)}
              <Notice />
              {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </div>
          </UserContext.Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

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

import { createContext, useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useAuthState from "src/hooks/useAuthState";

import Notice from "@/components/common/notice/Notice";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { User } from "firebase/auth";
import useUserData from "src/hooks/firestore/useUserData";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type UserContextProps = {
  user: null | User;
  error: null | User;
  userData: any;
  myMovieData: any;
  listMovieData: any;
};

export const UserContext = createContext<UserContextProps>({
  user: null,
  error: null,
  userData: null,
  myMovieData: null,
  listMovieData: null,
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [user, error] = useAuthState();
  const [userData, dbError] = useUserData();
  const [queryClient] = useState(() => new QueryClient());
  // const [userData, setUserData] = useState(null);
  const myMovieData = useRef();
  const [listMovieData, setListMovieData] = useState();

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    if (user) {
      try {
        (async () => {
          if (user) {
            const eventSnapshot = onSnapshot(
              doc(db, "mymovie", user.uid),
              async (documents) => {
                // For user that just sign up
                if (documents.exists() === false) {
                  console.info("no doc found");
                  setDoc(doc(db, "mymovie", user.uid), {
                    "user-main": [
                      { movieID: null, addList: false, like: "none" },
                    ],
                  });
                }

                myMovieData.current = documents;
                setListMovieData(documents);
              }
            );
          }
        })();
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

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
              myMovieData,
              listMovieData,
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

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

import Notice from "@/components/common/notice/Notice";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Netflix-Clone</title>
        <meta name="title" content="Netflix-Clone" key="title" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={roboto.className}>
        {getLayout(<Component {...pageProps} />)}
        <Notice />
      </div>
    </>
  );
}

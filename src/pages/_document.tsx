// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* favicon  */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#922d22" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        {/* <!-- Meta Tag --> */}
        <meta name="title" content="Netflix-Clone" key="title" />
        <meta
          name="description"
          content="A Netflix-Clone made with NextJs and Firebase, mimic the UI/UX and function of Netflix"
        />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Chan Alston" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://github.com/AlstonChan/Netflix-clone" />
        <meta property="og:title" content="Netflix-Clone" />
        <meta
          property="og:description"
          content="A Netflix-Clone made with NextJs and Firebase, mimic the UI/UX and function of Netflix"
        />
        <meta property="og:image" content="/images/netflix cover.jpg" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://github.com/AlstonChan/Netflix-clone"
        />
        <meta property="twitter:title" content="Netflix-Clone" />
        <meta
          property="twitter:description"
          content="A Netflix-Clone made with NextJs and Firebase, mimic the UI/UX and function of Netflix"
        />
        <meta property="twitter:image" content="/images/netflix cover.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

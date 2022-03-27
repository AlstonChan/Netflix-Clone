import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Netflix Clone</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* <!-- Meta Tag --> */}
        <meta name="title" content="Netlix Clone" />
        <meta
          name="description"
          content="A Netlix Clone made with NextJs and Firebase, mimic the UI/UX and function of Netflix"
        />
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Chan Alston" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://github.com/AlstonChan/Netflix-clone"
        />
        <meta property="og:title" content="Netlix Clone" />
        <meta
          property="og:description"
          content="A Netlix Clone made with NextJs and Firebase, mimic the UI/UX and function of Netflix"
        />
        <meta property="og:image" content="/public/images/netflix cover.jpg" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://github.com/AlstonChan/Netflix-clone"
        />
        <meta property="twitter:title" content="Netlix Clone" />
        <meta
          property="twitter:description"
          content="A Netlix Clone made with NextJs and Firebase, mimic the UI/UX and function of Netflix"
        />
        <meta
          property="twitter:image"
          content="/public/images/netflix cover.jpg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import Head from "next/head";
import styles from "../styles/Home.module.css";

import Featured from "../components/home/featured/index";
import CardOne from "../components/home/CardOne/index";
import CardTwo from "../components/home/CardTwo/index";
import CardThree from "../components/home/CardThree/index";
import CardFour from "../components/home/CardFour/index";
import CardFaq from "../components/home/Faq/index";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Netflix - clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <CardOne />
      <CardTwo />
      <CardThree />
      <CardFour />
      <CardFaq />
      <Footer />
    </>
  );
}

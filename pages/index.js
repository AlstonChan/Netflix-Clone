import Head from "next/head";
import styles from "../styles/Home.module.css";

import Featured from "../components/home/featured/index";
import CardOne from "../components/home/CardOne/index";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix - clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <CardOne />
    </div>
  );
}

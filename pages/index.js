import Head from "next/head";

import Featured from "../components/home/featured/index";
import CardOne from "../components/home/CardOne";
import CardTwo from "../components/home/CardTwo";
import CardThree from "../components/home/CardThree";
import CardFour from "../components/home/CardFour";
import CardFaq from "../components/home/Faq/index";
import Footer from "../components/footer/footerStyle1";

import Loader from "../components/Loader";

import { withAuthUser, AuthAction } from "next-firebase-auth";

function Home() {
  return (
    <div className="container">
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
    </div>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: Loader,
})(Home);

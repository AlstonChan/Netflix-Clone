import Head from "next/head";

import { withAuthUser, AuthAction } from "next-firebase-auth";

import FeaturedHome from "@/components/home/featured/FeaturedHome";
import CardOne from "@/components/home/CardOne";
import CardTwo from "@/components/home/CardTwo";
import CardThree from "@/components/home/CardThree";
import CardFour from "@/components/home/CardFour";
import CardFaq from "@/components/home/Faq/CardFaq";
import Footer from "@/components/footer/FooterStyle1";
import Loader from "@/components/Loader";

function Home() {
  return (
    <div className="container">
      <Head>
        <title>Netflix Clone</title>
      </Head>

      <FeaturedHome />
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
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(Home);

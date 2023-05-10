// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import Head from "next/head";

import FeaturedHome from "@/components/home/featured/FeaturedHome";
import SectionOne from "@/components/home/sectionOne/SectionOne";
import SectionTwo from "@/components/home/sectionTwo/SectionTwo";
import SectionThree from "@/components/home/sectionThree/SectionThree";
import SectionFour from "@/components/home/sectionFour/SectionFour";
import CardFaq from "@/components/home/sectionFaq/CardFaq";
import Footer from "@/components/footer/FooterStyle1";

export default function Home() {
  return (
    <>
      <Head>
        <title>Netflix-Clone</title>
        <meta name="title" content="Netflix-Clone" key="title" />
      </Head>
      <div className="container">
        <FeaturedHome />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <CardFaq />
        <Footer />
      </div>
    </>
  );
}

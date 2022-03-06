import styles from "../../styles/browse/browse.module.css";
import React, { useState } from "react";

import Header from "../../components/browse/header/header.js";
import Cards from "../../components/browse/sliderCards/cards";
import Footer from "../../components/footer/footerBrowse";
import PlaceholderCard from "../../components/browse/sliderCards/placeholderCard";
import Modals from "../../components/browse/modals/modals";
import Main from "../../components/browse/main";

import Loader from "../../components/Loader";

import { withAuthUser, AuthAction } from "next-firebase-auth";

export function MyList() {
  const [modal, setModal] = useState({});

  // function that collects the data for modals,
  // determine the width and position of modal
  function toggleModal(state, e, movieSet, position) {
    if (state.state === "mouseenter") {
      const { width, top, bottom, left, right } =
        e.target.getBoundingClientRect();
      const adjustedY = top + window.scrollY;
      // console.table({ top, bottom, left, right, adjustedY });
      setModal({
        mainClass: { top: adjustedY, left, right, bottom },
        width,
        movieSet,
        position,
      });
    }
  }
  const data = {};

  return (
    <div className={styles.container}>
      <Header route={"my-list"} />
      <main className={styles.main}>
        <Modals modalStyle={modal} />
        <Main data={data}>
          <span className={styles.featuredMain}>
            <div className={styles.emptyFea}></div>
          </span>
          <PlaceholderCard />
          <PlaceholderCard />
        </Main>
      </main>
      <Footer />
    </div>
  );
}

// auth
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(MyList);

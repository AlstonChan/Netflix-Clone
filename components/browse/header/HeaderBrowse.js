import styles from "@/styles/browse/header.module.css";
import NetflixLogo from "@/public/images/logo.png";

import Image from "next/image";

import React, { useEffect, useState } from "react";
import { responsive } from "@/styles/cssStyle";

import PrimaryNav from "./PrimaryNav";
import SearchComponent from "./SearchComponent";
import BellComponent from "./BellComponent";
import UserComponent from "./UserComponent";

export function HeaderBrowse({ route, searchRef, openModal }) {
  const navItemTxt = ["Home", "TV Shows", "New & Popular", "My List"];
  const [selectedOptionNav, setSelectedOptionNav] = useState({
    styles: ``,
    active: true,
    index: 0,
  });

  const [toggleNavItem, setToggleNavItem] = useState();

  //set the styling of navbar, if it is on the very top,
  //it have no background; If the user scrolls down, the background
  //fades in, and fades back if user scroll back to the very top
  const [scrollStyle, setScrollStyle] = useState({
    background: "rgba(20, 20, 20, 0)",
  });

  useEffect(() => {
    document.addEventListener("scroll", eventScroll);
    window.addEventListener("resize", eventResize);
    return () => {
      document.removeEventListener("scroll", eventScroll);
      window.removeEventListener("resize", eventResize);
    };
  });

  useEffect(() => {
    eventResize();
    if (route == "tvs") {
      setSelectedOptionNav({
        styles: `${styles.selectionOpt} ${styles.selectedOpt}`,
        active: true,
        index: 1,
      });
    } else if (route == "new") {
      setSelectedOptionNav({
        styles: `${styles.selectionOpt} ${styles.selectedOpt}`,
        active: true,
        index: 2,
      });
    } else if (route == "my-list") {
      setSelectedOptionNav({
        styles: `${styles.selectionOpt} ${styles.selectedOpt}`,
        active: true,
        index: 3,
      });
    }
  }, [route]);

  function eventResize() {
    if (window.innerWidth < 980) {
      setToggleNavItem(true);
    } else {
      setToggleNavItem(false);
    }
  }

  function handleNavSelection(e) {
    setSelectedOptionNav({
      styles: `${styles.selectionOpt} ${styles.selectedOpt}`,
      active: true,
      index: e.target.dataset.num,
    });
  }

  let lastKnownScrollPosition = 0;
  let ticking = false;

  function checkScroll(scrollPos) {
    const backgroundStyle = "rgba(20, 20, 20, 100)";
    const backgroundStyleNone = "rgba(20, 20, 20, 0)";
    if (scrollPos == 0) {
      setScrollStyle({ background: backgroundStyleNone });
    } else if (scrollPos != 0 && scrollStyle.background != backgroundStyle) {
      setScrollStyle({ background: backgroundStyle });
    }
  }

  function eventScroll() {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        checkScroll(lastKnownScrollPosition);
        ticking = false;
      });
      ticking = true;
    }
  }

  const headerStyle = {
    position: "fixed",
    width: "100vw",
    height: "80px",
    backgroundColor: "#000",
  };

  return (
    <>
      <header className={styles.main} style={openModal ? headerStyle : {}}>
        <div className={styles.mainContain} style={scrollStyle}>
          <div className={styles.netflixLogoContainer}>
            <Image
              src={NetflixLogo}
              className={styles.netflixLogo}
              alt="Netflix logo"
              width="120"
              height="32.7"
              priority
              style={responsive}
            />
          </div>
          <nav className={styles.selection}>
            {toggleNavItem ? (
              <PrimaryNav
                text={navItemTxt}
                handler={handleNavSelection}
                menu
                classNm={selectedOptionNav}
              />
            ) : (
              navItemTxt.map((txt, index) => {
                return (
                  <PrimaryNav
                    classNm={selectedOptionNav}
                    handler={handleNavSelection}
                    text={txt}
                    key={index}
                    data={index}
                    menu={false}
                  />
                );
              })
            )}
          </nav>
          <div className={styles.secondaryNav}>
            <SearchComponent searchRef={searchRef} />
            <BellComponent />
            <UserComponent />
          </div>
        </div>
      </header>
    </>
  );
}

const MemoizedHeader = React.memo(HeaderBrowse);
export default MemoizedHeader;

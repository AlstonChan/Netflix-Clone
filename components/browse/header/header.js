import React, { useEffect, useState } from "react";

import Image from "next/image";
import styles from "../../../styles/browse/header.module.css";

import PrimaryNav from "./primaryNav";

import SearchComponent from "./searchComponent";
import BellComponent from "./bellComponent";
import UserComponent from "./userComponent";

export function Header({}) {
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
  }, []);

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
    if (scrollPos == 0) {
      setScrollStyle({ background: "rgba(20, 20, 20, 0)" });
    } else if (
      scrollPos != 0 &&
      scrollStyle.background != "rgba(20, 20, 20, 100)"
    ) {
      setScrollStyle({ background: "rgba(20, 20, 20, 100)" });
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

  return (
    <>
      <header className={styles.main}>
        <div className={styles.mainContain} style={scrollStyle}>
          <div className={styles.netflixLogoContainer}>
            <Image
              src="/images/NetflixLogo.png"
              className={styles.netflixLogo}
              alt="Netflix logo"
              width="120px"
              height="32.7px"
              priority
            />
          </div>
          <nav className={styles.selection}>
            {toggleNavItem ? (
              <PrimaryNav
                text={navItemTxt}
                handler={handleNavSelection}
                menu={true}
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
            <SearchComponent />
            <BellComponent />
            <UserComponent />
          </div>
        </div>
      </header>
    </>
  );
}

const MemoizedHeader = React.memo(Header);
export default MemoizedHeader;

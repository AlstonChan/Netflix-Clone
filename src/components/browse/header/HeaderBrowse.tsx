// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./browseHeader.module.scss";
import NetflixLogo from "@/public/images/logo.png";

import Image from "next/image";

import { memo, useEffect, useState } from "react";
import { responsive } from "@/styles/cssStyle";

import PrimaryNav from "./primaryNav/PrimaryNav";
import PrimaryDropdownNav from "./primaryNav/PrimaryDropdownNav";
import SearchComponent from "./searchComponent/SearchComponent";
import BellComponent from "./bellComponent/BellComponent";
import UserComponent from "./userComponent/UserComponent";

import type { BrowseRoute, BrowseRouteTxt } from "../types";

export type NavItemType = { route: BrowseRoute; txt: BrowseRouteTxt };
const navItem: NavItemType[] = [
  { route: "home", txt: "Home" },
  { route: "tvs", txt: "TV Shows" },
  { route: "new", txt: "New & Popular" },
  { route: "my-list", txt: "My List" },
];

interface HeaderBrowseProps {
  route: BrowseRoute;
  openModal: boolean;
}

function HeaderBrowse(props: HeaderBrowseProps) {
  const { route, openModal } = props;
  const [activeNav, setActiveNav] = useState<BrowseRoute>("home");

  //set the styling of navbar, if it is on the very top,
  //it have no background; If the user scrolls down, the background
  //fades in, and fades back if user scroll back to the very top
  const [scrollStyle, setScrollStyle] = useState({
    background: "rgba(20, 20, 20, 0)",
  });

  useEffect(() => {
    document.addEventListener("scroll", eventScroll);
    return () => {
      document.removeEventListener("scroll", eventScroll);
    };
  });

  useEffect(() => {
    setActiveNav(route);
  }, [route]);

  let lastKnownScrollPosition: number = 0;
  let ticking: boolean = false;

  function checkScroll(scrollPos: number) {
    const backgroundStyle = "rgba(20, 20, 20, 100)";
    const backgroundStyleNone = "rgba(20, 20, 20, 0)";
    if (scrollPos === 0) {
      setScrollStyle({ background: backgroundStyleNone });
    } else if (scrollPos !== 0 && scrollStyle.background !== backgroundStyle) {
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

  return (
    <>
      <header className={`${styles.main} ${openModal && styles.fixed}`}>
        <div className={styles.container} style={scrollStyle}>
          <div className={styles.logoContainer}>
            <Image
              src={NetflixLogo}
              alt="Netflix-Clone logo"
              priority
              style={responsive}
            />
          </div>
          <nav className={styles.selection}>
            {navItem.map((item: NavItemType) => {
              return (
                <PrimaryNav
                  navDetails={item}
                  activeNav={activeNav}
                  handler={setActiveNav}
                />
              );
            })}
            <PrimaryDropdownNav
              navItem={navItem}
              activeNav={activeNav}
              handler={setActiveNav}
            />
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

const MemoizedHeader = memo(HeaderBrowse);
export default MemoizedHeader;

import { useEffect, useState } from "react";

import Image from "next/image";
import styles from "../../styles/browse/header.module.css";

export default function Header({}) {
  const navItemTxt = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];
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
    if (window.innerWidth < 900) {
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
              <NavItem text={navItemTxt} menu={true} />
            ) : (
              navItemTxt.map((txt, index) => {
                return (
                  <NavItem
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
        </div>
      </header>
    </>
  );
}

export function NavItem({ text, handler, classNm, data, menu }) {
  const [navMenuStyle, setNavMenuStyle] = useState({
    display: "none",
  });

  const [delay, setDelay] = useState(null);

  function toggleNavMenu(e) {
    if (e.type === "mouseenter") {
      setNavMenuStyle({ display: "block", opacity: "1" });
      clearTimeout(delay);
    } else if (e.type === "mouseleave") {
      setDelay(
        setTimeout(() => {
          setNavMenuStyle({ display: "none", opacity: "0" });
        }, 600)
      );
    }
  }
  return menu ? (
    <>
      <div
        className={styles.navItemMenu}
        onMouseEnter={(e) => toggleNavMenu(e)}
        onMouseLeave={(e) => toggleNavMenu(e)}
      >
        <span className={styles.navItemMenuTxt}>Browse</span>
        <Image
          src="/images/nav_arrow_bold.svg"
          width="20px"
          height="20px"
          className={styles.navItemMenuImg}
        />
      </div>
      <div
        className={styles.dropDownMenuNav}
        onMouseEnter={(e) => toggleNavMenu(e)}
        onMouseLeave={(e) => toggleNavMenu(e)}
        style={navMenuStyle}
      >
        <div className={styles.dropDownMenuList}>
          {text.map((txt, index) => {
            return (
              <li key={index} className={styles.dropDownMenuitem}>
                {txt}
              </li>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <>
      <span
        onClick={(e) => handler(e)}
        className={
          classNm.active && classNm.index == data
            ? `${styles.selectionOpt} ${styles.selectedOpt}`
            : styles.selectionOpt
        }
        data-num={data}
      >
        {text}
      </span>
    </>
  );
}

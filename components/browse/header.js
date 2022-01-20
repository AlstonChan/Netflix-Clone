import { useState } from "react";

import Image from "next/image";
import styles from "../../styles/browse/header.module.css";

export default function Header({}) {
  const navItemTxt = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];
  const [selectedOptionNav, setSelectedOptionNav] = useState({
    styles: ``,
    active: true,
    index: 0,
  });

  function handleNavSelection(e) {
    setSelectedOptionNav({
      styles: `${styles.selectionOpt} ${styles.selectedOpt}`,
      active: true,
      index: e.target.dataset.num,
    });
  }

  return (
    <>
      <header className={styles.main}>
        <div className={styles.mainContain}>
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
            {navItemTxt.map((txt, index) => {
              return (
                <NavItem
                  classNm={selectedOptionNav}
                  handler={handleNavSelection}
                  text={txt}
                  key={index}
                  data={index}
                />
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}

export function NavItem({ text, handler, classNm, data }) {
  return (
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
  );
}

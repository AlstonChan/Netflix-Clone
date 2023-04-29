import styles from "@/styles/browse/header.module.css";
import NavArrowBold from "@/public/images/icons/arrow/nav_arrow_bold.svg";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

export default function PrimaryNav({ text, handler, classNm, data, menu }) {
  const [navMenuStyle, setNavMenuStyle] = useState({
    styling: {
      visibility: "hidden",
    },
    mode: 0,
  });

  const [delay, setDelay] = useState(null);

  function toggleNavMenu(e) {
    if (e.type === "mouseenter") {
      setNavMenuStyle({
        styling: { visibility: "visible", opacity: "1" },
        mode: 1,
      });
      clearTimeout(delay);
    } else if (e.type === "mouseleave") {
      setDelay(
        setTimeout(() => {
          setNavMenuStyle({
            styling: { visibility: "hidden", opacity: "0" },
            mode: 0,
          });
        }, 400)
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
          src={NavArrowBold}
          width="20"
          height="20"
          className={styles.navItemMenuImg}
          alt=""
          unoptimized
        />
      </div>
      {navMenuStyle.mode === 1 ? (
        <div
          className={styles.dropDownMenuNav}
          onMouseEnter={(e) => toggleNavMenu(e)}
          onMouseLeave={(e) => toggleNavMenu(e)}
          style={navMenuStyle.styling}
        >
          <div>
            <div className={styles.dropDownMenuNavListArrContain}>
              <Image
                src={NavArrowBold}
                width="20"
                height="20"
                className={styles.dropDownMenuNavListArr}
                alt=""
                unoptimized
              />
            </div>
            {text.map((txt, index) => {
              return (
                <Link
                  href={
                    txt === "Home"
                      ? "/browse"
                      : txt === "TV Shows"
                      ? "/browse/tv-shows"
                      : txt === "New & Popular"
                      ? "/browse/trending"
                      : txt === "My List"
                      ? "/browse/my-list"
                      : ""
                  }
                  key={index}
                  className={styles.dropDownMenuitem}
                >
                  <li
                    data-num={data}
                    onClick={(e) => handler(e)}
                    className={
                      classNm.active && classNm.index == data
                        ? `${styles.selectionOpt} ${styles.selectedOpt}`
                        : styles.selectionOpt
                    }
                  >
                    {txt}
                  </li>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  ) : (
    <>
      <Link
        shallow
        href={
          text === "Home"
            ? "/browse"
            : text === "TV Shows"
            ? "/browse/tv-shows"
            : text === "New & Popular"
            ? "/browse/trending"
            : text === "My List"
            ? "/browse/my-list"
            : ""
        }
        onClick={(e) => handler(e)}
        className={
          classNm.active && classNm.index == data
            ? `${styles.selectionOpt} ${styles.selectedOpt}`
            : styles.selectionOpt
        }
        data-num={data}
      >
        <span data-num={data} style={{ margin: "0 10px" }}>
          {text}
        </span>
      </Link>
    </>
  );
}

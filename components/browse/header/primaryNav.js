import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import styles from "../../../styles/browse/header.module.css";

export default function PrimaryNav({ text, handler, classNm, data, menu }) {
  const [navMenuStyle, setNavMenuStyle] = useState({
    visibility: "hidden",
  });

  const [delay, setDelay] = useState(null);

  function toggleNavMenu(e) {
    if (e.type === "mouseenter") {
      setNavMenuStyle({ visibility: "visible", opacity: "1" });
      clearTimeout(delay);
    } else if (e.type === "mouseleave") {
      setDelay(
        setTimeout(() => {
          setNavMenuStyle({ visibility: "hidden", opacity: "0" });
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
          src="/images/icons/misc/nav_arrow_bold.svg"
          width="20px"
          height="20px"
          className={styles.navItemMenuImg}
          alt=""
        />
      </div>
      <div
        className={styles.dropDownMenuNav}
        onMouseEnter={(e) => toggleNavMenu(e)}
        onMouseLeave={(e) => toggleNavMenu(e)}
        style={navMenuStyle}
      >
        <div>
          <div className={styles.dropDownMenuNavListArrContain}>
            <Image
              src="/images/icons/misc/nav_arrow_bold.svg"
              width="20px"
              height="20px"
              className={styles.dropDownMenuNavListArr}
              alt=""
            />
          </div>
          {text.map((txt, index) => {
            return (
              <Link
                href={`/browse?fetchmoviedata=${txt
                  .replace(/\s/g, "")
                  .slice(0, 3)
                  .toLowerCase()}`}
                key={index}
              >
                <a className={styles.dropDownMenuitem}>
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
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <>
      <Link
        shallow
        href={`/browse?fetchmoviedata=${text
          .replace(/\s/g, "")
          .slice(0, 3)
          .toLowerCase()}`}
      >
        <a
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
        </a>
      </Link>
    </>
  );
}

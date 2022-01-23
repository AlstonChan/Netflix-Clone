import { useState } from "react";

import Image from "next/image";
import styles from "../../../styles/browse/header.module.css";

export default function PrimaryNav({ text, handler, classNm, data, menu }) {
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
        }, 700)
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
        <div>
          <div className={styles.dropDownMenuNavListArrContain}>
            <Image
              src="/images/nav_arrow_bold.svg"
              width="20px"
              height="20px"
              className={styles.dropDownMenuNavListArr}
            />
          </div>
          {text.map((txt, index) => {
            return (
              <li
                key={index}
                className={styles.dropDownMenuitem}
                data-num={data}
              >
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

import { useRef, useState } from "react";

import Image from "next/image";
import styles from "../../../styles/browse/header.module.css";

import search from "../../../public/images/search.svg";
import bell from "../../../public/images/bell.svg";
import cross from "../../../public/images/cross.svg";

export default function SecondaryNav() {
  return (
    <>
      <SearchComponent />
      <BellComponent />
      <div className={styles.profilePicContainAll}>
        <div className={styles.profilePicContainer}>
          <Image
            src="/images/profile pic/1.png"
            width="35px"
            height="35px"
            className={styles.profilePic}
          />
        </div>
        <Image
          src="/images/nav_arrow_bold.svg"
          width="20px"
          height="20px"
          className={styles.profilePicIcon}
        />
      </div>
    </>
  );
}

export function SearchComponent() {
  const [showInput, setShowInput] = useState(false);
  const searchRef = useRef();

  function toggleSearchInput(e) {
    setShowInput(true);
    setTimeout(() => {
      searchRef.current.focus();
    }, 50);
    if ((e.type = "blur" && e.type != "click")) {
      setShowInput(false);
    }
  }

  return (
    <div className={styles.navIcon}>
      {showInput ? "" : <Image src={search} onClick={toggleSearchInput} />}
      <div
        className={styles.inputContainer}
        style={showInput ? { display: "block" } : { display: "none" }}
      >
        <div className={styles.inputContain}>
          <label className={styles.searchIconInput} htmlFor="q">
            <Image src={search} />
          </label>
          <input
            type="search"
            name="q"
            ref={searchRef}
            onBlur={(e) => toggleSearchInput(e)}
            id="q"
            placeholder="Titles, people, genres"
            className={styles.inputSearchQ}
          />
          <label className={styles.searchCross} htmlFor="q">
            <Image src={cross} />
          </label>
        </div>
      </div>
    </div>
  );
}

export function BellComponent() {
  const [navNotification, setNavNotification] = useState({
    display: "none",
  });

  const [delayNotifi, setDelayNotifi] = useState(null);

  function toggleNavMenu(e) {
    if (e.type === "mouseenter") {
      setNavNotification({ display: "block", opacity: "1" });
      clearTimeout(delayNotifi);
    } else if (e.type === "mouseleave") {
      setDelayNotifi(
        setTimeout(() => {
          setNavNotification({ display: "none", opacity: "0" });
        }, 500)
      );
    }
  }

  return (
    <div className={styles.navIcon}>
      <div
        onMouseEnter={(e) => toggleNavMenu(e)}
        onMouseLeave={(e) => toggleNavMenu(e)}
      >
        <Image src={bell} />
        <div className={styles.notification}>
          <span className={styles.notificationCount}>2</span>
        </div>
      </div>
      <div
        className={styles.dropDownMenuNavSec}
        onMouseEnter={(e) => toggleNavMenu(e)}
        onMouseLeave={(e) => toggleNavMenu(e)}
        style={navNotification}
      >
        <div className={styles.notificationArrContain}>
          <Image
            src="/images/nav_arrow_bold.svg"
            width="20px"
            height="20px"
            className={styles.notificationArr}
          />
        </div>
        <div className={styles.dropDownMenuListSec}>
          <p className={styles.notificationEmpty}>No Recent Notification</p>
        </div>
      </div>
    </div>
  );
}

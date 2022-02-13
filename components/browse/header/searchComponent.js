import { useRef, useState } from "react";
import Image from "next/image";

import search from "../../../public/images/icons/misc/search.svg";
import cross from "../../../public/images/icons/misc/cross.svg";

import styles from "../../../styles/browse/secondaryHeader.module.css";
import router from "next/router";

export default function SearchComponent() {
  // const { inputChanged, searchRef } = useContext(SearchContext);
  const [showInput, setShowInput] = useState(false);
  const searchRef = useRef();

  function inputChanged(e) {
    let val = searchRef.current.value;
    if (val) {
      router.push({ pathname: "/browse", query: `search=${val}` }, null, {
        shallow: true,
      });
      searchRef.current.doNotCollapse = true;
      // history.pushState(null, "", `search?q=${val}`);
    } else {
      searchRef.current.doNotCollapse = false;
      router.push({ pathname: "/browse" }, null, { shallow: true });
    }
  }

  function toggleSearchInput(e) {
    setShowInput(true);
    setTimeout(() => {
      searchRef.current.focus();
    }, 50);
    if (searchRef.current?.doNotCollapse) {
      return;
    } else if ((e.type = "blur" && e.type != "click")) {
      setShowInput(false);
    }
  }

  return (
    <div className={`${styles.navIcon} ${styles.searchIcon}`}>
      {showInput ? (
        ""
      ) : (
        <Image src={search} onClick={toggleSearchInput} alt="search icon" />
      )}
      <div
        className={styles.inputContainer}
        style={showInput ? { display: "block" } : { display: "none" }}
      >
        <div className={styles.inputContain}>
          <label className={styles.searchIconInput} htmlFor="q">
            <Image src={search} alt="search icon" />
          </label>
          <input
            type="search"
            id="q"
            name="q"
            className={styles.inputSearchQ}
            ref={searchRef}
            onBlur={(e) => toggleSearchInput(e)}
            onChange={(e) => inputChanged(e)}
            placeholder="Titles, people, genres"
          />
          <label className={styles.searchCross} htmlFor="q">
            <Image src={cross} alt="cancel icon" />
          </label>
        </div>
      </div>
    </div>
  );
}

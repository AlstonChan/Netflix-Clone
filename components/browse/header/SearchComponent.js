import styles from "../../../styles/browse/secondaryHeader.module.css";
import search from "../../../public/images/icons/misc/search.svg";
import CancelSvg from "../../icons/CancelSvg";

import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchComponent({ searchRef }) {
  const router = useRouter();
  const [showInput, setShowInput] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
      if (url.includes("?search=")) {
        setCurrentPage(url.split("?").shift());
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });

  useEffect(
    () =>
      (async () => {
        if (!!window.location.search.split("?search=").pop()) {
          setShowInput(true);
        } else return;
        if (typeof window !== undefined) {
          await searchRef.current;
          searchRef.current.focus();
          searchRef.current.value = window.location.search
            .split("?search=")
            .pop();
          router.push(
            {
              pathname: currentPage,
              query: `search=${searchRef.current.value}`,
            },
            null,
            {
              shallow: false,
            }
          );
          setTimeout(() => {
            searchRef.current.doNotCollapse = true;
          }, 50);
        }
      })(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleWindowResize = () => {
    if (window.innerWidth < 670) {
      setShowSearch(false);
    } else setShowSearch(true);
  };

  function inputChanged(e) {
    let val = searchRef.current.value;
    if (val) {
      router.push({ pathname: currentPage, query: `search=${val}` }, null, {
        shallow: false,
      });
      searchRef.current.doNotCollapse = true;
      // history.pushState(null, "", `search?q=${val}`);
    } else {
      searchRef.current.doNotCollapse = false;
      router.push({ pathname: currentPage }, null, { shallow: false });
    }
  }

  function toggleSearchInput(e, type) {
    if (type === "show") {
      setShowInput(true);
      setTimeout(() => {
        searchRef.current.focus();
      }, 50);
    }
    if (searchRef.current?.doNotCollapse) {
      return;
    } else if ((e.type = "blur" && e.type != "click")) {
      setShowInput(false);
    }
  }

  function clearQuery() {
    searchRef.current.value = "";
    searchRef.current.doNotCollapse = false;
    router.push({ pathname: currentPage }, null, { shallow: false });
  }

  return showSearch ? (
    <div className={`${styles.navIcon} ${styles.searchIcon}`}>
      {showInput ? (
        ""
      ) : (
        <Image
          src={search}
          onClick={(e) => toggleSearchInput(e, "show")}
          alt="search icon"
          unoptimized
        />
      )}
      {showInput ? (
        <div className={styles.inputContainer}>
          <div className={styles.inputContain}>
            <label className={styles.searchIconInput} htmlFor="q">
              <Image src={search} alt="search icon" unoptimized />
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
            <label
              className={styles.searchCross}
              htmlFor="q"
              onClick={clearQuery}
            >
              <CancelSvg />
            </label>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
}

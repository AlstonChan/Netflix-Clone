import styles from "@/styles/browse/secondaryHeader.module.css";
import Search from "@/public/images/icons/misc/search.svg";
import CancelSvg from "../../icons/CancelSvg";

import Image from "next/image";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

// (searchRef) ref forward order as follow:
// browse(index, tv, new, my list) -> HeaderBrowse -> SearchComponent
const SearchComponent = React.forwardRef((props, ref) => {
  const router = useRouter();
  // Indicate if saerch input should be shown.
  // The search input is hidden by default.
  const [showInput, setShowInput] = useState(false);
  // Indicate if search button should be shown.
  // The search button is shown by default.
  const [showSearch, setShowSearch] = useState(true);
  // Indicate the current page the user is on.
  // Possible values are "/browse", "/browse/tv-shows",
  // "/browse/trending" and "/browse/my-list"
  const [currentPage, setCurrentPage] = useState("");

  // Event listener to handle window width resize
  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // Search button will be hidden when window.innerWidth
  // is smaller than 670
  const handleWindowResize = () => {
    if (window.innerWidth < 670) {
      setShowSearch(false);
    } else setShowSearch(true);
  };

  // Handle route changes as search input is updated
  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  });

  // Set currentPage state
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

  // Invoked every once showSearch state is set to true.
  // Set the correct input value and invoke search for
  // refresh page or newly pasted link with search param.
  const refCallback = useCallback(
    (node) => {
      if (node) {
        // set the input element to ref.current
        // so ref.current can be access normally
        ref.current = node;

        if (!!window.location.search.split("?search=").pop()) {
          setShowInput(true);
        } else return;
        if (typeof window !== undefined) {
          node.focus();
          node.value = window.location.search.split("?search=").pop();
          router.push(
            {
              pathname: currentPage,
              query: `search=${node.value}`,
            },
            null,
            {
              shallow: false,
            }
          );
          setTimeout(() => {
            node.doNotCollapse = true;
          }, 50);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [ref]
  );

  function inputChanged() {
    let val = ref.current.value;
    if (val) {
      router.push({ pathname: currentPage, query: `search=${val}` }, null, {
        shallow: false,
      });
      ref.current.doNotCollapse = true;
      // history.pushState(null, "", `search?q=${val}`);
    } else {
      ref.current.doNotCollapse = false;
      router.push({ pathname: currentPage }, null, { shallow: false });
    }
  }

  // If user clicked elsewhere and does not focus
  // on the search input, ref.current.doNotCollapse
  // attribute is determined for showInput boolean value
  function toggleSearchInput(e, type) {
    if (type === "show") {
      setShowInput(true);
      setTimeout(() => {
        ref.current.focus();
      }, 50);
    }

    if (ref.current?.doNotCollapse) {
      // ref.current.doNotCollapse does not exists,
      return;
    } else if ((e.type = "blur" && e.type != "click")) {
      setShowInput(false);
    }
  }

  function clearQuery() {
    ref.current.value = "";
    ref.current.doNotCollapse = false;
    router.push({ pathname: currentPage }, null, { shallow: false });
  }

  return showSearch ? (
    <div className={`${styles.navIcon} ${styles.searchIcon}`}>
      {showInput ? (
        <div className={styles.inputContainer}>
          <div className={styles.inputContain}>
            <label className={styles.searchIconInput} htmlFor="q">
              <Image src={Search} alt="search icon" unoptimized />
            </label>
            <input
              type="search"
              id="q"
              name="q"
              className={styles.inputSearchQ}
              ref={refCallback}
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
        <Image
          src={Search}
          onClick={(e) => toggleSearchInput(e, "show")}
          alt="search icon"
          unoptimized
        />
      )}
    </div>
  ) : null;
});

export default SearchComponent;

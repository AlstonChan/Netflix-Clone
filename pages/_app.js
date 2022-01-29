import "../styles/globals.css";
import { createContext, useRef } from "react";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import router from "next/router";

export const UserContext = createContext({
  user: null,
  loading: null,
  error: null,
});

export const SearchContext = createContext();

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const searchRef = useRef();

  function inputChanged(e) {
    let val = searchRef.current.value;
    if (val) {
      searchRef.current.doNotCollapse = true;
      router.push(
        {
          pathname: "/browse",
          query: { search: val },
        },
        null,
        { shallow: true }
      );
    } else {
      searchRef.current.doNotCollapse = false;
      router.back();
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      <SearchContext.Provider value={{ inputChanged, searchRef }}>
        <Component {...pageProps} />
      </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;

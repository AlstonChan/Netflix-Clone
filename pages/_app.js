import "../styles/globals.css";
import { createContext, useRef } from "react";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserContext = createContext({
  user: null,
  loading: null,
  error: null,
});

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;

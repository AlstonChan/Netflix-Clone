import "../styles/globals.css";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import initAuth from "../lib/initAuth";
import { useAuthState } from "react-firebase-hooks/auth";

import { collection, getDocs, query, where } from "firebase/firestore";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

initAuth();

export const UserContext = createContext({
  user: null,
  loading: null,
  error: null,
});

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const [queryClient] = useState(() => new QueryClient());
  const [userData, setUserData] = useState(null);

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(async () => {
    if (user) {
      const querySnapshot = await getDocs(
        query(collection(db, "Acc"), where("uid", "==", user.uid))
      );

      querySnapshot.forEach((doc) => setUserData(doc.data()));
    }
  }, [user]);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserContext.Provider value={{ user, loading, error, userData }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

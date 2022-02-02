import "../styles/globals.css";
import { createContext, useState } from "react";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// import { ReactQueryDevtools } from "react-query-devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

export const UserContext = createContext({
  user: null,
  loading: null,
  error: null,
});

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const [queryClient] = useState(() => new QueryClient());
  // const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserContext.Provider value={{ user, loading, error }}>
          <Component {...pageProps} />
        </UserContext.Provider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

import { useRouter } from "next/router";

import useAuthState from "src/hooks/useAuthState";

import Loader from "../Loader";

import type { ReactElement } from "react";

interface UserIsAuthenticated {
  children: ReactElement;
}

export default function UnProtectedArea(props: UserIsAuthenticated) {
  const { children } = props;

  const router = useRouter();
  const [authUser, isLoading, error] = useAuthState();

  if (authUser === null && isLoading) return <Loader />;

  if (authUser && !isLoading) router.push("/browse");

  if (authUser === null && !isLoading) return children;

  return <Loader />;
}

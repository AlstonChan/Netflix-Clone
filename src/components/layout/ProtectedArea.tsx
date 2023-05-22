// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { useRouter } from "next/router";

import useAuthState from "src/hooks/useAuthState";

import Loader from "../common/Loader/Loader";

import type { ReactElement } from "react";

interface UserIsAuthenticated {
  children: ReactElement;
}

export default function ProtectedArea(props: UserIsAuthenticated) {
  const { children } = props;

  const router = useRouter();
  const [authUser, isLoading, error] = useAuthState();

  if (authUser === null && isLoading) return <Loader />;

  if (authUser === null && !isLoading) router.push("/login");

  if (authUser && !isLoading) return children;

  return <Loader />;
}

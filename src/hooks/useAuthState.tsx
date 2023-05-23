// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export type UseAuthStateUser = User | null | undefined;

export default function useAuthState(): [
  UseAuthStateUser,
  boolean,
  string | null
] {
  const [authUser, setAuthUser] = useState<UseAuthStateUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    try {
      const authListen = onAuthStateChanged(auth, (user) => {
        setAuthUser(user);
      });

      return () => authListen();
    } catch (error: any) {
      setError(error);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (authUser === null || authUser) {
      setIsLoading(false);
    }
  }, [authUser]);

  return [authUser, isLoading, error];
}

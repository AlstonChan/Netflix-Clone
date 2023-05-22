// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function useAuthState(): [User | null, boolean, string | null] {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    try {
      const authListen = onAuthStateChanged(auth, (user) => {
        setAuthUser(user);
      });
      setIsLoading(false);

      return () => authListen();
    } catch (error: any) {
      setError(error);
      console.error(error);
    }
  }, [auth]);

  return [authUser, isLoading, error];
}

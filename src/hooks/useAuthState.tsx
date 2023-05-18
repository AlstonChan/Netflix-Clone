// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import type { User, Auth } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function useAuthState(): [User | null, string | null] {
  const [authUser, setAuthUser] = useState<User | null>(null);
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
  }, [auth]);

  return [authUser, error];
}

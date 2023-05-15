// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { useState } from "react";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import useIsomorphicLayoutEffect from "@/lib/useIsomorphicLayout";

export default function useProfile() {
  // set the current active profile (user)
  const [profile, setProfile] = useState<string | null>("loading");
  // To get session-storage data - "profile" as soon as the possible, and
  // decrypt the data to determine the current user for profile state hook
  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.sessionStorage.getItem("profile");
      if (!data) {
        setProfile(null);
      } else {
        const nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";

        setProfile(aes.decrypt(data, nonce).toString(CryptoJS.enc.Utf8));
      }
    }
  }, [profile]);

  // set the current profile (user)
  function switchPage(name: string) {
    const nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";

    const encrypted = aes.encrypt(name, nonce).toString();
    sessionStorage.setItem("profile", encrypted);
    setProfile(encrypted);
  }

  return { profile, switchPage };
}

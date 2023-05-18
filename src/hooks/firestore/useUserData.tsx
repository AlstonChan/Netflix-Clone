// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { doc, onSnapshot } from "firebase/firestore";
import useAuthState from "../useAuthState";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

export type UserDataType = DocumentData | null;

const collectionName = "Acc";

export default function useUserData(): [UserDataType, string | null] {
  const [user, error] = useAuthState();
  const [userData, setUserData] = useState<UserDataType>(null);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      console.error(error);
      setDbError(error);
    } else if (user) {
      try {
        const callback = (documents: DocumentSnapshot<DocumentData>) => {
          const data = documents.data();
          if (data) {
            setUserData(data);
          } else {
            setDbError("Document not found");
          }
        };

        const querySnapshot = onSnapshot(
          doc(db, collectionName, user.uid),
          callback
        );

        return () => querySnapshot();
      } catch (err: any) {
        console.error(err);
        setDbError(err);
      }
    }
  }, [user]);

  return [userData, dbError];
}

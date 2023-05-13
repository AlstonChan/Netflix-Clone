import { doc, onSnapshot } from "firebase/firestore";
import useAuthState from "../useAuthState";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";

import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

export type UserDataType = DocumentData | null;

const collectionName = "Acc";

export default function useUserData() {
  const [user, error] = useAuthState(auth);
  const [userData, setUserData] = useState<UserDataType>(null);
  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setDbError(error);
    } else if (user !== null) {
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
    } else {
      setDbError("Unexpected Error had occurred");
    }
  }, [user]);

  return [userData, dbError];
}

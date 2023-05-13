import { doc, onSnapshot, setDoc } from "firebase/firestore";
import useAuthState from "../useAuthState";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";

import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

export type UserDataType = DocumentData | null;

const collectionName = "mymovie";

export default function useMovieData() {
  const [user, error] = useAuthState(auth);
  const [movieData, setMovieData] = useState<UserDataType>(null);
  const [dbError, setDbError] = useState<string | null>(null);

  const initMovieData = { movieID: null, addList: false, like: "none" };

  useEffect(() => {
    if (error) {
      setDbError(error);
    } else if (user !== null) {
      try {
        const callback = (documents: DocumentSnapshot<DocumentData>) => {
          const data = documents.data();
          if (data) {
            if (documents.exists() === false) {
              console.info("No document found");
              setDoc(doc(db, collectionName, user.uid), {
                "user-main": [initMovieData],
              });
            }

            setMovieData(data);
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

  return [movieData, dbError];
}

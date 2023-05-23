// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { doc, onSnapshot, setDoc } from "firebase/firestore";
import useAuthState from "../useAuthState";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

import type { DocumentData, DocumentSnapshot } from "firebase/firestore";

export type MovieDataType = DocumentData | undefined;

const collectionName = "mymovie";

export default function useMovieData(): [MovieDataType, string | null] {
  const [user, isLoading, error] = useAuthState();
  const [movieData, setMovieData] = useState<MovieDataType>();
  const [dbError, setDbError] = useState<string | null>(null);

  const initMovieData = { movieID: null, addList: false, like: "none" };

  useEffect(() => {
    if (error) {
      setDbError(error);
    } else if (user) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error]);

  return [movieData, dbError];
}

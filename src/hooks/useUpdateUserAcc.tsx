// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import useAuthState from "./useAuthState";
import useUserData from "./firestore/useUserData";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { maxOtherUserPerAcc } from "@/lib/firebaseAppConfig";

export type EventType = "create" | "upd" | "del";
type UserInfo = {
  username?: string;
  file: File | null | number;
  userId?: string;
};

const resultMsg = (status: "fail" | "success", msg: string) => {
  return { status, msg };
};

export default function useUpdateUserAcc() {
  const [user] = useAuthState();
  const [userData, dbError] = useUserData();

  const update = async (type: EventType, userInfo: UserInfo) => {
    if (userData && user) {
      const docAccRef = doc(db, "Acc", user.uid);

      switch (type) {
        case "create":
          if (!userInfo.username)
            return resultMsg(
              "fail",
              "username is missing, profile creation failed"
            );

          if (typeof userInfo.file === "number") {
            try {
              for (let x = 0; x < maxOtherUserPerAcc; x++) {
                if (!userData[`user-sec${x}`]) {
                  setDoc(
                    docAccRef,
                    {
                      [`user-sec${x}`]: {
                        name: userInfo.username,
                        pic: userInfo.file,
                      },
                    },
                    { merge: true }
                  );
                  return resultMsg(
                    "success",
                    `User profile ${userInfo.username} successfully created`
                  );
                }
              }
              return resultMsg(
                "fail",
                "Max number of profiles reached, profile creation failed"
              );
            } catch (error: any) {
              console.error(error);
              return resultMsg(
                "fail",
                "An error had occurred, profile creation failed"
              );
            }
          } else
            return resultMsg(
              "fail",
              "file type mismatch, profile creation failed"
            );

        case "upd":
          if (!userInfo.username)
            return resultMsg("fail", "username is missing, update failed");
          if (userInfo.userId) {
            // user only updates username
            try {
              if (userInfo.file === null) {
                await updateDoc(docAccRef, {
                  [userInfo.userId]: {
                    name: userInfo.username,
                    pic: userData[userInfo.userId].pic,
                  },
                });
                return resultMsg(
                  "success",
                  `User profile ${userInfo.username} successfully updated`
                );
              }
            } catch (error: any) {
              console.error(error);
              return resultMsg("fail", "An error had occurred, update failed");
            }

            // user updates profile picture, with or without updating username
            try {
              if (userInfo.file !== null && typeof userInfo.file !== "number") {
                const AccRef = ref(
                  storage,
                  `Acc/${user.uid}-${userInfo.userId}`
                );

                const uploadedImg = await uploadBytes(AccRef, userInfo.file, {
                  contentType: userInfo.file.type,
                  customMetadata: {
                    uid: user.uid,
                    imageId: `${user.uid}-${userInfo.userId}`,
                  },
                });
                const imgUrl = await getDownloadURL(
                  ref(storage, uploadedImg.metadata.fullPath)
                );
                await updateDoc(docAccRef, {
                  [userInfo.userId]: {
                    name: userInfo.username,
                    pic: imgUrl,
                  },
                });

                return resultMsg(
                  "success",
                  `User profile ${userInfo.username} successfully updated`
                );
              }
            } catch (error: any) {
              console.error(error);
              return resultMsg("fail", "An error had occurred, update failed");
            }
          } else
            return resultMsg("fail", "userId not found, profile update failed");

          break;

        case "del":
          if (userInfo.userId) {
            try {
              await updateDoc(docAccRef, {
                [userInfo.userId]: deleteField(),
              });

              return resultMsg(
                "success",
                `User profile ${userInfo.username} successfully deleted`
              );
            } catch (error) {
              console.error(error);
              return resultMsg(
                "fail",
                "An error had occurred, profile deletion failed"
              );
            }
          } else
            return resultMsg(
              "fail",
              "userId not found, profile deletion failed"
            );

        default:
          return resultMsg(
            "fail",
            "An unexpected case had occurred, no method to handle the case."
          );
      }

      return resultMsg("fail", "the switch statement is not executed");
    } else return resultMsg("fail", "user or userData is null");
  };

  return update;
}

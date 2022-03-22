import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useRef } from "react";
import { db, storage } from "./firebase";
import { UserContext } from "../pages/_app";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useUpdateUserAcc = () => {
  const { user, userData } = useContext(UserContext);
  const storagePathRef = useRef();

  const update = async (type, userInfo) => {
    if (userData && type && userInfo) {
      if (type === "create") {
        for (let x = 0; x < 4; x++) {
          if (!userData[`user-sec${x}`]) {
            setDoc(
              doc(db, "Acc", user.uid),
              {
                [`user-sec${x}`]: {
                  name: userInfo.name,
                  pic: userInfo.pic,
                },
              },
              { merge: true }
            );
            break;
          }
        }
      } else if (type === "upd") {
        if (userInfo.pic.src) {
          const AccRef = ref(storage, `Acc/${user.uid}0${userInfo.id}`);
          const uploadImg = uploadBytes(AccRef, userInfo.pic.fire, {
            contentType: userInfo.pic.type,
          })
            .then((snapshot) =>
              getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
                (url) => {
                  storagePathRef.current = url;
                }
              )
            )
            .then(() => {
              updateDoc(
                doc(db, "Acc", user.uid),
                {
                  [userInfo.id]: {
                    name: userInfo.name,
                    pic: storagePathRef.current
                      ? storagePathRef.current
                      : userInfo.pic,
                  },
                },
                { merge: true }
              );
            });
        } else {
          updateDoc(
            doc(db, "Acc", user.uid),
            {
              [userInfo.id]: {
                name: userInfo.name,
                pic: storagePathRef.current
                  ? storagePathRef.current
                  : userInfo.pic,
              },
            },
            { merge: true }
          );
        }
      } else if (type === "del") {
        updateDoc(doc(db, "Acc", user.uid), {
          [userInfo]: deleteField(),
        });
      } else console.error("Unexpected Input");
    }
  };

  return update;
};

export default useUpdateUserAcc;

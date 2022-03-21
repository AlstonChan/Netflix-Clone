import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useRef } from "react";
import { db } from "./firebase";
import { UserContext } from "../pages/_app";

const useUpdateUserAcc = () => {
  const { user, userData } = useContext(UserContext);

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
            ).then(() => {});
            break;
          }
        }
      } else if (type === "upd") {
        if (userInfo.id === "user-main") {
          updateDoc(doc(db, "Acc", user.uid), {
            "user-main": {
              name: userInfo.name,
              pic: userInfo.pic,
            },
          }).then(() => {});
        } else if (userInfo.id === "user-sec0") {
          updateDoc(doc(db, "Acc", user.uid), {
            "user-sec0": {
              name: userInfo.name,
              pic: userInfo.pic,
            },
          }).then(() => {});
        } else if (userInfo.id === "user-sec1") {
          updateDoc(doc(db, "Acc", user.uid), {
            "user-sec1": {
              name: userInfo.name,
              pic: userInfo.pic,
            },
          }).then(() => {});
        } else if (userInfo.id === "user-sec2") {
          console.log(userInfo);
          updateDoc(doc(db, "Acc", user.uid), {
            "user-sec2": {
              name: userInfo.name,
              pic: userInfo.pic,
            },
          }).then(() => {});
        } else if (userInfo.id === "user-sec3") {
          updateDoc(doc(db, "Acc", user.uid), {
            "user-sec3": {
              name: userInfo.name,
              pic: userInfo.pic,
            },
          }).then(() => {});
        }
      } else if (type === "del") {
        if (userInfo === "user-sec0") {
          updateDoc(doc(db, "Acc", user.uid), {
            "user-sec0": deleteField(),
          }).then(() => {});
        } else if (userInfo === "user-sec1") {
          updateDoc(doc(db, "Acc", user.uid), {
            "user-sec1": deleteField(),
          }).then(() => {});
        } else if (userInfo === "user-sec2") {
          updateDoc(doc(db, "Acc", user.uid), {
            "user-sec2": deleteField(),
          }).then(() => {});
        } else if (userInfo === "user-sec3") {
          updateDoc(doc(db, "Acc", user.uid), {
            "user-sec3": deleteField(),
          }).then(() => {});
        }
      } else console.error("Unexpected Input");
    }
  };

  return update;
};

export default useUpdateUserAcc;

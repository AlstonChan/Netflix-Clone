import styles from "../../../styles/browse/addProfile.module.css";
import profileStyles from "../../../styles/browse/profile.module.css";
import Image from "next/image";

import { useContext, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { UserContext } from "../../../pages/_app";

export default function AddProfile({ back }) {
  const { user, userData } = useContext(UserContext);
  const picNumRef = useRef(Math.ceil(Math.random() * 4));
  const inputRef = useRef();
  const [inputIsValid, setInputIsValid] = useState(false);
  const [showWarn, setShowWarn] = useState(false);

  function checkInputValidity() {
    if (inputRef.current.value) {
      setInputIsValid(true);
    } else {
      setInputIsValid(false);
    }
  }

  async function submitNewUser() {
    if (!inputRef.current.value) {
      setShowWarn(true);
    } else if (userData["user-sec2"]) {
      await setDoc(
        doc(db, "Acc", user.uid),
        {
          "user-sec3": {
            name: inputRef.current.value,
            pic: picNumRef.current,
          },
        },
        { merge: true }
      );
      back(false);
    } else if (userData["user-sec1"]) {
      await setDoc(
        doc(db, "Acc", user.uid),
        {
          "user-sec2": {
            name: inputRef.current.value,
            pic: picNumRef.current,
          },
        },
        { merge: true }
      );
      back(false);
    } else if (userData["user-sec0"]) {
      await setDoc(
        doc(db, "Acc", user.uid),
        {
          "user-sec1": {
            name: inputRef.current.value,
            pic: picNumRef.current,
          },
        },
        { merge: true }
      );
      back(false);
    } else {
      await setDoc(
        doc(db, "Acc", user.uid),
        {
          "user-sec0": {
            name: inputRef.current.value,
            pic: picNumRef.current,
          },
        },
        { merge: true }
      );
      back(false);
    }
  }

  return (
    <>
      <h1 className={styles.mainHeading}>Add Profile</h1>
      <p className={styles.desc}>
        Add a profile for another person watching Netflix.
      </p>
      <hr className={styles.borderLine} />
      <div className={styles.AddProfileMain}>
        <div className={profileStyles.avatarContainer}>
          <Image
            src={`/images/profile pic/${picNumRef.current}.png`}
            width="320px"
            height="320px"
            className={profileStyles.profilePic}
          />
        </div>
        <div className={styles.inputContainer}>
          <div>
            <input
              type="text"
              name="newName"
              placeholder="Name"
              ref={inputRef}
              onChange={checkInputValidity}
              className={
                showWarn ? `${styles.input} ${styles.inputWarn}` : styles.input
              }
            />
            {showWarn ? <p className={styles.warn}>Please enter a name</p> : ""}
          </div>
        </div>
      </div>
      <hr className={styles.borderLine} />
      <br />
      <button
        className={
          inputIsValid
            ? `${styles.validBatn} ${styles.continueBtn}`
            : styles.continueBtn
        }
        onClick={submitNewUser}
      >
        Continue
      </button>
      <button className={styles.cancelBtn} onClick={() => back(false)}>
        Cancel
      </button>
    </>
  );
}

import styles from "../../../styles/browse/addProfile.module.css";
import profileStyles from "../../../styles/browse/profile.module.css";

import Image from "next/image";

import { useRef, useState } from "react";
import useUpdateUserAcc from "../../../lib/useUpdateUserAcc";

export default function AddProfile({ back }) {
  const picNumRef = useRef(Math.ceil(Math.random() * 4));
  const inputRef = useRef();
  const [inputIsValid, setInputIsValid] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const createUser = useUpdateUserAcc();

  function checkInputValidity() {
    if (inputRef.current.value) {
      setInputIsValid(true);
    } else {
      setInputIsValid(false);
    }
  }

  function submitNewUser(type) {
    if (!inputRef.current.value) {
      setShowWarn(true);
    } else {
      createUser(type, {
        name: inputRef.current.value,
        pic: picNumRef.current,
      });
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
            objectFit="cover"
            alt="User profile Picture"
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
        onClick={() => submitNewUser("create")}
      >
        Continue
      </button>
      <button className={styles.cancelBtn} onClick={() => back(false)}>
        Cancel
      </button>
    </>
  );
}

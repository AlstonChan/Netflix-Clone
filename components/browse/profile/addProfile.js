import baseStyles from "../../../styles/browse/profile/profile.module.css";
import styles from "../../../styles/browse/profile/addProfile.module.css";

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
      setShowWarn(1);
    } else if (inputRef.current.value.trim().length > 26) {
      setShowWarn(2);
    } else {
      createUser(type, {
        name: inputRef.current.value.trim(),
        pic: picNumRef.current,
      });
      back(false);
    }
  }

  return (
    <>
      <h1
        className={baseStyles.headingMain}
        style={{ width: "fit-content", margin: "0" }}
      >
        Add Profile
      </h1>
      <p className={styles.desc}>
        Add a profile for another person watching Netflix.
      </p>
      <hr className={baseStyles.borderLine} />
      <div className={styles.AddProfileMain}>
        <div className={baseStyles.avatarContainer}>
          <Image
            src={`/images/profile pic/${picNumRef.current}.png`}
            width="320px"
            height="320px"
            objectFit="cover"
            alt="User profile Picture"
            className={baseStyles.profilePic}
          />
        </div>
        <div className={baseStyles.inputContainer}>
          <div>
            <input
              type="text"
              name="newName"
              placeholder="Name"
              ref={inputRef}
              onChange={checkInputValidity}
              className={
                showWarn
                  ? `${baseStyles.input} ${baseStyles.inputWarn}`
                  : baseStyles.input
              }
            />
            {showWarn === 1 ? (
              <p className={baseStyles.warn}>Please enter a name</p>
            ) : showWarn === 2 ? (
              <p className={baseStyles.warn}>Your name is too long</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <hr className={baseStyles.borderLine} />
      <br />
      <button
        className={
          inputIsValid
            ? `${baseStyles.validBatn} ${baseStyles.continueBtn}`
            : baseStyles.continueBtn
        }
        onClick={() => submitNewUser("create")}
      >
        Continue
      </button>
      <button className={baseStyles.cancelBtn} onClick={() => back(false)}>
        Cancel
      </button>
    </>
  );
}

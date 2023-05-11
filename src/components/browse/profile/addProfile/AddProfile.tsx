// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import baseStyles from "@/styles/browse/profile/profile.module.css";
import styles from "./addProfile.module.scss";

import { useRef, useState } from "react";
import useUpdateUserAcc from "@/lib/useUpdateUserAcc";
import ImageRender from "@chan_alston/image";

interface AddProfileProps {
  setAddNewProfile: (addNewProfile: boolean) => void;
}

export default function AddProfile({ setAddNewProfile }: AddProfileProps) {
  const picNumRef = useRef(Math.ceil(Math.random() * 4));
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [showWarn, setShowWarn] = useState<number | null>(null);
  const createUser = useUpdateUserAcc();

  function checkInputValidity() {
    const inputElement = inputRef.current;

    if (inputElement === null) throw new Error("inputElement is null!");

    if (inputElement.value) {
      setInputIsValid(true);
    } else {
      setInputIsValid(false);
    }
  }

  function submitNewUser(type: "create") {
    const inputElement = inputRef.current;

    if (inputElement === null) throw new Error("inputElement is null!");

    if (!inputElement.value) {
      setShowWarn(1);
    } else if (inputElement.value.trim().length > 26) {
      setShowWarn(2);
    } else {
      createUser(type, {
        name: inputElement.value.trim(),
        pic: picNumRef.current,
      });
      setAddNewProfile(false);
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
          <ImageRender
            src={`/images/profile pic/${picNumRef.current}.png`}
            w="320px"
            h="320px"
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
      <button
        className={baseStyles.cancelBtn}
        onClick={() => setAddNewProfile(false)}
      >
        Cancel
      </button>
    </>
  );
}

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./addProfile.module.scss";

import { useRef, useState } from "react";
import useUpdateUserAcc from "src/hooks/useUpdateUserAcc";
import ImageRender from "@chan_alston/image";

import SnackBar from "@/components/common/snackbar/SnackBar";

import type { SnackBarStateType } from "@/components/common/snackbar/types";

interface AddProfileProps {
  setAddNewProfile: (addNewProfile: boolean) => void;
}

export default function AddProfile({ setAddNewProfile }: AddProfileProps) {
  const picNumRef = useRef<number>(Math.ceil(Math.random() * 4));
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showWarn, setShowWarn] = useState<number | null>(null);

  const closeSnackBar: SnackBarStateType = { isOpen: false, msg: "" };
  const [snackBarState, setSnackBarState] =
    useState<SnackBarStateType>(closeSnackBar);

  const createUser = useUpdateUserAcc();

  const onClose = () => {
    setSnackBarState(closeSnackBar);
  };

  async function submitNewUser(type: "create") {
    const inputElement = inputRef.current;

    if (inputElement === null) throw new Error("inputElement is null!");

    if (!inputElement.value) {
      setShowWarn(1);
    } else if (inputElement.value.trim().length > 26) {
      setShowWarn(2);
    } else {
      const result = await createUser(type, {
        username: inputElement.value.trim(),
        file: picNumRef.current,
      });
      if (result.status === "success") {
        setAddNewProfile(false);
      } else {
        setSnackBarState({ isOpen: true, msg: result.msg });
      }
    }
  }

  const filledBtn = `${styles.btn} ${styles.fit}`;
  const outlineBtn = `${styles.btn} ${styles.outline}`;

  return (
    <>
      <SnackBar
        variant="error"
        message={snackBarState.msg}
        isOpen={snackBarState.isOpen}
        onClose={onClose}
        timeout={0}
      />
      <h1 className={`${styles.title} ${styles.withDesc}`}>Add Profile</h1>
      <p className={styles.desc}>
        Add a profile for another person watching Netflix.
      </p>
      <div className={styles.AddProfileMain}>
        <div className={styles.avatarContainer}>
          <ImageRender
            src={`/images/profile-pic/${picNumRef.current}.png`}
            w="320px"
            h="320px"
            alt="User profile Picture"
            className={styles.profilePic}
          />
        </div>
        <div className={styles.inputContainer}>
          <div>
            <input
              type="text"
              name="newName"
              placeholder="Name"
              ref={inputRef}
              autoFocus
              className={
                showWarn ? `${styles.input} ${styles.inputWarn}` : styles.input
              }
            />
            {showWarn === 1 ? (
              <p className={styles.warn}>Please enter a name</p>
            ) : showWarn === 2 ? (
              <p className={styles.warn}>Your name is too long</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={filledBtn} onClick={() => submitNewUser("create")}>
          Continue
        </button>
        <button className={outlineBtn} onClick={() => setAddNewProfile(false)}>
          Cancel
        </button>
      </div>
    </>
  );
}

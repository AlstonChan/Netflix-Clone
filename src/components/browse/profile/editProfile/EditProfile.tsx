// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import baseStyles from "@/styles/browse/profile/profile.module.css";
import styles from "./editProfile.module.scss";
import editPencil from "@/public/images/icons/misc/edit-pencil.svg";

import Image from "next/image";

import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ImageRender from "@chan_alston/image";
import useUpdateUserAcc from "@/lib/useUpdateUserAcc";
import { UserContext } from "@/pages/_app";
import { fill } from "@/styles/cssStyle";

import ModalWarn from "../../ModalWarn";

import type { EditUserIdType } from "@/pages/manageProfile";
import type { ChangeEvent } from "react";

interface EditProfileProps {
  editUserId: EditUserIdType;
  setEditUserId: (name: EditUserIdType) => void;
}

export default function EditProfile({
  editUserId,
  setEditUserId,
}: EditProfileProps) {
  const { user, userData } = useContext(UserContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [showWarnInput, setShowWarnInput] = useState<number | null>(null);
  const [showWarnPic, setShowWarnPic] = useState(false);
  const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
  const [modalWarn, setModalWarn] = useState(false);
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

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = userData[editUserId].name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitNewUser(type: "upd" | "del") {
    const inputElement = inputRef.current;

    if (inputElement === null) throw new Error("inputElement is null!");

    if (!inputElement.value) {
      setShowWarnInput(1);
    } else if (type === "upd") {
      if (inputElement.value.trim().length > 26) {
        setShowWarnInput(2);
      } else if (uploadedProfilePic?.size > 2000000) {
        setShowWarnPic(true);
      } else {
        createUser(type, {
          id: editUserId,
          name: inputElement.value.trim(),
          pic: uploadedProfilePic
            ? uploadedProfilePic
            : userData[editUserId].pic,
        });
        setEditUserId(null);
      }
    } else {
      createUser(type, editUserId);
      setEditUserId(null);
    }
  }

  function uploadFile(e: ChangeEvent<HTMLInputElement>) {
    const targetElement = e.target;

    if (user !== null && targetElement.files) {
      if (!user.emailVerified) {
        toggleModalWarn();
        return;
      }
      if (targetElement.files[0]) {
        setShowWarnPic(false);
        setUploadedProfilePic({
          src: URL.createObjectURL(targetElement.files[0]),
          fire: targetElement.files[0],
          alt: targetElement.files[0].name,
          type: targetElement.files[0].type,
          size: targetElement.files[0].size,
        });
      }
    }
  }

  // Tell user to verify their email address when
  // their account is not verified and attempt to
  // change profile picture
  function toggleModalWarn() {
    setModalWarn(true);
    setTimeout(() => setModalWarn(false), 5000);
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {modalWarn ? <ModalWarn type="profile" /> : ""}
      </AnimatePresence>
      <h1
        className={styles.title}
        style={{ margin: "0", width: "fit-content" }}
      >
        Edit Profile
      </h1>
      <hr className={styles.borderLine} />
      <div className={styles.box}>
        <div className={baseStyles.avatarContainer}>
          <ImageRender
            src={
              uploadedProfilePic
                ? uploadedProfilePic.src
                : userData[editUserId].pic.length > 3
                ? userData[editUserId].pic
                : `/images/profile pic/${userData[editUserId].pic}.png`
            }
            w="320px"
            h="320px"
            className={
              showWarnPic
                ? `${baseStyles.profilePic} ${styles.profilePicWarn}`
                : baseStyles.profilePic
            }
            alt={uploadedProfilePic ? uploadedProfilePic.alt : "User profile"}
            style={{ ...fill, objectFit: "cover" }}
          />
          <form className={styles.editContainer}>
            <label htmlFor="profileAvatar" className={styles.editPosition}>
              <input
                type="file"
                id="profileAvatar"
                multiple={false}
                accept=".png,.jpeg,.jpg"
                name="profileAvatar"
                onChange={(e) => uploadFile(e)}
                className={styles.inputFile}
              />
              <Image src={editPencil} alt="edit button" unoptimized />
            </label>
          </form>
        </div>
        <div className={styles.detailsPanel}>
          <div className={baseStyles.inputContainer}>
            <div>
              <input
                type="text"
                name="newName"
                placeholder="Name"
                ref={inputRef}
                onChange={checkInputValidity}
                className={
                  showWarnInput
                    ? `${baseStyles.input} ${baseStyles.inputWarn}`
                    : baseStyles.input
                }
              />
              {showWarnInput === 1 ? (
                <p className={baseStyles.warn}>Please enter a name</p>
              ) : showWarnInput === 2 ? (
                <p className={baseStyles.warn}>Your name is too long</p>
              ) : showWarnPic ? (
                <p className={baseStyles.warn}>
                  Image size need to be smaller than 2MB
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className={baseStyles.borderLine} />
      <div className={baseStyles.buttonContainer}>
        <button
          className={
            inputIsValid
              ? `${baseStyles.validBatn} ${baseStyles.continueBtn}`
              : baseStyles.continueBtn
          }
          onClick={() => submitNewUser("upd")}
        >
          Continue
        </button>
        <button
          className={baseStyles.cancelBtn}
          onClick={() => setEditUserId(null)}
        >
          Cancel
        </button>
        {editUserId !== "user-main" ? (
          <button
            className={baseStyles.cancelBtn}
            onClick={() => submitNewUser("del")}
          >
            Delete Profile
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

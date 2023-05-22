// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./editProfile.module.scss";
import editPencil from "@/public/images/icons/misc/edit-pencil.svg";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import ImageRender from "@chan_alston/image";
import useUpdateUserAcc from "src/hooks/useUpdateUserAcc";
import useUserData from "src/hooks/firestore/useUserData";
import useAuthState from "src/hooks/useAuthState";

import { responsive } from "@/styles/cssStyle";

import Loader from "@/components/common/Loader/Loader";
import SnackBar from "@/components/common/snackbar/SnackBar";

import type { EventType } from "src/hooks/useUpdateUserAcc";
import type { EditUserIdType } from "@/pages/manageProfile";
import type { ChangeEvent } from "react";
import type { SnackBarStateType } from "@/components/common/snackbar/types";

// type
type WarningType = "picture" | "input";
interface UserInputWarning {
  element: WarningType | "none";
  warningNum: 0 | 1;
}
const inputWarning: string[] = ["Please enter a name", "Your name is too long"];
const pictureWarning: string[] = ["Image size need to be smaller than 2MB"];
interface WarningMsgType {
  [key: string]: string[];
}
const warningMsg: WarningMsgType = {
  input: inputWarning,
  picture: pictureWarning,
};

type UploadedProfilePicType = {
  src: string;
  file: File;
} | null;

interface EditProfileProps {
  editUserId: EditUserIdType;
  setEditUserId: (name: EditUserIdType) => void;
}
// Component
export default function EditProfile(props: EditProfileProps) {
  const { editUserId, setEditUserId } = props;

  const [user, isLoading, error] = useAuthState();
  const [userData, dbError] = useUserData();
  // input reference for updating username
  const inputRef = useRef<HTMLInputElement | null>(null);

  const noWarn: UserInputWarning = { element: "none", warningNum: 0 };
  const [editWarn, setEditWarn] = useState<UserInputWarning>(noWarn);
  const isInputWarn = editWarn.element === "input";
  const isPicWarn = editWarn.element === "picture";

  const [uploadedProfilePic, setUploadedProfilePic] =
    useState<UploadedProfilePicType>(null);

  const closeSnackBar: SnackBarStateType = {
    isOpen: false,
    msg: "",
    title: "",
  };
  const [snackBarState, setSnackBarState] =
    useState<SnackBarStateType>(closeSnackBar);

  const createUser = useUpdateUserAcc();

  // set username in input upon load
  useEffect(() => {
    if (inputRef.current && editUserId && userData) {
      inputRef.current.value = userData[editUserId].name;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editUserId]);

  // close function for snackbar
  const onClose = () => {
    setSnackBarState(closeSnackBar);
  };

  async function submitNewUser(type: EventType) {
    const inputElement = inputRef.current;

    if (inputElement === null) throw new Error("inputElement is null!");
    if (editUserId === null) throw new Error("editUserId is null!");

    const value = inputElement.value.trim();
    const twoMegaByte = 2_000_000;
    const fileIsLargerThan2MB =
      uploadedProfilePic && uploadedProfilePic.file.size > twoMegaByte;

    switch (type) {
      case "upd":
        if (!value) {
          setEditWarn({ element: "input", warningNum: 0 });
        } else if (value.length > 26) {
          setEditWarn({ element: "input", warningNum: 1 });
        } else if (fileIsLargerThan2MB) {
          setEditWarn({ element: "picture", warningNum: 0 });
        } else {
          const result = await createUser(type, {
            userId: editUserId,
            username: inputElement.value.trim(),
            file: uploadedProfilePic ? uploadedProfilePic.file : null,
          });

          if (result.status === "success") {
            setEditWarn(noWarn);
            setEditUserId(null);

            // releases an existing object URL
            if (uploadedProfilePic) URL.revokeObjectURL(uploadedProfilePic.src);
          } else setSnackBarState({ isOpen: true, msg: result.msg });
        }
        break;

      case "del":
        const result = await createUser(type, {
          userId: editUserId,
          file: null,
        });
        if (result.status === "success") {
          setEditUserId(null);
          setEditWarn(noWarn);
        } else setSnackBarState({ isOpen: true, msg: result.msg });
        break;

      default:
        throw new Error("Unexpected type not handled");
    }
  }

  // onChange function for input file
  function uploadFile(e: ChangeEvent<HTMLInputElement>) {
    const targetElement = e.target;

    if (user && targetElement.files) {
      const userPic = targetElement.files[0];

      // reject user input if user email is unverified
      if (!user.emailVerified) {
        const msg =
          "You have to verified your account in order to change profile picture";
        return setSnackBarState({
          isOpen: true,
          msg,
          title: "Account Not Yet Verified",
        });
      }

      if (userPic) {
        const file: string = URL.createObjectURL(userPic);

        if (isPicWarn) setEditWarn({ element: "none", warningNum: 0 });

        setUploadedProfilePic({ src: file, file: userPic });
      }
    }
  }

  if (editUserId === null || !userData) return <Loader />;

  const filledBtn = `${styles.btn} ${styles.fit}`;
  const outlineBtn = `${styles.btn} ${styles.outline}`;

  const userPic = userData[editUserId]?.pic;
  const userOwnProfilePic =
    userPic?.length > 3 ? userPic : `/images/profile-pic/${userPic}.png`;

  const profilePicSrc =
    uploadedProfilePic !== null ? uploadedProfilePic.src : userOwnProfilePic;

  const profilePicAlt =
    uploadedProfilePic !== null ? uploadedProfilePic.file.name : "User profile";

  return (
    <>
      <SnackBar
        variant="error"
        title={snackBarState.title}
        message={snackBarState.msg}
        isOpen={snackBarState.isOpen}
        onClose={onClose}
      />
      <h1 className={styles.title}>Edit Profile</h1>
      <div className={styles.box}>
        <div className={styles.avatarContainer}>
          {userPic && (
            <ImageRender
              src={profilePicSrc}
              w="320px"
              h="320px"
              className={`${styles.profilePic} ${
                isPicWarn && styles.profilePicWarn
              }`}
              alt={profilePicAlt}
            />
          )}
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
              <Image src={editPencil} alt="edit button" style={responsive} />
            </label>
          </form>
        </div>
        <div className={styles.detailsPanel}>
          <div className={styles.inputContainer}>
            <div>
              <input
                type="text"
                name="newName"
                placeholder="Name"
                ref={inputRef}
                className={`${styles.input} ${isInputWarn && styles.inputWarn}`}
              />
              {editWarn.element !== "none" && (
                <p className={styles.warn}>
                  {warningMsg[editWarn.element][editWarn.warningNum]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.borderLine} />
      <div className={styles.buttonContainer}>
        <button className={filledBtn} onClick={() => submitNewUser("upd")}>
          Continue
        </button>
        <button className={outlineBtn} onClick={() => setEditUserId(null)}>
          Cancel
        </button>
        {editUserId !== "user-main" && (
          <button className={outlineBtn} onClick={() => submitNewUser("del")}>
            Delete Profile
          </button>
        )}
      </div>
    </>
  );
}

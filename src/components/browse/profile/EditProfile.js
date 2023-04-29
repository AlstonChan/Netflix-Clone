import baseStyles from "@/styles/browse/profile/profile.module.css";
import styles from "@/styles/browse/profile/editProfile.module.css";
import editPencil from "@/public/images/icons/misc/edit-pencil.svg";

import Image from "next/image";

import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ImageRender from "@chan_alston/image";
import useUpdateUserAcc from "@/lib/useUpdateUserAcc";
import { UserContext } from "@/pages/_app";
import { fill } from "@/styles/cssStyle";

import ModalWarn from "../ModalWarn";

export default function EditProfile({ currentUserId, back }) {
  const { user, userData } = useContext(UserContext);
  const inputRef = useRef();
  const [inputIsValid, setInputIsValid] = useState(false);
  const [showWarnInput, setShowWarnInput] = useState(false);
  const [showWarnPic, setShowWarnPic] = useState(false);
  const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
  const [modalWarn, setModalWarn] = useState(false);
  const createUser = useUpdateUserAcc();

  function checkInputValidity() {
    if (inputRef.current.value) {
      setInputIsValid(true);
    } else {
      setInputIsValid(false);
    }
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = userData[currentUserId].name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitNewUser(type) {
    if (!inputRef.current.value) {
      setShowWarnInput(1);
    } else if (type === "upd") {
      if (inputRef.current.value.trim().length > 26) {
        setShowWarnInput(2);
      } else if (uploadedProfilePic?.size > 2000000) {
        setShowWarnPic(true);
      } else {
        createUser(type, {
          id: currentUserId,
          name: inputRef.current.value.trim(),
          pic: uploadedProfilePic
            ? uploadedProfilePic
            : userData[currentUserId].pic,
        });
        back(false);
      }
    } else {
      createUser(type, currentUserId);
      back(false);
    }
  }

  function uploadFile(e) {
    if (!user.emailVerified) {
      toggleModalWarn();
      return;
    }
    if (e.target.files[0]) {
      setShowWarnPic(false);
      setUploadedProfilePic({
        src: URL.createObjectURL(e.target.files[0]),
        fire: e.target.files[0],
        alt: e.target.files[0].name,
        type: e.target.files[0].type,
        size: e.target.files[0].size,
      });
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
        className={baseStyles.headingMain}
        style={{ margin: "0", width: "fit-content" }}
      >
        Edit Profile
      </h1>
      <hr className={baseStyles.borderLine} />
      <div className={styles.container}>
        <div className={baseStyles.avatarContainer}>
          <ImageRender
            src={
              uploadedProfilePic
                ? uploadedProfilePic.src
                : userData[currentUserId].pic.length > 3
                ? userData[currentUserId].pic
                : `/images/profile pic/${userData[currentUserId].pic}.png`
            }
            w="320px"
            h="320px"
            objFit="cover"
            className={
              showWarnPic
                ? `${baseStyles.profilePic} ${styles.profilePicWarn}`
                : baseStyles.profilePic
            }
            alt={uploadedProfilePic ? uploadedProfilePic.alt : "User profile"}
            style={fill}
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
        <button className={baseStyles.cancelBtn} onClick={() => back(false)}>
          Cancel
        </button>
        {currentUserId !== "user-main" ? (
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

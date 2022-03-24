import baseStyles from "../../../styles/browse/profile/profile.module.css";
import styles from "../../../styles/browse/profile/editProfile.module.css";
import editPencil from "../../../public/images/icons/misc/edit-pencil.svg";

import Image from "next/image";

import { useContext, useEffect, useRef, useState } from "react";
import useUpdateUserAcc from "../../../lib/useUpdateUserAcc";
import { UserContext } from "../../../pages/_app";

export default function EditProfile({ currentUserId, back }) {
  const { userData } = useContext(UserContext);
  const inputRef = useRef();
  const [inputIsValid, setInputIsValid] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
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
      setShowWarn(true);
    } else if (type === "upd") {
      createUser(type, {
        id: currentUserId,
        name: inputRef.current.value,
        pic: uploadedProfilePic
          ? uploadedProfilePic
          : userData[currentUserId].pic,
      });
      back(false);
    } else {
      createUser(type, currentUserId);
      back(false);
    }
  }

  function uploadFile(e) {
    if (e.target.files[0]) {
      setUploadedProfilePic({
        src: URL.createObjectURL(e.target.files[0]),
        fire: e.target.files[0],
        alt: e.target.files[0].name,
        type: e.target.files[0].type,
      });
    }
  }

  return (
    <>
      <h1
        className={baseStyles.headingMain}
        style={{ margin: "0", width: "fit-content" }}
      >
        Edit Profile
      </h1>
      <hr className={baseStyles.borderLine} />
      <div className={styles.container}>
        <div className={baseStyles.avatarContainer}>
          <Image
            src={
              uploadedProfilePic
                ? uploadedProfilePic.src
                : userData[currentUserId].pic.length > 3
                ? userData[currentUserId].pic
                : `/images/profile pic/${userData[currentUserId].pic}.png`
            }
            width="320px"
            height="320px"
            objectFit="cover"
            className={baseStyles.profilePic}
            alt={
              uploadedProfilePic
                ? uploadedProfilePic.alt
                : "User profile Picture"
            }
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
              <Image src={editPencil} alt="edit button" />
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
                  showWarn
                    ? `${baseStyles.input} ${baseStyles.inputWarn}`
                    : baseStyles.input
                }
              />
              {showWarn ? (
                <p className={baseStyles.warn}>Please enter a name</p>
              ) : (
                ""
              )}
            </div>
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
        onClick={() => submitNewUser("upd")}
      >
        Continue
      </button>
      <button className={baseStyles.cancelBtn} onClick={() => back(false)}>
        Cancel
      </button>
      <button
        className={baseStyles.cancelBtn}
        onClick={() => submitNewUser("del")}
      >
        Delete Profile
      </button>
    </>
  );
}

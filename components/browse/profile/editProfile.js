import baseStyles from "../../../styles/browse/profile.module.css";
import addProfileStyles from "../../../styles/browse/addProfile.module.css";
import styles from "../../../styles/browse/editProfile.module.css";
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
  }, []);

  async function submitNewUser(type) {
    if (!inputRef.current.value) {
      setShowWarn(true);
    } else if (type === "upd") {
      createUser(type, {
        id: currentUserId,
        name: inputRef.current.value,
        pic: userData[currentUserId].pic,
      });
      back(false);
    } else {
      createUser(type, currentUserId);
      back(false);
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
      <hr className={styles.borderLine} />
      <div className={styles.container}>
        <div className={baseStyles.avatarContainer}>
          <Image
            src={
              userData[currentUserId].pic.length > 3
                ? userData[currentUserId].pic
                : `/images/profile pic/${userData[currentUserId].pic}.png`
            }
            width="320px"
            height="320px"
            className={baseStyles.profilePic}
            alt="User profile Picture"
          />
          <div className={styles.editContainer}>
            <div className={styles.editPosition}>
              <Image src={editPencil} />
            </div>
          </div>
        </div>
        <div className={styles.detailsPanel}>
          <div className={addProfileStyles.inputContainer}>
            <div>
              <input
                type="text"
                name="newName"
                placeholder="Name"
                ref={inputRef}
                onChange={checkInputValidity}
                className={
                  showWarn
                    ? `${addProfileStyles.input} ${addProfileStyles.inputWarn}`
                    : addProfileStyles.input
                }
              />
              {showWarn ? (
                <p className={addProfileStyles.warn}>Please enter a name</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className={addProfileStyles.borderLine} />
      <br />
      <button
        className={
          inputIsValid
            ? `${addProfileStyles.validBatn} ${addProfileStyles.continueBtn}`
            : addProfileStyles.continueBtn
        }
        onClick={() => submitNewUser("upd")}
      >
        Continue
      </button>
      <button
        className={addProfileStyles.cancelBtn}
        onClick={() => back(false)}
      >
        Cancel
      </button>
      <button
        className={addProfileStyles.cancelBtn}
        onClick={() => submitNewUser("del")}
      >
        Delete Profile
      </button>
    </>
  );
}

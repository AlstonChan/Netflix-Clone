import baseStyles from "../../../styles/browse/profile/profile.module.css";
import styles from "../../../styles/browse/profile/mainProfile.module.css";
import ProfileAdd from "../../../public/images/netflix-profile-add.png";

import Router from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../pages/_app";

import ProfileAvatar from "./profileAvatar";

export default function MainProfile({
  title,
  switchPage,
  addProfile,
  currentUserId,
  changeEdit,
}) {
  const { userData } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const [addNewProfile, setAddNewProfile] = useState(true);
  const secProfile = ["user-sec0", "user-sec1", "user-sec2", "user-sec3"];

  useEffect(() => {
    if (userData) {
      const tempArr = [];
      for (let x = 0; x < 4; x++) {
        if (userData[`user-sec${x}`]) {
          tempArr.push(x);
        }
      }
      setShowProfile(tempArr);
      if (tempArr.length >= 4) setAddNewProfile(false);
      if (tempArr.length <= 3) setAddNewProfile(true);
    }
  }, [userData]);

  return (
    <>
      <h1 className={baseStyles.headingMain}>{title}</h1>
      <div className={styles.profile}>
        {userData ? (
          <ProfileAvatar
            user={userData["user-main"]}
            switchPage={switchPage}
            currentUser={"user-main"}
            currentUserId={currentUserId}
            changeEdit={changeEdit}
          />
        ) : (
          ""
        )}
        {userData && showProfile
          ? showProfile.map((prof, index) => {
              return (
                <ProfileAvatar
                  key={index}
                  user={userData[secProfile[prof]]}
                  switchPage={switchPage}
                  currentUser={secProfile[prof]}
                  currentUserId={currentUserId}
                  changeEdit={changeEdit}
                />
              );
            })
          : ""}
        {addNewProfile && userData ? (
          <li
            tabIndex="0"
            onClick={addProfile}
            className={baseStyles.listItemProfile}
            style={{ marginRight: "0" }}
          >
            <div className={baseStyles.avatarContainer}>
              <Image
                src={ProfileAdd}
                className={`${baseStyles.profilePic}`}
                alt="User profile Picture"
              />
            </div>
            <span className={baseStyles.nameContain}>
              <p className={baseStyles.name}>Add Profile</p>
            </span>
          </li>
        ) : (
          ""
        )}
      </div>
      <div className={styles.manageContainer}>
        {currentUserId ? (
          <button
            className={styles.manageProfileDone}
            onClick={() => {
              window.sessionStorage.removeItem("profile");
              Router.back();
            }}
          >
            Done
          </button>
        ) : (
          <Link href="/manageProfile">
            <a>
              <button className={styles.manageProfilesBtn}>
                Manage Profiles
              </button>
            </a>
          </Link>
        )}
      </div>
    </>
  );
}

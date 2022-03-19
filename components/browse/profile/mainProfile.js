import styles from "../../../styles/browse/profile.module.css";
import Image from "next/image";
import ProfileAdd from "../../../public/images/netflix-profile-add.png";

import ProfileAvatar from "./profileAvatar";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../pages/_app";

export default function MainProfile({ switchPage, addProfile }) {
  const { userData } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const secProfile = ["user-sec0", "user-sec1", "user-sec2", "user-sec3"];

  useEffect(() => {
    if (userData) {
      if (userData[secProfile[3]]) {
        setShowProfile([0, 1, 2, 3]);
      } else if (userData[secProfile[2]]) {
        setShowProfile([0, 1, 2]);
      } else if (userData[secProfile[1]]) {
        setShowProfile([0, 1]);
      } else if (userData[secProfile[0]]) {
        setShowProfile([0]);
      }
    }
  }, [userData]);

  return (
    <>
      <h1 className={styles.headingMain}>Who&apos;s watching?</h1>
      <div className={styles.profile}>
        {userData ? (
          <ProfileAvatar
            user={userData["user-main"]}
            switchPage={switchPage}
            currentUser={"user-main"}
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
                />
              );
            })
          : ""}
        <li
          tabIndex="0"
          onClick={addProfile}
          className={styles.listItemProfile}
          style={{ marginRight: "0" }}
        >
          <div className={styles.avatarContainer}>
            <Image
              src={ProfileAdd}
              className={`${styles.profilePic} ${styles.profileAdd}`}
              alt="User profile Picture"
            />
          </div>
          <span className={styles.nameContain}>
            <p className={styles.name}>Add Profile</p>
          </span>
        </li>
      </div>
      <div className={styles.manageContainer}>
        <button className={styles.manageProfilesBtn}>Manage Profiles</button>
      </div>
    </>
  );
}

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./userProfile.module.scss";
import ProfileAdd from "@/public/images/profile-add.png";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { maxOtherUserPerAcc } from "@/lib/firebaseAppConfig";
import { UserContext } from "@/pages/_app";

import ProfileAvatar from "../profileAvatar/ProfileAvatar";

import type { EditUserIdType } from "@/pages/manageProfile";

interface MainProfileProps {
  title: string;
  addProfile: any;
  switchPage: ((name: string) => void) | null;
  editUser: ((name: EditUserIdType) => void) | null;
}

export default function MainProfile(props: MainProfileProps) {
  const { title, addProfile, switchPage, editUser } = props;
  const router = useRouter();

  const { userData } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState<number[]>([]);
  const [addNewProfile, setAddNewProfile] = useState(true);
  const secProfile = ["user-sec0", "user-sec1", "user-sec2", "user-sec3"];

  useEffect(() => {
    if (userData) {
      const tempArr: number[] = [];
      for (let x = 0; x < maxOtherUserPerAcc; x++) {
        if (userData[`user-sec${x}`]) {
          tempArr.push(x);
        }
      }
      setShowProfile(tempArr);
      if (tempArr.length >= maxOtherUserPerAcc) setAddNewProfile(false);
      if (tempArr.length <= maxOtherUserPerAcc - 1) setAddNewProfile(true);
    }
  }, [userData]);

  const isOtherProfileExists = showProfile.length >= 1;

  const handleClick = () => {
    window.sessionStorage.removeItem("profile");
    router.back();
  };
  // component
  const addProfileItem = addNewProfile && (
    <li
      tabIndex={0}
      onClick={addProfile}
      className={styles.listItemProfile}
      style={{ marginRight: "0" }}
    >
      <div className={styles.avatarContainer}>
        <Image
          src={ProfileAdd}
          className={styles.profilePic}
          alt="User profile"
        />
      </div>
      <span className={styles.name}>
        <p className={styles.txt}>Add Profile</p>
      </span>
    </li>
  );

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.profile}>
        {userData && (
          <ProfileAvatar
            user={userData["user-main"]}
            currentUser={"user-main"}
            switchPage={switchPage}
            editUser={editUser}
          />
        )}
        {userData &&
          isOtherProfileExists &&
          showProfile.map((profile) => {
            const userId = secProfile[profile];

            return (
              <ProfileAvatar
                key={userId}
                user={userData[userId]}
                currentUser={userId}
                switchPage={switchPage}
                editUser={editUser}
              />
            );
          })}
        {addProfileItem}
      </div>
      <div className={styles.manageContainer}>
        {!!editUser ? (
          <button className={`${styles.btn}`} onClick={handleClick}>
            Done
          </button>
        ) : (
          <Link href="/manageProfile" className={styles.link}>
            Manage Profiles
          </Link>
        )}
      </div>
    </>
  );
}

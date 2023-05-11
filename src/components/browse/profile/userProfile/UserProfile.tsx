// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import baseStyles from "@/styles/browse/profile/profile.module.css";
import styles from "./userProfile.module.scss";
import ProfileAdd from "@/public/images/profile-add.png";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/pages/_app";

import ProfileAvatar from "../profileAvatar/ProfileAvatar";

import type { EditUserIdType } from "@/pages/manageProfile";

interface MainProfileProps {
  title: string;
  addProfile: any;
  editUserId: EditUserIdType;
  switchPage: ((name: string) => void) | null;
  editUser: ((name: EditUserIdType) => void) | null;
}

export default function MainProfile(props: MainProfileProps) {
  const { title, addProfile, editUserId, switchPage, editUser } = props;
  const router = useRouter();

  const { userData } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState<number[]>([]);
  const [addNewProfile, setAddNewProfile] = useState(true);
  const secProfile = ["user-sec0", "user-sec1", "user-sec2", "user-sec3"];

  useEffect(() => {
    if (userData) {
      const tempArr: number[] = [];
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

  const isOtherProfileExists = showProfile.length >= 1;

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.profile}>
        {userData && (
          <ProfileAvatar
            user={userData["user-main"]}
            currentUser={"user-main"}
            editUserId={editUserId}
            switchPage={switchPage}
            editUser={editUser}
          />
        )}
        {userData &&
          isOtherProfileExists &&
          showProfile.map((prof, index) => {
            return (
              <ProfileAvatar
                key={index}
                user={userData[secProfile[prof]]}
                currentUser={secProfile[prof]}
                editUserId={editUserId}
                switchPage={switchPage}
                editUser={editUser}
              />
            );
          })}
        {addNewProfile && userData && (
          <li
            tabIndex={0}
            onClick={addProfile}
            className={baseStyles.listItemProfile}
            style={{ marginRight: "0" }}
          >
            <div className={baseStyles.avatarContainer}>
              <Image
                src={ProfileAdd}
                className={`${baseStyles.profilePic}`}
                alt="User profile"
                unoptimized
              />
            </div>
            <span className={baseStyles.nameContain}>
              <p className={baseStyles.name}>Add Profile</p>
            </span>
          </li>
        )}
      </div>
      <div className={styles.manageContainer}>
        {editUserId ? (
          <button
            className={styles.manageProfileDone}
            onClick={() => {
              window.sessionStorage.removeItem("profile");
              router.back();
            }}
          >
            Done
          </button>
        ) : (
          <Link href="/manageProfile">
            <button className={styles.manageProfilesBtn}>
              Manage Profiles
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

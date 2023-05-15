// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./userComponent.module.scss";
import EditPencil from "@/public/images/icons/misc/edit-pencil.svg";
import Help from "@/public/images/icons/misc/question-mark-circle.svg";
import UserProfile from "@/public/images/icons/misc/user.svg";

import Image from "next/image";
import Link from "next/link";
import router from "next/router";

import { useContext, useState, useEffect } from "react";
import ImageRender from "@chan_alston/image";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { UserContext } from "@/pages/_app";
import { fill } from "@/styles/cssStyle";

interface UserDropDownListProps {
  currentUser: string | null;
  switchProfile: (user: string) => void;
  profilePicSrc: (userData: any, userId: string) => string;
}

const dropDownPanel = [
  { src: EditPencil, text: "Manage Profiles", link: "/manageProfile" },
  { src: UserProfile, text: "Account", link: "/yourAccount" },
  {
    src: Help,
    text: "Help Centre",
    loc: "external",
    link: "https://github.com/AlstonChan/Netflix-clone/issues",
  },
];
const secProfile = ["user-sec0", "user-sec1", "user-sec2", "user-sec3"];

export default function UserDropDownList(props: UserDropDownListProps) {
  const { currentUser, switchProfile, profilePicSrc } = props;

  const { userData } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState<number[] | null>(null);

  useEffect(() => {
    if (userData) {
      const tempArr = [];
      for (let x = 0; x < 4; x++) {
        if (userData[`user-sec${x}`]) {
          tempArr.push(x);
        }
      }
      setShowProfile(tempArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const logout = () => {
    signOut(auth)
      .then(() => router.push("/logout"))
      .then(() => window.sessionStorage.removeItem("profile"))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {userData && currentUser !== "user-main" && (
        <div className={styles.box} onClick={() => switchProfile("user-main")}>
          <div className={styles.imgContainer}>
            <ImageRender
              src={profilePicSrc(userData, "user-main")}
              w="35px"
              h="35px"
              className={styles.profilePic}
              alt="profile icon"
              style={fill}
            />
          </div>
          <p className={styles.txt}>{userData["user-main"].name}</p>
        </div>
      )}
      {userData &&
        showProfile &&
        showProfile.map((prof: number) => {
          // Don't show profile-picture again if the current
          // active user is equal to the looped user as in secProfile[prof]
          if (secProfile[prof] === currentUser) return;
          return (
            <div
              className={styles.box}
              key={prof}
              onClick={() => switchProfile(secProfile[prof])}
            >
              <div className={styles.imgContainer}>
                <ImageRender
                  src={profilePicSrc(userData, secProfile[prof])}
                  w="35px"
                  h="35px"
                  className={styles.profilePic}
                  alt="profile icon"
                  style={fill}
                />
              </div>
              <p className={styles.txt}>{userData[secProfile[prof]].name}</p>
            </div>
          );
        })}
      {dropDownPanel.map((listItem) => {
        return (
          <span key={listItem.src}>
            <div className={styles.box}>
              <div className={styles.imgContainer}>
                <Image src={listItem.src} alt={listItem.text} />
              </div>

              <span style={{ padding: "4px 0" }}>
                {listItem.loc === "external" ? (
                  <Link
                    href={listItem.link}
                    className={styles.txt}
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    {listItem.text}
                  </Link>
                ) : (
                  <Link href={listItem.link} className={styles.txt}>
                    {listItem.text}
                  </Link>
                )}
              </span>
            </div>
            {(listItem.text === "Manage Profiles" ||
              listItem.text === "Help Centre") && <hr />}
          </span>
        );
      })}
      <div className={styles.box} onClick={logout}>
        <span className={styles.txt}>Sign Out of Netflix</span>
      </div>
    </>
  );
}

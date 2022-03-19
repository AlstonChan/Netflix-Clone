import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";

import styles from "../../../styles/browse/secondaryHeader.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../pages/_app";

import EditPencil from "../../../public/images/icons/misc/edit-pencil.svg";
import Help from "../../../public/images/icons/misc/question-mark-circle.svg";
import UserProfile from "../../../public/images/icons/misc/user.svg";
import useIsomorphicLayoutEffect from "../../../lib/isomorphic-layout";

const UserComponent = () => {
  const { userData } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(false);
  const [navUserStyle, setNavUserStyle] = useState({
    visibility: "visible", // temparary set to visible for development
  });
  const [delay, setDelay] = useState(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "object") {
      const data = window.sessionStorage.getItem("profile");
      if (data === null) setCurrentUser(null);
      setCurrentUser(data);
    }
  }, [userData]);

  function toggleNavUser(e) {
    if (e.type === "mouseenter") {
      clearTimeout(delay);
      setNavUserStyle({ visibility: "visible", opacity: "1" });
    } else if (e.type === "mouseleave") {
      setDelay(
        setTimeout(() => {
          setNavUserStyle({ visibility: "hidden", opacity: "0" });
        }, 400)
      );
    }
  }

  return (
    <div className={styles.profilePicContainAll}>
      <div
        onMouseEnter={(e) => toggleNavUser(e)}
        onMouseLeave={(e) => toggleNavUser(e)}
        style={{ display: "flex" }}
      >
        <div className={styles.profilePicContainer}>
          {userData && currentUser ? (
            <Image
              src={
                userData[currentUser].pic.length > 3
                  ? userData[currentUser].pic
                  : `/images/profile pic/${userData[currentUser].pic}.png`
              }
              width="35px"
              height="35px"
              className={styles.profilePic}
              alt="user profile picture"
            />
          ) : (
            ""
          )}
        </div>
        <Image
          src="/images/icons/misc/nav_arrow_bold.svg"
          width="20px"
          height="20px"
          className={styles.profilePicIcon}
          alt=""
        />
      </div>
      {navUserStyle.visibility == "visible" ? (
        <div
          className={styles.userDropDown}
          onMouseEnter={(e) => toggleNavUser(e)}
          onMouseLeave={(e) => toggleNavUser(e)}
          style={navUserStyle}
        >
          <div>
            <div className={styles.dropDownUserNavListArrContain}>
              <Image
                src="/images/icons/misc/nav_arrow_bold.svg"
                width="20px"
                height="20px"
                className={styles.dropDownUseruNavListArr}
                alt=""
              />
            </div>
            <UserDropDownList currentUser={currentUser} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserComponent;

export function UserDropDownList({ currentUser }) {
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
  const logout = () => {
    signOut(auth)
      .then(() => router.push("/logout"))
      .then(() => window.sessionStorage.removeItem("profile"))
      .catch((error) => console.error(error));
  };

  const dropDownPanel = [
    { src: EditPencil, text: "Manage Profiles", link: "/profile/manage" },
    { src: UserProfile, text: "Account", link: "/YourAccont" },
    {
      src: Help,
      text: "Help Centre",
      loc: "external",
      link: "https://github.com/AlstonChan/Netflix-clone/issues",
    },
  ];

  return (
    <>
      <div className={styles.listItemContainer}>
        <div className={styles.listItemImg}>
          {userData && currentUser !== "user-main" ? (
            <Image
              src={
                userData["user-main"].pic.length > 3
                  ? userData["user-main"].pic
                  : `/images/profile pic/${userData["user-main"].pic}.png`
              }
              width="35px"
              height="35px"
              className={styles.profilePic}
              alt="profile icon"
            />
          ) : (
            ""
          )}
        </div>
        <p
          style={{ margin: "0", alignSelf: "center" }}
          className={styles.listItemParagraph}
        >
          {userData ? userData["user-main"].name : ""}
        </p>
      </div>
      {userData && showProfile
        ? showProfile.map((prof, index) => {
            if (secProfile[prof] === currentUser) return;
            return (
              <div className={styles.listItemContainer} key={index}>
                <div className={styles.listItemImg}>
                  {userData ? (
                    <Image
                      src={
                        userData[secProfile[prof]].pic.length > 3
                          ? userData[secProfile[prof]].pic
                          : `/images/profile pic/${
                              userData[secProfile[prof]].pic
                            }.png`
                      }
                      width="35px"
                      height="35px"
                      className={styles.profilePic}
                      alt="profile icon"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <p
                  style={{ margin: "0", alignSelf: "center" }}
                  className={styles.listItemParagraph}
                >
                  {userData ? userData[secProfile[prof]].name : ""}
                </p>
              </div>
            );
          })
        : ""}
      {dropDownPanel.map((listItem, index) => {
        return (
          <span key={index}>
            <div className={styles.listItemContainer}>
              <div className={styles.listItemImg}>
                <Image src={listItem.src} alt="user profile picture" />
              </div>
              <span style={{ padding: "4px 0" }}>
                {listItem.loc === "external" ? (
                  <a href={listItem.link} className={styles.listItemParagraph}>
                    {listItem.text}
                  </a>
                ) : (
                  <Link href={listItem.link}>
                    <a className={styles.listItemParagraph}>{listItem.text}</a>
                  </Link>
                )}
              </span>
            </div>
            {listItem.text == "Manage Profiles" ||
            listItem.text == "Help Centre" ? (
              <hr />
            ) : (
              ""
            )}
          </span>
        );
      })}
      <div className={styles.listItemContainer} onClick={logout}>
        <span className={styles.listItemParagraph}>Sign Out of Netflix</span>
      </div>
    </>
  );
}

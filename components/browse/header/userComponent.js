import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";

import styles from "../../../styles/browse/secondaryHeader.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../../pages/_app";

import EditPencil from "../../../public/images/icons/misc/edit-pencil.svg";
import Help from "../../../public/images/icons/misc/question-mark-circle.svg";
import UserProfile from "../../../public/images/icons/misc/user.svg";

import placeholder from "../../../public/images/profile pic/1.png";

const UserComponent = () => {
  const { user, loading } = useContext(UserContext);

  const [navUserStyle, setNavUserStyle] = useState({
    visibility: "hidden",
  });

  const [delay, setDelay] = useState(null);

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
          <Image
            src={
              !loading && user?.photoURL
                ? user.photoURL
                : "/images/profile pic/1.png"
            }
            width="35px"
            height="35px"
            className={styles.profilePic}
            alt="profile icon"
          />
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
            <UserDropDownList />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserComponent;

export function UserDropDownList() {
  const { user, loading } = useContext(UserContext);
  const logout = () => {
    signOut(auth)
      .then(() => router.push("/logout"))
      .catch((error) => console.error(error));
  };

  const dropDownPanel = [
    { src: EditPencil, text: "Manage Profiles", link: "/profile/manage" },
    { src: UserProfile, text: "Account", link: "/YourAccont" },
    { src: Help, text: "Help Centre", link: "/" },
  ];

  return (
    <>
      <div className={styles.listItemContainer}>
        <div className={styles.listItemImg}>
          <Image
            src={!loading && user?.photoURL ? user.photoURL : placeholder}
            width="320px"
            height="320px"
            className={styles.userProfileImg}
          />
        </div>
        <p
          style={{ margin: "0", alignSelf: "center" }}
          className={styles.listItemParagraph}
        >
          {!loading && user?.displayName ? user.displayName : "User"}
        </p>
      </div>
      {dropDownPanel.map((listItem, index) => {
        return (
          <span key={index}>
            <div className={styles.listItemContainer}>
              <div className={styles.listItemImg}>
                <Image src={listItem.src} />
              </div>
              <span style={{ padding: "4px 0" }}>
                <Link href={listItem.link}>
                  <a className={styles.listItemParagraph}>{listItem.text}</a>
                </Link>
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

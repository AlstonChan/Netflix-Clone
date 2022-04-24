import styles from "../../../styles/browse/secondaryHeader.module.css";
import EditPencil from "../../../public/images/icons/misc/edit-pencil.svg";
import Help from "../../../public/images/icons/misc/question-mark-circle.svg";
import UserProfile from "../../../public/images/icons/misc/user.svg";

import Image from "next/image";
import Link from "next/link";
import router from "next/router";

import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";
import { signOut } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import { auth } from "../../../lib/firebase";
import { UserContext } from "../../../pages/_app";
import ImageRender from "../../ImageRender";
import useIsomorphicLayoutEffect from "../../../lib/useIsomorphicLayout";

export default function UserComponent() {
  const { userData } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(false);
  const [navUserStyle, setNavUserStyle] = useState({
    visibility: "hidden",
  });
  const [delay, setDelay] = useState(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "object") {
      const data = window.sessionStorage.getItem("profile");
      if (!data) {
        setCurrentUser("user-main");
      } else {
        setCurrentUser(
          aes
            .decrypt(data, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
            .toString(CryptoJS.enc.Utf8)
        );
      }
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

  function switchProfile(user) {
    if (typeof window === "object") {
      const encrypted = aes
        .encrypt(user, process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE)
        .toString();
      window.sessionStorage.setItem("profile", encrypted);
      router.reload();
      setCurrentUser(user);
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
            <ImageRender
              src={
                userData[currentUser].pic.length > 3
                  ? userData[currentUser].pic
                  : `/images/profile pic/${userData[currentUser].pic}.png`
              }
              width="35"
              height="35"
              objectFit="cover"
              className={styles.profilePic}
              alt="user profile"
            />
          ) : (
            ""
          )}
        </div>
        <Image
          src="/images/icons/arrow/nav_arrow_bold.svg"
          width="20px"
          height="20px"
          className={styles.profilePicIcon}
          alt=""
          unoptimized
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
                src="/images/icons/arrow/nav_arrow_bold.svg"
                width="20px"
                height="20px"
                className={styles.dropDownUseruNavListArr}
                alt=""
                unoptimized
              />
            </div>
            <UserDropDownList
              switchProfile={switchProfile}
              currentUser={currentUser}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export function UserDropDownList({ currentUser, switchProfile }) {
  const { userData } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const logout = () => {
    signOut(auth)
      .then(() => router.push("/logout"))
      .then(() => window.sessionStorage.removeItem("profile"))
      .catch((error) => console.error(error));
  };

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

  return (
    <>
      {userData && currentUser !== "user-main" ? (
        <div
          className={styles.listItemContainer}
          onClick={() => switchProfile("user-main")}
        >
          <div className={styles.listItemImg}>
            <ImageRender
              src={
                userData["user-main"].pic.length > 3
                  ? userData["user-main"].pic
                  : `/images/profile pic/${userData["user-main"].pic}.png`
              }
              width="35"
              height="35"
              objectFit="cover"
              className={styles.profilePic}
              alt="profile icon"
            />
          </div>
          <p
            style={{ margin: "0", alignSelf: "center" }}
            className={styles.listItemParagraph}
          >
            {userData["user-main"].name}
          </p>
        </div>
      ) : (
        ""
      )}
      {userData && showProfile
        ? showProfile.map((prof, index) => {
            if (secProfile[prof] === currentUser) return;
            return (
              <div
                className={styles.listItemContainer}
                key={index}
                onClick={() => switchProfile(secProfile[prof])}
              >
                <div className={styles.listItemImg}>
                  {userData ? (
                    <ImageRender
                      src={
                        userData[secProfile[prof]].pic.length > 3
                          ? userData[secProfile[prof]].pic
                          : `/images/profile pic/${
                              userData[secProfile[prof]].pic
                            }.png`
                      }
                      width="35"
                      height="35"
                      objectFit="cover"
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
                <Image src={listItem.src} alt="user profile" unoptimized />
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

import Image from "next/image";
import styles from "../../../styles/browse/header.module.css";

import SearchComponent from "./searchComponent";
import BellComponent from "./bellComponent";

export default function SecondaryNav() {
  return (
    <>
      <SearchComponent />
      <BellComponent />
      <div className={styles.profilePicContainAll}>
        <div className={styles.profilePicContainer}>
          <Image
            src="/images/profile pic/1.png"
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
    </>
  );
}

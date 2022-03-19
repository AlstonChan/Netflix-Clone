import Image from "next/image";
import styles from "../../../styles/browse/profile.module.css";

export default function ProfileAvatar({ user, switchPage, currentUser }) {
  return (
    <li
      tabIndex="1"
      onClick={() => switchPage(currentUser)}
      className={styles.listItemProfile}
    >
      <div className={styles.avatarContainer}>
        {user ? (
          <Image
            src={
              user.pic.length > 3
                ? user.pic
                : `/images/profile pic/${user.pic}.png`
            }
            width="320px"
            height="320px"
            className={styles.profilePic}
            alt="User profile Picture"
          />
        ) : (
          ""
        )}
      </div>
      <span className={styles.nameContain}>
        <p className={styles.name}>{user ? user.name : ""}</p>
      </span>
    </li>
  );
}

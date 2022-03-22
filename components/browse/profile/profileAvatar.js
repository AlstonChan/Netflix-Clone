import styles from "../../../styles/browse/profile.module.css";
import editPencil from "../../../public/images/icons/misc/edit-pencil.svg";

import Image from "next/image";

export default function ProfileAvatar({
  user,
  switchPage,
  currentUser,
  currentUserId,
  changeEdit,
}) {
  return (
    <li
      tabIndex="1"
      onClick={
        currentUserId
          ? () => changeEdit(currentUser)
          : () => switchPage(currentUser)
      }
      className={styles.listItemProfile}
      data-id={currentUser}
    >
      <div className={styles.avatarContainer}>
        {user ? (
          <>
            <Image
              src={
                user.pic.length > 3
                  ? user.pic
                  : `/images/profile pic/${user.pic}.png`
              }
              objectFit="cover"
              width="320px"
              height="320px"
              className={styles.profilePic}
              alt="User profile Picture"
            />
            {currentUserId ? (
              <div className={styles.editCover}>
                <Image src={editPencil} alt="edit icon" />
              </div>
            ) : (
              ""
            )}
          </>
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

import baseStyles from "../../../styles/browse/profile/profile.module.css";
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
      className={baseStyles.listItemProfile}
      data-id={currentUser}
    >
      <div className={baseStyles.avatarContainer}>
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
              className={baseStyles.profilePic}
              alt="User profile Picture"
            />
            {currentUserId ? (
              <div className={baseStyles.editCover}>
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
      <span className={baseStyles.nameContain}>
        <p className={baseStyles.name}>{user ? user.name : ""}</p>
      </span>
    </li>
  );
}

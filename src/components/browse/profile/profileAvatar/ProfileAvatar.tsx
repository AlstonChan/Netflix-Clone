// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "../profile.module.scss";
import editPencil from "@/public/images/icons/misc/edit-pencil.svg";

import Image from "@chan_alston/image";
import { fill } from "@/styles/cssStyle";

import type { EditUserIdType } from "@/pages/manageProfile";

interface ProfileAvatarType {
  user: any;
  currentUser: string;
  switchPage: ((name: string) => void) | null;
  editUser: ((name: EditUserIdType) => void) | null;
}

export default function ProfileAvatar(props: ProfileAvatarType) {
  const { user, currentUser, switchPage, editUser } = props;

  const ifEditUserExists =
    editUser !== null
      ? () => editUser(currentUser)
      : () => {
          throw new Error("editUser doesn't exists!");
        };

  const ifSwitchPageExists =
    switchPage !== null
      ? () => switchPage(currentUser)
      : () => {
          throw new Error("switchPage doesn't exists!");
        };

  const editHandler = !!editUser ? ifEditUserExists : ifSwitchPageExists;

  const imageSrc =
    user.pic.length > 3 ? user.pic : `/images/profile-pic/${user.pic}.png`;

  return (
    <li
      tabIndex={1}
      onClick={editHandler}
      className={styles.listItemProfile}
      data-id={currentUser}
    >
      <div className={styles.avatarContainer}>
        {user && (
          <>
            <Image
              src={imageSrc}
              w="320px"
              h="320px"
              className={styles.profilePic}
              alt="User profile"
              style={fill}
            />
            {!!editUser && (
              <div className={styles.editCover}>
                <Image src={editPencil} alt="edit icon" responsive={false} />
              </div>
            )}
          </>
        )}
      </div>
      <span className={styles.name}>
        <p className={styles.txt}>{user && user.name}</p>
      </span>
    </li>
  );
}

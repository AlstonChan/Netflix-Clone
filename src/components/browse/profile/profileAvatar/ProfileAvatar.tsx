// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import baseStyles from "../profile.module.scss";
import editPencil from "@/public/images/icons/misc/edit-pencil.svg";

import Image from "@chan_alston/image";
import { fill } from "@/styles/cssStyle";

import type { EditUserIdType } from "@/pages/manageProfile";

interface ProfileAvatarType {
  user: any;
  currentUser: string;
  editUserId: EditUserIdType;
  switchPage: ((name: string) => void) | null;
  editUser: ((name: EditUserIdType) => void) | null;
}

export default function ProfileAvatar(props: ProfileAvatarType) {
  const { user, currentUser, editUserId, switchPage, editUser } = props;

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

  const editHandler = editUserId ? ifEditUserExists : ifSwitchPageExists;

  return (
    <li
      tabIndex={1}
      onClick={editHandler}
      className={baseStyles.listItemProfile}
      data-id={currentUser}
    >
      <div className={baseStyles.avatarContainer}>
        {user && (
          <>
            <Image
              src={
                user.pic.length > 3
                  ? user.pic
                  : `/images/profile pic/${user.pic}.png`
              }
              w="320px"
              h="320px"
              className={baseStyles.profilePic}
              alt="User profile"
              style={fill}
            />
            {editUserId && (
              <div className={baseStyles.editCover}>
                <Image src={editPencil} alt="edit icon" responsive={false} />
              </div>
            )}
          </>
        )}
      </div>
      <span className={baseStyles.nameContain}>
        <p className={baseStyles.name}>{user ? user.name : ""}</p>
      </span>
    </li>
  );
}

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./profileSetting.module.scss";

import { useEffect, useState } from "react";

import UserBar from "./UserBar";

import type { DocumentData } from "firebase/firestore";

interface ProfileSettingProps {
  userData: DocumentData;
}

export default function ProfileSetting({ userData }: ProfileSettingProps) {
  const [users, setUsers] = useState<number[] | null>(null);

  useEffect(() => {
    if (userData) {
      const tempArr: number[] = [];
      for (let x = 0; x < 4; x++) {
        if (userData[`user-sec${x}`]) {
          tempArr.push(x);
        }
      }
      setUsers(tempArr);
    }
  }, [userData]);

  return (
    <div className={styles.container}>
      <hr className={`${styles.divider} ${styles.invert}`} />
      <section className={styles.content}>
        <div className={styles.left}>
          <h2 className={styles.title}>PROFILE</h2>
        </div>
        <div className={styles.right}>
          <UserBar userData={userData["user-main"]} currentUser="user-main" />
          {users &&
            users.map((user, index) => {
              return (
                <div key={index}>
                  <hr className={`${styles.divider} ${styles.always}`} />
                  <UserBar
                    userData={userData[`user-sec${user}`]}
                    currentUser={`user-sec${user}`}
                  />
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}

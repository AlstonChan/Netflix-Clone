import styles from "@/styles/yourAccount/yourAccount.module.css";

import { useEffect, useState } from "react";

import UserBar from "./UserBar";

export default function ProfileSetting({ userData }) {
  const [users, setUsers] = useState(false);

  useEffect(() => {
    if (userData) {
      const tempArr = [];
      for (let x = 0; x < 4; x++) {
        if (userData[`user-sec${x}`]) {
          tempArr.push(x);
        }
      }
      setUsers(tempArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.subHeaders}>PROFILE</h2>
      </div>
      <div className={styles.contentContainer}>
        <UserBar userData={userData["user-main"]} currentUser="user-main" />
        {userData && users
          ? users.map((user, index) => {
              return (
                <div key={index}>
                  <hr className={styles.divider} />
                  <UserBar
                    userData={userData[`user-sec${user}`]}
                    currentUser={`user-sec${user}`}
                  />
                </div>
              );
            })
          : ""}
      </div>
    </section>
  );
}

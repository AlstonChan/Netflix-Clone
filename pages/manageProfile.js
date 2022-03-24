import baseStyles from "../styles/browse/profile/profile.module.css";

import Image from "next/image";

import { useState } from "react";

import AddProfile from "../components/browse/profile/addProfile";
import MainProfile from "../components/browse/profile/mainProfile";
import EditProfile from "../components/browse/profile/editProfile";

export default function ManageProfile({ addProfile }) {
  const [currentUserId, setCurrentUserId] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  function addProfile() {
    setProfileModal(true);
  }

  function changeEdit(currentUser) {
    setCurrentUserId(currentUser);
  }

  return (
    <div className={baseStyles.container}>
      <header className={baseStyles.header}>
        <div className={baseStyles.imgLogo}>
          <Image
            src="/images/NetflixLogo.png"
            width="150px"
            height="40.875px"
            alt="netflix logo"
          />
        </div>
      </header>
      <main className={baseStyles.main}>
        <div className={baseStyles.divContainer}>
          {currentUserId ? (
            <EditProfile
              currentUserId={currentUserId}
              back={setCurrentUserId}
            />
          ) : profileModal ? (
            <AddProfile back={setProfileModal} />
          ) : (
            <MainProfile
              title="Manage Profiles:"
              extBtn="Done"
              currentUserId
              changeEdit={changeEdit}
              addProfile={addProfile}
            />
          )}
        </div>
      </main>
    </div>
  );
}

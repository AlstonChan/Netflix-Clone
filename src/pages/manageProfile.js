import baseStyles from "@/styles/browse/profile/profile.module.css";
import NetflixLogo from "@/public/images/logo.png";

import Image from "next/image";
import Head from "next/head";

import { useState } from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";

import AddProfile from "@/components/browse/profile/AddProfile";
import MainProfile from "@/components/browse/profile/MainProfile";
import EditProfile from "@/components/browse/profile/EditProfile";
import Loader from "@/components/Loader";

export function ManageProfile({ addProfile }) {
  const [currentUserId, setCurrentUserId] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  function addProfile() {
    setProfileModal(true);
  }

  function changeEdit(currentUser) {
    setCurrentUserId(currentUser);
  }

  return (
    <>
      <Head>
        <title>Netflix Clone - Manage Profile</title>
      </Head>

      <div className={baseStyles.container}>
        <header className={baseStyles.header}>
          <Image
            src={NetflixLogo}
            alt="netflix logo"
            width="160"
            height="43.6"
          />
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
    </>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(ManageProfile);

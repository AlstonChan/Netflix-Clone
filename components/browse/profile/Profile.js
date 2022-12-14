import baseStyles from "@/styles/browse/profile/profile.module.css";
import NetflixLogo from "@/public/images/logo.png";

import Image from "next/image";
import Head from "next/head";

import { useState } from "react";

import MainProfile from "./MainProfile";
import AddProfile from "./AddProfile";

export default function Profile({ switchPage }) {
  const [profileModal, setProfileModal] = useState(false);
  function addProfile() {
    setProfileModal(true);
  }

  return (
    <>
      <Head>
        <title>Netflix Clone - Profile</title>
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
            {profileModal ? (
              <AddProfile back={setProfileModal} />
            ) : (
              <MainProfile
                title={"Who's watching?"}
                switchPage={switchPage}
                addProfile={addProfile}
                currentUserId={false}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

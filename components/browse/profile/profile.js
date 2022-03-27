import baseStyles from "../../../styles/browse/profile/profile.module.css";

import Image from "next/image";
import Head from "next/head";

import { useState } from "react";

import MainProfile from "./mainProfile";
import AddProfile from "./addProfile";

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

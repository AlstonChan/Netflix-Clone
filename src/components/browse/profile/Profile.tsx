// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./profile.module.scss";

import Head from "next/head";
import dynamic from "next/dynamic";

import { useState, Suspense } from "react";

import Header from "@/components/common/header/Header";
import UserProfile from "./userProfile/UserProfile";
import Loader from "@/components/common/Loader/Loader";

const AddProfile = dynamic(
  () => import("@/components/browse/profile/addProfile/AddProfile"),
  { suspense: true }
);

interface ProfileProps {
  switchPage: (name: string) => void;
}

export default function Profile({ switchPage }: ProfileProps) {
  const [addNewProfile, setAddNewProfile] = useState<boolean>(false);

  function addProfile() {
    setAddNewProfile(true);
  }

  return (
    <>
      <Head>
        <title>Profile | Netflix-Clone</title>
        <meta name="title" content="Profile | Netflix-Clone" key="title" />
      </Head>

      <div className={styles.container}>
        <Header signInBox={false} />
        <main className={styles.main}>
          {addNewProfile ? (
            <Suspense fallback={<Loader />}>
              <AddProfile setAddNewProfile={setAddNewProfile} />
            </Suspense>
          ) : (
            <UserProfile
              title="Who's watching?"
              addProfile={addProfile}
              switchPage={switchPage}
              editUser={null}
            />
          )}
        </main>
      </div>
    </>
  );
}

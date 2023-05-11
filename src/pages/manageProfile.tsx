// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import baseStyles from "@/components/browse/profile/profile.module.scss";

import Head from "next/head";

import { useState } from "react";

import Header from "@/components/common/header/Header";
import AddProfile from "@/components/browse/profile/addProfile/AddProfile";
import UserProfile from "@/components/browse/profile/userProfile/UserProfile";
import EditProfile from "@/components/browse/profile/editProfile/EditProfile";

export type EditUserIdType = string | null;

export default function ManageProfile() {
  const [editUserId, setEditUserId] = useState<EditUserIdType>(null);
  const [addNewProfile, setAddNewProfile] = useState(false);

  function addProfile() {
    setAddNewProfile(true);
  }

  return (
    <>
      <Head>
        <title>Netflix Clone - Manage Profile</title>
      </Head>

      <div className={baseStyles.container}>
        <Header signInBox={false} />
        <main className={baseStyles.main}>
          {editUserId ? (
            <EditProfile
              editUserId={editUserId}
              setEditUserId={setEditUserId}
            />
          ) : addNewProfile ? (
            <AddProfile setAddNewProfile={setAddNewProfile} />
          ) : (
            <UserProfile
              title="Manage Profiles:"
              editUserId={editUserId}
              addProfile={addProfile}
              switchPage={null}
              editUser={setEditUserId}
            />
          )}
        </main>
      </div>
    </>
  );
}

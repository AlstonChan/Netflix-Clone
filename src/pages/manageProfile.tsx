// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import baseStyles from "@/components/browse/profile/profile.module.scss";

import dynamic from "next/dynamic";
import Head from "next/head";

import { Suspense, useState } from "react";

import Header from "@/components/common/header/Header";
import UserProfile from "@/components/browse/profile/userProfile/UserProfile";
import Loader from "@/components/Loader";
import ProtectedArea from "@/components/layout/ProtectedArea";

const EditProfile = dynamic(
  () => import("@/components/browse/profile/editProfile/EditProfile"),
  { suspense: true }
);
const AddProfile = dynamic(
  () => import("@/components/browse/profile/addProfile/AddProfile"),
  { suspense: true }
);

import type { ReactElement } from "react";

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
        <title>Manage Profile | Netflix-Clone</title>
        <meta
          name="title"
          content="Manage Profile | Netflix-Clone"
          key="title"
        />
      </Head>

      <div className={baseStyles.container}>
        <Header signInBox={false} />
        <main className={baseStyles.main}>
          {editUserId ? (
            <Suspense fallback={<Loader />}>
              <EditProfile
                editUserId={editUserId}
                setEditUserId={setEditUserId}
              />
            </Suspense>
          ) : addNewProfile ? (
            <Suspense fallback={<Loader />}>
              <AddProfile setAddNewProfile={setAddNewProfile} />
            </Suspense>
          ) : (
            <UserProfile
              title="Manage Profiles:"
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

ManageProfile.getLayout = (page: ReactElement) => {
  return <ProtectedArea>{page}</ProtectedArea>;
};

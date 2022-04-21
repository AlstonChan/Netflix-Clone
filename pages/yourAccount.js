import styles from "../styles/yourAccount.module.css";
import stylesSpin from "../styles/loader.module.css";
import Spinner from "../public/images/browse/spinner.png";

import Head from "next/head";
import Image from "next/image";

import { withAuthUser, AuthAction } from "next-firebase-auth";
import { useContext } from "react";
import { UserContext } from "./_app";

import Loader from "../components/Loader";
import Header from "../components/Header";
import FooterStyle2 from "../components/footer/FooterStyle2";
import Membership from "../components/yourAccount/Membership";
import PlanDetails from "../components/yourAccount/PlanDetails";
import ProfileSetting from "../components/yourAccount/ProfileSetting";
import AccountHeader from "../components/yourAccount/AccountHeader";

export function YourAccount() {
  const { user, userData } = useContext(UserContext);

  console.log(userData);

  return (
    <>
      <Head>
        <title>Netflix Clone - Account Setting</title>
      </Head>
      <main className={styles.main}>
        <div style={{ backgroundColor: "#000" }}>
          <AccountHeader />
        </div>
        <article className={styles.centerContent}>
          {userData && user ? (
            <>
              <section className={styles.headings}>
                <h2 className={styles.mainHeaders}>Account</h2>
                <div className={styles.memContainer}>
                  <p className={styles.memberSince}>
                    Member Since {userData.createdAt}
                  </p>
                </div>
              </section>
              <hr className={styles.divider} />
              <Membership user={user} />
              <hr className={styles.divider} />
              <PlanDetails userData={userData} />
              <hr className={styles.divider} />
              <ProfileSetting userData={userData} />
            </>
          ) : (
            <main className={stylesSpin.mainLoader}>
              <div className={stylesSpin.profilePicCenter}>
                <div className={stylesSpin.spinnerContain}>
                  <Image src={Spinner} alt="loading spinner" />
                </div>
              </div>
            </main>
          )}
        </article>
        <div className={styles.footer}>
          <FooterStyle2 />
        </div>
      </main>
    </>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(YourAccount);

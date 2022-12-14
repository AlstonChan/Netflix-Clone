import styles from "@/styles/yourAccount/password.module.css";
import accountStyles from "@/styles/yourAccount/yourAccount.module.css";

import Head from "next/head";
import Link from "next/link";

import { withAuthUser, AuthAction } from "next-firebase-auth";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { UserContext } from "@/pages/_app";

import Loader from "@/components/Loader";
import InputPassword from "@/components/login/InputPassword";
import FooterStyle2 from "@/components/footer/FooterStyle2";
import AccountHeader from "@/components/yourAccount/AccountHeader";
import PasswordModal from "@/components/yourAccount/PasswordModal";
import AccountLoader from "@/components/yourAccount/AccountLoader";
import { AnimatePresence } from "framer-motion";

export function Password() {
  const { user, userData } = useContext(UserContext);
  const [inputWarn, setInputWarn] = useState({
    name: "current",
    state: false,
    err: "none",
  });
  const [inputWarnNew, setInputWarnNew] = useState({
    name: "new",
    state: false,
  });
  const [updateStatus, setUpdateStatus] = useState(null);
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    let cuPass = currentPassword.current.value;
    let newPass = newPassword.current.value;
    let conPass = confirmPassword.current.value;
    const providers = [];
    user.providerData.forEach((provider) => {
      providers.push(provider.providerId);
    });
    try {
      if (cuPass.length > 0) {
        if (newPass.length >= 6 && newPass.length <= 60) {
          if (newPass === conPass) {
            if (providers.includes("password")) {
              const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword.current.value
              );
              reauthenticateWithCredential(user, credential)
                .then(() => {
                  updatePassword(user, newPassword.current.value).then(() => {
                    setUpdateStatus("success");
                    cuPass = "";
                    newPass = "";
                    conPass = "";
                  });
                })
                .catch(() => {
                  currentPassword.current.focus();
                  if (error.message.includes("auth/wrong-password")) {
                    setInputWarn({
                      name: "current",
                      state: true,
                      err: "auth/wrong-password",
                    });
                  }
                  if (error.message.includes("auth/too-many-requests")) {
                    setInputWarn({
                      name: "current",
                      state: true,
                      err: "auth/too-many-requests",
                    });
                  }
                });
            }
          }
        } else {
          newPassword.current.focus();
          setInputWarnNew({
            name: "new",
            state: true,
          });
        }
      }
    } catch (error) {
      currentPassword.current.focus();
      if (error.message.includes("auth/wrong-password")) {
        setInputWarn({
          name: "current",
          state: true,
          err: "auth/wrong-password",
        });
      }
      if (error.message.includes("auth/too-many-requests")) {
        setInputWarn({
          name: "current",
          state: true,
          err: "auth/too-many-requests",
        });
      }
    }
  };

  if (updateStatus === "success") {
    setTimeout(() => setUpdateStatus(null), 5000);
  }

  return (
    <>
      <Head>
        <title>Netflix Clone - Account Setting</title>
      </Head>

      <main className={accountStyles.main}>
        <div style={{ backgroundColor: "#000" }}>
          <AccountHeader />
        </div>
        <article className={accountStyles.centerContent}>
          <div style={{ maxWidth: "500px" }}>
            {userData && user ? (
              <>
                <section className={accountStyles.headings}>
                  <h2 className={accountStyles.mainHeaders}>Change Password</h2>
                </section>
                <br />
                <form onSubmit={(e) => handleForm(e)}>
                  <InputPassword
                    setRef={currentPassword}
                    inputId="currentP"
                    mode="light"
                    label="Current Password"
                    warnings="Incorrect Password"
                    warningsRef={inputWarn}
                    caption="Forgot password?"
                  />
                  <br />
                  <InputPassword
                    setRef={newPassword}
                    inputId="newP"
                    mode="light"
                    warningsRef={inputWarnNew}
                    label="New password (6-60 characters)"
                  />
                  <br />
                  <InputPassword
                    setRef={confirmPassword}
                    inputId="confirmP"
                    mode="light"
                    warningsRef={{ name: "confirm" }}
                    label="Confirm new password"
                    warnings="Your password does not match"
                    matchPass={newPassword}
                  />
                  <br />
                  <div className={styles.buttonGroup}>
                    <button className={styles.saveBtn} type="submit">
                      <span className={styles.btnContent}>Save</span>
                    </button>
                    <Link className={styles.cancelBtn} href="/yourAccount">
                      Cancel
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <AccountLoader />
            )}
          </div>
          <AnimatePresence>
            {updateStatus === "success" && (
              <PasswordModal content="Password Updated" />
            )}
          </AnimatePresence>
        </article>
        <FooterStyle2 />
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
})(Password);

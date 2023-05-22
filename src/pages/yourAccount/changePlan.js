import styles from "@/styles/yourAccount/changePlan.module.css";
import passwordStyles from "@/styles/yourAccount/password.module.css";
import baseStyles from "@/styles/yourAccount/yourAccount.module.css";
import loginStyles from "@/styles/login.module.scss";

import Head from "next/head";
import Link from "next/link";

import { useEffect, useState } from "react";
import useUserData from "src/hooks/firestore/useUserData";
import useAuthState from "src/hooks/useAuthState";

import FooterStyle2 from "@/components/footer/FooterStyle2";
import StreamPlanBar from "@/components/yourAccount/StreamPlanBar";
import PlanConfirmModal from "@/components/yourAccount/PlanConfirmModal";
import AccountHeader from "@/components/yourAccount/AccountHeader";
import AccountLoader from "@/components/yourAccount/AccountLoader";

export default function ChangePlan() {
  const [user, isLoading, error] = useAuthState();
  const [userData, dbError] = useUserData();
  const [chosenBar, setChosenBar] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const selectBar = (selectedPackage) => {
    setChosenBar(selectedPackage);
  };

  useEffect(() => {
    if (userData) setChosenBar(userData.plan);
  }, [userData]);

  const confirmModal = () => {
    if (userData.plan === chosenBar) return;
    setConfirmationModal(true);
  };

  const planDetails = [
    {
      plan: "Mobile",
      desc: "Good video quality in SD (480p). Watch on any phone or tablet. Computer and TV not included.",
      fee: "RM17/month",
    },
    {
      plan: "Basic",
      desc: "Good video quality in SD (480p). Watch on any phone, tablet, computer or TV. ",
      fee: "RM35/month",
    },
    {
      plan: "Standard",
      desc: "Great video quality in Full HD (1080p). Watch on any phone, tablet, computer or TV. ",
      fee: "RM45/month",
    },
    {
      plan: "Premium",
      desc: "Our best video quality in Ultra HD (4K) and HDR. Watch on any phone, tablet, computer or TV.",
      fee: "RM55/month",
    },
  ];

  return (
    <>
      <Head>
        <title>Netflix Clone - Account Setting</title>
      </Head>

      {confirmationModal ? (
        <PlanConfirmModal
          planDetails={planDetails}
          currentPlan={userData.plan}
          plan={chosenBar}
          open={setConfirmationModal}
          user={user}
        />
      ) : (
        ""
      )}
      <main
        className={baseStyles.main}
        style={confirmationModal ? { overflow: "hidden" } : {}}
      >
        <div style={{ backgroundColor: "#000" }}>
          <AccountHeader />
        </div>

        <article className={baseStyles.centerContent}>
          {userData && user ? (
            <>
              <section className={baseStyles.headings}>
                <h2 className={baseStyles.mainHeaders}>
                  Change Streaming Plan
                </h2>
              </section>
              <ul className={styles.listContainer}>
                {planDetails.map((plan, index) => {
                  return (
                    <StreamPlanBar
                      plan={plan.plan}
                      desc={plan.desc}
                      fee={plan.fee}
                      selected={chosenBar}
                      currentPlan={userData.plan}
                      selectBar={selectBar}
                      key={index}
                    />
                  );
                })}
              </ul>
              <p className={loginStyles.captchaTerm} style={{ color: "#000" }}>
                HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
                subject to your internet service and device capabilities. Not
                all content is available in all resolutions. See our{" "}
                <span
                  className={loginStyles.captchLink}
                  style={{ cursor: "pointer" }}
                >
                  Terms of Use&nbsp;
                </span>
                for more details.
              </p>
              <p className={loginStyles.captchaTerm} style={{ color: "#000" }}>
                Only people who live with you may use your account. Watch on 4
                different devices at the same time with Premium, 2 with Standard
                and 1 with Basic.
              </p>
              <div className={styles.btnGroup}>
                <div className={passwordStyles.buttonGroup}>
                  <button
                    className={passwordStyles.saveBtn}
                    onClick={confirmModal}
                    style={
                      userData.plan === chosenBar
                        ? { cursor: "default", opacity: "0.5" }
                        : {}
                    }
                  >
                    <span className={passwordStyles.btnContent}>Continue</span>
                  </button>
                  <Link
                    href="/yourAccount"
                    className={passwordStyles.cancelBtn}
                  >
                    Go Back
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <AccountLoader />
          )}
        </article>
        <FooterStyle2 />
      </main>
    </>
  );
}

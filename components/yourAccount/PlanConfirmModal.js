import styles from "../../styles/yourAccount/changePlan.module.css";
import passwordStyles from "../../styles/yourAccount/password.module.css";
import CancelSvg from "../icons/CancelSvg";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function PlanConfirmModal({
  planDetails,
  plan,
  currentPlan,
  open,
  user,
}) {
  const updatePlan = async () => {
    await updateDoc(doc(db, "Acc", user.uid), {
      plan,
    });
    open(false);
  };
  return (
    <div className={styles.modalBack}>
      <div className={styles.modalBox}>
        <div className={styles.cancelBtnContainer} onClick={() => open(false)}>
          <CancelSvg stColor="#222" />
        </div>
        <header className={styles.modalHeader}>
          <h1>Change Steraming Plan</h1>
        </header>
        <main className={styles.modalMain}>
          <section className={styles.planSection}>
            <h4 className={styles.sectionHead}>CURRENT PLAN:</h4>
            <p className={styles.modalPlanDesc}>
              {currentPlan}{" "}
              {planDetails.map((planDetail) => {
                if (planDetail.plan === currentPlan) {
                  return planDetail.fee;
                }
              })}
            </p>
          </section>
          <section className={styles.planSection}>
            <h4 className={styles.sectionHeadNew}>NEW PLAN:</h4>
            <p className={styles.modalPlanDescNew}>
              {plan}{" "}
              {planDetails.map((planDetail) => {
                if (planDetail.plan === plan) {
                  return planDetail.fee;
                }
              })}
            </p>
          </section>
        </main>
        <footer className={styles.modalFooter}>
          <div className={styles.btnGroupEnd}>
            <div
              className={passwordStyles.buttonGroup}
              style={{ width: "300px" }}
            >
              <button className={passwordStyles.saveBtn} onClick={updatePlan}>
                <span
                  className={passwordStyles.btnContent}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Confirm Changes
                </span>
              </button>
              <button
                className={passwordStyles.cancelBtn}
                onClick={() => open(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

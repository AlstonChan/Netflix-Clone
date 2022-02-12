import styles from "../../../styles/Home/cardFaq.module.css";
import Accordion from "./accordion";
import EmailInput from "../featured/input";
import { useState } from "react";

export default function CardFaq() {
  const [emailBtnMouseClass, setEmailBtnMouseClass] = useState(
    `netflixBtn ${styles.getStartedBtn}`
  );

  function handleMouse(e) {
    if (e.type === "mousedown") {
      setEmailBtnMouseClass(
        `netflixBtn ${styles.getStartedBtn} ${styles.getStartedBtnMouse}`
      );
    } else if (e.type === "mouseup" || e.type === "mouseleave") {
      setEmailBtnMouseClass(`netflixBtn ${styles.getStartedBtn}`);
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.shell}>
        <h1 className={styles.sectionHead}>Frequently Asked Questions</h1>
        <Accordion />
        <form
          action=""
          autoComplete="on"
          name="emailInput"
          onSubmit={(e) => handleFormSubmit(e)}
          className={styles.flexForm}
        >
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className={styles.faqForm}>
            <EmailInput inputId={"_id_faqInput"} />
            <div className={styles.buttonContain}>
              <button
                type="submit"
                className={emailBtnMouseClass}
                onMouseDown={(e) => handleMouse(e)}
                onMouseUp={(e) => handleMouse(e)}
                onMouseLeave={(e) => handleMouse(e)}
              >
                Get Started &nbsp;
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

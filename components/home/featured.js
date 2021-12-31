import { useState, useRef } from "react";
import styles from "../../styles/featured.module.css";

import Header from "../header";

export default function Featured() {
  const [emailInputLabelClass, setEmailInputLabelClass] = useState(
    styles.emailInputLabel
  );
  const [emailInput, setEmailInput] = useState({
    class: styles.emailInput,
    warnings: "",
  });
  const [emailBtnMouseClass, setEmailBtnMouseClass] = useState(
    `netflixBtn ${styles.getStartedBtn}`
  );
  const emailInputRef = useRef();

  function handleMouse(e) {
    if (e.type === "mousedown") {
      setEmailBtnMouseClass(
        `netflixBtn ${styles.getStartedBtn} ${styles.getStartedBtnMouse}`
      );
    } else if (e.type === "mouseup" || e.type === "mouseleave") {
      setEmailBtnMouseClass(`netflixBtn ${styles.getStartedBtn}`);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(emailInputRef.current.value);
  }
  function checkEmailInput(val) {
    const valLength = val?.length ?? 0;
    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valLength == 0) return;
    if (valLength <= 4) {
      setEmailInput({
        class: `${styles.emailInput} ${styles.emailWarnBorder}`,
        warnings: "Email is required!",
      });
    } else if (!val.match(regexValidateEmail)) {
      setEmailInput({
        class: `${styles.emailInput} ${styles.emailWarnBorder}`,
        warnings: "Please enter a valid email address",
      });
    } else {
      setEmailInput({
        class: `${styles.emailInput}`,
        warnings: "",
      });
    }
  }

  function handleInputClick(e) {
    const val = emailInputRef.current._valueTracker.getValue();
    console.log(e.type);
    if (e.type === "change") {
      checkEmailInput(val);
    } else if (e.type === "focus") {
      setEmailInputLabelClass(
        `${styles.emailInputLabel} ${styles.emailInputLabelMove}`
      );
    } else if (val !== "") {
      return;
    } else if (e.type === "blur") {
      setEmailInputLabelClass(`${styles.emailInputLabel}`);
    }
  }
  return (
    <>
      <section className={styles.headFea}>
        <div className={styles.shadeFea}>
          <Header />
          <div className={styles.headFeaContain}>
            <h1 className={styles.feaTitle}>
              Unlimited movies, TV shows, and more.
            </h1>
            <p className={styles.feaDesc}>Watch anywhere. Cancel anytime.</p>
            <p className={styles.feaDescSmall}>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form
              action=""
              autoComplete="on"
              name="emailInput"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <div className={styles.inputContain}>
                <input
                  type="email"
                  name="emailInput"
                  id="id_emailInput"
                  maxLength="50"
                  className={emailInput.class}
                  ref={emailInputRef}
                  onFocus={(e) => handleInputClick(e)}
                  onBlur={(e) => handleInputClick(e)}
                  onChange={(e) => handleInputClick(e)}
                />
                <label htmlFor="id_emailInput" className={emailInputLabelClass}>
                  Email address
                </label>
              </div>
              <p className={styles.emailWarn}>{emailInput.warnings}</p>
              <button
                type="submit"
                className={emailBtnMouseClass}
                onMouseDown={(e) => handleMouse(e)}
                onMouseUp={(e) => handleMouse(e)}
                onMouseLeave={(e) => handleMouse(e)}
              >
                Get Started &nbsp;
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

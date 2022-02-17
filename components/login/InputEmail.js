import { useState, useEffect } from "react";
import styles from "../../styles/login.module.css";
import signUpStyles from "../../styles/signup/signup.module.css";

export default function Input({ setRef, inputId, page }) {
  //Placeholder for input, move up when focus or a value is enter
  //move down when blur, but only if value is ''
  const [emailInputLabelClass, setEmailInputLabelClass] = useState(
    styles.emailInputLabel
  );

  //Set warning about user email input and toggle the warning presence
  const [emailInput, setEmailInput] = useState({
    class: page == "LoginForm" ? styles.emailInput : signUpStyles.emailInput,
    warnings: "",
  });

  //Ensure that upon page refresh, email input will be cleared
  //and reset the state of emailInputLabelClass
  useEffect(() => {
    setRef.current.value = "";
    handleInputClick({ type: "blur" });
  }, []);

  function checkEmailInput(val) {
    const valLength = val?.length ?? 0;
    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valLength == 0) return;
    if (valLength <= 4) {
      setEmailInput({
        class:
          page == "LoginForm"
            ? `${styles.emailInput} ${styles.emailWarnBorder}`
            : `${signUpStyles.emailInput} ${signUpStyles.emailWarnBorder}`,
        warnings:
          page == "LoginForm"
            ? "Email is required!"
            : "Email should be between 5 and 50 characters.",
      });
    } else if (!val.match(regexValidateEmail)) {
      setEmailInput({
        class:
          page == "LoginForm"
            ? `${styles.emailInput} ${styles.emailWarnBorder}`
            : `${signUpStyles.emailInput} ${signUpStyles.emailWarnBorder}`,
        warnings: "Please enter a valid email address",
      });
    } else {
      setEmailInput({
        class:
          page == "LoginForm" ? styles.emailInput : signUpStyles.emailInput,
        warnings: "",
      });
    }
  }

  function handleInputClick(e) {
    const val = setRef.current._valueTracker.getValue();
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

  return page == "LoginForm" ? (
    <div className={styles.inputContainAll}>
      <div className={styles.inputContain}>
        <input
          type="email"
          name="emailInput"
          autoComplete="true"
          dir="lft"
          tabIndex={0}
          maxLength="50"
          id={inputId}
          className={emailInput.class}
          ref={setRef}
          onFocus={(e) => handleInputClick(e)}
          onBlur={(e) => handleInputClick(e)}
          onChange={(e) => handleInputClick(e)}
        />
        <label htmlFor={inputId} className={emailInputLabelClass}>
          Email
        </label>
      </div>
      <p className={styles.emailWarn}>{emailInput.warnings}</p>
    </div>
  ) : (
    <div className={styles.inputContainAll}>
      <div className={styles.inputContain}>
        <input
          type="email"
          name="emailInput"
          autoComplete="true"
          dir="lft"
          tabIndex={0}
          maxLength="50"
          id={inputId}
          className={emailInput.class}
          ref={setRef}
          onFocus={(e) => handleInputClick(e)}
          onBlur={(e) => handleInputClick(e)}
          onChange={(e) => handleInputClick(e)}
        />
        <label htmlFor={inputId} className={emailInputLabelClass}>
          Email
        </label>
      </div>
      <p className={signUpStyles.emailWarn}>{emailInput.warnings}</p>
    </div>
  );
}

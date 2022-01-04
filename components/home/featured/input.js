import { useState, useRef, useEffect } from "react";
import styles from "../../../styles/featured.module.css";

export default function Input({ inputId }) {
  const [emailInputLabelClass, setEmailInputLabelClass] = useState(
    styles.emailInputLabel
  );
  const [emailInput, setEmailInput] = useState({
    class: styles.emailInput,
    warnings: "",
  });

  const emailInputRef = useRef();

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

  useEffect(() => {
    emailInputRef.current.value = "";
    handleInputClick({ type: "blur" });
  }, []);

  function handleInputClick(e) {
    const val = emailInputRef.current._valueTracker.getValue();
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
    } else if (e.type === "clear") {
      setEmailInputLabelClass(`${styles.emailInputLabel}`);
    }
  }

  return (
    <div className={styles.inputContainAll}>
      <div className={styles.inputContain}>
        <input
          type="email"
          name="emailInput"
          maxLength="50"
          id={inputId}
          className={emailInput.class}
          ref={emailInputRef}
          onFocus={(e) => handleInputClick(e)}
          onBlur={(e) => handleInputClick(e)}
          onChange={(e) => handleInputClick(e)}
        />
        <label htmlFor={inputId} className={emailInputLabelClass}>
          Email address
        </label>
      </div>
      <p className={styles.emailWarn}>{emailInput.warnings}</p>
    </div>
  );
}

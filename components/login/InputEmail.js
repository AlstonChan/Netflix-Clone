import { useState, useRef, useEffect } from "react";
import styles from "../../styles/login.module.css";

export default function Input({ inputId }) {
  const [emailInputLabelClass, setEmailInputLabelClass] = useState(
    styles.emailInputLabel
  );
  const [inputType, setInputType] = useState("tel");
  const [emailInput, setEmailInput] = useState({
    class: styles.emailInput,
    warnings: "",
  });

  const emailInputRef = useRef();

  function checkEmailInput(val) {
    const valLength = val?.length ?? 0;
    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexValidatePhone =
      /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    // if (!val.matchregexValidatePhone){}
    if (valLength == 0) return;
    if (valLength <= 4) {
      setEmailInput({
        class: `${styles.emailInput} ${styles.emailWarnBorder}`,
        warnings: "Please enter a valid email or phone number.",
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
          type={inputType}
          name="emailInput"
          autoComplete="true"
          dir="lft"
          tabIndex={0}
          maxLength="50"
          id={inputId}
          className={emailInput.class}
          ref={emailInputRef}
          onFocus={(e) => handleInputClick(e)}
          onBlur={(e) => handleInputClick(e)}
          onChange={(e) => handleInputClick(e)}
        />
        <label htmlFor={inputId} className={emailInputLabelClass}>
          Email or phone number
        </label>
      </div>
      <p className={styles.emailWarn}>{emailInput.warnings}</p>
    </div>
  );
}

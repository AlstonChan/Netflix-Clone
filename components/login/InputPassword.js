import { useState, useEffect } from "react";
import styles from "../../styles/login.module.css";

export default function Input({ setRef, inputId }) {
  //Placeholder for input, move up when focus or a value is enter
  //move down when blur, but only if value is ''
  const [passInputLabelClass, setPassInputLabelClass] = useState({
    email: styles.emailInputLabel,
    class: `${styles.togglePassword}`,
  });

  //Toggle warning if user input password is too short or too long
  const [passInputWarn, setPassInputWarn] = useState({
    class: styles.emailInput,
    warnings: "",
  });

  //Toggle hide/show password button
  const [togglePassword, setTogglePassword] = useState({
    state: "HIDE",
    type: "password",
  });

  //Ensure that upon page refresh, password input will be cleared
  //and reset the state of passInputLabelClass
  useEffect(() => {
    setRef.current.value = "";
    handleInputClick({ type: "blur" });
  }, []);

  function toggleClick() {
    if (togglePassword.state === "SHOW") {
      setTogglePassword({ state: "HIDE", type: "password" });
    } else {
      setTogglePassword({ state: "SHOW", type: "text" });
    }
  }

  function checkEmailInput(val) {
    const valLength = val?.length ?? 0;
    if (valLength == 0) return;
    if (valLength < 6 || valLength > 60) {
      setPassInputWarn({
        class: `${styles.emailInput} ${styles.emailWarnBorder}`,
        warnings: "Your password must contain between 6 and 60 characters.",
      });
    } else {
      setPassInputWarn({
        class: `${styles.emailInput}`,
        warnings: "",
      });
    }
  }

  function handleInputClick(e) {
    const val = setRef.current._valueTracker.getValue();
    if (e.type === "change") {
      checkEmailInput(val);
    } else if (e.type === "focus") {
      setPassInputLabelClass({
        email: `${styles.emailInputLabel} ${styles.emailInputLabelMove}`,
        class: `${styles.show} ${styles.togglePassword}`,
      });
    } else if (e.type === "blur" && val === "") {
      setTogglePassword({ state: "HIDE", type: "password" });
      setPassInputLabelClass({
        email: `${styles.emailInputLabel}`,
        class: `${styles.togglePassword}`,
      });
    } else if (e.type === "blur" && val !== "") {
      setTogglePassword({ state: "HIDE", type: "password" });
    } else if (e.type === "clear") {
      setPassInputLabelClass({
        email: `${styles.emailInputLabel}`,
        class: `${styles.togglePassword}`,
      });
      setTogglePassword({ state: "HIDE", type: "password" });
    }
  }

  return (
    <div className={styles.inputContainAll}>
      <div className={styles.inputContain}>
        <input
          type={togglePassword.type}
          name="passwordInput"
          maxLength="50"
          id={inputId}
          className={passInputWarn.class}
          ref={setRef}
          onFocus={(e) => handleInputClick(e)}
          onBlur={(e) => handleInputClick(e)}
          onChange={(e) => handleInputClick(e)}
        />
        <label htmlFor={inputId} className={passInputLabelClass.email}>
          Password
        </label>
        <div className={passInputLabelClass.class}>
          <div onClick={toggleClick}>
            <span className={styles.hideShowTxt}>{togglePassword.state} </span>
          </div>
        </div>
      </div>
      <p className={styles.emailWarn}>{passInputWarn.warnings}</p>
    </div>
  );
}

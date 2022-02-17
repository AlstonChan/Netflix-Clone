import { useState, useEffect } from "react";
import styles from "../../styles/login.module.css";
import signUpStyles from "../../styles/signup/signup.module.css";

export default function Input({ setRef, inputId, page }) {
  //Placeholder for input, move up when focus or a value is enter
  //move down when blur, but only if value is ''
  const [passInputLabelClass, setPassInputLabelClass] = useState({
    email: styles.emailInputLabel,
    class: styles.togglePassword,
  });

  //Toggle warning if user input password is too short or too long
  const [passInputWarn, setPassInputWarn] = useState({
    class: page == "LoginForm" ? styles.emailInput : signUpStyles.emailInput,
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
        class:
          page == "LoginForm"
            ? `${styles.emailInput} ${styles.emailWarnBorder}`
            : `${signUpStyles.emailInput} ${signUpStyles.emailWarnBorder}`,
        warnings:
          page == "LoginForm"
            ? "Your password must contain between 6 and 60 characters."
            : "Password should be between 6 and 60 characters long.",
      });
    } else {
      setPassInputWarn({
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
      setPassInputLabelClass({
        email: `${styles.emailInputLabel} ${styles.emailInputLabelMove}`,
        class: `${styles.show} ${styles.togglePassword}`,
      });
    } else if (e.type === "blur" && val === "") {
      if (page == "LoginForm")
        setTogglePassword({ state: "HIDE", type: "password" });
      setPassInputLabelClass({
        email: `${styles.emailInputLabel}`,
        class: `${styles.togglePassword}`,
      });
    } else if (e.type === "blur" && val !== "") {
      if (page == "LoginForm")
        setTogglePassword({ state: "HIDE", type: "password" });
    } else if (e.type === "clear") {
      setPassInputLabelClass({
        email: `${styles.emailInputLabel}`,
        class: `${styles.togglePassword}`,
      });
      if (page == "LoginForm")
        setTogglePassword({ state: "HIDE", type: "password" });
    }
  }

  return page == "LoginForm" ? (
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
  ) : (
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
          Add a password
        </label>
      </div>
      <p className={signUpStyles.emailWarn}>{passInputWarn.warnings}</p>
    </div>
  );
}

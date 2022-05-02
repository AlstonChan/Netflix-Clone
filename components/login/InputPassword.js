import styles from "../../styles/emailPassInput.module.css";

import Link from "next/link";

import { useState, useEffect } from "react";

export default function InputPassword({
  setRef,
  inputId,
  mode = "dark",
  showHidePassword = false,
  label,
  warnings,
  warningsRef = null,
  caption,
  matchPass = null,
}) {
  //Placeholder for input, move up when focus or a value is enter
  //move down when blur, but only if value is ''
  const [passInputLabelClass, setPassInputLabelClass] = useState({
    email: styles.inputBoxLabel,
    class: styles.togglePassword,
  });

  //Toggle warning if user input password is too short or too long
  const [passInputWarn, setPassInputWarn] = useState({
    class: mode === "dark" ? styles.darkInputBox : styles.lightInputBox,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkInputRef = () => {
    if (warningsRef.state) {
      if (warningsRef.name === "current") {
        if (warningsRef.err === "auth/wrong-password") {
          setPassInputWarn({
            class:
              mode === "dark"
                ? `${styles.darkInputBox} ${styles.inputBoxWarnBorder}`
                : `${styles.lightInputBox} ${styles.inputBoxWarnBorderSign}`,
            warnings:
              warnings ||
              "Password should be between 6 and 60 characters long.",
          });
        } else if (warningsRef.err === "auth/too-many-requests") {
          setPassInputWarn({
            class:
              mode === "dark"
                ? `${styles.darkInputBox} ${styles.inputBoxWarnBorder}`
                : `${styles.lightInputBox} ${styles.inputBoxWarnBorderSign}`,
            warnings:
              "Account temporary disabled due to too many failed login attempt, try again later.",
          });
        }
      } else if (warningsRef.name === "new") {
        checkPasswordInput(setRef.current._valueTracker.getValue());
      }
    } else {
      setPassInputWarn({
        class: mode === "dark" ? styles.darkInputBox : styles.lightInputBox,
        warnings: "",
      });
    }
  };

  useEffect(() => {
    if (warningsRef !== null) {
      checkInputRef();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warningsRef?.state]);

  function toggleClick() {
    if (togglePassword.state === "SHOW") {
      setTogglePassword({ state: "HIDE", type: "password" });
    } else {
      setTogglePassword({ state: "SHOW", type: "text" });
    }
  }

  function matchPassword() {
    if (matchPass.current.value !== setRef.current.value) {
      setPassInputWarn({
        class:
          mode === "dark"
            ? `${styles.darkInputBox} ${styles.inputBoxWarnBorder}`
            : `${styles.lightInputBox} ${styles.inputBoxWarnBorderSign}`,
        warnings,
      });
    } else {
      setPassInputWarn({
        class: mode === "dark" ? styles.darkInputBox : styles.lightInputBox,
        warnings: "",
      });
    }
  }

  function checkPasswordInput(val) {
    const valLength = val?.length ?? 0;
    if (warningsRef !== null) {
      if (warningsRef.name === "current") return;
      if (warningsRef.name === "confirm") return matchPassword();
    }
    if (valLength == 0) return;
    if (valLength < 6 || valLength > 60) {
      setPassInputWarn({
        class:
          mode === "dark"
            ? `${styles.darkInputBox} ${styles.inputBoxWarnBorder}`
            : `${styles.lightInputBox} ${styles.inputBoxWarnBorderSign}`,
        warnings:
          warnings || "Password should be between 6 and 60 characters long.",
      });
    } else {
      setPassInputWarn({
        class: mode === "dark" ? styles.darkInputBox : styles.lightInputBox,
        warnings: "",
      });
    }
  }

  function handleInputClick(e) {
    const val = setRef.current._valueTracker.getValue();
    if (e.type === "change") {
      if (warnings === "none") return;
      checkPasswordInput(val);
    } else if (e.type === "focus") {
      setPassInputLabelClass({
        email: `${styles.inputBoxLabel} ${styles.inputBoxLabelMove}`,
        class: `${styles.show} ${styles.togglePassword}`,
      });
    } else if (e.type === "blur" && val === "") {
      if (showHidePassword)
        setTogglePassword({ state: "HIDE", type: "password" });
      setPassInputLabelClass({
        email: `${styles.inputBoxLabel}`,
        class: `${styles.togglePassword}`,
      });
    } else if (e.type === "blur" && val !== "") {
      if (showHidePassword)
        setTogglePassword({ state: "HIDE", type: "password" });
    } else if (e.type === "clear") {
      setPassInputLabelClass({
        email: `${styles.inputBoxLabel}`,
        class: `${styles.togglePassword}`,
      });
      if (showHidePassword)
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
          {label || "Password"}
        </label>
        {showHidePassword ? (
          <div className={passInputLabelClass.class}>
            <div onClick={toggleClick}>
              <span className={styles.hideShowTxt}>
                {togglePassword.state}{" "}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <p
        className={
          mode === "dark" ? styles.inputBoxWarn : styles.inputBoxWarnSign
        }
      >
        {passInputWarn.warnings}{" "}
        <span className={styles.caption}>
          <Link href="/yourAccount/loginHelp">
            <a>{caption}</a>
          </Link>
        </span>
      </p>
    </div>
  );
}

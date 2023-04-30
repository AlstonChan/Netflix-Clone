// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./Input.module.scss";

import Link from "next/link";

import { useState, useEffect, forwardRef } from "react";

import type { HandleInputClickEvent } from "../types";

interface PasswordInputProps {
  inputId: string;
  mode: "dark" | "light";
  showHidePassword: boolean;
  warningsRef?: {
    name: string;
    state: boolean;
    err: string;
  };
  label?: string;
  caption?: string;
  warnings?: string | "none";
  matchPass?: any;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const {
      inputId,
      mode = "dark",
      showHidePassword = false,
      label,
      warnings,
      warningsRef = null,
      caption,
      matchPass = false,
    } = props;
    //Placeholder for input, move up when focus or a value is enter
    //move down when blur, but only if value is ''
    const [moveInputLabel, setMoveInputLabel] = useState<boolean>(false);

    //Toggle warning if user input password is too short or too long
    const [inputWarnMsg, setInputWarnMsg] = useState<string>("");

    //Toggle hide/show password button
    type TogglePasswordType = {
      state: "HIDE" | "SHOW";
      type: "password" | "text";
    };
    const [togglePassword, setTogglePassword] = useState<TogglePasswordType>({
      state: "HIDE",
      type: "password",
    });

    //Ensure that upon page refresh, password input will be cleared
    //and reset the state of passInputLabelClass
    useEffect(() => {
      if (typeof ref === "function" || ref === null) {
        throw new Error("Ref is a function or ref is a null!");
      }

      const inputElement = ref.current;

      if (!inputElement) throw new Error("input element does not exists!");

      inputElement.value = "";
      setMoveInputLabel(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkInputRef = () => {
      if (warningsRef === null) return;

      if (typeof ref === "function" || ref === null) {
        throw new Error("Ref is a function or ref is a null!");
      }

      const inputElement = ref.current;

      if (!inputElement) throw new Error("input element does not exists!");

      if (warningsRef.state) {
        if (warningsRef.name === "current") {
          if (warningsRef.err === "auth/wrong-password") {
            setInputWarnMsg(
              "Password should be between 6 and 60 characters long."
            );
          } else if (warningsRef.err === "auth/too-many-requests") {
            setInputWarnMsg(
              "Account temporary disabled due to too many failed login attempt, try again later."
            );
          }
        } else if (warningsRef.name === "new") {
          checkPasswordInput(inputElement.value);
        }
      } else {
        setInputWarnMsg("");
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
      if (typeof ref === "function" || ref === null) {
        throw new Error("Ref is a function or ref is a null!");
      }

      const inputElement = ref.current;

      if (!inputElement) throw new Error("input element does not exists!");

      if (matchPass.current.value !== inputElement.value) {
        // need warning, but no need message, i guess
        setInputWarnMsg(" ");
      } else {
        setInputWarnMsg("");
      }
    }

    function checkPasswordInput(val: string) {
      const valLength = val?.length ?? 0;
      if (warningsRef !== null) {
        if (warningsRef.name === "current") return;
        if (warningsRef.name === "confirm") return matchPassword();
      }
      if (valLength == 0) return;
      if (valLength < 6 || valLength > 60) {
        setInputWarnMsg(
          warnings || "Password should be between 6 and 60 characters long."
        );
      } else {
        setInputWarnMsg("");
      }
    }

    function handleInputClick(e: HandleInputClickEvent) {
      if (typeof ref === "function" || ref === null) {
        throw new Error("Ref is a function or ref is a null!");
      }

      const inputElement = ref.current;

      if (!inputElement) throw new Error("input element does not exists!");

      const val = inputElement.value;

      if (e.type === "change") {
        if (warnings === "none") return;
        checkPasswordInput(val);
      } else if (e.type === "focus") {
        setMoveInputLabel(true);
      } else if (e.type === "blur" && val === "") {
        if (showHidePassword)
          setTogglePassword({ state: "HIDE", type: "password" });
        setMoveInputLabel(false);
      } else if (e.type === "blur" && val !== "") {
        if (showHidePassword)
          setTogglePassword({ state: "HIDE", type: "password" });
      } else if (e.type === "clear") {
        setMoveInputLabel(false);
        if (showHidePassword)
          setTogglePassword({ state: "HIDE", type: "password" });
      }
    }

    // class
    const inputClass = `${styles.input} ${styles[mode]} ${
      inputWarnMsg && styles.inputWarnBorder
    }`;
    const inputLabelClass = `${styles.inputLabel} ${styles[mode]} ${
      moveInputLabel && styles.inputLabelMove
    } `;
    const passRevealBtn = `${styles.togglePassword} ${
      moveInputLabel && styles.show
    } `;

    return (
      <>
        <div className={styles.inputContainer}>
          <input
            type={togglePassword.type}
            name="passwordInput"
            maxLength={50}
            id={inputId}
            className={inputClass}
            ref={ref}
            onFocus={(e) => handleInputClick(e)}
            onBlur={(e) => handleInputClick(e)}
            onChange={(e) => handleInputClick(e)}
            style={showHidePassword ? { paddingRight: "80px" } : {}}
          />
          <label htmlFor={inputId} className={inputLabelClass}>
            {label || "Password"}
          </label>
          {showHidePassword && (
            <div className={passRevealBtn}>
              <span className={styles.text} onClick={toggleClick}>
                {togglePassword.state}
              </span>
            </div>
          )}
        </div>
        <p className={`${styles.warn} ${styles[mode]}`}>
          {inputWarnMsg}{" "}
          <span className={styles.caption}>
            <Link href="/yourAccount/loginHelp">{caption}</Link>
          </span>
        </p>
      </>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;

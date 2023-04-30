// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./HomeInput.module.scss";

import { useState, forwardRef } from "react";

import type { FocusEvent, ChangeEvent } from "react";

export interface CustomHTMLInputElement extends HTMLInputElement {
  isValid: boolean;
}

interface HomeInputProps {
  inputId: string;
}

// TODO: replace the any
const HomeInput = forwardRef<CustomHTMLInputElement, HomeInputProps>(
  (props, ref) => {
    const { inputId } = props;
    //Placeholder for input, move up when focus or a value is enter
    //move down when blur, but only if value is ''
    const [emailInputLabelClass, setEmailInputLabelClass] = useState(
      styles.inputLabel
    );

    //Set warning about user email input and toggle the warning presence
    const [emailInput, setEmailInput] = useState({
      class: styles.input,
      warnings: "",
    });

    function checkEmailInput(val: string) {
      if (typeof ref === "function" || ref === null) {
        throw new Error("Ref is a function or ref is a null!");
      }
      const inputElement = ref.current;

      if (!inputElement) throw new Error("input element does not exists!");

      const valLength = val?.length ?? 0;
      const regexValidateEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (valLength == 0) return;
      if (valLength <= 4) {
        setEmailInput({
          class: `${styles.input} ${styles.inputWarnBorder}`,
          warnings: "Email is required!",
        });
        inputElement.isValid = false;
      } else if (!val.match(regexValidateEmail)) {
        setEmailInput({
          class: `${styles.input} ${styles.inputWarnBorder}`,
          warnings: "Please enter a valid email address",
        });
        inputElement.isValid = false;
      } else {
        setEmailInput({
          class: `${styles.input}`,
          warnings: "",
        });
        inputElement.isValid = true;
      }
    }

    type HandleInputType =
      | FocusEvent<HTMLInputElement, Element>
      | ChangeEvent<HTMLInputElement>;

    function handleInput(e: HandleInputType) {
      if (typeof ref === "function" || ref === null) {
        throw new Error("Ref is a function or ref is a null!");
      }
      const inputElement = ref.current;

      if (!inputElement) throw new Error("input element does not exists!");

      const val = inputElement.value;

      if (e.type === "change") {
        checkEmailInput(val);
      } else if (e.type === "focus") {
        setEmailInputLabelClass(
          `${styles.inputLabel} ${styles.inputLabelMove}`
        );
      } else if (val !== "") {
        return;
      } else if (e.type === "blur") {
        setEmailInputLabelClass(`${styles.inputLabel}`);
      }
    }

    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <input
            type="email"
            name="emailInput"
            maxLength={50}
            id={inputId}
            className={emailInput.class}
            ref={ref}
            onFocus={(e) => handleInput(e)}
            onBlur={(e) => handleInput(e)}
            onChange={(e) => handleInput(e)}
          />
          <label htmlFor={inputId} className={emailInputLabelClass}>
            Email address
          </label>
        </div>
        <p className={styles.inputWarn}>{emailInput.warnings}</p>
      </div>
    );
  }
);

export default HomeInput;

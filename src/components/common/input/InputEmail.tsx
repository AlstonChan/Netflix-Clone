// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./Input.module.scss";

import { useState, useEffect, forwardRef } from "react";
import aes from "crypto-js/aes";
import CryptoJS from "crypto-js";

import type { HandleInputClickEvent } from "../types";

interface EmailInputProps {
  inputId: string;
  mode: "dark" | "light";
  useLocalStorageData: boolean;
  label?: string;
  warnings?: string;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (props, ref) => {
    const {
      inputId,
      mode = "dark",
      useLocalStorageData,
      label,
      warnings,
    } = props;
    // Placeholder for input, move up when focus or a value is enter
    // move down when blur, but only if value is ''
    const [moveInputLabel, setMoveInputLabel] = useState<boolean>(false);

    //Set warning about user email input and toggle the warning presence
    const [inputWarnMsg, setInputWarnMsg] = useState<string>("");

    //Ensure that upon page refresh, email input will be cleared
    //and reset the state of emailInputLabelClass
    useEffect(() => {
      if (typeof ref === "function" || ref === null) {
        throw new Error("Ref is a function or ref is a null!");
      }

      const inputElement = ref.current;

      if (!inputElement) throw new Error("input element does not exists!");

      inputElement.value = "";

      setMoveInputLabel(false);
      if (useLocalStorageData && typeof ref !== undefined) {
        const val = sessionStorage.getItem("user");
        if (val) {
          let nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE || "";

          const decrypted = aes.decrypt(val, nonce).toString(CryptoJS.enc.Utf8);
          inputElement.value = decrypted;

          setMoveInputLabel(true);
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function checkEmailInput(val: string) {
      const valLength = val?.length ?? 0;
      const regexValidateEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (valLength == 0) return;
      if (valLength <= 4) {
        setInputWarnMsg(warnings || "Email is required!");
      } else if (!val.match(regexValidateEmail)) {
        setInputWarnMsg("Please enter a valid email address");
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
        checkEmailInput(val);
      } else if (e.type === "focus") {
        setMoveInputLabel(true);
      } else if (val !== "") {
        return;
      } else if (e.type === "blur") {
        setMoveInputLabel(false);
      }
    }

    // class
    const inputClass = `${styles.input} ${styles[mode]} ${
      inputWarnMsg && styles.inputWarnBorder
    }`;

    const inputLabelClass = `${styles.inputLabel} ${styles[mode]} ${
      moveInputLabel && styles.inputLabelMove
    } `;

    return (
      <>
        <div className={styles.inputContainer}>
          <input
            type="email"
            name="emailInput"
            autoComplete="true"
            dir="lft"
            tabIndex={0}
            maxLength={50}
            id={inputId}
            className={inputClass}
            ref={ref}
            onFocus={(e) => handleInputClick(e)}
            onBlur={(e) => handleInputClick(e)}
            onChange={(e) => handleInputClick(e)}
          />
          <label htmlFor={inputId} className={inputLabelClass}>
            {label || "Email"}
          </label>
        </div>

        <p className={`${styles.warn} ${styles[mode]}`}>{inputWarnMsg}</p>
      </>
    );
  }
);
EmailInput.displayName = "EmailInput";

export default EmailInput;

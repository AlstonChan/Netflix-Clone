import styles from "@/styles/Home/featured.module.css";

import { useState, forwardRef } from "react";

import type { FocusEvent, ChangeEvent } from "react";

export interface CustomHTMLInputElement extends HTMLInputElement {
  isValid: boolean;
}

interface HomeInputProps {
  inputId: string;
}

// TODO: replace the any
const HomeInput = forwardRef((props: HomeInputProps, ref: any) => {
  const { inputId } = props;
  //Placeholder for input, move up when focus or a value is enter
  //move down when blur, but only if value is ''
  const [emailInputLabelClass, setEmailInputLabelClass] = useState(
    styles.emailInputLabel
  );

  //Set warning about user email input and toggle the warning presence
  const [emailInput, setEmailInput] = useState({
    class: styles.emailInput,
    warnings: "",
  });

  function checkEmailInput(val: string) {
    const inputElement = ref.current;

    if (!inputElement) throw new Error("input element does not exists!");

    const valLength = val?.length ?? 0;
    const regexValidateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valLength == 0) return;
    if (valLength <= 4) {
      setEmailInput({
        class: `${styles.emailInput} ${styles.emailWarnBorder}`,
        warnings: "Email is required!",
      });
      inputElement.isValid = false;
    } else if (!val.match(regexValidateEmail)) {
      setEmailInput({
        class: `${styles.emailInput} ${styles.emailWarnBorder}`,
        warnings: "Please enter a valid email address",
      });
      inputElement.isValid = false;
    } else {
      setEmailInput({
        class: `${styles.emailInput}`,
        warnings: "",
      });
      inputElement.isValid = true;
    }
  }

  type HandleInputType =
    | FocusEvent<HTMLInputElement, Element>
    | ChangeEvent<HTMLInputElement>;

  function handleInput(e: HandleInputType) {
    const inputElement = ref.current;

    if (!inputElement) throw new Error("input element does not exists!");

    const val = inputElement._valueTracker.getValue();

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
    <div className={styles.inputContainAll}>
      <div className={styles.inputContain}>
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
      <p className={styles.emailWarn}>{emailInput.warnings}</p>
    </div>
  );
});

export default HomeInput;

import btnStyles from "@/styles/button.module.scss";

import { useRouter } from "next/router";

import aes from "crypto-js/aes";
import { useState, useRef } from "react";

import type { FormEvent, MouseEvent } from "react";
import type { CustomHTMLInputElement } from "@/components/home/common/HomeInput";

export default function useHandleHomeEmail() {
  const router = useRouter();
  const defaultBtnStyle = `${btnStyles.btn} ${btnStyles.fill}  ${btnStyles.postfix}`;
  const [emailBtnMouseClass, setEmailBtnMouseClass] = useState(defaultBtnStyle);

  const emailInputRef = useRef<CustomHTMLInputElement | null>(null);

  function handleMouse(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    if (e.type === "mousedown") {
      setEmailBtnMouseClass(`${defaultBtnStyle} ${btnStyles.mouseEvent}`);
    } else if (e.type === "mouseup" || e.type === "mouseleave") {
      setEmailBtnMouseClass(defaultBtnStyle);
    }
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputElement = emailInputRef.current;

    if (!inputElement) {
      throw new Error("Email input Ref does not exists!");
    }
    if (inputElement.isValid) {
      let nonce = process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE;
      if (!nonce) nonce = "";

      const encrypted = aes.encrypt(inputElement.value, nonce).toString();
      sessionStorage.setItem("user", encrypted);
      router.push("/signup");
    }
  }

  return {
    ref: emailInputRef,
    btnClass: emailBtnMouseClass,
    handleMouse,
    handleFormSubmit,
  };
}

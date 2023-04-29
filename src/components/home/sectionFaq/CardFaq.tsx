import styles from "./SectionFaq.module.scss";

import { useRouter } from "next/router";

import { useRef, useState } from "react";
import aes from "crypto-js/aes";

import EmailInput from "../featured/HomeInput";
import Accordion from "./Accordion";

import type { CustomHTMLInputElement } from "../featured/HomeInput";
import type { FormEvent, MouseEvent } from "react";

export default function CardFaq() {
  const router = useRouter();
  const [emailBtnMouseClass, setEmailBtnMouseClass] = useState<string>(
    `netflixBtn ${styles.getStartedBtn}`
  );

  const emailInputRef = useRef<CustomHTMLInputElement | null>(null);

  function handleMouse(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    if (e.type === "mousedown") {
      setEmailBtnMouseClass(
        `netflixBtn ${styles.getStartedBtn} ${styles.getStartedBtnMouse}`
      );
    } else if (e.type === "mouseup" || e.type === "mouseleave") {
      setEmailBtnMouseClass(`netflixBtn ${styles.getStartedBtn}`);
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

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <Accordion />
        <form
          autoComplete="on"
          name="emailInput"
          onSubmit={(e) => handleFormSubmit(e)}
          className={styles.flexForm}
        >
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className={styles.faqForm}>
            <EmailInput inputId="_id_faqInput" ref={emailInputRef} />
            <div className={styles.buttonContain}>
              <button
                type="submit"
                className={emailBtnMouseClass}
                onMouseDown={(e) => handleMouse(e)}
                onMouseUp={(e) => handleMouse(e)}
                onMouseLeave={(e) => handleMouse(e)}
              >
                Get Started &nbsp;
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

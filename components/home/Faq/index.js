import styles from "../../../styles/Home/cardFaq.module.css";

import router from "next/router";

import { useRef, useState } from "react";
import aes from "crypto-js/aes";

import EmailInput from "../featured/input";
import Accordion from "./accordion";

export default function CardFaq() {
  const [emailBtnMouseClass, setEmailBtnMouseClass] = useState(
    `netflixBtn ${styles.getStartedBtn}`
  );

  const emailInputRef = useRef();

  function handleMouse(e) {
    if (e.type === "mousedown") {
      setEmailBtnMouseClass(
        `netflixBtn ${styles.getStartedBtn} ${styles.getStartedBtnMouse}`
      );
    } else if (e.type === "mouseup" || e.type === "mouseleave") {
      setEmailBtnMouseClass(`netflixBtn ${styles.getStartedBtn}`);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (emailInputRef.current.isValid) {
      const encrypted = aes
        .encrypt(
          emailInputRef.current.value,
          process.env.NEXT_PUBLIC_CRYPTO_JS_NONCE
        )
        .toString();
      sessionStorage.setItem("user", encrypted);
      router.push("/signup");
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.shell}>
        <h1 className={styles.sectionHead}>Frequently Asked Questions</h1>
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
            <EmailInput
              inputId={"_id_faqInput"}
              emailInputRef={emailInputRef}
            />
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

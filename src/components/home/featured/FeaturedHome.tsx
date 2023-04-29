import styles from "@/styles/Home/featured.module.css";

import { useRouter } from "next/router";

import { useRef, useState } from "react";
import aes from "crypto-js/aes";

import Header from "../../Header";
import HomeInput from "./HomeInput";

import { CustomHTMLInputElement } from "./HomeInput";
import type { FormEvent, MouseEvent } from "react";

export default function FeaturedHome() {
  const router = useRouter();
  const [emailBtnMouseClass, setEmailBtnMouseClass] = useState(
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
    <>
      <section className={styles.headFea}>
        <div className={styles.shadeFea}>
          <div className={styles.headFeaOuter}>
            <Header />
            <div className={styles.headFeaContain}>
              <h1 className={styles.feaTitle}>
                Unlimited movies, TV shows, and more.
              </h1>
              <p className={styles.feaDesc}>Watch anywhere. Cancel anytime.</p>
              <p className={styles.feaDescSmall}>
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>
              <form
                autoComplete="on"
                name="emailInput"
                onSubmit={(e) => handleFormSubmit(e)}
                className={styles.flexForm}
              >
                <HomeInput inputId="_id_featuredInput" ref={emailInputRef} />
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

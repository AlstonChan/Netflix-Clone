import styles from "../../../styles/Home/featured.module.css";

import router from "next/router";

import { useRef, useState } from "react";
import aes from "crypto-js/aes";

import Header from "../../Header";
import Input from "./Input";

export default function FeaturedHome() {
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
                <Input
                  inputId={"_id_featuredInput"}
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

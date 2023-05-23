// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./GoogleCaptcha.module.scss";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function GoogleCaptcha() {
  const [showCaptchaClass, setShowCaptchaClass] = useState<boolean>(false);

  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <>
      <span className={styles.googleCaptchaTxt}>
        This page is protected by Google reCAPTCHA to ensure you&apos;re not a
        bot.
      </span>
      <AnimatePresence mode="wait">
        {!showCaptchaClass && (
          <motion.button
            onClick={() => setShowCaptchaClass(true)}
            className={styles.captchaBtn}
          >
            Learn more
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showCaptchaClass && (
          <motion.article
            variants={variants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <p className={styles.captchaTerm}>
              The information collected by Google reCAPTCHA is subject to the
              Google&nbsp;
              <a
                href="https://policies.google.com/privacy"
                referrerPolicy="no-referrer"
                className={styles.link}
              >
                Privacy Policy{" "}
              </a>
              and&nbsp;
              <a
                href="https://policies.google.com/terms"
                referrerPolicy="no-referrer"
                className={styles.link}
              >
                Terms of Service{" "}
              </a>
              , and is used for providing, maintaining, and improving the
              reCAPTCHA service and for general security purposes (it is not
              used for personalized advertising by Google).
            </p>
          </motion.article>
        )}
      </AnimatePresence>
    </>
  );
}

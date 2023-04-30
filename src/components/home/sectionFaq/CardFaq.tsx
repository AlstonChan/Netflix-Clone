// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./SectionFaq.module.scss";

import useHandleHomeEmail from "src/hooks/useHandleHomeEmail";

import Accordion from "./Accordion";
import HomeForm from "../common/HomeForm";

export default function CardFaq() {
  const { ref, btnClass, handleMouse, handleFormSubmit } = useHandleHomeEmail();

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <Accordion />
        <article className={styles.formContainer}>
          <p className={styles.desc}>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <HomeForm
            handleFormSubmit={handleFormSubmit}
            handleMouse={handleMouse}
            btnClass={btnClass}
            ref={ref}
          />
        </article>
      </div>
    </section>
  );
}

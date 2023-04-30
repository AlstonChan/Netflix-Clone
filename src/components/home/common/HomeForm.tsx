// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./HomeForm.module.scss";

import HomeInput from "./HomeInput";

import { forwardRef } from "react";

import type { Ref } from "react";
import type { CustomHTMLInputElement } from "./HomeInput";

interface HomeFormProps {
  handleFormSubmit: Function;
  handleMouse: Function;
  btnClass: string;
}

const HomeForm = forwardRef(
  (props: HomeFormProps, ref: Ref<CustomHTMLInputElement>) => {
    const { handleFormSubmit, handleMouse, btnClass } = props;

    return (
      <form
        autoComplete="on"
        name="emailInput"
        onSubmit={(e) => handleFormSubmit(e)}
        className={styles.flexForm}
      >
        <HomeInput inputId="_id_featuredInput" ref={ref} />
        <div className={styles.btnContainer}>
          <button
            type="submit"
            className={btnClass}
            onMouseDown={(e) => handleMouse(e)}
            onMouseUp={(e) => handleMouse(e)}
            onMouseLeave={(e) => handleMouse(e)}
          >
            Get Started &nbsp;
          </button>
        </div>
      </form>
    );
  }
);

export default HomeForm;

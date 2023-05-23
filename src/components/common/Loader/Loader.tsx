// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./loader.module.scss";
import Spinner from "@/public/images/browse/spinner.png";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

interface LoaderProps {
  fit?: boolean;
  mode?: "dark" | "light";
  padding?: "top" | "bottom" | "left" | "right";
}

export default function Loader(props: LoaderProps) {
  const { fit = false, mode = "dark", padding } = props;

  const containerClass = `${styles.container} ${styles[mode]} ${
    fit && styles.fit
  } ${padding && styles[padding]}`;

  return (
    <div className={containerClass}>
      <div className={styles.spinnerBox}>
        <Image
          src={Spinner}
          alt="loading spinner"
          style={responsive}
          className={styles.spinner}
        />
      </div>
    </div>
  );
}

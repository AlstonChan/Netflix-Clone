// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./loader.module.scss";
import Spinner from "@/public/images/browse/spinner.png";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

const Loader = () => {
  return (
    <div className={styles.container}>
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
};

export default Loader;

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./snackbar.module.scss";
import successIcon from "@/public/images/icons/triage/check-circle.svg";
import infoIcon from "@/public/images/icons/triage/info.svg";
import warningIcon from "@/public/images/icons/triage/warning-triangle.svg";
import errorIcon from "@/public/images/icons/triage/error-circle.svg";
import CancelSvg from "@/components/icons/CancelSvg";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import type { Variant } from "./types";
import { useEffect } from "react";

interface SnackBarProps {
  variant: Variant;
  title?: string;
  message: string;
  isOpen: boolean;
  onClose: Function;
  timeout?: number;
}

const framerVariants = {
  hidden: { opacity: 0, x: -200 },
  enter: { opacity: 1, x: 0 },
};
export default function SnackBar(props: SnackBarProps) {
  const { title, message, variant, isOpen, onClose, timeout = 10000 } = props;

  const icon = {
    success: <Image src={successIcon} alt="" className={styles.img} />,
    info: <Image src={infoIcon} alt="" className={styles.img} />,
    warning: <Image src={warningIcon} alt="" className={styles.img} />,
    error: <Image src={errorIcon} alt="" className={styles.img} />,
  };

  useEffect(() => {
    if (timeout !== 0) {
      const timeoutFunc = setTimeout(() => {
        onClose();
      }, timeout);

      return () => {
        clearTimeout(timeoutFunc);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const containerClass = `${styles.container} ${styles[variant]}`;
  const contentClass = `${styles.content} ${title && styles.hasTitle}`;

  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.aside
          variants={framerVariants}
          initial="hidden"
          animate="enter"
          exit="hidden"
          className={containerClass}
        >
          <div className={contentClass}>
            {title ? (
              <div className={styles.titleBox}>
                <div className={styles.iconContainer}>{icon[variant]}</div>
                <p className={styles.title}>{title} </p>
              </div>
            ) : (
              <div className={styles.iconContainer}>{icon[variant]}</div>
            )}

            <p className={styles.txt}>{message}</p>
          </div>
          <button
            type="button"
            className={styles.iconContainer}
            aria-label="Close"
            onClick={(e) => onClose(e)}
          >
            <CancelSvg
              stColor="#000"
              w="24px"
              h="24px"
              className={styles.img}
            />
          </button>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

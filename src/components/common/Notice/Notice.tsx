// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./notice.module.scss";
import warning from "@/public/images/icons/misc/warning-triangle-outline.svg";
import transitionTop from "@/public/images/icons/misc/transition-top.svg";
import transitionBot from "@/public/images/icons/misc/transition-bottom.svg";

import Image from "@chan_alston/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Notice() {
  type WarnBarType = {
    isOpen: boolean;
    heightOffset: number;
    resize: boolean;
  };
  const initialState: WarnBarType = {
    isOpen: true,
    heightOffset: 0,
    resize: false,
  };
  const [warnBar, setWarnBar] = useState<WarnBarType>(initialState);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // handle window resize and sets items in row
  const handleWindowResize = () => {
    if (containerRef.current !== null) {
      const { height } = containerRef.current.getBoundingClientRect();
      if (!warnBar.isOpen && warnBar.heightOffset !== height) {
        setWarnBar({
          isOpen: false,
          heightOffset: height,
          resize: true,
        });
      }
    } else throw new Error("containerRef.current is null, can't access");
  };

  const handleClick = () => {
    if (containerRef.current !== null) {
      const { height } = containerRef.current.getBoundingClientRect();
      if (warnBar.isOpen) {
        setWarnBar({
          isOpen: false,
          heightOffset: height,
          resize: false,
        });
      } else {
        setWarnBar(initialState);
      }
    } else throw new Error("containerRef.current is null, can't access");
  };

  const asideTransition = warnBar.resize
    ? { type: "tween", duration: 0 }
    : { type: "tween", duration: 0.3 };
  const transitionImgStyle = { width: "30px", margin: "0" };

  return (
    <motion.aside
      className={styles.container}
      ref={containerRef}
      animate={{ y: warnBar.heightOffset }}
      transition={asideTransition}
    >
      <button
        className={styles.slider}
        type="button"
        onClick={handleClick}
        aria-label={warnBar.isOpen ? "Slide Down" : "Slide Up"}
      >
        {warnBar.isOpen ? (
          <Image
            src={transitionBot}
            alt="Slide Down"
            style={transitionImgStyle}
            className={styles.transition}
          />
        ) : (
          <Image
            src={transitionTop}
            alt="Slide Up"
            style={transitionImgStyle}
            className={styles.transition}
          />
        )}
      </button>
      <div className={styles.content}>
        <Image
          src={warning}
          alt=""
          style={{ width: "50px", margin: "0 10px" }}
        />
        <div className={styles.msgGroup}>
          <p className={styles.msg}>
            This is <strong>NOT</strong> the official Netflix site.
          </p>
          <p className={styles.msg}>
            <strong>DO NOT ENTER</strong> your Netflix credentials here.
          </p>
        </div>
      </div>
    </motion.aside>
  );
}

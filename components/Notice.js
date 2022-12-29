import styles from "@/styles/notice.module.css";
import warning from "@/public/images/icons/misc/warning-triangle-outline.svg";
import transitionTop from "@/public/images/icons/misc/transition-top.svg";
import transitionBot from "@/public/images/icons/misc/transition-bottom.svg";

import ImageRender from "@chan_alston/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Notice = () => {
  const initialState = {
    state: "open",
    heightOffset: 0,
    resize: false,
  };
  const [warnBar, setWarnBar] = useState(initialState);
  const containerRef = useRef();

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // handle window resize and sets items in row
  const handleWindowResize = () => {
    const { height } = containerRef.current.getBoundingClientRect();
    if (warnBar.state === "close") {
      if (warnBar.heightOffset !== height)
        setWarnBar({
          state: "close",
          heightOffset: height,
          resize: true,
        });
    }
  };

  const handleClick = () => {
    const { height } = containerRef.current.getBoundingClientRect();
    if (warnBar.state === "open") {
      setWarnBar({
        state: "close",
        heightOffset: height,
        resize: false,
      });
    } else {
      setWarnBar(initialState);
    }
  };

  return (
    <motion.aside
      className={styles.container}
      ref={containerRef}
      animate={{
        y: warnBar.heightOffset,
        backgroundColor: warnBar.state === "open" ? "rgba(224, 14, 14,1)" : "",
        transitionEnd:
          warnBar.state === "open"
            ? { backgroundColor: "rgba(224, 14, 14,1)" }
            : { backgroundColor: "rgba(224, 14, 14,0)" },
      }}
      transition={
        warnBar.resize === true ? 0 : { type: "tween", duration: 0.3 }
      }
    >
      <div className={styles.fit}>
        <button className={styles.slider} type="button" onClick={handleClick}>
          <ImageRender
            src={transitionBot.src}
            w={transitionBot.width}
            h={transitionBot.height}
            style={{ width: "30px", margin: "0" }}
            className={styles.transition}
          />
        </button>
        <div
          className={styles.fit}
          style={{
            visibility: warnBar.state === "open" ? "visible" : "hidden",
          }}
        >
          <ImageRender
            src={warning.src}
            w={warning.width}
            h={warning.height}
            style={{ width: "50px", margin: "0 10px " }}
          />
          <p className={styles.msg}>
            Please note that this is not the official Netflix site.
            <br /> DO NOT ENTER your Netflix credentials here.
          </p>
        </div>
      </div>
    </motion.aside>
  );
};

export default Notice;

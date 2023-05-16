import styles from "./modals/modals.module.scss";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: -100 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

export default function ModalWarn({ type }) {
  return (
    <motion.div
      key="modalWarn"
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: "linear" }} // Set the transition to linear
      className={styles.warnContainer}
    >
      <div className={styles.warnContent}>
        <h3 className={styles.warnContentHeader}>Account Not Yet Verified</h3>
        <p className={styles.warnContentPara}>
          {type === "movie"
            ? "You have to verified your account in order to add movie or tv shows to our list"
            : "You have to verified your account in order to change profile-picture"}
        </p>
      </div>
    </motion.div>
  );
}

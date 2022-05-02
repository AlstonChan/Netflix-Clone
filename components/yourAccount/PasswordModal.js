import styles from "../../styles/yourAccount/password.module.css";
import CheckMarkSvg from "../icons/CheckMarkSvg";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: -100 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

export default function PasswordModal({ content }) {
  return (
    <motion.div
      key="modal"
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: "linear" }} // Set the transition to linear
      className={styles.modal}
    >
      <span className={styles.modalContent}>{content} </span>
      <CheckMarkSvg />
    </motion.div>
  );
}

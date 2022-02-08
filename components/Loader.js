import Image from "next/image";

import Spinner from "../public/images/browse/spinner.png";
import styles from "../styles/loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loadingBg}>
      <main className={styles.mainLoader}>
        <div className={styles.profilePicCenter}>
          <div className={styles.spinnerContain}>
            <Image src={Spinner} alt="loading spinner" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loader;

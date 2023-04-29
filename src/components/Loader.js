import styles from "@/styles/loader.module.css";
import Spinner from "@/public/images/browse/spinner.png";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

const Loader = () => {
  return (
    <div className={styles.loadingBg}>
      <main className={styles.mainLoader}>
        <div className={styles.profilePicCenter}>
          <div className={styles.spinnerContain}>
            <Image src={Spinner} alt="loading spinner" style={responsive} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loader;

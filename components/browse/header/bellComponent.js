import bell from "../../../public/images/icons/misc/bell.svg";
import { useState } from "react";

import Image from "next/image";
import styles from "../../../styles/browse/header.module.css";

export default function BellComponent() {
  const [navNotification, setNavNotification] = useState({
    display: "none",
  });

  const [notificationCount, setNotificationCount] = useState(0);

  const [delayNotifi, setDelayNotifi] = useState(null);

  function toggleNavMenu(e) {
    if (e.type === "mouseenter") {
      setNavNotification({ display: "block", opacity: "1" });
      clearTimeout(delayNotifi);
    } else if (e.type === "mouseleave") {
      setDelayNotifi(
        setTimeout(() => {
          setNavNotification({ display: "none", opacity: "0" });
        }, 500)
      );
    }
  }

  return (
    <div className={styles.navIcon}>
      <div
        onMouseEnter={(e) => toggleNavMenu(e)}
        onMouseLeave={(e) => toggleNavMenu(e)}
      >
        <Image src={bell} />
        <div
          className={styles.notification}
          style={
            notificationCount == 0
              ? { visibility: "collapse" }
              : { visibility: "visible" }
          }
        >
          <span className={styles.notificationCount}>{notificationCount}</span>
        </div>
      </div>
      <div
        className={styles.dropDownMenuNavSec}
        onMouseEnter={(e) => toggleNavMenu(e)}
        onMouseLeave={(e) => toggleNavMenu(e)}
        style={navNotification}
      >
        <div className={styles.notificationArrContain}>
          <Image
            src="/images/nav_arrow_bold.svg"
            width="20px"
            height="20px"
            className={styles.notificationArr}
          />
        </div>
        <div className={styles.dropDownMenuListSec}>
          <p className={styles.notificationEmpty}>No Recent Notification</p>
        </div>
      </div>
    </div>
  );
}

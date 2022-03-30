import styles from "../../../styles/browse/secondaryHeader.module.css";
import bell from "../../../public/images/icons/misc/bell.svg";

import Image from "next/image";

import { useState } from "react";

export default function BellComponent() {
  const [navNotification, setNavNotification] = useState({
    styling: {
      visibility: "hidden",
    },
    mode: 0,
  });

  const [notificationCount, setNotificationCount] = useState(0);

  const [delayNotifi, setDelayNotifi] = useState(null);

  function toggleNavMenu(e) {
    if (e.type === "mouseenter") {
      setNavNotification({
        styling: { visibility: "visible", opacity: "1" },
        mode: 1,
      });
      clearTimeout(delayNotifi);
    } else if (e.type === "mouseleave") {
      setDelayNotifi(
        setTimeout(() => {
          setNavNotification({
            styling: { visibility: "hidden", opacity: "0" },
            mode: 0,
          });
        }, 400)
      );
    }
  }

  return (
    <div className={styles.navIcon}>
      <div
        onMouseEnter={(e) => toggleNavMenu(e)}
        onMouseLeave={(e) => toggleNavMenu(e)}
      >
        <Image src={bell} alt="notification icon" unoptimized={true} />
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
      {navNotification.mode === 1 ? (
        <div
          className={styles.dropDownMenuNavSec}
          onMouseEnter={(e) => toggleNavMenu(e)}
          onMouseLeave={(e) => toggleNavMenu(e)}
          style={navNotification.styling}
        >
          <div className={styles.notificationArrContain}>
            <Image
              src="/images/icons/misc/nav_arrow_bold.svg"
              width="20px"
              height="20px"
              className={styles.notificationArr}
              alt=""
              unoptimized={true}
            />
          </div>
          <div className={styles.dropDownMenuListSec}>
            <p className={styles.notificationEmpty}>No Recent Notification</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

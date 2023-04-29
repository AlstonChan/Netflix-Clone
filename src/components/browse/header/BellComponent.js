import styles from "@/styles/browse/secondaryHeader.module.css";
import Bell from "@/public/images/icons/misc/bell.svg";
import NavArrowBold from "@/public/images/icons/arrow/nav_arrow_bold.svg";

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
        <Image src={Bell} alt="notification icon" unoptimized />
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
              src={NavArrowBold}
              width="20"
              height="20"
              className={styles.notificationArr}
              alt=""
              unoptimized
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

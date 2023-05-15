// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./bellComponent.module.scss";
import Bell from "@/public/images/icons/misc/bell.svg";
import NavArrowBold from "@/public/images/icons/arrow/nav_arrow_bold.svg";

import Image from "next/image";

import { useState } from "react";

import type { MouseEvent } from "react";

export default function BellComponent() {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [delay, setDelay] = useState<NodeJS.Timeout | null>(null);

  function toggleNavMenu(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    if (e.type === "mouseenter") {
      setShowNotification(true);
      if (delay) clearTimeout(delay);
    } else if (e.type === "mouseleave") {
      setDelay(
        setTimeout(() => {
          setShowNotification(false);
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
        <Image src={Bell} alt="notification icon" className={styles.icon} />
        <div
          className={styles.notification}
          style={
            notificationCount === 0
              ? { visibility: "collapse" }
              : { visibility: "visible" }
          }
        >
          <span className={styles.count}>{notificationCount}</span>
        </div>
      </div>
      {showNotification ? (
        <div
          className={styles.dropDown}
          onMouseEnter={(e) => toggleNavMenu(e)}
          onMouseLeave={(e) => toggleNavMenu(e)}
        >
          <div className={styles.arrBox}>
            <Image
              src={NavArrowBold}
              width="20"
              height="20"
              className={styles.arr}
              alt=""
              unoptimized
            />
          </div>
          <div className={styles.list}>
            <p className={styles.notificationEmpty}>No Recent Notification</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./dropdown.module.scss";
import NavArrowBold from "@/public/images/icons/arrow/nav_arrow_bold.svg";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import type { NavItemType } from "../HeaderBrowse";
import type { BrowseRoute } from "../../types";
import type { MouseEvent } from "react";

interface PrimaryDropdownNavProps {
  navItem: NavItemType[];
  handler: (route: BrowseRoute) => void;
  activeNav: BrowseRoute;
}

export default function PrimaryNav(props: PrimaryDropdownNavProps) {
  const { navItem, handler, activeNav } = props;

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const [delay, setDelay] = useState<NodeJS.Timeout | null>(null);

  function toggleNavMenu(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    if (e.type === "mouseenter") {
      setShowDropdown(true);
      if (delay) clearTimeout(delay);
    } else if (e.type === "mouseleave") {
      setDelay(
        setTimeout(() => {
          setShowDropdown(false);
        }, 400)
      );
    }
  }

  const dropDownClass = `${styles.dropDownMenuNav} ${
    showDropdown && styles.active
  }`;

  const pageRoute = (item: NavItemType): string => {
    const currentRoute =
      item.route === "home" ? `/browse` : `/browse/${item.route}`;

    return currentRoute;
  };

  return (
    <>
      <div
        className={styles.navMenu}
        onMouseEnter={(e) => toggleNavMenu(e)}
        onMouseLeave={(e) => toggleNavMenu(e)}
      >
        <span className={styles.txt}>Browse</span>
        <Image
          src={NavArrowBold}
          width="20"
          height="20"
          className={styles.img}
          alt=""
        />
      </div>
      {showDropdown && (
        <div
          className={dropDownClass}
          onMouseEnter={(e) => toggleNavMenu(e)}
          onMouseLeave={(e) => toggleNavMenu(e)}
        >
          <div className={styles.arrBox}>
            <Image
              src={NavArrowBold}
              width="20"
              height="20"
              className={styles.img}
              alt=""
              unoptimized
            />
          </div>
          {navItem.map((item) => {
            return (
              <Link
                href={pageRoute(item)}
                key={item.route}
                className={styles.dropDownMenuitem}
              >
                <li
                  onClick={() => handler}
                  className={`${styles.option} ${styles.menu} ${
                    item.route === activeNav && styles.active
                  }`}
                >
                  {item.txt}
                </li>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

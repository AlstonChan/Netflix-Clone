// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./primaryNav.module.scss";

import Link from "next/link";

import type { NavItemType } from "../HeaderBrowse";
import type { BrowseRoute } from "../../types";

interface PrimaryNavProps {
  navDetails: NavItemType;
  handler: (route: BrowseRoute) => void;
  activeNav: BrowseRoute;
}

export default function PrimaryNav(props: PrimaryNavProps) {
  const { navDetails, handler, activeNav } = props;

  const currentRoute = navDetails.route;

  const linkClass = `${styles.option} ${
    currentRoute === activeNav && styles.active
  }`;

  return (
    <>
      <Link
        shallow
        href={currentRoute}
        onClick={() => handler}
        className={linkClass}
      >
        <span style={{ margin: "0 10px" }}>{navDetails.txt}</span>
      </Link>
    </>
  );
}

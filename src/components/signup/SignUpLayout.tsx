// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { AnimatePresence } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

import Header from "@/components/common/header/Header";
import Footer from "@/components/footer/FooterStyle2";
import UnProtectedArea from "../layout/UnProtectedArea";

interface SignUpLayoutProps {
  children: ReactNode;
}

export const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    minWidth: "300px",
  };

  return (
    <UnProtectedArea>
      <AnimatePresence mode="wait">
        <div style={containerStyle}>
          <Header logoClickHome mode="light" />
          {children}
          <Footer />
        </div>
      </AnimatePresence>
    </UnProtectedArea>
  );
}

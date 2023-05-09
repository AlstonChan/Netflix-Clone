// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

interface CheckMarkSvg {
  stColor?: string;
  bgColor?: string;
  stWidth?: string;
}

export default function CheckMarkSvg(props: CheckMarkSvg) {
  const { stColor, bgColor, stWidth } = props;

  return (
    <svg
      width={24}
      height={24}
      strokeWidth={stWidth || 1.5}
      fill={bgColor || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m5 13 4 4L19 7"
        stroke={stColor || "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

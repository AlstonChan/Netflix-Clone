// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

interface ThumbsUpSvgProps {
  selected: boolean;
  modal: boolean;
  stColor?: string;
  bgColor?: string;
  className?: string;
}

export default function ThumbsUpSvg(props: ThumbsUpSvgProps) {
  const { selected, stColor, bgColor, modal, className } = props;

  return (
    <svg
      width={30}
      height={30}
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill={selected ? (modal ? " #fff" : "#000") : bgColor || "none"}
      xmlns="http://www.w3.org/2000/svg"
      className={className || ""}
    >
      <path
        d="M16.472 20H4.1a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h2.768a2 2 0 0 0 1.715-.971l2.71-4.517a1.631 1.631 0 0 1 2.961 1.308l-1.022 3.408a.6.6 0 0 0 .574.772h4.575a2 2 0 0 1 1.93 2.526l-1.91 7A2 2 0 0 1 16.473 20Z"
        stroke={stColor || "#fff"}
        strokeLinecap="round"
      />
      <path
        d="M7 20V9"
        stroke={selected ? (modal ? "#000" : "#fff") : stColor || "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

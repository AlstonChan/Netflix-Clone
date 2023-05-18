interface PlusSvgProps {
  stColor?: string;
  bgColor?: string;
  className?: string;
}

export default function PlusSvg({ stColor, bgColor, className }: PlusSvgProps) {
  return (
    <svg
      width={30}
      height={30}
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill={bgColor || "none"}
      xmlns="http://www.w3.org/2000/svg"
      className={className || ""}
    >
      <path
        d="M6 12h6m6 0h-6m0 0V6m0 6v6"
        stroke={stColor || "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

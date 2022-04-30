export default function CheckMarkSvg({ stColor, bgColor, stWidth }) {
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

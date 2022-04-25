export default function CancelSvg({ stColor, bgColor, className, data }) {
  return (
    <svg
      width={30}
      height={30}
      strokeWidth={2}
      viewBox="0 0 24 24"
      fill={bgColor || "none"}
      xmlns="http://www.w3.org/2000/svg"
      className={className || ""}
      data-num={data || ""}
    >
      <path
        d="M6.758 17.243 12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
        stroke={stColor || "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
        data-num={data || ""}
      />
    </svg>
  );
}

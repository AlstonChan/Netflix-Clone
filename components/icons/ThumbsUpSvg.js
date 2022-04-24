export default function ThumbsUpSvg({ selected, stColor, bgColor }) {
  return (
    <svg
      width={30}
      height={30}
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill={selected ? "#000" : bgColor || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.472 20H4.1a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h2.768a2 2 0 0 0 1.715-.971l2.71-4.517a1.631 1.631 0 0 1 2.961 1.308l-1.022 3.408a.6.6 0 0 0 .574.772h4.575a2 2 0 0 1 1.93 2.526l-1.91 7A2 2 0 0 1 16.473 20Z"
        stroke={stColor || "#fff"}
        strokeLinecap="round"
      />
      <path
        d="M7 20V9"
        stroke={selected ? "#fff" : stColor || "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

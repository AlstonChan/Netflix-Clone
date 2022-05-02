import styles from "../styles/imageRender.module.css";

import { useRef, useState } from "react";
import useIntersection from "../lib/useIntersection";

export default function ImageRender({
  src,
  alt,
  width,
  height,
  className,
  objectFit,
}) {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  return (
    <div className={styles.imageContainer} ref={imgRef}>
      <span
        style={{
          boxSizing: "border-box",
          display: "block",
          width: "initial",
          height: "initial",
          background: "rgba(0, 0, 0, 0) none repeat scroll 0% 0%",
          opacity: "1",
          border: "0px none",
          margin: " 0px",
          padding: `${(height / width) * 100}% 0px 0px`,
        }}
      ></span>
      {isInView && (
        <img
          src={typeof src === "object" ? src.src : src}
          alt={alt}
          className={
            className ? `${className} ${styles.imgContent}` : styles.imgContent
          }
          style={objectFit ? { objectFit } : {}}
        />
      )}
    </div>
  );
}

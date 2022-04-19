import styles from "../../../styles/Home/cardFaq.module.css";
import svgCross from "../../../public/images/icons/misc/cross.svg";

import Image from "next/image";

import DOMPurify from "dompurify";

export default function AccordianCard({ faq, toggleOne, classNm, data }) {
  function createMarkup() {
    let txt;
    if (typeof faq.content !== "object") {
      txt = faq.content;
      return { __html: DOMPurify.sanitize(txt) };
    } else {
      txt = faq.content[0] + "<br /><br />" + faq.content[1];
      return { __html: DOMPurify.sanitize(txt) };
    }
  }

  return (
    <>
      <button
        className={styles.accordionItemBtn}
        onClick={(e) => toggleOne(e)}
        data-num={data}
      >
        <span data-num={data} className={styles.btnText}>
          {faq.headers}{" "}
        </span>
        <div className={styles.btnCross}>
          <Image
            data-num={data}
            src={svgCross}
            className={
              classNm.active && classNm.index == data
                ? styles.openCross
                : styles.closeCross
            }
            alt=""
            unoptimized
          />
        </div>
      </button>
      <div
        className={
          classNm.active && classNm.index == data
            ? `${styles.accordionContent} ${styles.open}`
            : `${styles.accordionContent} ${styles.hide}`
        }
      >
        <span dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </>
  );
}

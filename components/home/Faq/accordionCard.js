import Image from "next/image";
import styles from "../../../styles/Home/cardFaq.module.css";
import svgCross from "../../../public/images/home/cross.svg";
import { useState } from "react";

export default function AccordianCard({ faq, toggleOne }) {
  const [hideAccordion, setHideAccordion] = useState({
    class: `${styles.accordianContent} ${styles.hide}`,
    cross: `${styles.closeCross}`,
    isClose: false,
  });

  function toggleAccordian(e) {
    toggleOne(e);
    if (hideAccordion.isClose) {
      setHideAccordion({
        class: `${styles.accordionContent} ${styles.hide}`,
        cross: `${styles.closeCross}`,
        isClose: false,
      });
    } else {
      setHideAccordion({
        class: `${styles.accordionContent}  ${styles.open}`,
        cross: `${styles.openCross}`,
        isClose: true,
      });
    }
  }

  function createMarkup() {
    let txt;
    if (typeof faq.content !== "object") {
      txt = faq.content;
      return { __html: txt };
    } else {
      txt = faq.content[0] + "<br /><br />" + faq.content[1];
      return { __html: txt };
    }
  }

  return (
    <>
      <button
        className={styles.accordionItemBtn}
        onClick={(e) => toggleAccordian(e)}
      >
        <span className={styles.btnText}>{faq.headers} </span>
        <div className={styles.btnCross}>
          <Image src={svgCross} className={hideAccordion.cross} alt="" />
        </div>
      </button>
      <div className={hideAccordion.class}>
        <span dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </>
  );
}

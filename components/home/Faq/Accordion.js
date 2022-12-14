import styles from "@/styles/Home/cardFaq.module.css";

import { useState } from "react";

import { faq } from "./accordianContent";
import AccordionCard from "./AccordionCard";

export default function Accordian() {
  const [selectedOptionAcc, setSelectedOptionAcc] = useState({
    active: true,
    index: 0,
  });

  // tbh, I don't even know why it works, it just does
  function toggleOne(e) {
    if (
      e.target.dataset.num == selectedOptionAcc.index &&
      selectedOptionAcc.firstTime
    ) {
      setSelectedOptionAcc({
        active: true,
        index: e.target.dataset.num,
        firstTime: false,
      });
    } else if (e.target.dataset.num == selectedOptionAcc.index) {
      setSelectedOptionAcc({
        active: false,
        index: e.target.dataset.num,
        firstTime: true,
      });
    } else {
      setSelectedOptionAcc({
        active: true,
        index: e.target.dataset.num,
        firstTime: false,
      });
    }
  }

  return (
    <div className={styles.accordion}>
      {faq.map((item, index) => {
        return (
          <li key={index} className={styles.accordionItem}>
            <AccordionCard
              faq={item}
              data={index}
              toggleOne={toggleOne}
              classNm={selectedOptionAcc}
            />
          </li>
        );
      })}
    </div>
  );
}

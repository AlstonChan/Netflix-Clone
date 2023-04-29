import styles from "./SectionFaq.module.scss";

import { useState } from "react";

import { data } from "./accordionContent";
import AccordionCard from "./AccordionCard";

import type { SelectedOptionType } from "./types";

export default function Accordion() {
  const [selectedOption, setSelectedOption] = useState<SelectedOptionType>({
    active: true,
    index: 0,
  });

  function toggleAccordionBar(e: MouseEvent): void {
    const element = e.target as HTMLElement;

    if (!element) {
      throw new Error("Email input Ref does not exists!");
    }

    // This check if the currently selected accordionBar
    // is the same as the one user just click .
    const compareIfNumIsSame =
      Number(element.dataset.num) === selectedOption.index;

    // and if it is, but the accordionBar isn't active
    // then open it.
    if (compareIfNumIsSame && !selectedOption.active) {
      setSelectedOption({
        active: true,
        index: Number(element.dataset.num),
      });

      // and if it is, along with the accordionBar is still active
      // then close it.
    } else if (compareIfNumIsSame && selectedOption.active) {
      setSelectedOption({
        active: false,
        index: Number(element.dataset.num),
      });
      // user clicks on a accordionBar that neither selected nor active
      // at the moment
    } else {
      setSelectedOption({
        active: true,
        index: Number(element.dataset.num),
      });
    }
  }

  return (
    <ul className={styles.accordion}>
      {data.map((item, index) => {
        return (
          <li key={index} className={styles.item}>
            <AccordionCard
              data={item}
              index={index}
              toggleAccordionBar={toggleAccordionBar}
              accordionSelection={selectedOption}
            />
          </li>
        );
      })}
    </ul>
  );
}

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./SectionFaq.module.scss";
import CancelSvg from "@/icons/CancelSvg";

import type { AccordionDataType, SelectedOptionType } from "./types";

interface AccordionCardProps {
  data: AccordionDataType;
  index: number;
  toggleAccordionBar: Function;
  accordionSelection: SelectedOptionType;
}

export default function AccordionCard(props: AccordionCardProps) {
  const { data, index, toggleAccordionBar, accordionSelection } = props;

  const accordionCardState =
    accordionSelection.active && accordionSelection.index == index
      ? styles.open
      : styles.close;

  return (
    <>
      <button
        className={styles.btn}
        onClick={(e) => toggleAccordionBar(e)}
        data-num={index}
      >
        <span data-num={index} className={styles.text}>
          {data.headers}
        </span>
        <div className={styles.btnCross}>
          <CancelSvg data={index} className={accordionCardState} />
        </div>
      </button>
      <div className={`${styles.accordionContent} ${accordionCardState}`}>
        {data.content && Array.isArray(data.content) ? (
          <>
            <span>{data.content[0]}</span>
            <span>{data.content[1]}</span>
          </>
        ) : (
          <span>{data.content} </span>
        )}
        {/* <span dangerouslySetInnerHTML={createMarkup()} /> */}
      </div>
    </>
  );
}

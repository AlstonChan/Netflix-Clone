// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import styles from "./SectionFaq.module.scss";
import CancelSvg from "@/icons/CancelSvg";

import DOMPurify from "dompurify";

import { AccordionDataType, SelectedOptionType } from "./types";

interface AccordionCardProps {
  data: AccordionDataType;
  index: number;
  toggleAccordionBar: Function;
  accordionSelection: SelectedOptionType;
}

export default function AccordionCard(props: AccordionCardProps) {
  const { data, index, toggleAccordionBar, accordionSelection } = props;

  function createMarkup(): { __html: string } {
    let txt;

    if (Array.isArray(data.content)) {
      txt = data.content[0] + "<br /><br />" + data.content[1];
      return { __html: DOMPurify.sanitize(txt) };
    }

    txt = data.content;
    return { __html: DOMPurify.sanitize(txt) };
  }

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
        <span dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </>
  );
}

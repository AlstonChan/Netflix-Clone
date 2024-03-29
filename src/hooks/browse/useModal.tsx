// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import type {
  DataType,
  ModalType,
  SmallModalPositionType,
} from "@/components/browse/types";
import type { MouseEvent } from "react";

export type ModalEventType = "mouseenter" | "mouseleave";
export type ToggleModalType = (
  type: ModalEventType,
  e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
  movieData: DataType,
  position: SmallModalPositionType
) => void;

export default function useModal() {
  // set small modals position, width, movie details and translate
  const [modal, setModal] = useState<ModalType | null>(null);
  // To enlarge small modals to a big modals, and close big modals
  const [modalFull, setModalFull] = useState<boolean>(false);

  // To determine the current scroll position of user, used by modal.js
  const scrollPosition = useRef<number | null>(null);

  // To toggle BIG modals
  function modalToggle(state: "open" | "close") {
    if (modalFull && state === "close") {
      // remove react18 automatic batching
      flushSync(() => {
        setModalFull(false);
      });
      if (scrollPosition.current)
        window.scrollTo({
          top: scrollPosition.current,
          left: 0,
          behavior: "auto",
        });
    } else {
      scrollPosition.current = window.scrollY;
      setModalFull(true);
    }
  }

  // function that collects the data for small modals,
  // determine the width and position of modal
  function toggleModal(
    type: ModalEventType,
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
    movieData: DataType,
    position: SmallModalPositionType
  ) {
    if (type === "mouseenter" || modalFull) {
      const element = e.target as HTMLElement;

      const { width, top, bottom, left, right } =
        element.getBoundingClientRect();
      const adjustedY = top + window.scrollY;
      // console.table({ top, bottom, left, right, adjustedY });
      setModal({
        style: { top: adjustedY, left, right, bottom },
        width,
        movieData,
        position,
      });
    }
  }

  return { modal, modalFull, scrollPosition, modalToggle, toggleModal };
}

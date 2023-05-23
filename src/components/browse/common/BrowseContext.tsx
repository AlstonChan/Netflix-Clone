// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import { createContext } from "react";

import type { MutableRefObject } from "react";
import type { DataListType, ModalType } from "@/components/browse/types";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ToggleModalType } from "src/hooks/browse/useModal";

type BrowseContextProps = {
  data: null | (DataListType[] | undefined);
  searchMutation: UseMutationResult<
    any,
    unknown,
    string | null,
    unknown
  > | null;
  modal: ModalType | null;
  modalFull: boolean;
  scrollPosition: MutableRefObject<number | null> | null;
  modalToggle: ((state: "open" | "close") => void) | null;
  toggleModal: ToggleModalType | null;
};
export const BrowseContext = createContext<BrowseContextProps>({
  data: null,
  searchMutation: null,
  modal: null,
  modalFull: false,
  scrollPosition: null,
  modalToggle: null,
  toggleModal: null,
});

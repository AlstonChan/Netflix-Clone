// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

export interface AccordionDataType {
  headers: string;
  content: string | string[];
}

export type SelectedOptionType = { active: boolean; index: number };

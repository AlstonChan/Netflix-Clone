// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import type { ChangeEvent, FocusEvent } from "react";

export type HandleInputClickEvent =
  | FocusEvent<HTMLInputElement, Element>
  | ChangeEvent<HTMLInputElement>;

// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import type { PlanType } from "./types";

export type PlanDetailsType = {
  plan: PlanType;
  desc: string;
  fee: string;
};

export const planDetails: PlanDetailsType[] = [
  {
    plan: "Mobile",
    desc: "Good video quality in SD (480p). Watch on any phone or tablet. Computer and TV not included.",
    fee: "RM17/month",
  },
  {
    plan: "Basic",
    desc: "Good video quality in SD (480p). Watch on any phone, tablet, computer or TV. ",
    fee: "RM35/month",
  },
  {
    plan: "Standard",
    desc: "Great video quality in Full HD (1080p). Watch on any phone, tablet, computer or TV. ",
    fee: "RM45/month",
  },
  {
    plan: "Premium",
    desc: "Our best video quality in Ultra HD (4K) and HDR. Watch on any phone, tablet, computer or TV.",
    fee: "RM55/month",
  },
];

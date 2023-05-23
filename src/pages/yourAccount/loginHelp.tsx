// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston
import ProtectedArea from "@/components/layout/ProtectedArea";

import type { ReactElement } from "react";

export default function LoginHelp() {
  return <h1>Help!!</h1>;
}

LoginHelp.getLayout = (page: ReactElement) => {
  return <ProtectedArea>{page}</ProtectedArea>;
};

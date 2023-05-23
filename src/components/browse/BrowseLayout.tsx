// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-FileCopyrightText: Copyright © 2023 Netflix-Clone Chan Alston

import {
  QueryClientProvider,
  Hydrate,
  QueryClient,
} from "@tanstack/react-query";
import { ReactElement, useState } from "react";
import ProtectedArea from "../layout/ProtectedArea";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface BrowseLayoutProps {
  children: ReactElement;
  pageProps: any;
}

export default function BrowseLayout(props: BrowseLayoutProps) {
  const { children, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ProtectedArea>{children}</ProtectedArea>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </Hydrate>
    </QueryClientProvider>
  );
}

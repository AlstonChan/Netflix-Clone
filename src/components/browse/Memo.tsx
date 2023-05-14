import { memo } from "react";

import type { ReactElement } from "react";

interface MainProps {
  children: ReactElement;
  data: any;
}

// to prevent rerender when update modal state
const Memo = memo(
  (props: MainProps) => {
    const { children } = props;

    return children;
  },

  // I actually don't know why and how it works, it just works
  (prevProps, nextProps) => {
    if (prevProps.data === nextProps.data) {
      return true;
    } else return false;
  }
);

Memo.displayName = "Memo";
export default Memo;

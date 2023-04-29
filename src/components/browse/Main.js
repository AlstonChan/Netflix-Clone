import React from "react";

// to prevent rerender when update modal state
const Main = React.memo(
  ({ children }) => {
    return children;
  },
  // I actually don't know why and how it works, it just works
  (prevProps, nextProps) => {
    if (prevProps.data === nextProps.data) {
      return true;
    } else return false;
  }
);
Main.displayName = "Main";
export default Main;

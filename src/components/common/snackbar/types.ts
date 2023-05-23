export type SnackBarStateType = {
  isOpen: boolean;
  msg: string;
  title?: string;
  variant?: Variant;
};
export type Variant = "success" | "error" | "info" | "warning";

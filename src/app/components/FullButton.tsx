import { Button as B } from "@mui/material";
import { ReactNode } from "react";

interface IButton {
  children: ReactNode;
  onClick?: Function;
  isDisabled?: boolean; // Adding a new prop for the disabled state
}

export default function FullButton({ children, onClick, isDisabled = false }: IButton) {
  return (
    <B
      color="error"
      sx={{ width: "100%" }}
      variant="contained"
      onClick={() => (onClick ? onClick() : "")}
      disabled={isDisabled}
    >
      {children}
    </B>
  );
}

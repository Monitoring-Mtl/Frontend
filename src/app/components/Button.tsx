import { Button as B } from "@mui/material";
import { ReactNode } from "react";

interface IButton {
  className?: string;
  children: ReactNode;
  onClick?: Function;
}

export default function Button({ children, onClick, className }: IButton) {
  return (
    <B
      color="error"
      variant="outlined"
      onClick={() => (onClick ? onClick() : "")}
      className={className}
    >
      {children}
    </B>
  );
}

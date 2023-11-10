import { Button as B } from "@mui/material";
import { ReactNode } from "react";

interface IButton {
  children: ReactNode;
  onClick?: Function;
}

export default function Button({ children, onClick }: IButton) {
  return (
    <B
      color="error"
      variant="contained"
      onClick={() => (onClick ? onClick() : "")}
    >
      {children}
    </B>
  );
}

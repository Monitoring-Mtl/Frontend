import { Button as B } from "@mui/material";
import { ReactNode } from "react";

interface IButton {
  children: ReactNode;
  onClick?: Function;
}

export default function FullButton({ children, onClick }: IButton) {
  return (
    <B
      color="error"
      sx={{ width: "100%" }}
      variant="contained"
      onClick={() => (onClick ? onClick() : "")}
    >
      {children}
    </B>
  );
}

import { ReactNode } from "react";

interface IRow {
  className?: string;
  children: ReactNode;
}

export default function Row({ children, className }: IRow) {
  return (
    <div
      className={
        "grid gap-y-8 gap-x-8 grid-cols-12 pt-8 pl-8 pr-8" + (className ?? "")
      }
    >
      {children}
    </div>
  );
}

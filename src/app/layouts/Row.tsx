import { ReactNode } from "react";

interface IRow {
  gap?: number;
  className?: string;
  children: ReactNode;
}

export default function Row({ gap, children, className }: IRow) {
  if (!gap) gap = 8;
  return (
    <div
      style={{
        paddingTop: (gap / 4).toString() + "rem",
      }}
      className={`grid gap-x-8 grid-cols-12 pl-8 pr-8` + (className ?? "")}
    >
      {children}
    </div>
  );
}

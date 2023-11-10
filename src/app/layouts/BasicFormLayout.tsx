import { ReactNode } from "react";
import FullButton from "../components/FullButton";

interface IBasicFormLayout {
  title: string;
  children: ReactNode;
  submitText: string;
  onSubmit: Function;
}

export default function BasicFormLayout({
  title,
  children,
  submitText,
  onSubmit,
}: IBasicFormLayout) {
  return (
    <div className="relative h-full">
      <div className="p-2">
        <h2>{title}</h2>
        {children}
      </div>
      <div></div>
      <FullButton onClick={() => onSubmit()}>{submitText}</FullButton>
    </div>
  );
}

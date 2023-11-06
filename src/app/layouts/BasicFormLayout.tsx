import { ReactNode } from "react";
import Button from "../../components/Button";

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
    <>
      <h1>{title}</h1>
      <hr />
      {children}
      <hr />
      <Button onClick={() => onSubmit()}>{submitText}</Button>
    </>
  );
}

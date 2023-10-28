import { ReactNode, useState } from "react";
import Button from "../components/Button";

interface IBasicForm {
  title: string;
  children: ReactNode;
  submitText: string;
}

export default function BasicForm({ title, children, submitText }: IBasicForm) {
  return (
    <>
      <h1>{title}</h1>
      <hr />
      {children}
      <hr />
      <Button>{submitText}</Button>
    </>
  );
}

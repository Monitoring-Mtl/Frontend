import { ReactNode } from "react";

interface IButton {
  children: ReactNode;
}

export default function Button({ children }: IButton) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
}

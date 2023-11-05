import { ReactNode } from "react";

interface IButton {
  children: ReactNode;
  onClick: Function;
}

export default function Button({ children, onClick }: IButton) {
  return (
    <button
      onClick={() => onClick()}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
}

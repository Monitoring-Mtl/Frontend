interface ITxtDanger {
  children: string;
}

export default function TxtDanger({ children }: ITxtDanger) {
  return <div className="text-red-600">{children}</div>;
}

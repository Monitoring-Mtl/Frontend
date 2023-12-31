type LegendItem = {
  color: string;
  label: string;
};

export interface ILegend {
  items: LegendItem[];
}

export default function Legend({ items }: ILegend) {
  return (
    <div>
      {items.map((i) => (
        <div key={i.label} className="flex flex-row gap-1">
          <div
            style={{ backgroundColor: i.color }}
            className="w-8 h-6 mt-1 rounded"
          ></div>
          <div className="mt-1">{i.label}</div>
        </div>
      ))}
    </div>
  );
}

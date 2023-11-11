import { CardContent, CardHeader } from "@mui/material";
import PieChart, { Pie } from "../components/PieChart";
import Legend, { ILegend } from "./Legend";

interface IPieChartLayout {
  id: string;
  title: string;
  pies: Pie[];
  renderListener: any;
}

export default function PieChartLayout({
  id,
  title,
  pies,
  renderListener,
}: IPieChartLayout) {
  const colors = ["#f8b1b4", "#ef3e45"];
  const colorsReverse = colors.reverse();

  function generateLegend(pies: Pie[]): ILegend {
    return {
      items: pies.map((p, i) => ({
        color: colorsReverse[i],
        label: p.label,
      })),
    };
  }

  const legend: ILegend = generateLegend(pies);

  return (
    <>
      <CardHeader title={title}></CardHeader>
      <CardContent id={id} className="w-full h-96">
        <PieChart
          pies={pies}
          renderListener={renderListener}
          colorRange={colors.reverse()}
        />
      </CardContent>
      <Legend items={legend.items} />
    </>
  );
}

import { useData } from "@/contexts/DataContext";
import { ChartjsOptions } from "@/types/ChartjsOptions";
import { BlueNCS } from "@/utils/color-utils";
import { CardContent, CardHeader } from "@mui/material";
import { BarChart } from "./templates/BarChart";

export const BixiYearlyTripDurationAverageChart = () => {
  const { bixiYearlyAverageTripDurations } = useData();
  const chartOptions: ChartjsOptions = {
    labels: bixiYearlyAverageTripDurations.years,
    data: bixiYearlyAverageTripDurations.averageDurations,
    colors: [BlueNCS],
    xTitle: "Années",
    yTitle: "Temps de trajet moyen (minutes)",
    yBeginAt0: true,
    tooltipLabelCallBack: (context) =>
      `tripCount: ${
        bixiYearlyAverageTripDurations.tripCounts[context.dataIndex]
      }`,
  };

  return (
    <>
      <CardHeader title="Temps de trajet moyen par année"></CardHeader>
      <CardContent id="" className="w-full h-full">
        <BarChart chartOptions={chartOptions} />
      </CardContent>
    </>
  );
};

// const tooltipLabels = [
//   "ont plusieurs sièges disponibles",
//   "ont quelques sièges disponibles",
//   "n'ont aucun siège disponible",
// ];

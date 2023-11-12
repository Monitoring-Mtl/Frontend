import { BarChartLayout } from "@/app/layouts/BarChart"
import { BarChartOptions } from "@/types/BarChartOptions"
import { LightRed, EtsRed, getColorsFromScale } from "@/utils/color-utils";

const occupancyCount = 5;

export const OccupancyChart = ({busData}) => {

    const busCount : number[] = Array(occupancyCount).fill(0);
    busData.forEach(bus => busCount[bus.occupancy]++);

    const chartOptions : BarChartOptions = {
        labels:["Vide", "Faible", "Moyen", "Élevé", "Plein"],
        data:busCount,
        colors:getColorsFromScale(occupancyCount, LightRed, EtsRed),
        xAxisTitle:"Taux d'occupation",
        yAxisTitle:"Nombre d'autobus",
        tooltipLabelCallBack:(context) => `${context.raw} autobus`
    }

    return (
        <BarChartLayout chartOptions={chartOptions}/>
    )
}
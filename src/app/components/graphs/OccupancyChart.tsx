import { CardContent, CardHeader } from "@mui/material";
import { ChartjsOptions } from "@/types/ChartjsOptions"
import { LightRed, EtsRed, getColorsFromScale } from "@/utils/color-utils";
import { BarChart } from "./templates/BarChart";

const occupancyCount = 5;

export const OccupancyChart = ({busData}) => {

    const busCount : number[] = Array(occupancyCount).fill(0);
    busData.forEach(bus => busCount[bus.occupancy]++);

    const chartOptions : ChartjsOptions = {
        labels:["Vide", "Faible", "Moyen", "Élevé", "Plein"],
        data:busCount,
        colors:getColorsFromScale(occupancyCount, LightRed, EtsRed),
        xTitle:"Niveau d'occupation",
        yTitle:"Nombre d'autobus",
        yBeginAt0:true,
        tooltipLabelCallBack:(context) => `${context.raw} autobus`
    }

    return (
        <>
            <CardHeader title="Niveau d&#39;occupation des autobus"></CardHeader>
                <CardContent id="occupancy-chart" className="w-full h-full">
                    <BarChart chartOptions={chartOptions}/>
                </CardContent>
        </>
    )
}
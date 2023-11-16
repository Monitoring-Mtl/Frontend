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
        xAxisTitle:"Niveau d'occupation",
        yAxisTitle:"Nombre d'autobus",
        yAxisBeginAt0:true,
        tooltipLabelCallBack:(context) => `${context.raw} autobus`
    }

    return (
        <>
            <CardHeader title="Niveau d&#39;occupation des autobus"></CardHeader>
                <CardContent className="w-full h-full">
                    <BarChart chartOptions={chartOptions}/>
                </CardContent>
        </>
    )
}
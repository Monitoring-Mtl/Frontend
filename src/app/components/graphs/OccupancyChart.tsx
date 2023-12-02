import { CardContent, CardHeader } from "@mui/material";
import { ChartjsOptions } from "@/types/ChartjsOptions"
import { LightRed, EtsRed, getColorsFromScale } from "@/utils/color-utils";
import { BarChart } from "./templates/BarChart";
import { StmAnalysis } from "@/types/StmAnalysis";

const occupancyCount = 5;

export const OccupancyChart = ({analysis} : IOccupancyChart) => {

    if(!analysis){
        return <CardHeader title={title}></CardHeader>
    }

    const chartOptions : ChartjsOptions = {
        labels: analysis.occupancyLabels,
        data: analysis.occupancies,
        colors:getColorsFromScale(analysis.occupancies.length, LightRed, EtsRed),
        xTitle:"Sièges disponibles",
        yTitle:"Nombre d'autobus",
        yBeginAt0:true,
        tooltipLabelCallBack:(context) => `${context.raw} autobus`
    }

    return (
        <>
            <CardHeader title={title}></CardHeader>
            <CardContent id="occupancy-chart" className="w-full h-full">
                <BarChart chartOptions={chartOptions}/>
            </CardContent>
        </>
    )
}

interface IOccupancyChart {
    analysis?:StmAnalysis
}

const title = "Niveau d'occupation des autobus";
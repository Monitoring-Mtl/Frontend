import { CardContent, CardHeader } from "@mui/material";
import { ChartjsOptions } from "@/types/ChartjsOptions"
import { BlueNCS, Canary, ImperialRed } from "@/utils/color-utils";
import { BarChart } from "./templates/BarChart";
import { StmAnalysis } from "@/types/StmAnalysis";

export const OccupancyChart = ({analysis} : IOccupancyChart) => {

    const chartOptions : ChartjsOptions = {
        labels: analysis.occupancyLabels,
        data: analysis.occupancies,
        colors: [BlueNCS, Canary, ImperialRed],
        xTitle:"Niveau d'occupation",
        yTitle:"Nombre d'autobus",
        yBeginAt0:true,
        tooltipLabelCallBack:(context) => `${context.raw} autobus ${tooltipLabels[context.dataIndex]}`
    }

    return (
        <>
            <CardHeader title="Niveau d'occupation des autobus"></CardHeader>
            <CardContent id="occupancy-chart" className="w-full h-full">
                <BarChart chartOptions={chartOptions}/>
            </CardContent>
        </>
    )
}

interface IOccupancyChart {
    analysis:StmAnalysis
}

const tooltipLabels = ["ont plusieurs sièges disponibles", "ont quelques sièges disponibles", "n'ont aucun siège disponible"]
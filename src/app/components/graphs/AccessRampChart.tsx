import { CardContent, CardHeader } from "@mui/material";
import PieChart from "./templates/PieChart";
import Legend from "../../layouts/Legend";
import { LightRed, EtsRed, LightGreen, Green, getColorsFromScale } from "@/utils/color-utils";
import { StmAnalysis } from "@/types/StmAnalysis";

export const AccessRampChart = ({analysis} : IAccessRampChart)  => {

    if (!analysis){
        return <CardHeader title={title}></CardHeader>
    }

    const colors = getColorsFromScale(3, EtsRed, LightRed);

    const labelCallback = (data) =>  `${((data / analysis.offsets.length) * 100).toFixed(1)}%`;
    const tooltipCallback = (data) => `${data} autobus`;

    const arcs = [
        {
          label: analysis.accessibilityLabels[0],
          value: analysis.accessibilities[0],
        },
        {
          label: analysis.accessibilityLabels[1],
          value: analysis.accessibilities[1],
        },
        {
          label: analysis.accessibilityLabels[2],
          value: analysis.accessibilities[2],
        },
    ];

    return (
        <>
            <CardHeader title={title}></CardHeader>
            <CardContent id="ramp-chart" className="w-full h-96">
                <PieChart
                    arcs={arcs}
                    colors={colors}
                    labelCallback={labelCallback}
                    tooltipCallback={tooltipCallback}
                />
            </CardContent>
            <Legend 
                items={arcs.map((p, i) => (
                    {
                        color: colors[i],
                        label: p.label,
                    })
                )} 
            />
        </>
    )
}

interface IAccessRampChart {
    analysis?:StmAnalysis
}

const title = "Autobus ayant une rampe d'accès";
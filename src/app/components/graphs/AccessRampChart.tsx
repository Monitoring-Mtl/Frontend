import { CardContent, CardHeader } from "@mui/material";
import PieChart from "./templates/PieChart";
import Legend from "../../layouts/Legend";
import { LightRed, EtsRed, LightGreen, Green, getColorsFromScale } from "@/utils/color-utils";
import { StmAnalysis } from "@/types/StmAnalysis";

interface IAccessRampChart {
    stmAnalysis?:StmAnalysis
}

const title = "Autobus ayant une rampe d'accès";

export const AccessRampChart = ({stmAnalysis} : IAccessRampChart)  => {

    if (!stmAnalysis){
        return <CardHeader title={title}></CardHeader>
    }

    const colors = getColorsFromScale(3, EtsRed, LightRed);

    const labelCallback = (data) =>  `${((data / stmAnalysis.offsets.length) * 100).toFixed(1)}%`;
    const tooltipCallback = (data) => `${data} autobus`;

    const arcs = [
        {
          label: stmAnalysis.accessibilityLabels[0],
          value: stmAnalysis.accessibilities[0],
        },
        {
          label: stmAnalysis.accessibilityLabels[1],
          value: stmAnalysis.accessibilities[1],
        },
        {
          label: stmAnalysis.accessibilityLabels[2],
          value: stmAnalysis.accessibilities[2],
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
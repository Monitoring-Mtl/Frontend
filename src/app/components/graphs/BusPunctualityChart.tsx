import { CardContent, CardHeader } from "@mui/material";
import { ChartjsOptions } from "@/types/ChartjsOptions";
import {LightGreen, Green, LightRed, EtsRed} from "@/utils/color-utils";
import { ScatterPlot } from "./templates/ScatterPlot";
import { integerDivision, mean, median } from "@/utils/math-utils";
import { StmAnalysis } from "@/types/StmAnalysis";

export const BusPunctualityChart = ({analysis } : IBusPunctualityChart)  => {

    const scatterFormatData = analysis.offsets.map((offset, i) => ({
        x: i + 1,
        y: integerDivision(offset, 60),
    }));
    
    const minuteOffsets = analysis.offsets.map((offset) => integerDivision(offset, 60));
    const colors = minuteOffsets.map(toColor);

    const chartOptions: ChartjsOptions = {
        labels: [],
        data: scatterFormatData,
        colors: colors,
        xTitle: "",
        yTitle: "Décalage avec l'horaire (minutes)",
        yBeginAt0: false,
        tooltipLabelCallBack: (context) => offsetToString(context.raw.y),
    };

    return (
        <>
            <CardHeader title="Ponctualité des autobus"></CardHeader>
            <CardContent id="punctuality-chart" className="w-full h-full">
                <div className="flex flex-col w-full h-5/6">
                    <ScatterPlot chartOptions={chartOptions} />
                    <span>
                        <strong>Moyenne: </strong>
                        {offsetToString(mean(minuteOffsets).toFixed(1))}
                    </span>
                    <span>
                        <strong>Médiane: </strong>
                        {offsetToString(median(minuteOffsets).toFixed(1))}
                    </span>
                </div>
            </CardContent>
        </>
    );
};

interface IBusPunctualityChart {
    analysis: StmAnalysis
}

const toColor = (offset) => {
    if (offset <= -5){
        return Green;
    }

    if (offset < 1){
        return LightGreen;
    }

    if (offset < 5){
        return LightRed;
    }

    return EtsRed;
}

const offsetToString = (offset) => {
    if (offset == 0) {
        return "Arrivé à temps";
    }

    const absOffset = Math.abs(offset);
    const timeUnit = ` ${absOffset > 1 ? "minutes" : "minute"}`;
    const timeQualifier = ` ${offset < 0 ? "en avance" : "en retard"}`;

    return absOffset + timeUnit + timeQualifier;
};

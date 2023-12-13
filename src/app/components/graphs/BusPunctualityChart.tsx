import { CardContent, CardHeader } from "@mui/material";
import { ChartjsOptions } from "@/types/ChartjsOptions";
import {LightGreen, Erin, SalmonPink, ImperialRed, getColorsFromScale} from "@/utils/color-utils";
import { ScatterPlot } from "./templates/ScatterPlot";
import { integerDivision, mean, median } from "@/utils/math-utils";
import { StmAnalysis } from "@/types/StmAnalysis";

export const BusPunctualityChart = ({analysis } : IBusPunctualityChart)  => {

    const scatterFormatData = analysis.offsets.map((offset, i) => ({
        x: i + 1,
        y: integerDivision(offset, 60),
    }));
    
    const minuteOffsets = analysis.offsets.map((offset) => integerDivision(offset, 60));
    const colors = toColors(minuteOffsets);

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
                        {offsetToString((mean(analysis.offsets)/60).toFixed(1))}
                    </span>
                    <span>
                        <strong>Médiane: </strong>
                        {offsetToString((median(analysis.offsets)/60).toFixed(1))}
                    </span>
                </div>
            </CardContent>
        </>
    );
};

interface IBusPunctualityChart {
    analysis: StmAnalysis
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

const toColors = (offsets) => {
    const greens = getColorsFromScale(Math.max(Math.abs(Math.min(...offsets)) + 1, 2), LightGreen, Erin);
    const reds = getColorsFromScale(Math.max(...offsets), SalmonPink, ImperialRed);
    return offsets.map(offset => offset <= 0 ? greens[Math.abs(offset)] : reds[offset-1]);
}

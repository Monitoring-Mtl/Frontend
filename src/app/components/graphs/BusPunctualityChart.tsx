import { CardContent, CardHeader } from "@mui/material";
import { ChartjsOptions } from "@/types/ChartjsOptions";
import * as colorUtils from "@/utils/color-utils";
import { ScatterPlot } from "./templates/ScatterPlot";
import { integerDivision, mean, median } from "@/utils/math-utils";
import { StmAnalysis } from "@/types/StmAnalysis";

export const BusPunctualityChart = ({analysis } : IBusPunctualityChart)  => {

    if (!analysis){
        return <CardHeader title={title}></CardHeader>
    }

    const scatterFormatData = analysis.offsets.map((offset, i) => ({
        x: i + 1,
        y: integerDivision(offset, 60),
    }));
    const minuteOffsets = analysis.offsets.map((offset) => integerDivision(offset, 60));
    const colors = generateColors(analysis.offsets);

    const chartOptions: ChartjsOptions = {
        labels: [],
        data: scatterFormatData,
        colors: colors,
        xTitle: "",
        yTitle: "Décalage avec le temps d'arrivé prévu (minutes)",
        yBeginAt0: false,
        tooltipLabelCallBack: (context) => offsetToString(context.raw.y),
    };

    return (
        <>
            <CardHeader title={title}></CardHeader>
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
    analysis?: StmAnalysis
}

const title = "Ponctualité des autobus";

const timeDivisor: number = 20;

const toColorIndex = (value) => integerDivision(Math.abs(value), timeDivisor);

const generateColors = (data) => {
    const nbGreens = toColorIndex(Math.min(...data)) + 1;
    const nbReds = toColorIndex(Math.max(...data)) + 1;

    const greens = colorUtils.getColorsFromScale(
        nbGreens,
        colorUtils.LightGreen,
        colorUtils.Green
    );
    const reds = colorUtils.getColorsFromScale(
        nbReds,
        colorUtils.LightRed,
        colorUtils.EtsRed
    );

    return data.map((offset) =>
        offset <= 0 ? greens[toColorIndex(offset)] : reds[toColorIndex(offset)]
    );
};

const offsetToString = (offset) => {
    if (offset === 0) {
        return "Arrivé à temps";
    }

    const absOffset = Math.abs(offset);
    const timeUnit = ` ${absOffset > 1 ? "minutes" : "minute"}`;
    const timeQualifier = ` ${offset < 0 ? "d'avance" : "de retard"}`;

    return absOffset + timeUnit + timeQualifier;
};

import { CardContent, CardHeader } from "@mui/material";
import { ChartjsOptions } from "@/types/ChartjsOptions"
import * as colorUtils from "@/utils/color-utils";
import { ScatterPlot } from "./templates/ScatterPlot";
import { integerDivision, mean, median } from "@/utils/math-utils";

export const BusPunctualityChart = ({busData}) => {

    const scatterFormatData = busData.map((bus, i) => ({x:i+1, y:integerDivision(bus.punctuality, 60)}));
    const offsets = busData.map((bus) => bus.punctuality);
    const colors = generateColors(offsets);

    const chartOptions : ChartjsOptions = {
        labels:[],
        data:scatterFormatData,
        colors:colors,
        xTitle:"",
        yTitle:"Décalage avec le temps d'arrivé prévu (minutes)",
        yBeginAt0:false,
        tooltipLabelCallBack:(context) => offsetToString(context.raw.y)
    }

    return (
        <>
            <CardHeader title="Ponctualité des autobus"></CardHeader>
            <CardContent id="punctuality-chart" className="w-full h-full">
                <div className="flex flex-col w-full h-5/6">
                    <ScatterPlot chartOptions={chartOptions}/>
                    <span><strong>Moyenne: </strong>{offsetToString(mean(offsets).toFixed(1))}</span>
                    <span><strong>Médiane: </strong>{offsetToString(median(offsets).toFixed(1))}</span>
                </div>
            </CardContent>
        </>
    )
}

const timeDivisor : number = 20;

const toColorIndex = (value) => integerDivision(Math.abs(value), timeDivisor);

const generateColors = (data) => {
    const nbGreens = toColorIndex(Math.min(...data)) + 1;
    const nbReds = toColorIndex(Math.max(...data)) + 1;
    
    const greens = colorUtils.getColorsFromScale(nbGreens, colorUtils.LightGreen, colorUtils.Green);
    const reds = colorUtils.getColorsFromScale(nbReds, colorUtils.LightRed, colorUtils.EtsRed);

    return data.map(offset => offset <= 0 ? greens[toColorIndex(offset)] : reds[toColorIndex(offset)]);
}

const offsetToString = (offset) => {
    if (offset === 0){
        return "Arrivé à temps"
    }

    const absOffset = Math.abs(offset);
    const timeUnit = ` ${absOffset > 1 ? "minutes" : "minute"}`
    const timeQualifier = ` ${offset < 0 ? "d'avance" : "de retard"}`

    return absOffset + timeUnit + timeQualifier;
}
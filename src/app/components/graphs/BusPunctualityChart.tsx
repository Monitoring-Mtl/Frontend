import { CardContent, CardHeader } from "@mui/material";
import { ChartjsOptions } from "@/types/ChartjsOptions"
import * as colorUtils from "@/utils/color-utils";
import { ScatterPlot } from "./templates/ScatterPlot";
import { integerDivision } from "@/utils/math-utils";

export const BusPunctualityChart = ({busData}) => {

    const data = busData.map((bus, i) => ({x:i+1, y:bus.punctuality}));
    const colors = generateColors(busData.map((bus) => bus.punctuality))

    const chartOptions : ChartjsOptions = {
        labels:["Test"],
        data:data,
        colors:colors,
        xAxisTitle:"",
        yAxisTitle:"Décalage avec le temps d'arrivé prévu (secondes)",
        yAxisBeginAt0:false,
        tooltipLabelCallBack:(context) => offsetToString(context.raw.y)
    }

    return (
        <>
            <CardHeader title="Ponctualité des autobus"></CardHeader>
            <CardContent id="punctuality-chart" className="w-full h-full">
                <ScatterPlot chartOptions={chartOptions}/>
            </CardContent>
        </>
    )
}

const timeDivisor : number = 1000;

const toColorIndex = (value) => integerDivision(Math.abs(value), timeDivisor);

const generateColors = (data) => {
    const nbGreens = toColorIndex(Math.min(...data)) + 1;
    const nbReds = toColorIndex(Math.max(...data)) + 1;
    
    const greens = colorUtils.getColorsFromScale(nbGreens, colorUtils.LightGreen, colorUtils.Green);
    const reds = colorUtils.getColorsFromScale(nbReds, colorUtils.LightRed, colorUtils.EtsRed);

    return data.map(offset => offset <= 0 ? greens[toColorIndex(offset)] : reds[toColorIndex(offset)]);
}

const timeUnitToString = (absOffset) => {
    const numericValue = absOffset < 60 ? absOffset : integerDivision(absOffset, 60);
    const timeUnit = absOffset < 60 ? " seconde" : " minute";

    return numericValue + (numericValue > 1 ? timeUnit + "s" : timeUnit);
}

const offsetToString = (offset) => {
    const timeUnit = timeUnitToString(Math.abs(offset))
    const timeQualifier = ` ${offset < 0 ? "d'avance" : "de retard"}`

    return timeUnit + timeQualifier;
}
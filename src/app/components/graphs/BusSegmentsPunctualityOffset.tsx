import { CardContent, CardHeader } from "@mui/material";
import { ChartjsOptions } from "@/types/ChartjsOptions";
import {LightGreen, Erin, SalmonPink, ImperialRed, getColorsFromScale} from "@/utils/color-utils";
import { ScatterPlot } from "./templates/ScatterPlot";
import { integerDivision, mean, median } from "@/utils/math-utils";
import { StmAnalysis } from "@/types/StmAnalysis";
import { Stop } from "@/types/Stop";

export const BusSegmentsPunctualityOffset = ({analysis, stops} : IBusSegmentsPunctualityOffset)  => {

    const stopsMap = buildStopsMap(stops);

    const offsetToString = (offset, stop_id = "", previous_stop_id = "") => {
    
        const previous_stop_name = stopsMap.hasOwnProperty(previous_stop_id.toString()) ? stopsMap[previous_stop_id.toString()].name : previous_stop_id;
        const stop_name = stopsMap.hasOwnProperty(stop_id.toString()) ? stopsMap[stop_id.toString()].name : stop_id;
        const segment = (stop_id != "" && previous_stop_id != "") ? previous_stop_name + " vers " + stop_name + ": " : "";

        let absOffset = Math.abs(offset);
        let timeUnit, timeQualifier;

        if (offset == 0) {
            return segment + " arrivé à temps";
        }

        if (absOffset < 1) { // Moins d'une minute
            absOffset = offset * 60;  // Minutes en secondes
            timeUnit = Math.round(absOffset) === 1 ? " seconde" : " secondes";
        } else {
            timeUnit = Math.round(absOffset) === 1 ? " minute" : " minutes";
        }

        if (timeUnit === " seconde" || timeUnit === " minute") {
            timeQualifier = offset < 0 ? " perdue" : " récupérée";
        } else {
            timeQualifier = offset < 0 ? " perdues" : " récupérées";
        }
    
        return segment + absOffset + timeUnit + timeQualifier;
    };

    const scatterFormatData = analysis.average_offset_differences.map((item, i) => ({
        x: i + 1,
        y: integerDivision(item.average_offset_difference, 60),
        stop_id: item.stop_id,
        previous_stop_id: item.previous_stop_id
    }));
    
    
    const minuteOffsets = analysis.average_offset_differences.map((offset) => integerDivision(offset.average_offset_difference, 60));
    const colors = toColors(minuteOffsets);

    const chartOptions: ChartjsOptions = {
        labels: [],
        data: scatterFormatData,
        colors: colors,
        xTitle: "",
        yTitle: "Retard moyen repris (mins)",
        yBeginAt0: false,
        tooltipLabelCallBack: (context) => offsetToString(context.raw.y, context.raw.stop_id, context.raw.previous_stop_id),
    };

    return (
        <>
            <CardHeader title="Retard moyen repris entre les arrets sur la ligne"></CardHeader>
            <CardContent id="punctuality-chart" className="w-full h-full">
                <div className="flex flex-col w-full h-6/6">
                    <ScatterPlot chartOptions={chartOptions} />
                </div>
            </CardContent>
        </>
    );
};

interface IBusSegmentsPunctualityOffset {
    analysis: StmAnalysis
    stops: Stop[]
}

const buildStopsMap = (stops: Stop[]) => {
    const hashmap: { [key: string]: Stop } = {};

    stops.forEach(stop => {
        hashmap[stop.id] = stop;
    });
    return hashmap;
}

const toColors = (offsets) => {
    const greens = getColorsFromScale(Math.max(Math.abs(Math.min(...offsets)) + 1, 2), SalmonPink, ImperialRed);
    const reds = getColorsFromScale(Math.max(...offsets), LightGreen, Erin);
    return offsets.map(offset => offset <= 0 ? greens[Math.abs(offset)] : reds[offset-1]);
}

import * as d3 from 'd3';

export const LightRed : string = "#f8b1b4";
export const EtsRed : string = "#ef3e45";
export const EtsCharcoal : string = "#414042";
export const LightGreen : string = "#b1f8b2";
export const Green : string = "#3eef45";

export const getColorsFromScale = (nbOfColors:number, fromColor:string, toColor:string) => {
    const colorScale = d3.scaleSequential(d3.interpolate(fromColor, toColor));
    return d3.range(nbOfColors).map((d) => colorScale(d / (nbOfColors - 1)));
}
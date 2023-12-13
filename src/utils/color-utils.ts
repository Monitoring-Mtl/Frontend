import * as d3 from 'd3';

export const SalmonPink : string = "#F79EA1";
export const ImperialRed : string = "#ef3e45";
export const Onyx : string = "#414042";
export const LightGreen : string = "#9EF7A1";
export const Erin : string = "#3eef45";
export const BlueNCS : string = "#0085ca";
export const Canary : string = "#ffe716";

export const getColorsFromScale = (nbOfColors:number, fromColor:string, toColor:string) => {
    const colorScale = d3.scaleSequential(d3.interpolate(fromColor, toColor));
    return d3.range(nbOfColors).map((d) => colorScale(d / (nbOfColors - 1)));
}
export type ChartjsOptions = {
    labels:string[];
    data: number[] | { x: number; y: number;}[];
    colors: string[];
    xTitle: string;
    yTitle: string;
    yBeginAt0: boolean;
    tooltipLabelCallBack?;
}
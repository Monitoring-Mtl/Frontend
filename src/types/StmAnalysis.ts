import { SegmentDataAnalysis } from "./StmSegmentAnalysis";

export type StmAnalysis = {
    offsets:number[];
    occupancies:number[];
    occupancyLabels:string[];
    accessibilities:number[];
    accessibilityLabels:string[];
    average_offset_differences: SegmentDataAnalysis[];
}
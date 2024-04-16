export type SegmentData = {
    _id: string;
    index: number;
    stop_id: number;
    routeId: number;
    previous_stop_id: number;
    offset_difference: number;
    Current_Occupancy: string;
    arrival_time_unix: number;
    trip_id: number;
    shape_id: number;
}

export type SegmentDataAnalysis = {
    stop_id: number;
    previous_stop_id: number;
    average_offset_difference: number;
}
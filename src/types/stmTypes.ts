export type BusData = {
    punctuality:number;
    occupancy:number; // TODO probably change to enum or string depending on API format
    hasAccessRamp:boolean;
}

export type RampAccessSchedule = {
    date:Date
}
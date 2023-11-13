export type BusData = {
    punctuality:number;
    occupancy:number; // TODO probably change to enum or string depending on API format
    hasAccessRamp:boolean;
}

export type RampAccessSchedule = {
    date:Date
}

export type RouteShape = {
    id:string;
    coordinates;
}

export type Stop = {
    id:string;
    name:string;
    coordinates;
}

export type Route = {
    id:number;
    name:string;
}
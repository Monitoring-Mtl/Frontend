import { BusData, RampAccessSchedule, Stop, RouteShape } from "@/types/mapTypes";

export interface IStmFactory{
    createBusData(data:JSON) : BusData[] | null
    createRampAccessSchedule(data:JSON) : RampAccessSchedule[] | null
    createRouteShape(data:JSON) : RouteShape | null
    createStops(data:JSON) : Stop[] | null
}
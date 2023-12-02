import { fromLonLat } from 'ol/proj';
import { RampAccessSchedule} from "@/types/stmTypes";
import { Direction } from '@/types/Direction';
import { Route } from '@/types/Route';
import { Stop } from '@/types/Stop';
import { RouteShape } from '@/types/RouteShape';
import { StmAnalysis } from '@/types/StmAnalysis';

export class StmFactory {

    static createRampAccessSchedule(data: JSON) : RampAccessSchedule[] | null {
        let rampAccessSchedules : RampAccessSchedule[] = [];
        for (let i = 0; i < 50; i++){
            const date = new Date();
            date.setHours(random(0,24));
            date.setMinutes(random(0, 60));
            date.setSeconds(0);
            date.setMilliseconds(0);
            rampAccessSchedules.push({date});
        }

        rampAccessSchedules.sort((a, b) => a.date.getTime() - b.date.getTime());

        return rampAccessSchedules;
    }

    static createRouteShape(data: JSON) : RouteShape | null{

        if (!data){
            return null;
        }

        let shapes = data[shapeProperties.shape];

        if (!shapes || shapes.length < 2){
            return null;
        }

        let coordinates:any[] = [];
        shapes.forEach(shape => {
            const longitude = shape[shapeProperties.longitude];
            const latitude = shape[shapeProperties.latitude];
            if (longitude && latitude){
                coordinates.push(fromLonLat([longitude, latitude]));
            }
        });
        
        let shapeId : string = shapes[0][shapeProperties.id];

        return {
            id:shapeId, 
            coordinates
        }
    }

    static createRoutes(json:JSON) : Route[]{
        const data = json["data"];

        const routes : Route[] = [];

        data.forEach(routeData => {
            const directions : Direction[] = createRouteDirections(routeData[routeProperties.info]);
            routes.push({
                id: routeData[routeProperties.id],
                name: routeData[routeProperties.name],
                shortName: routeData[routeProperties.shortName],
                directions: directions,
            });
        });

        return routes;
    }

    static createStmAnalysis(json:JSON) : StmAnalysis | null {
        if(!json){
            return null;
        }

        const offsets = json[stmAnalysisProperties.offsets];

        const occupancyObject = json[stmAnalysisProperties.occupancies];
        const occupancies = stmAnalysisProperties.occupancyLevels.map(level => occupancyObject[level]);

        const accessibilityObject = json[stmAnalysisProperties.accessibilities];
        const accessibilities = stmAnalysisProperties.accessibilityLevels.map(level => accessibilityObject[level]);

        return {
            offsets: offsets,
            occupancies: occupancies,
            occupancyLabels: ["Plusieurs", "Quelques-uns", "Aucun"],
            accessibilities: accessibilities,
            accessibilityLabels: ["N'ont pas une rampe d'accès", "Ont une rampe d'accès et une place", "Ont une rampe d'accès et deux places"]
        };
    }
}

const random = (min:number, max:number) => Math.floor(Math.random() *  (max - min) + min);

const routeProperties = {
    id : "route_id",
    info : "route_info",
    name : "route_long_name",
    shortName : "route_short_name",
}

const directionProperties = {
    name : "direction",
    shapeId : "shape_id",
    stops : "stops"
}

const stopProperties = {
    id : "stop_id",
    name : "stop_name",
    latitude : "stop_lat",
    longitude :"stop_lon"
}

const shapeProperties = {
    shape : "response",
    id : "shape_id",
    longitude : "shape_pt_lon",
    latitude : "shape_pt_lat",
}

const stmAnalysisProperties = {
    offsets : "offsetArray",
    occupancies : "seatOccupancyCounts",
    occupancyLevels : ["many_seats_available", "few_seats_available", "standing_room_only"],
    accessibilities : "busWheelchairLevelCounts",
    accessibilityLevels : ["not_accessible", "accessible_1", "accessible_2"]
}

const createStops = (data) : Stop[] => {
    if (!data){
        return [];
    }

    const stops : Stop[] = [];

    data.forEach(stopData => {
        const longitude = stopData[stopProperties.longitude];
        const latitude = stopData[stopProperties.latitude];

        stops.push({
            id : stopData[stopProperties.id],
            name: stopData[stopProperties.name],
            coordinates: fromLonLat([longitude, latitude])
        });
    });

    return stops;
}

const createRouteDirections = (data) : Direction[] => {
    if (!data){
        return [];
    }

    const directions : Direction[] = [];

    data.forEach(directionData => {
        const stops : Stop[] = createStops(directionData[directionProperties.stops]);
        directions.push({
            name: directionData[directionProperties.name],
            shapeId: directionData[directionProperties.shapeId],
            stops: stops
        });
    });

    return directions;
}
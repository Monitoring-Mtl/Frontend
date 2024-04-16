import { fromLonLat } from 'ol/proj';
import { Direction } from '@/types/Direction';
import { Route } from '@/types/Route';
import { Stop } from '@/types/Stop';
import { RouteShape } from '@/types/RouteShape';
import { StmAnalysis } from '@/types/StmAnalysis';
import { SegmentData, SegmentDataAnalysis } from '@/types/StmSegmentAnalysis';

export class StmFactory {

    static createRouteShape(data: JSON) : RouteShape | null{
        if (!data){
            return null;
        }

        let shapes = data[shapeProperties.shape];

        if (!shapes || shapes.length < 2){
            return null;
        }

        let coordinates:any[] = [];
        let colors: string[] = []
        shapes.forEach(shape => {
            const longitude = shape[shapeProperties.longitude];
            const latitude = shape[shapeProperties.latitude];
            if (longitude && latitude){
                coordinates.push(fromLonLat([longitude, latitude]));
            }
            colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));//TODO: CHANGER LA CRISS DE COULEUR
        });

        let shapeId : string = shapes[0][shapeProperties.id];
        
        return {
            id:shapeId, 
            coordinates,
            colors   
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

    static createStmAnalysis(json:JSON, average_offset_difference: SegmentDataAnalysis[]) : StmAnalysis | null {
        if(!json){
            return null;
        }

        const offsets = json[stmAnalysisProperties.offsets];

        if (!offsets || offsets.length < 1){
            return null;
        }

        const occupancyObject = json[stmAnalysisProperties.occupancies];
        const occupancies = stmAnalysisProperties.occupancyLevels.map(level => occupancyObject[level]);

        const accessibilityObject = json[stmAnalysisProperties.accessibilities];
        const accessibilities = stmAnalysisProperties.accessibilityLevels.map(level => accessibilityObject[level]);

        return {
            offsets: offsets,
            occupancies: occupancies,
            occupancyLabels: ["Faible", "Moyen", "Élevé"],
            accessibilities: accessibilities,
            accessibilityLabels: ["N'ont pas une rampe d'accès", "Ont une rampe d'accès et une place", "Ont une rampe d'accès et deux places"],
            average_offset_differences: average_offset_difference
        };
    }

    static createSegmentsData(json:JSON) : SegmentData[] | null {
        if(!json){
            return null;
        }
        // Map into StmSegmentAnalysis
        if (Array.isArray(json) && json.length > 0) {
            let segments: SegmentData[] = json.map(item => {
                return <SegmentData>({
                    _id: String(item._id),
                    index: Number(item.index),
                    stop_id: Number(item.stop_id),
                    routeId: Number(item.routeId),
                    previous_stop_id: Number(item.previous_stop_id),
                    offset_difference: Number(item.offset_difference),
                    Current_Occupancy: String(item.Current_Occupancy),
                    arrival_time_unix: Number(item.arrival_time_unix),
                    trip_id: Number(item.trip_id),
                    shape_id: Number(item.shape_id)
                
                })
            });

            return segments;
        }

        return null;
    }

    static createSegmentsAnalysis(json:JSON) : SegmentDataAnalysis[] | null {
        if(!json){
            return null;
        }
        // Map into StmSegmentAnalysis
        if (Array.isArray(json) && json.length > 0) {
            let segmentsAnalysis: SegmentDataAnalysis[] = json.map(item => {
                return <SegmentDataAnalysis>({
                    stop_id: Number(item._id.stop_id),
                    previous_stop_id: Number(item._id.previous_stop_id),
                    average_offset_difference: Number(item.average_offset_difference),
                })
            });

            return segmentsAnalysis;
        }

        return null;
    }
}

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
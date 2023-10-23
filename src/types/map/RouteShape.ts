import { fromLonLat } from 'ol/proj';

export class RouteShape {
    
    private static shapeProperty : string = "shape";
    private static shapeIdProperty : string = "shape_id"
    private static shapeLongitudeProperty : string = "shape_pt_lon";
    private static shapeLatitudeProperty : string = "shape_pt_lat";
    
    id:string;
    coordinates;

    constructor(id:string, coordinates){
        this.id = id;
        this.coordinates = coordinates;
    }

    static createRouteShape(data){

        if (!data || !(this.shapeProperty in data)){
            return null;
        }

        let shapes = data[this.shapeProperty];

        if (!shapes || shapes.length < 2){
            return null;
        }

        let coordinates:any[] = [];
        shapes.forEach(shape => {
            const longitude = shape[this.shapeLongitudeProperty];
            const latitude = shape[this.shapeLatitudeProperty];
            if (longitude && latitude){
                coordinates.push(fromLonLat([longitude, latitude]))
            }
        });
        
        let shapeId : string = shapes[0][this.shapeIdProperty];

        return new RouteShape(shapeId, coordinates);
    }
}
import { RouteShape } from "../../types/map/RouteShape";
import { SampleShapeData } from "./SampleShape";

export class ServerlessApiService {

    private static ShapeBaseUrl : string = "https://94z4jf0434.execute-api.us-east-1.amazonaws.com/prod/api/v1/shapes/"

    public static async getShape(id:string){
        //const response = await fetch(this.ShapeBaseUrl, { method: "GET"});
        return RouteShape.createRouteShape(SampleShapeData);
    }
}
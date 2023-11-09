
import { StmFactory } from "@/factories/StmFactory";

export class ServerlessApiService {

    private static shapeBaseUrl : string = "https://94z4jf0434.execute-api.us-east-1.amazonaws.com/prod/api/v1/shapes/"

    public static async GetBusData(routeId:string, stopId:string){
        return StmFactory.createBusData(JSON.parse("{}"));
    }

    public static async GetRampAccessSchedule(routeId:string, stopId:string){
        return StmFactory.createRampAccessSchedule(JSON.parse("{}"));
    }

    public static async getShape(routeId:string){
        //const response = await fetch(this.shapeBaseUrl+id, { method: "GET"});
        return StmFactory.createRouteShape(JSON.parse("{}"));
    }

    public static async GetStops(routeId:string){
        return StmFactory.createStops(JSON.parse("{}"));
    }
}
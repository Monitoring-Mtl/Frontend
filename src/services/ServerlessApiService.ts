import { IStmFactory } from "@/factories/factoryInterfaces";
import { MockStmFactory } from "@/factories/mocks/MockStmFactory";

export class ServerlessApiService {

    private static factory : IStmFactory = new MockStmFactory();

    private static shapeBaseUrl : string = "https://94z4jf0434.execute-api.us-east-1.amazonaws.com/prod/api/v1/shapes/"

    public static async GetBusData(routeId:string, stopId:string){
        return this.factory.createBusData(JSON.parse("{}"));
    }

    public static async GetRampAccessSchedule(routeId:string, stopId:string){
        return this.factory.createRampAccessSchedule(JSON.parse("{}"));
    }

    public static async getShape(routeId:string){
        //const response = await fetch(this.shapeBaseUrl+id, { method: "GET"});
        return this.factory.createRouteShape(JSON.parse("{}"));
    }

    public static async GetStops(routeId:string){
        return this.factory.createStops(JSON.parse("{}"));
    }
}

import { StmFactory } from "@/factories/StmFactory";

const baseUrl = "https://mb8ec8s5e9.execute-api.ca-central-1.amazonaws.com/prod/api/v1/"
const routesEndpoint = "routes";

export class ServerlessApiService {

    public static async GetBusData(routeId:string, stopId:string){
        return StmFactory.createBusData(JSON.parse("{}"));
    }

    public static async GetRampAccessSchedule(routeId:string, stopId:string){
        return StmFactory.createRampAccessSchedule(JSON.parse("{}"));
    }

    public static async GetRoutes(){
        const response = await fetch(baseUrl+routesEndpoint, { method: "GET"});
        if (response.status === 200){
            const json = await response.json();
            return StmFactory.createRoutes(json);
        }

        return [];
    }

    public static async getShape(routeId:string){
        //const response = await fetch(this.shapeBaseUrl+id, { method: "GET"});
        return StmFactory.createRouteShape(JSON.parse("{}"));
    }

    public static async GetStops(routeId:string){
        return StmFactory.createStops(JSON.parse("{}"));
    }
}
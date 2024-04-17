import { StmFactory } from "@/factories/StmFactory";
import { StmAnalysis } from "@/types/StmAnalysis";
import { SegmentData, SegmentDataAnalysis } from "@/types/StmSegmentAnalysis";
import * as mongoDB from "mongodb";

const baseUrl = "https://mb8ec8s5e9.execute-api.ca-central-1.amazonaws.com/prod/api/v1/"
const routesEndpoint = "setup";
const shapeEndpoint = "shapes/"
const stmAnalysisEndpoint = "analyze?"
const stmSegmentsDataEndpoint = "segments?"
const stmSegmentsAnalysisEndpoint = "analyzeSegments?"

export class ServerlessApiService {

    public static async getRoutes(){
        const response = await fetch(baseUrl+routesEndpoint, { method: "GET"});

        if (response.status === 200){
            const json = await response.json();
            return StmFactory.createRoutes(json);
        }

        return [];
    }

    public static async getShape(routeId:string){
        const response = await fetch(baseUrl+shapeEndpoint+routeId, { method: "GET"});

        if (response.status === 200){
            const json = await response.json();
            return StmFactory.createRouteShape(json);
        }

        return null;
    }

    public static async getStmAnalysis(routeId:string, stopId:string, start:string, end:string) : Promise<StmAnalysis | null>{
        let segmentsAnalysis: SegmentDataAnalysis[] | null = await this.getSegmentsAnalysis(routeId, start, end);
        const url = `${baseUrl+stmAnalysisEndpoint}routeId=${routeId}&stopId=${stopId}&start=${start}&end=${end}`
        console.log(url)
        const response = await fetch(url, { method: "GET"});

        if (response.status === 200){
            const json = await response.json();
            return StmFactory.createStmAnalysis(json, segmentsAnalysis == null ? [] : segmentsAnalysis);
        }

        return null;
    }

    public static async getSegmentsData(routeId:string, start:string, end:string) : Promise<SegmentData[] | null>{
        const url = `${baseUrl+stmSegmentsDataEndpoint}&start=${start}&end=${end}&route_id=${routeId}`
        console.log(url)
        const response = await fetch(url, { method: "GET"});

        if (response.status === 200){
            const json = await response.json();
            return StmFactory.createSegmentsData(json);
        }

        return null;
    }

    public static async getSegmentsAnalysis(routeId:string, start:string, end:string) : Promise<SegmentDataAnalysis[] | null>{
        const url = `${baseUrl+stmSegmentsAnalysisEndpoint}&start=${start}&end=${end}&route_id=${routeId}`
        console.log(url)
        const response = await fetch(url, { method: "GET"});

        if (response.status === 200){
            const json = await response.json();
            return StmFactory.createSegmentsAnalysis(json);
        }

        return null;
    }

}

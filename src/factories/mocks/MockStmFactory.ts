import { fromLonLat } from 'ol/proj';

import { IStmFactory } from "@/factories/factoryInterfaces"
import { BusData, RampAccessSchedule, RouteShape, Stop } from "@/types/mapTypes";
import { routeShapeProperties } from "@/factories/propertyObjects";
import { sampleShapeData } from "./mockData";

export class MockStmFactory implements IStmFactory {
    
    createBusData(data: JSON): BusData[] | null {
        const busData : BusData[] = [];

        for (let i = 0; i < 100; i++){
            let isLate = Math.random() > 0.5;
            let offset = this.random(0, 3601);
            let occupancy = this.random(0, 5);
            let hasAccessRamp = Math.random() > 0.66;
            busData.push({
                punctuality: isLate ? offset : -offset, 
                occupancy, 
                hasAccessRamp
            })
        }

        return busData;
    }

    createRampAccessSchedule(data: JSON) : RampAccessSchedule[] | null {
        let rampAccessSchedules : RampAccessSchedule[] = [];
        for (let i = 0; i < 50; i++){
            const date = new Date();
            date.setHours(this.random(0,24));
            date.setMinutes(this.random(0, 60));
            date.setSeconds(0);
            date.setMilliseconds(0);
            rampAccessSchedules.push({date})
        }

        rampAccessSchedules.sort((a, b) => a.date.getTime() - b.date.getTime());

        return rampAccessSchedules;
    }

    createRouteShape(data: JSON) : RouteShape | null{
        data = sampleShapeData;

        if (!data || !(routeShapeProperties.shape in data)){
            return null;
        }

        let shapes = data[routeShapeProperties.shape];

        if (!shapes || shapes.length < 2){
            return null;
        }

        let coordinates:any[] = [];
        shapes.forEach(shape => {
            const longitude = shape[routeShapeProperties.longitude];
            const latitude = shape[routeShapeProperties.latitude];
            if (longitude && latitude){
                coordinates.push(fromLonLat([longitude, latitude]))
            }
        });
        
        let shapeId : string = shapes[0][routeShapeProperties.id];

        return {
            id:shapeId, 
            coordinates
        }
    }
    
    createStops(data: JSON) : Stop[] | null {
        data = sampleShapeData;

        let shapes = data[routeShapeProperties.shape];
        
        let stops : Stop[] = [];
        for (let i = 0; i < shapes.length; i++){
            const longitude = shapes[i][routeShapeProperties.longitude];
            const latitude = shapes[i][routeShapeProperties.latitude];
            stops.push({
                id:`id${i}`,
                name:`name${i}`,
                coordinates:fromLonLat([longitude, latitude])
            })
        }

        return stops;
    }

    private random(min:number, max:number){
        return Math.floor(Math.random() *  (max - min) + min);
    }

}
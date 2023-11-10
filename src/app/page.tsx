"use client"

import React, {useEffect, useState} from 'react';
import { ServerlessApiService } from '@/services/ServerlessApiService';
import { BusData, RouteShape, Stop } from '@/types/stmTypes';
import { AccessRampGraph } from '@/components/AccessRampGraph';
import { StmMap } from '@/components/map/StmMap';

export default function Home() {

  const [busData, setBusData] = useState<BusData[]>([]);
  const [routeShape, setRouteShape] = useState<RouteShape>();
  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() =>  {
    async function fetchData(){
      const routeShape : RouteShape | null = await ServerlessApiService.getShape("shapeId");
      if (routeShape){
        setRouteShape(routeShape);
      }

      const busData = await ServerlessApiService.getBusData("", "");
      if (busData){
        setBusData(busData);
      }

      const rampAccessSchedule = await ServerlessApiService.getRampAccessSchedule("", "");

      const stops = await ServerlessApiService.getStops("");
      if (stops){
        setStops(stops);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="h-full w-full grid grid-rows-2 grid-cols-2">

      <StmMap
        routeShape={routeShape}
        stops={stops}
      />

      <AccessRampGraph
        id={"ramp-access-graph"}
        busData={busData}
      />

      <div className="bg-gray-500 h-full w-full border-r border-black"></div>

      <div className="bg-gray-500 h-full w-full"></div>

    </main>
  )
}
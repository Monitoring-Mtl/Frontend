"use client"

import React, {useEffect, useState} from 'react';
import { MapProxy } from '@/models/MapProxy';
import { ServerlessApiService } from '@/services/ServerlessApiService';
import { BusData, RouteShape } from '@/types/mapTypes';
import { AccessRampGraph } from '@/components/AccessRampGraph';

export default function Home() {

  const [busData, setBusData] = useState<BusData[]>([]);

  useEffect(() =>  {
    async function fetchData(map:MapProxy){
      const routeShape : RouteShape | null = await ServerlessApiService.getShape("shapeId");
      if (routeShape){
        map.addRoute(routeShape);
      }

      const busData = await ServerlessApiService.GetBusData("", "");
      if (busData){
        setBusData(busData);
      }

      const rampAccessSchedule = await ServerlessApiService.GetRampAccessSchedule("", "");

      const stops = await ServerlessApiService.GetStops("");
      if (stops){
        map.addStops(stops);
      }
    }

    const map = new MapProxy("map");
    fetchData(map);

    return () => {
      map.dispose();
    }
  }, []);

  return (
    <main className="h-full w-full grid grid-rows-2 grid-cols-2">
      <div id="map" className="h-full w-full"></div>
      <AccessRampGraph
          id={"ramp-access-graph"}
          busData={busData}
      />
      <div className="bg-gray-500 h-full w-full border-r border-black"></div>
      <div className="bg-gray-500 h-full w-full"></div>
    </main>
  )
}
"use client"

import React, {useEffect} from 'react';
import { MapProxy } from '@/models/MapProxy';
import { ServerlessApiService } from '@/services/ServerlessApiService';
import { RouteShape } from '@/types/mapTypes';

export default function Home() {

  useEffect(() =>  {

    async function fetchData(map:MapProxy){
      const routeShape : RouteShape | null = await ServerlessApiService.getShape("shapeId");
      if (routeShape){
        map.addRoute(routeShape);
      }

      const busData = await ServerlessApiService.GetBusData("", "");

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
    <main className="h-full w-full">
      <div id="map" className="h-full w-full"></div>
    </main>
  )
}

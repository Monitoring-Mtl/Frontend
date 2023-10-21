"use client"

import React, {useEffect} from 'react';
import { MapProxy } from '@/types/map/MapProxy';
import { ServerlessApiService } from '@/services/api/ServerlessApiService';
import { RouteShape } from '@/types/map/RouteShape';

export default function Home() {

  useEffect(() =>  {

    async function fetchData(map:MapProxy){
      const routeShape : RouteShape | null = await ServerlessApiService.getShape("shapeId");
      if (routeShape){
        map.addRoute(routeShape);
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

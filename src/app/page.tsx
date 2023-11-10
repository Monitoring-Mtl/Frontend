"use client";

import React, { useEffect, useState } from "react";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import { BusData, RouteShape, Stop } from "@/types/stmTypes";
import AccessRampGraph from "@/components/AccessRampGraph";
import { StmMap } from "@/components/map/StmMap";
import SelectBusLineForm from "./layouts/SelectBusLineForm";
import { Card } from "@mui/material";

export default function Home() {
  const [busData, setBusData] = useState<BusData[]>([]);
  const [routeShape, setRouteShape] = useState<RouteShape>();
  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() => {
    async function fetchData() {
      const routeShape: RouteShape | null = await ServerlessApiService.getShape(
        "shapeId"
      );
      if (routeShape) {
        setRouteShape(routeShape);
      }

      const busData = await ServerlessApiService.getBusData("", "");
      if (busData) {
        setBusData(busData);
      }

      const rampAccessSchedule =
        await ServerlessApiService.getRampAccessSchedule("", "");

      const stops = await ServerlessApiService.getStops("");
      if (stops) {
        setStops(stops);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid gap-y-8 gap-x-8 grid-cols-12 p-8">
      <Card className="col-span-4">
        <div className="p-2">
          <h2>Nombre d&#39;autobus ayant une rampe d&#39;accès</h2>
          <div id="ramp-access-graph" className="w-full h-96">
            <AccessRampGraph id={"ramp-access-graph"} busData={busData} />
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <div style={{ backgroundColor: "#ef3e45" }} className="w-8 h-6"></div>
          A une rampe
        </div>
        <div className="flex flex-row gap-1">
          <div style={{ backgroundColor: "#F8B1B4" }} className="w-8 h-6"></div>
          N&#39;a pas de rampe
        </div>
      </Card>

      <Card className="col-span-6">
        <StmMap routeShape={routeShape} stops={stops} />
      </Card>

      <Card className="col-span-2">
        <SelectBusLineForm />
      </Card>
    </div>
  );
}

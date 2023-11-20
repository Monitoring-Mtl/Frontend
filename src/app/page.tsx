"use client";

import React, { useEffect, useState } from "react";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import { BusData, RouteShape, Stop, RampAccessSchedule } from "@/types/stmTypes";
import { Card } from "@mui/material";
import { StmMap } from "./components/map/StmMap";
import PieChartLayout from "./layouts/PieChart";
import { OccupancyChart } from "./components/graphs/OccupancyChart";
import RampAccessScheduleTable from './components/RampAccessScheduleTable';
import SelectBusLineForm from "./layouts/SelectBusLineForm";

export default function Home() {
  const [busData, setBusData] = useState<BusData[]>([]);
  const [routeShape, setRouteShape] = useState<RouteShape>();
  const [stops, setStops] = useState<Stop[]>([]);
  const [rampAccessSchedule, setRampAccessSchedule] = useState<RampAccessSchedule[]>([]);
  const [displayedDiagram, setDisplayedDiagram] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const routeShape = await ServerlessApiService.getShape("shapeId");
      if (routeShape) {
        setRouteShape(routeShape);
      }

      const busData = await ServerlessApiService.getBusData("", "");
      if (busData) {
        setBusData(busData);
      }

      const stops = await ServerlessApiService.getStops("");
      if (stops) {
        setStops(stops);
      }

      const rampAccessSchedule = await ServerlessApiService.getRampAccessSchedule("","");
      if (rampAccessSchedule) {
        setRampAccessSchedule(rampAccessSchedule);
      }


    }

    fetchData();
  }, []);

  const numWithRamp = busData.filter((b) => b.hasAccessRamp).length;

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap mb-4">
        <Card className="flex-grow h-96" style={{ maxHeight: '24rem' }}>
          <StmMap routeShape={routeShape} stops={stops} />
        </Card>

        <Card className="w-full md:w-1/6 h-96 overflow-auto">
          <SelectBusLineForm />
        </Card>

        <Card className="w-full md:w-1/6 h-96 overflow-auto">
          <RampAccessScheduleTable data={rampAccessSchedule} />
        </Card>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-1">
        <PieChartLayout
          id="ramp-chart"
          title="Autobus ayant une rampe d'accès"
          pies={[
            {
              label: "Ont une rampe d'accès",
              value: numWithRamp,
            },
            {
              label: "N'ont pas une rampe d'accès",
              value: busData.length - numWithRamp,
            },
          ]}
          renderListener={displayedDiagram}
        />
      </Card>

      <Card className="md:col-span-1">
        <OccupancyChart busData={busData}/>
      </Card>

      <Card className="md:col-span-1"> {/* This Card now spans 1 column on medium screens */}
        <PieChartLayout
          id="other-chart2"
          title={"Ceci est un autre diagramme 2"}
          pies={[
            {
              label: "Ont une rampe d'accès",
              value: numWithRamp,
            },
            {
              label: "N'ont pas une rampe d'accès",
              value: busData.length - numWithRamp,
            },
          ]}
          renderListener={displayedDiagram}
        />
      </Card>
    </div>
  </div>
);
}

"use client";

import React, { useEffect, useState } from "react";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import { BusData} from "@/types/stmTypes";
import SelectBusLineForm from "./layouts/SelectBusLineForm";
import { Card } from "@mui/material";
import Row from "./layouts/Row";
import { StmMap } from "./components/map/StmMap";
import PieChartLayout from "./layouts/PieChart";
import { OccupancyChart } from "./components/graphs/OccupancyChart";
import { BusPunctualityChart } from "./components/graphs/BusPunctualityChart";
import { Stop } from "@/types/Stop";
import { Route } from "@/types/Route";
import { Direction } from "@/types/Direction";
import { RouteShape } from "@/types/RouteShape";

export default function Home() {
  const [busData, setBusData] = useState<BusData[]>([]);
  const [routeShape, setRouteShape] = useState<RouteShape>();
  const [stops, setStops] = useState<Stop[]>([]);
  const [displayedDiagram, setDisplayedDiagram] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {

    const busData = await ServerlessApiService.getBusData("", "");
      if (busData) {
        setBusData(busData);
      }

      const rampAccessSchedule =
        await ServerlessApiService.getRampAccessSchedule("", "");

      const routeData : Route[] = await ServerlessApiService.getRoutes();

      if (routeData && routeData.length > 0){
        showDirection(routeData[0].directions[0]);
      }
    }

    fetchData();
  }, []);

  const numWithRamp = busData.filter((b) => b.hasAccessRamp).length;

  const showDirection = (direction:Direction) => {
    ServerlessApiService.getShape(direction.shapeId).then(shape => {
        if (shape) {
            setRouteShape(shape);
        }

        setStops(direction.stops);
    });
  }

  return (
    <div>
      <Row>
        <Card className="col-span-10 h-96">
          <StmMap routeShape={routeShape} stops={stops} />
        </Card>

        <Card
          className="col-span-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <SelectBusLineForm />
        </Card>
      </Row>

      <Row>
        <Card className="col-span-4">
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

        <Card className="col-span-4">
          <OccupancyChart busData={busData}/>
        </Card>

        <Card className="col-span-4">
          <BusPunctualityChart busData={busData}/>
        </Card>

      </Row>
    </div>
  );
}

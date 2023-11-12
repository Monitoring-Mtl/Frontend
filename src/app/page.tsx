"use client";

import React, { useEffect, useState } from "react";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import { BusData, RouteShape, Stop } from "@/types/stmTypes";
import SelectBusLineForm from "./layouts/SelectBusLineForm";
import { Card } from "@mui/material";
import Row from "./layouts/Row";
import { StmMap } from "./components/map/StmMap";
import PieChartLayout from "./layouts/PieChart";
import { OccupancyChart } from "./components/graphs/OccupancyChart";

export default function Home() {
  const [busData, setBusData] = useState<BusData[]>([]);
  const [routeShape, setRouteShape] = useState<RouteShape>();
  const [stops, setStops] = useState<Stop[]>([]);
  const [displayedDiagram, setDisplayedDiagram] = useState<number>(0);

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

  const numWithRamp = busData.filter((b) => b.hasAccessRamp).length;

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
      </Row>
    </div>
  );
}

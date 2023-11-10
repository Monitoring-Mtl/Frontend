"use client";

import React, { useEffect, useState } from "react";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import { BusData, RouteShape, Stop } from "@/types/stmTypes";
import SelectBusLineForm from "./layouts/SelectBusLineForm";
import { Card } from "@mui/material";
import Row from "./layouts/Row";
import { StmMap } from "./components/map/StmMap";
import Button from "./components/Button";
import PieChartLayout from "./layouts/PieChart";

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
        {displayedDiagram == 0 && (
          <Card className="col-span-4">
            <PieChartLayout
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
        )}

        {displayedDiagram != 0 && (
          <Card className="col-span-4">
            <PieChartLayout
              title={"Ceci est un autre diagramme" + displayedDiagram}
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
        )}

        <Card className="col-span-6">
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

      <Row gap={4}>
        <Button className="col-span-2" onClick={() => setDisplayedDiagram(0)}>
          Rampes
        </Button>
        <Button className="col-span-2" onClick={() => setDisplayedDiagram(1)}>
          Ponctualité
        </Button>
      </Row>
      <Row gap={4}>
        <Button className="col-span-2" onClick={() => setDisplayedDiagram(2)}>
          Occupation
        </Button>
        <Button className="col-span-2" onClick={() => setDisplayedDiagram(3)}>
          4
        </Button>
      </Row>
    </div>
  );
}

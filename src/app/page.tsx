"use client";

import React, { useEffect, useState } from "react";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import { BusData, RouteShape, Stop } from "@/types/stmTypes";
import SelectBusLineForm from "./layouts/SelectBusLineForm";
import { Card, CardContent, CardHeader } from "@mui/material";
import Row from "./layouts/Row";
import Legend from "@/app/layouts/Legend";
import AccessRampGraph from "./components/AccessRampGraph";
import { StmMap } from "./components/map/StmMap";
import Button from "./components/Button";

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

  return (
    <div>
      <Row>
        {displayedDiagram == 0 && (
          <Card className="col-span-4">
            <CardHeader title="Nombre d'autobus ayant une rampe d'accès"></CardHeader>
            <CardContent id="ramp-access-graph" className="w-full h-96">
              <AccessRampGraph
                id={"ramp-access-graph"}
                busData={busData}
                renderListener={displayedDiagram}
              />
            </CardContent>
            <Legend
              items={[
                { color: "#ef3e45", label: "Ont une rampe" },
                { color: "#f8b1b4", label: "N'ont pas de rampe" },
              ]}
            />
          </Card>
        )}

        {displayedDiagram != 0 && (
          <Card className="col-span-4">
            <CardHeader title="Ceci est un autre diagramme"></CardHeader>
            <CardContent id="ramp-access-graph" className="w-full h-96">
              <AccessRampGraph
                id={"ramp-access-graph"}
                busData={busData}
                renderListener={displayedDiagram}
              />
            </CardContent>
            <Legend
              items={[
                { color: "#ef3e45", label: "Ont une rampe" },
                { color: "#f8b1b4", label: "N'ont pas de rampe" },
              ]}
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

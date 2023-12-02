"use client";

import React, { useEffect, useState } from "react";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import SelectBusLineForm from "./layouts/SelectBusLineForm";
import { Card } from "@mui/material";
import Row from "./layouts/Row";
import { StmMap } from "./components/map/StmMap";
import { OccupancyChart } from "./components/graphs/OccupancyChart";
import { BusPunctualityChart } from "./components/graphs/BusPunctualityChart";
import { AccessRampChart } from "./components/graphs/AccessRampChart";
import { Stop } from "@/types/Stop";
import { Route } from "@/types/Route";
import { Direction } from "@/types/Direction";
import { RouteShape } from "@/types/RouteShape";
import { StmAnalysis } from "@/types/StmAnalysis";

export default function Home() {
    const [stmAnalysis, setStmAnalysis] = useState<StmAnalysis>();
    const [routeShape, setRouteShape] = useState<RouteShape>();
    const [stops, setStops] = useState<Stop[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);

    useEffect(() => {
        async function fetchData() {

            const stmAnalysisData = await ServerlessApiService.getStmAnalysis("16", "51095", "1699524000", "1699542000");
            if (stmAnalysisData){
                setStmAnalysis(stmAnalysisData);
            }

            const rampAccessSchedule =
                await ServerlessApiService.getRampAccessSchedule("", "");

            const routeData = await ServerlessApiService.getRoutes()
            setRoutes(routeData);

            if (routeData && routeData.length > 0) {
                setDirection(routeData[0].directions[0]);
            }
        }

        fetchData();
    }, []);

    const setDirection = (direction: Direction) => {
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
                <Card className="col-span-10 h-96 pt-0">
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
                    <AccessRampChart analysis={stmAnalysis}/>
                </Card>

                <Card className="col-span-4">
                    <OccupancyChart analysis={stmAnalysis}/>
                </Card>

                <Card className="col-span-4">
                    <BusPunctualityChart analysis={stmAnalysis}/>
                </Card>
            </Row>
            <Row>
                {/* Dernière ligne vide qui réutilise le même padding que les rows précédentes. Si jamais on change le padding des rows, ceci va changer aussi. */}
                <></>
            </Row>
        </div>
    );
}

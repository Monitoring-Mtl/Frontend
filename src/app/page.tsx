"use client";

import React, { useState, useRef , useEffect} from "react";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import ControlsForm from "./layouts/ControlsForm";
import { Card } from "@mui/material";
import Row from "./layouts/Row";
import { StmMap } from "./components/map/StmMap";
import { OccupancyChart } from "./components/graphs/OccupancyChart";
import { BusPunctualityChart } from "./components/graphs/BusPunctualityChart";
import { AccessRampChart } from "./components/graphs/AccessRampChart";
import { Stop } from "@/types/Stop";
import { Direction } from "@/types/Direction";
import { RouteShape } from "@/types/RouteShape";
import { StmAnalysis } from "@/types/StmAnalysis";
import { toEpoch } from "@/utils/datetime-utils";

export default function Home() {
    const [stmAnalysis, setStmAnalysis] = useState<StmAnalysis>();
    const [routeShape, setRouteShape] = useState<RouteShape>();
    const [stops, setStops] = useState<Stop[]>([]);
    const [formContext, setFormContext] = useState<any>();

    const stmMapRef = useRef<HTMLDivElement>(null);

    const directionCallback = (direction: Direction) => {
        ServerlessApiService.getShape(direction.shapeId).then((shape) => {
            if (shape) {
                setRouteShape(shape);
            }
            setStops(direction.stops);
        });
    };

    const stopSelectionCallback = (stopId: string) => {
        formContext?.setFieldValue("stopId", Number(stopId));
    }

    const contextCallback = (context) => {
        if (!formContext){
            setFormContext(context);
        }
    }

    const stmAnalysisCallback = (
        routeId: string,
        stopId: string,
        startDate: string,
        startTime: string,
        endDate: string,
        endTime: string
    ) => {
        const start = toEpoch(startDate, startTime).toString();
        const end = toEpoch(endDate, endTime).toString();

        ServerlessApiService.getStmAnalysis(
            routeId,
            stopId,
            start,
            end
        ).then((stmAnalysis) => {
            if (stmAnalysis) {
                setStmAnalysis(stmAnalysis);
            }
        });
    };

    return (
        <div>
            <Row>
                <Card ref={stmMapRef} className="col-span-9 h-100 pt-0">
                    <StmMap
                        routeShape={routeShape}
                        stops={stops}
                        stopCallback={stopSelectionCallback}
                    />
                </Card>

                <Card
                    id="bus-line-form"
                    className="col-span-3 min-h-[676px]"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <ControlsForm
                        directionCallback={directionCallback}
                        stmAnalysisCallback={stmAnalysisCallback}
                        contextCallback={contextCallback}
                    />
                </Card>
            </Row>

            {stmAnalysis && (
                <Row>
                    <Card className="col-span-4">
                        <AccessRampChart analysis={stmAnalysis} />
                    </Card>

                    <Card className="col-span-4">
                        <OccupancyChart analysis={stmAnalysis} />
                    </Card>

                    <Card className="col-span-4">
                        <BusPunctualityChart analysis={stmAnalysis} />
                    </Card>
                </Row>
            )}

            <Row>
                {/* Dernière ligne vide qui réutilise le même padding que les rows précédentes. Si jamais on change le padding des rows, ceci va changer aussi. */}
                <></>
            </Row>
        </div>
    );
}

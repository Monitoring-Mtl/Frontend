import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { LineString, Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke } from "ol/style";
import { Map } from "./Map";
import { RouteShape, Stop } from "@/types/stmTypes";
import { MapOptions } from "@/types/MapOptions";
import { memo } from "react";
import { FeatureLike } from "ol/Feature";

const montrealCoordinates = fromLonLat([-73.56198339521531, 45.49501768328183]);

interface IStmMap {
    routeShape?: RouteShape;
    stops: Stop[];
}

export const StmMap = memo(({ routeShape, stops }: IStmMap) => {
    let routeLayer;
    if (routeShape) {
        routeLayer = new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: new LineString(routeShape.coordinates),
                    }),
                ],
            }),
            style: new Style({
                stroke: new Stroke({
                    color: "#0000ff",
                    width: 1,
                }),
            }),
        });
    }

    let stopsLayer;
    if (stops) {
        let features: Feature[] = [];

        for (let i = 0; i < stops.length; i++) {
            const stop = stops[i];

            const feature = new Feature({
                geometry: new Point(stop.coordinates)
            });

            feature.setProperties({
                isStop: true,
                id: stop.id,
                name: stop.name
            });

            features.push(
                feature
            );
        }

        stopsLayer = new VectorLayer({
            source: new VectorSource({
                features: features,
            }),
        });
    }
    
    const showOverlayCallback = (feature:FeatureLike) => feature.getProperties().isStop;

    const overlayContentCallback = (feature:FeatureLike) => `Arrêt ${feature.getProperties().name}`;

    const mapOptions: MapOptions = {
        id: "stm-map",
        center: montrealCoordinates,
        zoom: 10,
        layers: [routeLayer, stopsLayer],
        showOverlayCallback: showOverlayCallback,
        overlayContentCallback: overlayContentCallback
    };

    return <Map mapOptions={mapOptions} />;
});

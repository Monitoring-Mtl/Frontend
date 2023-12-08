import { memo } from "react";
import { fromLonLat } from "ol/proj";
import { Feature, MapBrowserEvent, Overlay } from "ol";
import { LineString, Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle, Fill, Style, Stroke } from "ol/style";
import { RouteShape} from "@/types/RouteShape";
import { Stop } from "@/types/Stop";
import { MapOptions } from "@/types/MapOptions";
import { Map as OlMap } from "openlayers";
import { Map } from "./Map";
import { integerDivision } from "@/utils/math-utils";
import { StmBusBlue } from "@/utils/color-utils";

interface IStmMap {
    routeShape?: RouteShape;
    stops: Stop[];
}

export const StmMap = memo(({ routeShape, stops }: IStmMap) => {

    let routeLayer:VectorLayer<VectorSource> | null = null;
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
                    color: StmBusBlue,
                    width: 3,
                }),
            }),
        });
    }

    let center = getMapCenter(routeShape);

    let stopsLayer:VectorLayer<VectorSource> | null = null;
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
            style: stopStyle
        });
    }

    const pointermoveCallback = (event:MapBrowserEvent<any>, map:OlMap, overlay:Overlay) => {
        let feature = map.forEachFeatureAtPixel(event.pixel as ol.Pixel, (feature) => feature );
        const properties = feature?.getProperties();

        if (feature !== undefined && properties.isStop) {
            overlay.setPosition(event.coordinate);
            const overlayRef = overlay.getElement();

            if (overlayRef){
                overlayRef.textContent = `Arrêt ${properties.name}`
            }

            resetStopStyles(stopsLayer);

            if (feature instanceof Feature){
                feature.setStyle(hoverStopStyle);
            }
        } else {
            overlay.setPosition(undefined);
            resetStopStyles(stopsLayer);
        }
    }

    const mapOptions: MapOptions = {
        id: "stm-map",
        center: center,
        zoom: 13,
        layers: [routeLayer, stopsLayer],
        pointermoveCallback:pointermoveCallback,
    };

    return <Map mapOptions={mapOptions} />;
});

const stopStyle = new Style({
    image: new Circle({
        radius: 5,
        fill: new Fill({
          color: "white"
        }),
        stroke: new Stroke({
            color: StmBusBlue,
            width: 2,
        }),
    })
});

const hoverStopStyle = new Style({
    image: new Circle({
        radius: 6,
        fill: new Fill({
          color: "white"
        }),
        stroke: new Stroke({
            color: StmBusBlue,
            width: 2,
        }),
    })
});

const resetStopStyles = (stopsLayer:VectorLayer<VectorSource> | null) => {
    stopsLayer?.getSource()?.getFeatures()?.forEach((feature => {
        if (feature.getProperties().isStop && feature instanceof Feature){
            feature.setStyle(stopStyle);
        }
    }));
}

const etsCoordinates = fromLonLat([-73.56198339521531, 45.49501768328183]);

const getMapCenter = (routeShape:RouteShape | undefined) => {
    if (!routeShape || routeShape.coordinates.length < 1){
        return etsCoordinates;
    }

    return routeShape.coordinates[integerDivision(routeShape.coordinates.length, 2)];
}

StmMap.displayName = "StmMap";
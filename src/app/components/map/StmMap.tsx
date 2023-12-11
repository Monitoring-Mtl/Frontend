import { memo, useEffect } from "react";
import { fromLonLat } from "ol/proj";
import { Feature, MapBrowserEvent, Overlay } from "ol";
import { LineString, Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle, Fill, Style, Stroke } from "ol/style";
import { Map as OlMap } from "openlayers";
import { RouteShape} from "@/types/RouteShape";
import { Stop } from "@/types/Stop";
import { MapOptions } from "@/types/MapOptions";
import { Map } from "./Map";
import { integerDivision } from "@/utils/math-utils";
import { EtsRed, StmBusBlue } from "@/utils/color-utils";

export const StmMap = memo(({ routeShape, stops, stopCallback }: IStmMap) => {
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
                isSelected: stop.id === selectedStopId,
                name: stop.name
            });

            features.push(
                feature
            );
        }

        stopsLayer = new VectorLayer({
            source: new VectorSource({
                features: features,
            })
        });
        
        setStopStyles(stopsLayer, selectedStyle);
    }

    const pointermoveCallback = (event:MapBrowserEvent<any>, map:OlMap, overlay:Overlay) => {
        let feature = map.forEachFeatureAtPixel(event.pixel as ol.Pixel, (feature) => feature);
        const properties = feature?.getProperties();

        if (feature !== undefined && properties.isStop) {
            overlay.setPosition(event.coordinate);
            const overlayRef = overlay.getElement();

            if (overlayRef){
                overlayRef.textContent = `Arrêt ${properties.name}`
            }

            setStopStyles(stopsLayer, selectedStyle);

            if (feature instanceof Feature){
                feature.setStyle(properties.isSelected ? selectedHoverStyle : hoverStyle);
            }
        } else {
            overlay.setPosition(undefined);
            setStopStyles(stopsLayer, selectedStyle);
        }
    }

    const clickCallback = (event:MapBrowserEvent<any>, map:OlMap, overlay:Overlay) => {
        let feature = map.forEachFeatureAtPixel(event.pixel as ol.Pixel, (feature) => feature);
        const properties = feature?.getProperties();

        if (feature !== undefined && properties.isStop && feature instanceof Feature) {
            selectedStopId = properties.id;
            setSelectedStop(stopsLayer);
            setStopStyles(stopsLayer, selectedHoverStyle);
            stopCallback(properties.id);
        }
    }

    const mapOptions: MapOptions = {
        id: "stm-map",
        center: center,
        zoom: 13,
        layers: [routeLayer, stopsLayer],
        pointermoveCallback:pointermoveCallback,
        clickCallback:clickCallback
    };

    useEffect(() => {
        if (typeof window !== "undefined"){
            document.addEventListener("stopchanged", (event) => stopChangedCallback(event, stopsLayer));
        }
        return () => {
            if (typeof window !== "undefined"){
                document.removeEventListener("stopchanged", (event) => stopChangedCallback(event, stopsLayer));
            }
        }
    });

    return <Map mapOptions={mapOptions} />;
});

interface IStmMap {
    routeShape?: RouteShape;
    stops: Stop[];
    stopCallback: (stopId: string) => void;
}

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

const hoverStyle = new Style({
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

const selectedStyle = new Style({
    image: new Circle({
        radius: 5,
        fill: new Fill({
          color: EtsRed
        }),
        stroke: new Stroke({
            color: StmBusBlue,
            width: 2,
        }),
    })
});

const selectedHoverStyle = new Style({
    image: new Circle({
        radius: 6,
        fill: new Fill({
          color: EtsRed
        }),
        stroke: new Stroke({
            color: StmBusBlue,
            width: 2,
        }),
    })
});

const setStopStyles = (stopsLayer:VectorLayer<VectorSource> | null, selectedStopStyle:Style) => {
    stopsLayer?.getSource()?.getFeatures()?.forEach((feature => {
        const properties = feature.getProperties();
        if (properties.isStop && feature instanceof Feature){
            feature.setStyle(properties.isSelected ? selectedStopStyle : stopStyle);
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

const setSelectedStop = (stopsLayer:VectorLayer<VectorSource> | null) => {
    stopsLayer?.getSource()?.getFeatures()?.forEach((feature => {
        const properties = feature.getProperties();
        if (properties.isStop && feature instanceof Feature){
            feature.setProperties({isSelected: properties.id === selectedStopId});
        }
    }));
}

const stopChangedCallback = (event:Event, stopsLayer:VectorLayer<VectorSource> | null) => {
    if (event instanceof CustomEvent){
        selectedStopId = event.detail;
        setSelectedStop(stopsLayer);
        setStopStyles(stopsLayer, selectedStyle);
    }
}

let selectedStopId:string;

StmMap.displayName = "StmMap";
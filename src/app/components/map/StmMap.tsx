import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { LineString, Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke } from "ol/style";
import { Map } from "./Map";
import { MapOptions, RouteShape, Stop } from "@/types/stmTypes";
import { memo } from "react";

const montrealCoordinates = fromLonLat([-73.56198339521531, 45.49501768328183]);

interface IStmMap {
  routeShape?: RouteShape;
  stops: Stop[];
}

export const StmMap = memo(function StmMap({ routeShape, stops }: IStmMap) {
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
      features.push(
        new Feature({
          geometry: new Point(stops[i].coordinates),
        })
      );
    }

    stopsLayer = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
    });
  }

  const mapOptions: MapOptions = {
    id: "stm-map",
    center: montrealCoordinates,
    zoom: 10,
    layers: [routeLayer, stopsLayer],
  };

  return <Map mapOptions={mapOptions} />;
});

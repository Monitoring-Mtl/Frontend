"use client"

import 'ol/ol.css';
import React, {useEffect} from 'react';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import {Feature} from "ol"
import {Point} from "ol/geom"
import {Vector as VectorLayer} from "ol/layer" 
import {Vector as SourceVector} from "ol/source"
import {Circle, Fill, Style} from "ol/style"

export default function Home() {

  const montrealCoordinates = fromLonLat([-73.56198339521531, 45.49501768328183]);

  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: montrealCoordinates,
        zoom: 12
      })
    });

    const vectorLayer = new VectorLayer({
      source: new SourceVector()
    });

    const marker = new Feature({
      geometry: new Point(montrealCoordinates)
    });

    marker.setStyle(new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({
          color: 'black'
        })
      })
    }));

    vectorLayer?.getSource()?.addFeature(marker);
    map.addLayer(vectorLayer);
  }, []);


  return (
    <main className="h-full w-full">
      <div id="map" className="h-full w-full"></div>
    </main>
  )
}

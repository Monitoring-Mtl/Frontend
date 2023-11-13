import 'ol/ol.css';
import React, {useEffect} from 'react';
import {Map as OlMap, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export const Map = ({mapOptions}) => {

    useEffect(() =>  {

        const map = new OlMap({
            target: mapOptions.id,
            layers: [
            new TileLayer({
                source: new OSM()
            })
            ],
            view: new View({
                center: mapOptions.center,
                zoom: mapOptions.zoom
            })
        });

        mapOptions.layers.forEach((layer) => {
            if (layer){
                map.addLayer(layer)
            }
        })

        return () => {
            // This is necessary so that the map is properly cleared before being re-rendered. 
            // Otherwise, it could cause issues like multiple renderings.
            map.setTarget(undefined);
        }
    });
    


    return (
        <div id={mapOptions.id} className="h-full w-full"></div>
    );
}
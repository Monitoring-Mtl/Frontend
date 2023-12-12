import 'ol/ol.css';
import React, {useEffect, useRef} from 'react';
import {Map as OlMap, Overlay, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapOptions } from '@/types/MapOptions';

export const Map = ({mapOptions} : IMap) => {

    const overlayRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() =>  {

        if (!mapRef.current || !overlayRef.current){
            return;
        }

        const map = new OlMap({
            target: mapRef.current,
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

        let overlay = new Overlay({
            element: overlayRef.current,
            autoPan:true,
            positioning:"center-left",
            stopEvent:false
        });
          
        map.addOverlay(overlay);
        

        if (mapOptions.pointermoveCallback){
            map.on('pointermove', (event) => {
                mapOptions.pointermoveCallback(event, map, overlay);
            });
        }

        if (mapOptions.clickCallback){
            map.on("click", (event) => {
                mapOptions.clickCallback(event, map, overlay);
            });
        }

        return () => {
            if (mapOptions.pointermoveCallback){
                map.un('pointermove', (event) => {
                    mapOptions.pointermoveCallback(event, map, overlay);
                });
            }
    
            if (mapOptions.clickCallback){
                map.un("click", (event) => {
                    mapOptions.clickCallback(event, map, overlay);
                })
            }
            
            map.setTarget(undefined);
        }
    });

    return (
        <>
            <div ref={overlayRef} className="bg-white border border-black rounded-lg px-2 py-2 opacity-90 mb-16"></div>
            <div ref={mapRef} id={mapOptions.id} className="h-full w-full"></div>
        </>
    );
}

interface IMap {
    mapOptions:MapOptions
}
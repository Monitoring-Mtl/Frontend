import 'ol/ol.css';
import React, {useEffect, useRef} from 'react';
import {Map as OlMap, Overlay, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export const Map = ({mapOptions}) => {

    const overlayRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() =>  {

        if (!mapRef.current){
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

        if (overlayRef.current){
            let overlay = new Overlay({
                element: overlayRef.current,
                autoPan:true,
                positioning:"center-left"
            });
          
            map.addOverlay(overlay);

            map.on('pointermove', (event) => {
                let feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature );
                if (feature !== undefined && mapOptions.showOverlayCallback(feature)) {
                    overlay.setPosition(event.coordinate);
                    if (overlayRef.current){
                        overlayRef.current.textContent = mapOptions.overlayContentCallback(feature)
                    }
                } else {
                    overlay.setPosition(undefined);
                }
            });
        }

        return () => {
            // This is necessary so that the map is properly cleared before being re-rendered. 
            // Otherwise, it could cause issues like multiple renderings.
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
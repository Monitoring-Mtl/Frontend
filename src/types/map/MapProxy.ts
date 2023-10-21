import 'ol/ol.css';

import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import {Feature} from "ol"
import {LineString} from "ol/geom"
import {Vector as VectorLayer} from "ol/layer" 
import {Vector as VectorSource} from "ol/source"
import {Style, Stroke} from "ol/style"

import { RouteShape } from './RouteShape';

export class MapProxy {

    private static montrealCoordinates = fromLonLat([-73.56198339521531, 45.49501768328183]);

    private id:string;
    private olMap:Map;

    constructor(id:string){
      this.id = id;

      this.olMap = new Map({
        target: id,
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: MapProxy.montrealCoordinates,
          zoom: 12
        })
      });
    }

    public addRoute(routeShape:RouteShape){
      let route = new VectorLayer({
        source: new VectorSource({
          features: [new Feature({
            geometry: new LineString(routeShape.coordinates)
          })]
        }),
        style: new Style({                    
           stroke : new Stroke({ 
               color: '#0000ff',
               width: 1
           })
      })
    });

    this.olMap.addLayer(route);
  }

    public dispose(){
      this.olMap.setTarget(undefined);
    }
}
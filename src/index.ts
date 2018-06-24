
// import * as L from 'leaflet';


// // import '../../node_modules/leaflet/dist/leaflet.css';
// import '../node_modules/leaflet/dist/leaflet.css';

import * as gisApp from './GIS/gis-app';
import * as mapData from './GIS/map-data';

window.onload = () => {
    console.log("window.onload");
    let gisMapObj = {
        title: "Europe – North Sea",
        layers: [{...mapData.GebcoObj, show:true}, 
            mapData.OsmObj, 
            mapData.WhitebgObj, 
            mapData.NpdObj,
            mapData.IREobj,
            mapData.MarScoFishobj
        ],
        options: {
            center: [58.80, 2.5],
            zoom: 5,
            minZoom: 2,
            maxZoom: 14,
            trackResize: true, 
            attributionControl: false           
        }
    }
    gisApp.setupGisMap(gisMapObj);
    document.title = "Visinum Subsea GIS"
    if (gisMapObj.title) document.title = document.title + " — " + gisMapObj.title;
    
}

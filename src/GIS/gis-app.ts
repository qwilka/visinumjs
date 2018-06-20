
import * as L from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import { LatLonEllipsoidal as geodesyLatLon } from 'geodesy';

//import * as mapData from './map-data';


export function setupGisMap(gisMapObj) {
    let mapDivId = "map";
    let mapDiv = document.createElement('div');
    mapDiv.setAttribute("id", mapDivId);
    mapDiv.setAttribute("src", "");
    // https://stackoverflow.com/questions/36355365/map-is-not-rendering-in-leafletjs-getting-blank-page-no-errors
    mapDiv.setAttribute("style", "width: 100%; height: 100%; margin: 0 auto;");
    let docBody = document.getElementsByTagName("BODY")[0];
    docBody.appendChild(mapDiv);

    let map = L.map(mapDiv, gisMapObj.options);    

    let baseMaps = {};
    let overlayMaps = {};
    if (gisMapObj.layers) {
        gisMapObj.layers.map( function(layerObj) {
            let tilelayer;
            switch (layerObj.source) {
                case "WMS":
                    tilelayer = L.tileLayer.wms(layerObj.baseUrl, layerObj.options);
                    break;
                case "TILE":
                    tilelayer = L.tileLayer(layerObj.urlTemplate, layerObj.options);
                    break;
                default:
                    return null;
            }
            switch (layerObj.type) {
                case "BASEMAP":
                    baseMaps[layerObj.title] = tilelayer;
                    break;
                case "OVERLAY":
                    overlayMaps[layerObj.title] = tilelayer;
                    break;
            }
            if (layerObj.show) map.addLayer(tilelayer);
        } );
    }
    let layerControl = L.control.layers(baseMaps, overlayMaps, { 
        collapsed: true, 
        autoZIndex: true 
    })
    layerControl.addTo(map);

    let scale = L.control.scale({ 
        position: 'bottomleft', 
        metric: true, 
        imperial: false 
    });
    scale.addTo(map);

    function onMapRightClick(evt) {
        let lat = evt.latlng.lat;
        let long = evt.latlng.lng;
        let glatlong = new geodesyLatLon(lat, long);
        let utmCoord = glatlong.toUtm();
        let pustr = "Location coordinates:";
        pustr += `<br>long. ${(long).toFixed(2)}&deg; lat. ${(lat).toFixed(2)}&deg;`;
        pustr += `<br>UTM zone ${utmCoord.zone}${utmCoord.hemisphere}`;
        pustr += `<br>E${(utmCoord.easting).toFixed(3)} N${(utmCoord.northing).toFixed(3)}`;
        //pustr += '<br><font color="green"><a href=_testfunc1>Fire test function1 in app</a></font>';
        let popup = L.popup();
        popup
            .setLatLng(evt.latlng)
            .setContent(pustr)
            .openOn(map);
    }
    map.on('contextmenu',onMapRightClick);

    return [map, mapDiv];
}
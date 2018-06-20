
import * as L from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
//import { LatLonEllipsoidal as geodesyLatLon } from 'geodesy';
import { LatLonEllipsoidal as LatLon } from 'geodesy';
//import { Utm } from 'geodesy';

import * as mapData from './map-data';

//import * as $ from 'jquery';
import $ from 'jquery';


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
        let X = map.layerPointToContainerPoint(evt.layerPoint).x;
        let Y = map.layerPointToContainerPoint(evt.layerPoint).y;
        let size = map.getSize() 
        let params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          version: '1.1.1',      
          bbox: map.getBounds().toBBoxString(),
          format: mapData.GebcoObj.options.format,
          x: X,
          y: Y,
          height: size.y,
          width: size.x,
          layers: 'GEBCO_LATEST_2',
          query_layers: 'GEBCO_LATEST_2',
          info_format: 'text/html'
        };
        let featInfoUrl = mapData.GebcoObj.baseUrl + L.Util.getParamString(params, mapData.GebcoObj.baseUrl, true)
        let getinfo = $.ajax({
            url: featInfoUrl,
            dataType: "html",
            success: function (xhr) { console.log(xhr.statusText);},
            error: function (xhr) { console.log(xhr.statusText); }
            })
        $.when(getinfo).done(function() {
                    let htmlstr = $.parseHTML( getinfo.responseText );
                    //var body = $(htmlstr).find('body:first');
                    let body = $(htmlstr).find('body:first');
                    $.each(htmlstr, function(i, el){
                        //console.log(i, el)
                        if (el.nodeName == '#text') {
                            let targetStr: any = el.nodeValue
                            console.log(i, targetStr);
                            let test = targetStr.match(/Elevation value \(m\):\s*(-?\d+)/)
                            if (test) {
                                let elevation = test[1];
                                if (elevation>=0) {
                                    pustr += "<br>elevation " + elevation + " m (GEBCO)";
                                } else {
                                    pustr += "<br>depth " + elevation + " m (GEBCO)";
                                }
                                //pustr += "<br>elevation/depth " + elevation + " m (GEBCO)"
                                console.log("elevation=", elevation)
                                popup.setContent(pustr)
                            }
                            // var loc1 = targetStr.search("(m)");
                            // var loc2 = targetStr.search("Derived");
                            // if (loc > 0) {
                            //     console.log("loc=", loc)
                            //     console.log(target.slice(loc+20, loc+25))
                            // }
                        }
            });
            // parser = new DOMParser();
            // doc = parser.parseFromString(htmlstr, "text/html");
            //var body = $("body",$(htmlstr)).html();
            //console.log(body);
        });

        let lat = evt.latlng.lat
        let long = evt.latlng.lng
        let latlong_WGS84 = new LatLon(lat, long, LatLon.datum.WGS84);
        let latlong_ED50 = latlong_WGS84.convertDatum(LatLon.datum.ED50);
        let utmCoord = latlong_ED50.toUtm();
        let pustr = "Location coordinates:";
        pustr += "<br>long. " + (long).toFixed(5) + "&deg;  lat. " + (lat).toFixed(5) + "&deg; (WGS84)";
        pustr += "<br>UTM zone " + utmCoord.zone + utmCoord.hemisphere;
        pustr += "<br>E" + (utmCoord.easting).toFixed(1) + " N" + (utmCoord.northing).toFixed(1) + " (ED50)";
        let popup = L.popup();
        popup
            .setLatLng(evt.latlng)
            .setContent(pustr)
            .openOn(map);
    }
    map.on('contextmenu', onMapRightClick);

    return [map, mapDiv];
}
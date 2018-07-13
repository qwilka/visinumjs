/*
Copyright © 2017 Qwilka Limited. All rights reserved.
Any unauthorised copying or distribution is strictly prohibited.
Author: Stephen McEntee <stephenmce@gmail.com>
*/
import { BoxPanel } from '@phosphor/widgets';

// https://github.com/calvinmetcalf/leaflet-ajax/issues/49
// npm install --save leaflet@1.0.3
import * as L from 'leaflet';
import '../../libs/leaflet.ajax.min';

import { LatLonEllipsoidal as geodesyLatLon } from 'geodesy';

import * as KDBUSH from 'kdbush';
import '../../node_modules/leaflet/dist/leaflet.css';

import * as mapData from './map-data';

// export let gisPanel = new BoxPanel();
// gisPanel.title.label = 'GIS';
// let gisMap;

var _gisMapDivIndex;
let mapRefList = [];

export function createGisPanel(region) {
    //if (!region) region = "North Sea";
    let gisMapObj;
    switch (region) {
        case "North-Sea-region":
            gisMapObj = mapData.northseaMapObj;
            break;
        case "Skarv-region":
            gisMapObj = mapData.skarvMapObj;
            break;
        case "Valhall-region":
            gisMapObj = mapData.valhallMapObj;
            break;
        case "Alvheim-region":
            gisMapObj = mapData.alvheimMapObj;
            break;
        default:
            gisMapObj = {
                title: "North Sea",
                layers: [Object.assign({"show":true}, mapData.NpdObj)],
                center: [58.80, 2.5],
                zoom: 5
            }
            break;
    }
    let gisPanel = new BoxPanel();
    gisPanel.title.closable = true;
    if (gisMapObj.hasOwnProperty('title')) {
        gisPanel.title.label = 'GIS-' + gisMapObj.title;
    } else {
        gisPanel.title.label = 'GIS';
    }
    if (_gisMapDivIndex === undefined) _gisMapDivIndex=0;
    let _mapDivId = "gis-map-" + _gisMapDivIndex++;  // _gisMapDivIndex initialised in index.ts
    console.log("_mapDivId=", _mapDivId);
    //gisPanel.mapDivId = _mapDivId;
    let mapDiv = document.getElementById(_mapDivId);
    let gisMap;
    [gisMap, mapDiv] = setupGisMap(gisMapObj, _mapDivId);
    mapRefList.push(gisMap);
    gisPanel.node.appendChild(mapDiv);
    return gisPanel;
}



export function loadGisMap(gisMapObj) {
    let gisMapDiv_id = "gis-map";
    let mapDiv = document.getElementById(gisMapDiv_id);
    if (mapDiv) {
        gisPanel.node.removeChild(mapDiv);
        mapDiv = null;
        gisMap = null;
    }
    //let layers = [mapData.NpdObj];
    //let layers = [Object.assign({"show":true}, mapData.NpdObj)];
    // let retVal = setupGisMap(gisMapDiv_id, layers);
    // gisMap = retVal[0];
    // mapDiv = retVal[1];
    [gisMap, mapDiv] = setupGisMap(gisMapObj, gisMapDiv_id);
    if (gisMapObj.hasOwnProperty('title')) {
        gisPanel.title.label = gisMapObj.title;
    }
    gisPanel.node.appendChild(mapDiv);
}



export function setupGisMap(gisMapObj, mapDivId) {
    if (!mapDivId) mapDivId = "gis-map";

    let mapDiv = document.createElement('div');
    mapDiv.setAttribute("id", mapDivId);
    mapDiv.setAttribute("src", "");
    mapDiv.setAttribute("style", "width: 100%; height: 100%; margin: 0 auto;");
    
    let whiteBGlayer = L.tileLayer("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==");
    let GEBCOlayer = L.tileLayer.wms(mapData.GebcoObj.baseUrl, mapData.GebcoObj.options);
    let map = L.map(mapDiv, { 
        trackResize: true, 
        attributionControl: false,
        layers: [GEBCOlayer] 
    });
    let basemaps = {
        "GEBCO": GEBCOlayer,
        "no background": whiteBGlayer
    };
    let NPD = L.tileLayer.wms(mapData.NpdObj.baseUrl, mapData.NpdObj.options);
    // let overlaymaps = {
    //     "NPD": NPD
    // };
    let overlaymaps = {};
    if (gisMapObj.layers) {
        gisMapObj.layers.map( function(layerObj) {
            let tilelayer;
            switch (layerObj.type) {
                case "wms":
                    tilelayer = L.tileLayer.wms(layerObj.baseUrl, layerObj.options);
                    break;
                case "tilemap":
                    tilelayer = L.tileLayer(layerObj.baseUrl, layerObj.options);
                    break;
                case "layerGroup":
                    // layersList = [];  // layer group
                    // layerObj.layers.map(function(layer) {
                    //     layersList.push( L.tileLayer(layer.baseUrl, layer.options) );
                    // })
                    // tilelayer = L.layerGroup(layersList);
                    tilelayer = L.layerGroup();
                    layerObj.layers.map(function(layer) {
                        tilelayer.addLayer( L.tileLayer(layer.baseUrl, layer.options) );
                    })
                    break;
                case "geojsonFC":
                    tilelayer = loadGeojsonFeatureCollection(layerObj.baseUrl, map);
                    break;
                default:
                    return null;
            }
            //let tilelayer = L.tileLayer.wms(layerObj.baseUrl, layerObj.options);
            overlaymaps[layerObj.title] = tilelayer;
            if (layerObj.show) map.addLayer(tilelayer);
        } );
    }
    let layerControl = L.control.layers(basemaps, overlaymaps, { 
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

    map.setView(gisMapObj.center, gisMapObj.zoom);  // map.setView([58.80, 2.5], 5);
    setTimeout(refreshGIS, 1000, map); // https://github.com/Leaflet/Leaflet/issues/941 

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


function loadGeojsonFeatureCollection(geojsonFile, map) {
    let geojsonLayer = new L.GeoJSON.AJAX(geojsonFile ,{
        style: function(feature) {
            //console.log(feature);
            switch (feature.properties.type) {
                case 'prod_flowline': return {color: "#ffff00"};
                case 'gi_flowline':  return {color: "#ffffff"};
                default:  return {color: "#ff0066"};
            }
        },
        onEachFeature: function (feature, layer) {
            //popupOptions = {maxWidth: 200};
            //layer.bindPopup(feature.properties.name);
            //console.log(feature.coordinates);
            //var pustr;
            // https://gis.stackexchange.com/questions/121482/click-events-with-leaflet-and-geojson
            // https://gis.stackexchange.com/questions/49869/how-to-open-popup-menu-on-right-click-in-leaflet
            layer.on({
                click: function (evt) {
                    //pustr = evt.latlng.toString()
                    //console.log(feature.geometry.coordinates);
                    popup
                        .setLatLng(evt.latlng)
                        .setContent('<h1>CLICK '+feature.properties.name+'</h1><p>'+evt.latlng.toString()+'</p>')
                        .openOn(map)
                },
                contextmenu: function (evt) {
                    // https://gis.stackexchange.com/questions/41759/how-do-i-stop-event-propagation-with-rightclick-on-leaflet-marker
                    L.DomEvent.stopPropagation(evt); // prevent event propagation
                    //pustr = evt.latlng.toString()
                    var lat = evt.latlng.lat
                    var long = evt.latlng.lng
                    var bbspread = 0.0001;
                    var index = KDBUSH(feature.geometry.coordinates);
                    var idxList = index.range(long-bbspread, lat-bbspread, long+bbspread, lat+bbspread);
                    var pustr = '<h1>Line '+feature.properties.name+'</h1>'
                    pustr += '<p>'+evt.latlng.toString()+'</p>'
                    if (idxList.length>0) {
                        var mindist = Infinity, closest_idx;
                        for (var ii=0, len=idxList.length; ii<len; ii++) {
                            var x2 = feature.geometry.coordinates[idxList[ii]][0];
                            var y2 = feature.geometry.coordinates[idxList[ii]][1];
                            var dd = Math.sqrt(Math.pow( long-x2 , 2) + Math.pow( lat-y2 , 2));
                            if (dd<mindist) {
                                closest_idx = idxList[ii];
                                mindist = dd;
                            }
                        }
                        pustr += '<br>depth '+ parseFloat(feature.properties.depth[closest_idx]);
                        pustr += '<br>KP    '+ parseFloat(feature.properties.KP[closest_idx]);
                        pustr += '<br>hits '+ parseInt(idxList.length);
                    }
                    let popup = L.popup();
                    popup
                        .setLatLng(evt.latlng)
                        .setContent(pustr)
                        .openOn(map)
                },
            });
        },
    }  );
    return geojsonLayer;
}



export function refreshGIS() {
    // Leaflet doesn't display all tiles if map is hidden on startup
    // https://github.com/Leaflet/Leaflet/issues/941
    // https://github.com/tombatossals/angular-leaflet-directive/issues/49
    // http://leafletjs.com/reference.html#map-set-methods
    mapRefList.map(
        function(mapref) {
            if (mapref) mapref.invalidateSize();
        }
    )
}


// export function showGISdata(name) {
//     let gisMapObj;
//     switch (name) {
//         case "Refresh GIS display":
//             refreshGIS(gisMap);
//             break;
//         case "load test geojson":
//             console.log("load test geojson : ", name);
//             loadTestGeojson();
//             break;
//         case "Base map - North Sea":
//             gisMapObj = {
//                 title: "GIS-North Sea",
//                 layers: [Object.assign({"show":true}, mapData.NpdObj)],
//                 center: [58.80, 2.5],
//                 zoom: 5
//             }
//             loadGisMap(gisMapObj);
//             break;
//         case "Skarv area map":
//             gisMapObj = {
//                 title: "GIS-Skarv",
//                 layers: [
//                     Object.assign({"show":true}, mapData.NpdObj),
//                     mapData.SK2006_tm_MBES,
//                     mapData.SK2013_02_tm_MBES,
//                     mapData.SK2013_08_tm_MBES,
//                     mapData.SK2013_final_tm_MBES,
//                     mapData.SK2015_tm_MBES_shadedrelief,
//                     mapData.SK2014_field_layouts,
//                     mapData.SK2014_close_layouts,
//                     mapData.SK2015_5point_geojsonFC,
//                 ],
//                 center: [65.70, 7.65],
//                 zoom: 10
//             }
//             loadGisMap(gisMapObj);
//             break;
//         case "Valhall/Ula area map":
//             gisMapObj = {
//                 title: "GIS-Valhall",
//                 layers: [
//                     Object.assign({"show":true}, mapData.NpdObj),
//                     mapData.Valhall2014_tm_MBES,
//                     mapData.Valhall2014_PC_tm_MBES,
//                 ],
//                 center: [56.27, 3.39],
//                 zoom: 10
//             }
//             loadGisMap(gisMapObj);
//             break;
//         case "Alvheim layouts":
//             gisMapObj = {
//                 title: "GIS-Alvheim",
//                 layers: [
//                     Object.assign({"show":true}, mapData.NpdObj),
//                     mapData.Alvheim2006_local_layouts,
//                     mapData.Alvheim2016_overall_layout,
//                     mapData.Alvheim2006_overall_layout
//                 ],
//                 center: [59.567, 1.995],
//                 zoom: 10
//             }
//             loadGisMap(gisMapObj);
//             break;
//         default:
//             console.log("showGISdata option not recognised: ", name);
//     }
// }


// import * as L from 'leaflet';


export let GebcoObj = {
    title: "GEBCO",
    source: "WMS",
    type: "BASEMAP",
    ref: ["https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/"],
    GetCapabilities: "https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?request=getCapabilities&service=wms&version=1.1.1",
    baseUrl: "https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv",
    options: {
        layers: "GEBCO_LATEST",
        CRS: "EPSG:4326",
        version: '1.1.1',
        format: "image/png",
        maxZoom: 12,
        noWrap: true,
        transparent: false,
        opacity: 0.7,
        attribution: '<a target="_blank" href="https://www.gebco.net/">GEBCO</a>'
    }
};
// export let GEBCOlayer = L.tileLayer.wms(GebcoObj.baseUrl, GebcoObj.options);

export let OsmObj = {
    title: "OpenStreetMap",
    source: "WMS",
    type: "BASEMAP",
    ref: ["http://ows.terrestris.de/", "https://www.openstreetmap.org/copyright"],
    GetCapabilities: "http://ows.terrestris.de/osm/service?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities",
    baseUrl: "http://ows.terrestris.de/osm/service",
    options: {
        layers: "TOPO-OSM-WMS",
        CRS: "EPSG:4326",
        version: '1.1.1',
        format: "image/png",
        maxZoom: 12,
        noWrap: true,
        transparent: false,
        opacity: 0.7,
        attribution: '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
};

export let WhitebgObj = {
    title: "white background",
    source: "TILE",
    type: "BASEMAP",
    urlTemplate: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==",
    options: {}
};


export let NpdObj = {
    title: "NPD",
    source: "WMS",
    type: "OVERLAY",
    ref: ["http://npdwms.npd.no/"],
    GetCapabilities: "http://gis.npd.no/ogc/factmaps/2_0?SERVICE=WMS&REQUEST=GetCapabilities",
    baseUrl: "http://gis.npd.no/ogc/factmaps/2_0",
    options: {
        layers: "dscAll,pplAll,fclFixed",
        CRS: "EPSG:23032",
        version: '1.3.0',
        format: "image/png",
        transparent: true,
        noWrap: true,
        opacity: 1.0,
        attribution: '<a target="_blank" href="http://npdwms.npd.no/">NPD</a>'
    }
};







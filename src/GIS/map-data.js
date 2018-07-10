
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
    baseUrl: "http://ows.terrestris.de/osm/service",
    options: {
        layers: "TOPO-OSM-WMS",
        CRS: "EPSG:4326",
        version: '1.1.1',
        format: "image/png",
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
    title: "Norway NPD pipelines",
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

export let IREobj = {
    title: "Ireland pipelines",
    source: "WMS",
    type: "OVERLAY",
    ref: ["https://data.gov.ie/dataset/offshore-gas-pipeline"],
    baseUrl: "http://atlas.marine.ie/arcgis/services/EnergyResourcesInfrastructure/MapServer/WMSServer",
    options: {
        layers: '1,2,3',
        CRS: "EPSG:4326",
        format: "image/png",
        transparent: true,
        noWrap: true,
        opacity: 1.0,
        attribution: '<a target="_blank" href="https://data.gov.ie/dataset/offshore-gas-pipeline">IE-GovData</a> <a href="https://creativecommons.org/licenses/by/4.0/">(CC BY 4.0)</a>'
    }
};

export let MarScoFishobj = {
    title: "Marine Scotland (fishing activity)",
    source: "WMS",
    type: "OVERLAY",
    ref: ["http://marine.gov.scot/maps/1529", 
        "http://marine.gov.scot/maps/515",
        "http://www.gov.scot/Topics/marine/seamanagement/nmpihome/wms-wfs"
    ],
    baseUrl: "http://msmap1.atkinsgeospatial.com/geoserver/nmpwfs/ows",
    options: {
        layers: 'utility_and_government_services_fishing_intensity_pipelines_all_gears',
        CRS: "EPSG:3857",
        format: "image/png",
        transparent: true,
        noWrap: true,
        opacity: 0.9,
        token: "d46ffd2a-e192-4e51-8a6a-b3292c20f1ee",
        attribution: '<a target="_blank" href="http://marine.gov.scot/maps/1529">&copy; Crown Copyright (ScotGov)</a>'
    }
};

export let MarScoFishObj = {
    title: "Marine Scotland (fishing activity)",
    source: "WMS",
    type: "OVERLAY",
    ref: ["http://marine.gov.scot/maps/1529", 
        "http://marine.gov.scot/maps/515",
        "http://www.gov.scot/Topics/marine/seamanagement/nmpihome/wms-wfs"
    ],
    baseUrl: "http://msmap1.atkinsgeospatial.com/geoserver/nmpwfs/ows",
    options: {
        layers: 'utility_and_government_services_fishing_intensity_pipelines_all_gears',
        CRS: "EPSG:3857",
        version: '1.3.0',
        format: "image/png",
        transparent: true,
        noWrap: true,
        opacity: 0.9,
        attribution: '<a target="_blank" href="http://marine.gov.scot/maps/1529">&copy; Crown Copyright (ScotGov)</a>'
    }
};

export let EezObj = {
    title: "Exclusive Economic Zones",
    source: "WMS",
    type: "OVERLAY",
    ref: ["http://www.marineregions.org/webservices.php", 
        "https://www.naturalearthdata.com/"
    ],
    baseUrl: "http://geo.vliz.be:80/geoserver/MarineRegions/wms",
    options: {
        layers: 'MarineRegions:eez_boundaries',
        version: '1.1.1',
        format: "image/png",
        transparent: true,
        noWrap: true,
        opacity: 0.9,
        attribution: '<a target="_blank" href="http://www.marineregions.org">FlandersMarineInst (CC-BY-NC-SA)</a>'
    }
};





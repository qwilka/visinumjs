import * as L from 'leaflet';

//export const Skarv_FactMap_link = 'http://npdmap1.npd.no/website/NPDGIS/viewer.htm?ActiveLayer=1&Layers=1111011101111110101111111111110100101111001011001011111110&Query=IDFACILITY=414071&Queryzoom=YES&ZOOMSCALE=200000';
//export const whiteBGlayer = L.tileLayer("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==");

// http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?request=getCapabilities&service=wms&version=1.3.0
export let GebcoObj = {
    title: "GEBCO",
    type: "wms",
    baseUrl: "http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?",
    options: {
        layers: "GEBCO_LATEST",
        CRS: "EPSG:4326",
        format: "image/png",
        maxZoom: 9,
        noWrap: true,
        transparent: false,
        opacity: 0.7,
        attribution: "GEBCO"
    }
};
//export let GEBCOlayer = L.tileLayer.wms(GebcoObj.baseUrl, GebcoObj.options);

// http://gis.npd.no/ogc/factmaps/2_0?SERVICE=WMS&REQUEST=GetCapabilities
export let NpdObj = {
    title: "NPD",
    type: "wms",
    baseUrl: "http://gis.npd.no/ogc/factmaps/2_0?",
    options: {
        layers: "dscAll,pplAll,fclFixed",
        CRS: "EPSG:23032",
        format: "image/png",
        transparent: true,
        noWrap: true,
        opacity: 1.0,
        attribution: "NPD"
    }
};
//export let NPD = L.tileLayer.wms(NpdObj.baseUrl, NpdObj.options);

// Skarv =======================================================
export let SK2015_tm_MBES_shadedrelief = {
    title: "Skarv 2015 MBES (shaded relief)",
    type: "tilemap",
    baseUrl: "fields/Skarv/2015/tilemaps/Skarv_2015/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 10,
        maxZoom: 22,
        maxNativeZoom: 20
    }
};
export let SK2015_5point_geojsonFC = {
    title: "Skarv 2015 5-point routes (FC)",
    type: "geojsonFC",
    baseUrl: "fields/Skarv/2015/lines/SK2015_lines.geojson"
};
export let SK2013_02_tm_MBES = {
    title: "Skarv 2013-02 MBES (interim)",
    type: "tilemap",
    baseUrl: "fields/Skarv/2013/tilemaps/Skarv_2013-02_data/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 10,
        maxZoom: 22,
        maxNativeZoom: 20
    }
};
export let SK2013_08_tm_MBES = {
    title: "Skarv 2013-08 MBES (interim)",
    type: "tilemap",
    baseUrl: "fields/Skarv/2013/tilemaps/Skarv_2013-08_data/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 10,
        maxZoom: 22,
        maxNativeZoom: 20
    }
};
export let SK2013_final_tm_MBES = {
    title: "Skarv 2013 MBES (final)",
    type: "tilemap",
    baseUrl: "fields/Skarv/2013/tilemaps/Skarv_2013_final/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 10,
        maxZoom: 22,
        maxNativeZoom: 20
    }
};
export let SK2006_tm_MBES = {
    title: "Skarv 2006 MBES",
    type: "tilemap",
    baseUrl: "fields/Skarv/2006/tilemaps/Skarv_2006/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 10,
        maxZoom: 20,
        maxNativeZoom: 18
    }
};


// Skarv layouts --------------
let SK2014_FPSO_field_layout = {
    title: "Skarv FPSO field layout 2014",
    type: "tilemap",
    baseUrl: "fields/Skarv/layouts/FPSO_field/tilemap/Skarv_FPSO_field_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 13,
        maxZoom: 18,
        maxNativeZoom:17
    }
};
    // url = "fields/Skarv/layouts/FPSO_field/tilemap/Skarv_FPSO_field_2014/{z}/{x}/{y}.png"
    // var FPSO_field_2014_map = L.tileLayer(url, {tms: true,
    //     CRS: "EPSG:23032",
    //     minZoom: 13,
    //     maxZoom: 18,
    //     maxNativeZoom:17 })
let SK2014_Tilje_SkarvA_field_layout = {
    title: "Skarv Tilje-SkarvA field layout 2014",
    type: "tilemap",
    baseUrl: "fields/Skarv/layouts/Tilje_SkarvA_field/tilemap/Tilje_SkarvA_field_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 13,
        maxZoom: 18,
        maxNativeZoom:17
    }
};
    // url = "fields/Skarv/layouts/Tilje_SkarvA_field/tilemap/Tilje_SkarvA_field_2014/{z}/{x}/{y}.png"
    // var Tilje_SkarvA_field_2014_map = L.tileLayer(url, {tms: true,
    //     CRS: "EPSG:23032",
    //     minZoom: 13,
    //     maxZoom: 18,
    //     maxNativeZoom:17 })
let SK2014_Idun_field_layout = {
    title: "Skarv Idun field layout 2014",
    type: "tilemap",
    baseUrl: "fields/Skarv/layouts/Idun_field/tilemap/Idun_field_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 13,
        maxZoom: 18,
        maxNativeZoom:17
    }
};
    // url = "fields/Skarv/layouts/Idun_field/tilemap/Idun_field_2014/{z}/{x}/{y}.png"
    // var Idun_field_2014_map = L.tileLayer(url, {tms: true,
    //     CRS: "EPSG:23032",
    //     minZoom: 13,
    //     maxZoom: 18,
    //     maxNativeZoom:17 })
let SK2014_ATS_tiein_field_layout = {
    title: "Skarv ATS tie-in field layout 2014",
    type: "tilemap",
    baseUrl: "fields/Skarv/layouts/ATS_tiein_field/tilemap/ATS_tiein_field_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 13,
        maxZoom: 18,
        maxNativeZoom:17
    }
};
    // url = "fields/Skarv/layouts/ATS_tiein_field/tilemap/ATS_tiein_field_2014/{z}/{x}/{y}.png"
    // var ATS_tiein_field_2014_map = L.tileLayer(url, {tms: true,
    //     CRS: "EPSG:23032",
    //     minZoom: 13,
    //     maxZoom: 18,
    //     maxNativeZoom:17 })
export let SK2014_field_layouts = {
    title: "Skarv field layouts 2014",
    type: "layerGroup",
    layers: [
        SK2014_FPSO_field_layout,
        SK2014_Tilje_SkarvA_field_layout,
        SK2014_Idun_field_layout,
        SK2014_ATS_tiein_field_layout
    ],
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 13,
        maxZoom: 18,
        maxNativeZoom: 17
    }
};
    // var Skarv_field_layouts_2014_group = L.layerGroup([
    //     Tilje_SkarvA_field_2014_map,
    //     Idun_field_2014_map,
    //     ATS_tiein_field_2014_map,
    //     FPSO_field_2014_map
    // ]
    // )
let SK2014_FPSO_close_layout = {
    title: "Skarv FPSO close layout 2014",
    type: "tilemap",
    baseUrl: "fields/Skarv/layouts/FPSO_close/tilemap/Skarv_FPSO_close_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 15,
        maxZoom: 20,
        maxNativeZoom: 18
    }
};
    // url = "fields/Skarv/layouts/FPSO_close/tilemap/Skarv_FPSO_close_2014/{z}/{x}/{y}.png"
    // var FPSO_close_2014_map = L.tileLayer(url, {tms: true,
    //     CRS: "EPSG:23032",
    //     minZoom: 15,
    //     maxZoom: 19,
    //     maxNativeZoom:18})
let SK2014_Tilje_SkarvA_close_layout = {
    title: "Skarv Tilje-SkarvA close layout 2014",
    type: "tilemap",
    baseUrl: "fields/Skarv/layouts/Tilje_SkarvA_close/tilemap/Tilje_SkarvA_close_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 15,
        maxZoom: 20,
        maxNativeZoom: 18
    }
};
    // url = "fields/Skarv/layouts/Tilje_SkarvA_close/tilemap/Tilje_SkarvA_close_2014/{z}/{x}/{y}.png"
    // var Tilje_SkarvA_close_2014_map = L.tileLayer(url, {tms: true,
    //     CRS: "EPSG:23032",
    //     minZoom: 15,
    //     maxZoom: 19,
    //     maxNativeZoom:18})
let SK2014_SkarvBC_close_layout = {
    title: "Skarv SkarvBC close layout 2014",
    type: "tilemap",
    baseUrl: "fields/Skarv/layouts/SkarvBC_close/tilemap/SkarvBC_close_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 15,
        maxZoom: 20,
        maxNativeZoom: 18
    }
};
    // url = "fields/Skarv/layouts/SkarvBC_close/tilemap/SkarvBC_close_2014/{z}/{x}/{y}.png"
    // var SkarvBC_close_2014_map = L.tileLayer(url, {tms: true,
    //     CRS: "EPSG:23032",
    //     minZoom: 15,
    //     maxZoom: 19,
    //     maxNativeZoom:18})
let SK2014_Idun_close_layout = {
    title: "Skarv Idun close layout 2014",
    type: "tilemap",
    baseUrl: "fields/Skarv/layouts/Idun_close/tilemap/Idun_close_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 15,
        maxZoom: 20,
        maxNativeZoom: 18
    }
};
    // url = "fields/Skarv/layouts/Idun_close/tilemap/Idun_close_2014/{z}/{x}/{y}.png"
    // var Idun_close_2014_map = L.tileLayer(url, {tms: true,
    //     CRS: "EPSG:23032",
    //     minZoom: 15,
    //     maxZoom: 19,
    //     maxNativeZoom:18})
let SK2014_ATS_tiein_close_layout = {
    title: "Skarv ATS tie-in close layout 2014",
    type: "tilemap",
    baseUrl: "fields/Skarv/layouts/ATS_tiein_close/tilemap/ATS_tiein_close_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 15,
        maxZoom: 20,
        maxNativeZoom: 18
    }
}; 
    // url = "fields/Skarv/layouts/ATS_tiein_close/tilemap/ATS_tiein_close_2014/{z}/{x}/{y}.png"
    // var ATS_tiein_close_2014_map = L.tileLayer(url, {tms: true,
    //     CRS: "EPSG:23032",
    //     minZoom: 15,
    //     maxZoom: 19,
    //     maxNativeZoom:18})
export let SK2014_close_layouts = {
    title: "Skarv close layouts 2014",
    type: "layerGroup",
    layers: [
        SK2014_FPSO_close_layout,
        SK2014_Tilje_SkarvA_close_layout,
        SK2014_SkarvBC_close_layout,
        SK2014_Idun_close_layout,
        SK2014_ATS_tiein_close_layout
    ],
    options: {
        tms: true,
        CRS: "EPSG:23032",
        minZoom: 15,
        maxZoom: 20,
        maxNativeZoom: 18
    }
};
    // var close_layouts_group = L.layerGroup([
    //     Tilje_SkarvA_close_2014_map,
    //     SkarvBC_close_2014_map,
    //     Idun_close_2014_map,
    //     ATS_tiein_close_2014_map,
    //     FPSO_close_2014_map
    // ]
    // )
export let skarvMapObj = {
    title: "Skarv",
    layers: [
        Object.assign({"show":true}, NpdObj),
        SK2006_tm_MBES,
        SK2013_02_tm_MBES,
        SK2013_08_tm_MBES,
        SK2013_final_tm_MBES,
        SK2015_tm_MBES_shadedrelief,
        SK2014_field_layouts,
        SK2014_close_layouts,
        SK2015_5point_geojsonFC,
    ],
    center: [65.70, 7.65],
    zoom: 10
}

// Valhall =======================================================
export let Valhall2014_tm_MBES = {
    title: "Valhall/Ula 2014",
    type: "tilemap",
    baseUrl: "Valhall/2014/tilemaps/Valhall_2014_shaded_reliefs/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 10,
        maxZoom: 22,
        maxNativeZoom: 20
    }
};
export let Valhall2014_PC_tm_MBES = {
    title: "Valhall Power Cable 2014",
    type: "tilemap",
    baseUrl: "Valhall/2014/tilemaps/Valhall_Power_Cable_2014/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 10,
        maxZoom: 22,
        maxNativeZoom: 20
    }
};
export let valhallMapObj = {
    title: "Valhall",
    layers: [
        Object.assign({"show":true}, NpdObj),
        Valhall2014_tm_MBES,
        Valhall2014_PC_tm_MBES,
    ],
    center: [56.27, 3.39],
    zoom: 10
}
// Alvheim =======================================================
let Alvheim2016_Boa_layout = {
    title: "Alvheim Boa layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/Boa/tilemap/Alvheim_Boa_layout_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
let Alvheim2016_Boyla_layout = {
    title: "Alvheim Bøyla layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/Bøyla/tilemap/Alvheim_Bøyla_layout_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
let Alvheim2016_East_Kameleon_layout = {
    title: "Alvheim East Kameleon layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/East_Kameleon/tilemap/Alvheim_East_Kameleon_layout_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
let Alvheim2016_FPSO_layout = {
    title: "Alvheim FPSO area layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/FPSO/tilemap/Alvheim_FPSO_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
let Alvheim2016_Kneler_A_layout = {
    title: "Alvheim Kneler A layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/Kneler_A/tilemap/Alvheim_Kneler_A_layout_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
let Alvheim2016_Kneler_B_layout = {
    title: "Alvheim Kneler B layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/Kneler_B/tilemap/Alvheim_Kneler_B_layout_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
let Alvheim2016_Vilje_layout = {
    title: "Alvheim Vilje layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/Vilje_Sør/tilemap/Alvheim_Vilje_Sør_layout_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
let Alvheim2016_Volund_layout = {
    title: "Alvheim Volund layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/Volund/tilemap/Alvheim_Volund_layout_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
let Alvheim2016_Water_Disposal_Wells_layout = {
    title: "Alvheim Water Disposal Wells layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/Water_Disposal_wells/tilemap/Alvheim_Water_Disposal_wells_layout_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
export let Alvheim2016_overall_layout = {
    title: "Alvheim overall layout 2016",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/overall_layout_2016/tilemap/Alvheim_overall_layout_2016/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 8,
        maxZoom: 16,
        maxNativeZoom: 14
    }
};
export let Alvheim2006_overall_layout = {
    title: "Alvheim overall layout 2006",
    type: "tilemap",
    baseUrl: "fields/Alvheim/layouts/overall_layout_2006/tilemap/Alvheim_overall_layout/{z}/{x}/{y}.png",
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 8,
        maxZoom: 14,
        maxNativeZoom:14
    }
};
export let Alvheim2016_local_layouts = {
    title: "Alvheim local layouts 2016",
    type: "layerGroup",
    layers: [
        Alvheim2016_Boa_layout,
        Alvheim2016_Boyla_layout,
        Alvheim2016_East_Kameleon_layout,
        Alvheim2016_FPSO_layout,
        Alvheim2016_Kneler_A_layout,
        Alvheim2016_Kneler_B_layout,
        Alvheim2016_Vilje_layout,
        Alvheim2016_Volund_layout,
        Alvheim2016_Water_Disposal_Wells_layout
    ],
    options: {
        tms: true,
        CRS: "EPSG:23031",
        minZoom: 14,
        maxZoom: 22,
        maxNativeZoom:20
    }
};
export let alvheimMapObj = {
    title: "Alvheim",
    layers: [
        Object.assign({"show":true}, NpdObj),
        Alvheim2016_overall_layout,
        Alvheim2016_local_layouts,
        Alvheim2006_overall_layout
    ],
    center: [59.567, 1.995],
    zoom: 10
}

// North Sea =============================
export let northseaMapObj = {
    title: "North Sea",
    layers: [Object.assign({"show":true}, NpdObj)],
    center: [58.80, 2.5],
    zoom: 5
}


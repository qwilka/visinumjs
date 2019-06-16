// node -r esm test.js
//import child_process from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
 
import NetCDFReader from 'netcdfjs';
import LatLon from 'geodesy/latlon-ellipsoidal-datum';
import Utm from 'geodesy/utm';

let dirpath, ncfiles;
dirpath = "/home/develop/vn-server/fields/GBR-MILLER-PL720/GBR-MILLER-PL720_KP0-KP4.2_201904_Xoceansurvey-DTM";

ncfiles = fs.readdirSync(dirpath).filter(fn => fn.endsWith('.vn-dtm.nc'));
//console.log(ncfiles);

function UTM_to_WGS84(coordinate, SRS) {
    let [E, N] = coordinate;
    switch(SRS) {
        case "EPSG:23030":  // https://www.spatialreference.org/ref/epsg/23030/
            let coord_UTM = new Utm(30, "N", E, N, LatLon.datums.ED50);
            console.log("coord_UTM.toString", coord_UTM.toString());
            let coord_latlon = coord_UTM.toLatLon();
            // console.log("coord_UTM.toLatLon", coord_latlon)
            // console.log([coord_latlon.lon, coord_latlon.lat])
            return [coord_latlon.lon, coord_latlon.lat]
            //break;
        default:
            return null;
    }
}

for (const _f of ncfiles) {
    let fpath = path.join(dirpath, _f)
    console.log(fpath);
    let ncdata = fs.readFileSync(fpath);
    let reader = new NetCDFReader(ncdata);
    let SRS = reader.getAttribute("SRS");
    // https://github.com/cheminfo-js/netcdfjs/issues/19
    let resol=reader.globalAttributes.find((val) => val.name === "resolution").value;
    //let SRS = reader.globalAttributes.find((val) => val.name === "SRS").value;
    let bbox_UTM = reader.getDataVariable('bbox_UTM');
    let [lon, lat] = UTM_to_WGS84([bbox_UTM[0], bbox_UTM[1]], SRS)
    console.log("SRS=", SRS, "resol=", resol, bbox_UTM, [lon, lat]);
    break;
}

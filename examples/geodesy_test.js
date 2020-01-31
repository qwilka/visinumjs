// node -r esm test.js
import LatLon from 'geodesy/latlon-ellipsoidal-datum';
import Utm from 'geodesy/utm';
let [E, N] = [572120, 6382750];
let coord_UTM = new Utm(30, "N", E, N, LatLon.datums.ED50);
console.log("EPSG:23030", coord_UTM.toString());
let latlonED50 = coord_UTM.toLatLon();
let latlonWGS84 = latlonED50.convertDatum(LatLon.datums.WGS84);
console.log("EPSG:4326 [lon, lat]", [latlonWGS84.lon, latlonWGS84.lat])
// https://epsg.io/transform#s_srs=23030&t_srs=4326&x=572120.0000000&y=6382750.0000000
console.assert(latlonWGS84.lon.toFixed(5) == '-1.79567');
console.assert(latlonWGS84.lat.toFixed(5) == '57.57943');
// console.log("p1.distanceTo(p2)=", d, d.toFixed(3));


//E572120_N6382750_T10.vn-dtm.nc (-1.79567461404655, 57.5794287230278, -1.7955044624828778, 57.57951693534359)

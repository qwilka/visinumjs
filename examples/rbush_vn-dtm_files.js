// node -r esm 
import fs from 'fs';
import path from 'path';

import RBush from 'rbush';

let testing = false;

if (testing) {
    let srcdir = "/home/develop/vn-server/fields/GBR-MILLER-PL720/GBR-MILLER-PL720_KP0-KP4.2_201904_Xoceansurvey-DTM"
    let datatree_fname = "datatree-items.ft.json"
    let datatree_idx = 2;
    let datatree_fpath = path.join(srcdir, datatree_fname)
}

let datatree_fpath = process.argv[2];
let datatree_idx = parseInt(process.argv[3]);

//let pathObj = path.parse(datatree_fpath);

if (!fs.existsSync(datatree_fpath) || !fs.lstatSync(datatree_fpath).isFile()) {
    console.warn(`DTM_rbush_ncfiles.js cannot access file «${datatree_fpath}»`)
    process.exit(1);
}

let datatreeObj = JSON.parse(fs.readFileSync(datatree_fpath, 'utf8'));

if (isNaN(datatree_idx) || 
    datatree_idx>=datatreeObj.length ||
    datatree_idx<0 ||
    !datatreeObj[datatree_idx]["data"].hasOwnProperty("rbush_items")) {
    console.warn(`DTM_rbush_ncfiles.js arg «datatree_idx» not correctly specified «${datatree_idx}»`)
    process.exit(1);
}

let rbush_items = datatreeObj[datatree_idx]["data"]["rbush_items"]
const rtree = new RBush();

for (const itm of rbush_items) {
    rtree.insert(itm);
}

if (testing) {
    //console.log(JSON.stringify(rbush_items, null, 2));
    let found_itms = rtree.search({
        minX: -1.7946,
        minY: 57.5794,
        maxX: -1.79424,
        maxY: 57.57958 
    })
    
    for (const itm of found_itms) {
        console.log("found:", itm.fname);
    }
    console.log(require.main);
    console.log(require.main===module);
    console.log(process.argv);
}

datatreeObj[datatree_idx]["data"]["rbush"] = rtree.toJSON();
//datatree_fpath = path.join(srcdir, "datatree-items2.ft.json");
delete datatreeObj[datatree_idx]["data"]["rbush_items"];
fs.writeFileSync(datatree_fpath, JSON.stringify(datatreeObj));



//import {VnNode} from './vntree.js';
import './vntree.js';
var rootnode;
var jstree = new jsTree({}, document.getElementById('datatree'));
jstree.empty();




rootnode = new VnNode("root node");
let node1 = new VnNode("node1 level1", rootnode);
let node11 = new VnNode("node11 level2", node1);
let node12 = new VnNode("node12 level2", node1);
let node13 = new VnNode("node13 level2", node1);
let node121 = new VnNode("node121 level3", node12);
let node122 = new VnNode("node122 level3", node12);
let node2 = new VnNode("node2 (level1)", rootnode);
let node21 = new VnNode("node21 (level2)", node2);
let node211 = new VnNode("node211 (level3)", node21);
let node212 = new VnNode("node212 (level3) parentless");
node21.add_child(node212);
node21.add_child(new VnNode("node213 (level3) parentless"));
let node3 = new VnNode("node3 (level1)", rootnode);

console.log(rootnode.to_texttree());
for (let n of rootnode) console.log(n.name);




const importJSON = async (filepath=null, startIn="documents") => {
    let jsonStr;
    if (filepath) {
        jsonStr = await fetchFileData(filepath, "«importJSON»");
    } else {
        let [fileHandle] = await window.showOpenFilePicker({startIn, types:[{description:'vntree JSON', accept:{"application/json":['.json']}}]});
        console.log("fileHandle=", fileHandle);
        let file = await fileHandle.getFile();
        jsonStr = await file.text();
    }
    rootnode = VnNode.from_JSON(jsonStr);  // rootnode is global


    
    enableElem('butClear');
    enableElem('butExport');
    disableElem('butImport');
};


const exportJSON = async () => {
    let fileHandle = await window.showSaveFilePicker({startIn: "documents"});
    console.log("exportJSON fileHandle =", fileHandle);
    let jsonStr = rootnode.to_JSON();
    const writable = await fileHandle.createWritable();
    await writable.write(jsonStr);
    await writable.close();
};
  
const clearTree = () => {
    jstree.empty();
    //jstree.redraw();
  
    // let butClear = document.getElementById('butClear');
    // if (!butClear.hasAttribute("disabled")) butClear.setAttribute("disabled", "");
  
    // let butExport = document.getElementById('butExport');
    // if (!butExport.hasAttribute("disabled")) butExport.setAttribute("disabled", "");
  
    // let butImport = document.getElementById('butImport');
    // if (butImport.hasAttribute("disabled")) butImport.removeAttribute("disabled");
    disableElem('butClear');
    disableElem('butExport');
    enableElem('butImport');
};

// function editNodeName(jstreeNode) {
//     console.log("editNodeName jstreeNode", jstreeNode);
//     let _id = jstreeNode.data.id;
//     console.log("editNodeName jstreeNode", jstreeNode.data.text, _id);
//     console.log("rootnode=", rootnode);
//     let vnnode = rootnode.get_node_by_id(_id);
//     console.log("editNodeName vnnode", vnnode);
    
// };    



export const enableElem = (elemId) => {
    let elem = document.getElementById(elemId);
    if (elem.hasAttribute("disabled")) elem.removeAttribute("disabled");    
  }
  
  export const disableElem = (elemId) => {
    let elem = document.getElementById(elemId);
    if (!elem.hasAttribute("disabled")) elem.setAttribute("disabled", "");    
  }
  
  export function removeElemById(elemId) {
    let node = document.getElementById(elemId);
    if (node) node.remove();
  }


document.getElementById('butClear').addEventListener('click', () => {
    clearTree();
});
document.getElementById('butImport').addEventListener('click', () => {
    importJSON();
});
document.getElementById('butExport').addEventListener('click', () => {
    exportJSON();
});



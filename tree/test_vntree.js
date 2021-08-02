// node -i -e "$(< test_vntree.js)"
// node -r esm test_vntree.js

const fs = require("fs");

const VnNode = require("./vnnode");

let rootnode, choice = "def";

switch (choice) {
    case "theworld.json":
        let fpath = "./theworld.json";
        let jsonStr =  fs.readFileSync(fpath, 'utf8');
        rootnode = Node.from_JSON(jsonStr);
        //console.log("not implemented");
        break;
    default:
        rootnode = new VnNode("root node");
        let node1 = new VnNode("node1", rootnode);
        let node11 = new VnNode("node11 level2", node1);
        let node12 = new VnNode("node12 level2", node1);
        let node13 = new VnNode("node13 level2", node1);
        let node121 = new VnNode("node121 level3", node12);
        let node122 = new VnNode("node122 level3", node12);
        let node2 = new VnNode("node1", rootnode);
        let node21 = new VnNode("node21 (level2)", node2);
        let node211 = new VnNode("node211 (level3)", node21);
        let node212 = new VnNode("node212 (level3) parentless");
        node21.add_child(node212);
        node21.add_child(new VnNode("node213 (level3) parentless"));
        let node3 = new VnNode("node3", rootnode);

        let world = new VnNode('The World', null, {"population":7762609412});
        let europe = new VnNode('Europe', world);
        let belgium = new VnNode('Belgium', europe, {"capital":"Brussels","population":11515793});

        node1.embed_tree(world);
}



console.log(rootnode.to_texttree());
for (let n of rootnode) console.log(n.name);

// // let fpath = "./theworld.json";
// // let jsonStr =  fs.readFileSync(fpath, 'utf8');
// // console.log("jsonStr =", jsonStr )
// // rootnode = Node.from_JSON(jsonStr);
// // //console.log("rootnode =", rootnode )

// console.log(rootnode.to_texttree());
// for (let n of rootnode) console.log(n.name);

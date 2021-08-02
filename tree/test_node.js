// node -i -e "$(< test_node.js)"
// node -r esm test_node.js

const fs = require("fs");

const Node = require("./node");

let rootnode, choice = "theworld.json"; // "theworld.json"

switch (choice) {
    case "theworld.json":
        let fpath = "./theworld.json";
        let jsonStr =  fs.readFileSync(fpath, 'utf8');
        rootnode = Node.from_JSON(jsonStr);
        break;
    default:
        rootnode = new Node("root node");
        let node1 = new Node("node1 level1", rootnode);
        let node11 = new Node("node11 level2", node1);
        let node12 = new Node("node12 level2", node1);
        let node13 = new Node("node13 level2", node1);
        let node121 = new Node("node121 level3", node12);
        let node122 = new Node("node122 level3", node12);
        let node2 = new Node("node2 (level1)", rootnode);
        let node21 = new Node("node21 (level2)", node2);
        let node211 = new Node("node211 (level3)", node21);
        let node212 = new Node("node212 (level3) parentless");
        node21.add_child(node212);
        node21.add_child(new Node("node213 (level3) parentless"));
        let node3 = new Node("node3 (level1)", rootnode);
}



console.log(rootnode.to_texttree());
for (let n of rootnode) console.log(n.name);



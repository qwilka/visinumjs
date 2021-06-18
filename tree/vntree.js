
// node -i -e "$(< vntree.js)"

class Node {
    constructor(name, parent=null, data={}) {
        this.name = name;
        this.parent = parent;
        this.childs = []
        if (parent !== null) {
            parent.add_child(this)
        }
    }

    add_child (newchild) {
        this.childs.push(newchild)
        newchild.parent = this
    }

    *traverse() {
        yield this;
        for (let child of this.childs) {
            yield* child;
        }
    }
    
    [Symbol.iterator]() {
        return this.traverse();
    }


    toTextTree(tabLevel=-1) {
        let nodetext = "";
        tabLevel += 1;
        for (let i =0; i < tabLevel; i++) {
            nodetext += ".   ";
        }
        nodetext += "|---" + this.name + "\n";   
        for (let child of this.childs) {
            nodetext += child.toTextTree(tabLevel);
        }
        return nodetext;
    }

}




let rootnode = new Node("root node");
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
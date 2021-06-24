
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

class VnNode extends Node {
    constructor(name, parent=null, data={}) {
        super(name, parent, data);
    }
}

function PNode(name, parent=null, data={}) {
    let node = new VnNode(name, parent, data);
    let pnode = new Proxy(node, {});
    // pnode.parent = parent;
    // pnode.data = data;
    return pnode;

}

let run_tests = false;
if (run_tests || require.main===module) {
    console.log("Launching tests for ", __filename)
    runTests()
}

function runTests() {
    let rootnode = new VnNode("root node");
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
    
    console.log(rootnode.toTextTree());
    for (let n of rootnode) console.log(n.name);
}

module.exports = VnNode;
//export {VnNode};


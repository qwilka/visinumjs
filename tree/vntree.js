
// node -i -e "$(< vntree.js)"

function make_nodeid() {
    // https://github.com/uuidjs/uuid
    let _nodeid = uuidv4();
    _nodeid = _nodeid.replace(/-/g, "");
    return _nodeid;
}


var jstree = new jsTree({}, document.getElementById('datatree'));
jstree.empty();
//jstree = null;

class VnNode {
    constructor(name, parent=null, data={}, treedict=null) {
        this.parent = parent;
        this.childs = [];
        if (treedict) {
            this.data = treedict.data;
            // for (let child of treedict.childs) {
            //     this.childs.push(new VnNode(null, this, null, child));
            //     //this.add_child(new VnNode(null, null, null, child));
            // }
        } else {
            this.data = data;
        }
        if (!this.data.hasOwnProperty("_vntree")) {
            this.data._vntree = {};
        }
        if (!this.data._vntree.hasOwnProperty("_id")) {
            this.data._vntree._id = uuidv4();
        }

        let that =  new Proxy(this, {
            get(target, prop) {
                // if (prop === "name") {
                //     return target.data._vntree.name;
                if (["name", "_id"].includes(prop)) {
                    return target.data._vntree[prop];
                } else if (prop in target) {
                    // if (prop === "name") {
                    //     //console.log(`get ${prop}=${target[prop]}`); 
                    //     return target.data._vntree.name;
                    // }
                    return target[prop];
                } 
                // else {
                //     console.log("cannot get ", prop );
                //     return 0;
                // }
            },
            set(target, prop, val) {
                if (prop === "name") {
                    console.log(`set ${prop}=${val}`);
                    //target[prop] = val;
                    target.data._vntree.name = val;
                    return true;
                } else {
                    target[prop] = val;
                    return true;
                }

            }

        });

        if (name) that.name = name;
        //that.parent = parent;
        // if (parent !== null) {
        //     parent.add_child(that)
        // }
        if (treedict && treedict.childs.length) {
            for (let child of treedict.childs) {
                that.add_child(new VnNode(null, null, null, child));
            }
        } else if (parent !== null) {
            parent.add_child(that)
        }
        if (jstree && that.parent===null && jstree.tree.root.children.length===0) {
            // let jsparent = null;
            // if (that.parent) {
            //     jsparent = jstree.tree.find({id: that.parent._id})[0];
            // } 
            jstree.create({id: that._id, text: that.name}, null);
            jstree.redraw();
            jstree.openAll();
            //debugger;
        }
        return that;
    }

    add_child (newChild) {
        this.childs.push(newChild)
        newChild.parent = this

        if (jstree) {
            let jsparent = jstree.tree.find({id: this._id})[0];
            let idx = jsparent.children.length;
            jstree.create({id: newChild._id, text: newChild.name}, jsparent, idx);
            jstree.redraw();
            jstree.openAll();
            //debugger;
        }
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


    to_texttree(tabLevel=-1) {
        let nodetext = "";
        tabLevel += 1;
        for (let i =0; i < tabLevel; i++) {
            nodetext += ".   ";
        }
        nodetext += "|---" + this.name + "\n";   
        for (let child of this.childs) {
            nodetext += child.to_texttree(tabLevel);
        }
        return nodetext;
    }


    _to_treedict() {
        let treeDict = {};
        treeDict.childs = [];
        treeDict.data = this.data; // Object.assign({}, this.data); // shallow copy
        if (this.childs.length) {
            for (let child of this.childs) {
                treeDict.childs.push(child._to_treedict());
            }
        }
        return treeDict
    }


    to_JSON() {
        let treeDict = this._to_treedict();
        return JSON.stringify(treeDict);
    }


    static from_JSON(jsonStr) {
        let treeDict = JSON.parse(jsonStr);
        let rootnode = new VnNode(null, null, null, treeDict);
        return rootnode;
    }


}





//module.exports = VnNode;
//export {VnNode};


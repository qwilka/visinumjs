const _ = require('lodash');
//const _ = require('lodash');



// function make_nodeid() {
//     // https://github.com/uuidjs/uuid
//     let _nodeid = uuidv4();
//     _nodeid = _nodeid.replace(/-/g, "");
//     return _nodeid;
// }

// var ttest = typeof window;
// console.log("typeof window=", ttest);
// https://github.com/uuidjs/uuid
if (typeof window === 'undefined') {
//if(typeof process === 'object') {    
    //{ v4: uuidv4 } = require('uuid');
    uuidv4 = require('uuid').v4;
    console.log("require('uuid')=", uuidv4);
} 
//console.log("uuid=", uuidv4());

//let timeout = 100;

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
        if (name) this.name = name;
        if (!this.data._vntree.hasOwnProperty("_id")) {
            this.data._vntree._id = uuidv4();
        }

        // let that =  new Proxy(this, {
        //     get(target, prop) {
        //         // if (prop === "name") {
        //         //     return target.data._vntree.name;
        //         if (["name", "_id"].includes(prop)) {
        //             return target.data._vntree[prop];
        //         } else if (prop in target) {
        //             // if (prop === "name") {
        //             //     //console.log(`get ${prop}=${target[prop]}`); 
        //             //     return target.data._vntree.name;
        //             // }
        //             return target[prop];
        //         } 
        //         // else {
        //         //     console.log("cannot get ", prop );
        //         //     return 0;
        //         // }
        //     },
        //     set(target, prop, val) {
        //         if (prop === "name") {
        //             console.log(`set ${prop}=${val}`);
        //             //target[prop] = val;
        //             target.data._vntree.name = val;
        //             return true;
        //         } else {
        //             target[prop] = val;
        //             return true;
        //         }

        //     }

        // });

        //if (name) that.name = name;
        //that.parent = parent;


        if (treedict && treedict.childs.length) {
            for (let child of treedict.childs) {
                // setTimeout(() => {
                //     that.add_child(new VnNode(null, null, null, child));
                // }, 1);
                this.add_child(new VnNode(null, null, null, child));
            }
        } else if (parent !== null) {
            parent.add_child(this)
        }

        // if (parent !== null) {
        //     parent.add_child(that)
        // }


        // if (jstree && that.parent) {
        //     let jsparent = jstree.tree.find({id: that.parent._id})[0];
        //     let idx = jsparent.children.length;
        //     jstree.create({id: that._id, text: that.name}, jsparent, idx);
        //     jstree.redraw();
        //     jstree.openAll();
        //     //debugger;
        // }        


        // return that;
    }

    add_child (newChild) {
        this.childs.push(newChild)
        newChild.parent = this
    }

    get name() {
        return this.data._vntree.name;
    }

    set name(name) {
        this.data._vntree.name = name;
    }

    get _id() {
        return this.data._vntree._id;
    }

    // https://lodash.com/docs/4.17.15#get
    // https://lodash.com/docs/4.17.15#toPath
    get_data(path) {
        let _val = _.get(this.data, path)
        return _val;        
    }

    set_data(path, value) {
        let _obj = _.set(this.data, path, value)
        return true;        
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


    get_node_by_id(_id) {
        for (let _n of this) {
            if (_n._id === _id) return _n;
        }
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
        // let treeDict;
        // try {
        //     treeDict = JSON.parse(jsonStr);
        // } catch {
        //     treeDict = jsonStr;
        // }
        let treeDict = JSON.parse(jsonStr);
        let rootnode = new VnNode(null, null, null, treeDict);
        return rootnode;
    }


}



    
    
// if (require.main===module) {
//     module.exports = VnNode;
// } else {
//     export {VnNode};
// }

if (typeof window === 'undefined') {
    module.exports = VnNode;
} else {
    window.VnNode = VnNode;
}
// module.exports = VnNode;




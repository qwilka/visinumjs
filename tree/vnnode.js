
const _ = require('lodash');
const uuidv4 = require('uuid').v4;



// function make_nodeid() {
//     // https://github.com/uuidjs/uuid
//     let _nodeid = uuidv4();
//     _nodeid = _nodeid.replace(/-/g, "");
//     return _nodeid;
// }

// var ttest = typeof window;
// console.log("typeof window=", ttest);
// https://github.com/uuidjs/uuid
// if (typeof window === 'undefined') {
//     //{ v4: uuidv4 } = require('uuid');
//     uuidv4 = require('uuid').v4;
//     _ = require('lodash');
//     console.log("require('uuid')=", uuidv4);
// } 



class VnNode {
    #childs;
    #data;
    #eidx;

    constructor(name, parent=null, data={}, treedict=null) {
        this.parent = parent;
        this.#childs = [null];
        this.#eidx = 1;
        if (treedict) {
            this.#data = treedict.data;
            // for (let child of treedict.childs) {
            //     this.#childs.push(new VnNode(null, this, null, child));
            //     //this.add_child(new VnNode(null, null, null, child));
            // }
        } else {
            this.#data = data;
        }
        if (!this.#data.hasOwnProperty("_vntree")) {
            this.#data._vntree = {};
        }
        if (name) this.name = name;
        if (!this.#data._vntree.hasOwnProperty("_id")) {
            this.#data._vntree._id = uuidv4();
        }




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


    }

    add_child (newChild) {
        this.#childs.push(newChild)
        newChild.parent = this
    }

    get name() {
        return this.#data._vntree.name;
    }

    set name(name) {
        this.#data._vntree.name = name;
    }

    get _id() {
        return this.#data._vntree._id;
    }

    // https://lodash.com/docs/4.17.15#get
    // https://lodash.com/docs/4.17.15#toPath
    get_data(path=null) {
        if (_.isNull(path)) return this.#data;
        let _val = _.get(this.#data, path)
        if (this.#childs[0] && _.isUndefined(_val)) {
            console.log("get_data() _val isUndefined", path, " Search embedded nodes");
            for (let _n of this.#childs[0]) {
                _val = _n.get_data(path);
                if (!_.isUndefined(_val)) break;
            }
        }
        if (_.isUndefined(_val) && this.parent) {
            _val = this.parent.get_data(path);
        }
        return _val;        
    }

    set_data(path, value) {
        let _obj = _.set(this.#data, path, value)
        return true;        
    }

    embed_tree(newtree) {
        if (!this.#childs[0]) {
            let embed_root = new VnNode("EMBED");
            //this.#childs.shift(newChild);
            this.#childs[0] = embed_root;
            embed_root.parent = this;
        }

    }

    get_child(node=null) {
        if (_.isNull(node)) {
            return this.#childs.slice(this.#eidx);
        } else if (Number.isInteger(node)) {
            if (node>=this.#eidx && node<this.#childs.length) return this.#childs[node];
        } else if (_.isString(node)) {
            // let idx = this.#childs.indexOf(node);
            // if (idx>=0) return this.#childs[idx];
            let childs = this.get_child();
            let named = childs.filter(n => n.name === node);
            if (named.length === 1) return named[0];
            if (named.length > 1) return named;
        }
        return null;
    }

    *traverse() {
        yield this;
        //let _childs = this.#childs.slice(this.eidx);
        for (let child of this.get_child()) {
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
        for (let child of this.get_child()) {
            nodetext += child.to_texttree(tabLevel);
        }
        return nodetext;
    }


    to_treedict() {
        let treeDict = {};
        treeDict.childs = [];
        treeDict.data = this.#data; // Object.assign({}, this.#data); // shallow copy
        for (let child of this.#childs) {
            if (_.isNull(child)) {
                treeDict.childs.push(null);
            } else {
                treeDict.childs.push(child.to_treedict());
            }
            
        }
        return treeDict
    }


    to_JSON() {
        let treeDict = this.to_treedict();
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



if (typeof window === 'undefined') {
    module.exports = VnNode;
} else {
    window.VnNode = VnNode;
}





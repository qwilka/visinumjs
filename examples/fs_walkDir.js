// node -r esm fs_walkDir.js
import fs from 'fs';
import path from 'path';

import {VnNode} from './vn_tree'


async function walkDirMakeList (rootdir) {
  let dirContents
  try { dirContents = await new Promise( (resolve, reject) => {
                                        fs.readdir(rootdir, (err, files) => 
                                           err ? reject(err) : resolve(files))
                                    });  // rootdir -> files
  } catch (error) {
      console.log(error)
      return null
  }
  //console.log("dirContents ", dirContents);

  let fileObjsList = await Promise.all( dirContents.map( 
    file => new Promise( (resolve, reject) => {
      let filepath = path.join(rootdir, file)
      fs.stat(filepath, (error, stats) => 
            error ? reject(error) : resolve({filepath, stats}))
    })  // file -> {filepath, stats}
  ));
  //console.log("fileObjsList ", fileObjsList);

  let {dirsList, filesList} = fileObjsList.reduce( (accObj, fileObj) => {
        if (fileObj.stats.isDirectory()) {
          accObj.dirsList.push(fileObj.filepath)
        } else {
          accObj.filesList.push(fileObj.filepath)
        }
        return accObj    
      }
    , {dirsList: [], filesList: []});
  let subDirs = await Promise.all(dirsList.map(walkDirMakeList))
  // console.log("rootdir= ",rootdir, " subDirs= ", subDirs)
  // console.log("rootdir= ",rootdir, " filesList= ", filesList)
  // console.log("=========================================")
  
  return [rootdir, ...filesList.concat(...subDirs)]
}  // end function walkDirMakeList


async function walkDirMakeTree (rootdir) {
  let dirContents, rootdirpath, rootdirnode
  if (typeof rootdir === 'string') {
    rootdirpath = rootdir
    rootdirnode = new VnNode(path.basename(rootdirpath), null, {fs_path: rootdirpath})
  } else {
    rootdirpath = rootdir.fs_path
    rootdirnode = rootdir
  }

  try {
    dirContents = await new Promise( (resolve, reject) => {
                                        fs.readdir(rootdirpath, (err, files) => 
                                           err ? reject(err) : resolve(files))
                                    });  // rootdirpath -> files
  } catch(error) {
      console.log(error)
      return null
  }

  let fileObjsList = await Promise.all( dirContents.map( 
    file => new Promise( (resolve, reject) => {
      let filepath = path.join(rootdirpath, file)
      fs.stat(filepath, (error, stats) => 
            error ? reject(error) : resolve({filepath, stats}))
    })  // file -> {filepath, stats}
  ));
  //console.log("fileObjsList ", fileObjsList)

  let {dirsList, filesList} = fileObjsList.reduce( (accObj, fileObj) => {
        if (fileObj.stats.isDirectory()) {
          accObj.dirsList.push(fileObj.filepath)
        } else {
          accObj.filesList.push(fileObj.filepath)
        }
        return accObj    
      }
    , {dirsList: [], filesList: []});

  for (let childfile of filesList ) {
    new VnNode(path.basename(childfile), rootdirnode, {fs_path: childfile})
  }
  let dirsListNodes = dirsList.map(dirpath => {
    return new VnNode(path.basename(dirpath), rootdirnode, {fs_path: dirpath})
  } )
  let subDirs = await Promise.all(dirsListNodes.map(walkDirMakeTree))
  return rootdirnode
}  // end function walkDirMakeTree


export {walkDirMakeList, walkDirMakeTree}


// TESTS: just set to true|false, require.main===module does not work with Babel
let run_tests = false
if (run_tests || require.main===module) {
    runTests('/home/develop/Downloads/vntree_docs')
    console.log("Launching tests for ", __filename)
}

async function runTests(target_dir) {
    let filesList = await walkDirMakeList(target_dir)
    console.log("filesList=", filesList)
    let filestree = await walkDirMakeTree(target_dir)
    console.log(filestree.toTextTree())
    console.log(JSON.stringify(filestree.toJsTree(), null, 2))
}

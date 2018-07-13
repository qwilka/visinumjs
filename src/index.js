/*
Copyright © 2017 Qwilka Limited. All rights reserved.
Any unauthorised copying or distribution is strictly prohibited.
Author: Stephen McEntee <stephenmce@gmail.com>
*/
import 'es6-promise/auto';  // polyfill Promise on IE

import {
  CommandRegistry
} from '@phosphor/commands';

import {
  Message
} from '@phosphor/messaging';

// import {
//   BoxPanel, CommandPalette, ContextMenu, DockPanel, Menu, MenuBar, Widget
// } from '@phosphor/widgets';
import {
  BoxPanel, DockPanel, Menu, MenuBar, Widget
} from '@phosphor/widgets';

//import '@phosphor/widgets/style/index.css';
import '../libs/phosphor/style/index.css';

import 'jquery.fancytree/dist/skin-lion/ui.fancytree.css'
//import * as $ from 'jquery';
import $ from 'jquery';
import 'jquery.fancytree';



// https://stackoverflow.com/questions/3231459/create-unique-id-with-javascript
// declare var _gisMapDivIndex: number;
// _gisMapDivIndex = 0;
//import { gisPanel, showGISdata } from './gis/gis-app';
import { createGisPanel, refreshGIS } from './GIS/gis-app';
//import * as _3Dviewer from './3Dviewer/3d-viewer';
// import * as DTMviewer from './3Dviewer/DTM-viewer';
// import * as DTMviewer2 from './3Dviewer/DTM-viewer2';

const commands = new CommandRegistry();




function createGisMenu() {
  // sub-menu for GIS regions
  let regionMaps = new Menu({ commands });
  regionMaps.title.label = 'Region maps';
  regionMaps.title.mnemonic = 0;
  regionMaps.addItem({ command: 'gis-skarv-region' });
  regionMaps.addItem({ command: 'gis-valhall-region' });
  regionMaps.addItem({ command: 'gis-alvheim-region' });

  // main menu
  let root = new Menu({ commands });
  root.addItem({ command: 'refresh-gis' });
  root.addItem({ type: 'separator' });
  root.addItem({ command: 'gis-base-map' });
  root.addItem({ type: 'submenu', submenu: regionMaps });
  return root;
}


function createViewMenu() {
  let root = new Menu({ commands });
  root.addItem({ command: 'hide-show-sidepanel' });
  return root;
}

// function createDtmMenu() {
//   let root = new Menu({ commands });
//   root.addItem({ command: 'dtm-test-l22' });
//   return root;
// }




class ContentWidget extends Widget {

  static createNode() {
    let node = document.createElement('div');
    let content = document.createElement('div');
    let input = document.createElement('input');
    input.placeholder = 'Placeholder...';
    content.appendChild(input);
    node.appendChild(content);
    return node;
  }

  constructor(name) {
    super({ node: ContentWidget.createNode() });
    this.setFlag(Widget.Flag.DisallowLayout);
    this.addClass('content');
    this.addClass(name.toLowerCase());
    this.title.label = name;
    this.title.closable = true;
    this.title.caption = `Long description for: ${name}`;
  }

  get inputNode() {
    return this.node.getElementsByTagName('input')[0];
  }

  onActivateRequest(msg) {
    if (this.isAttached) {
      this.inputNode.focus();
    }
  }
}



function main() {

  commands.addCommand('hide-show-sidepanel', {
    label: 'Hide/show side-panel',
    mnemonic: 0,
    caption: 'hide (or show) the side-panel',
    execute: () => {
      if (sidePanel.isHidden) {
        sidePanel.show();
      } else {
        sidePanel.hide();
      }
    }
  });

  commands.addCommand('refresh-gis', {
    label: 'Refresh GIS maps',
    mnemonic: 0,
    caption: 'Refresh GIS maps',
    execute: () => {
      refreshGIS();
    }
  });

  commands.addCommand('gis-base-map', {
    label: 'GIS base map',
    mnemonic: 0,
    caption: 'GIS panel centred on North Sea',
    execute: () => {
      let tab = createGisPanel("North-Sea-region");
      dock.addWidget(tab);
      dock.activateWidget(tab);
    }
  });

  commands.addCommand('gis-skarv-region', {
    label: 'Skarv region map',
    mnemonic: 0,
    caption: 'GIS panel centred on Skarv region',
    execute: () => {
      let tab = createGisPanel("Skarv-region");
      dock.addWidget(tab);
      dock.activateWidget(tab);
    }
  });  

  commands.addCommand('gis-valhall-region', {
    label: 'Valhall/Ula region map',
    mnemonic: 0,
    caption: 'GIS panel centred on Valhall/Ula region',
    execute: () => {
      let tab = createGisPanel("Valhall-region");
      dock.addWidget(tab);
      dock.activateWidget(tab);
    }
  });  

  commands.addCommand('gis-alvheim-region', {
    label: 'Alvheim region map',
    mnemonic: 0,
    caption: 'GIS panel centred on Alvheim region',
    execute: () => {
      let tab = createGisPanel("Alvheim-region");
      dock.addWidget(tab);
      dock.activateWidget(tab);
    }
  });  

//   commands.addCommand('dtm-test-l22', {
//     label: 'DTM test L22',
//     mnemonic: 0,
//     caption: 'import tree for L22 DTM',
//     execute: () => {
//       DTMviewer.showData("L22 2015 tree test")
//     }
//   });  

  commands.addKeyBinding({
    keys: ['Accel H'],
    selector: 'body',
    command: 'hide-show-sidepanel'
  });

  commands.addKeyBinding({
    keys: ['Accel R'],
    selector: 'body',
    command: 'refresh-gis'
  });


  let gisMenu = createGisMenu();
  gisMenu.title.label = 'GIS';
  gisMenu.title.mnemonic = 0;

//   let dtmMenu = createDtmMenu();
//   dtmMenu.title.label = 'DTM';
//   dtmMenu.title.mnemonic = 0;

  let viewMenu = createViewMenu();
  viewMenu.title.label = 'View';
  viewMenu.title.mnemonic = 0;

  let bar = new MenuBar();
  bar.addMenu(gisMenu);
//   bar.addMenu(dtmMenu);
  bar.addMenu(viewMenu);
  bar.id = 'menuBar';


  // let contextMenu = new ContextMenu({ commands });

  // document.addEventListener('contextmenu', (event: MouseEvent) => {
  //   if (contextMenu.open(event)) {
  //     event.preventDefault();
  //   }
  // });

  // contextMenu.addItem({ command: 'example:cut', selector: '.content' });
  // contextMenu.addItem({ command: 'example:copy', selector: '.content' });
  // contextMenu.addItem({ command: 'example:paste', selector: '.content' });


  document.addEventListener('keydown', (event) => {
    commands.processKeydownEvent(event);
  });

  let gisTab = createGisPanel();
  let b1 = new ContentWidget('Blue');
  // let g1 = new ContentWidget('Green');


  let dock = new DockPanel();
  dock = new DockPanel();

//   let testDtmBoxPanel = new DTMviewer2.DtmBoxPanel();
//   dock.addWidget(testDtmBoxPanel);
//   console.log("testDtmBoxPanel.dtmDivId=", testDtmBoxPanel.dtmDivId);

  dock.addWidget(gisTab);
//   dock.addWidget(DTMviewer.viewPanel);
//   DTMviewer.initViewer();

  
  dock.addWidget(b1);
  // dock.addWidget(g1);
  // dock.addWidget(b1, { mode: 'split-right', ref: gisTab });
  // dock.addWidget(y1, { mode: 'split-bottom', ref: b1 });
  // dock.addWidget(g1, { mode: 'split-left', ref: y1 });
  // dock.addWidget(r2, { ref: b1 });
  // dock.addWidget(b2, { mode: 'split-right', ref: y1 });
  dock.id = 'dock';

  let savedLayouts = [];

  commands.addCommand('save-dock-layout', {
    label: 'Save Layout',
    caption: 'Save the current dock layout',
    execute: () => {
      savedLayouts.push(dock.saveLayout());
      // palette.addItem({
      //   command: 'restore-dock-layout',
      //   category: 'Dock Layout',
      //   args: { index: savedLayouts.length - 1 }
      // });
    }
  });

  commands.addCommand('restore-dock-layout', {
    label: args => {
      return `Restore Layout ${args.index}`;
    },
    execute: args => {
      dock.restoreLayout(savedLayouts[args.index]);
    }
  });

  // palette.addItem({
  //   command: 'save-dock-layout',
  //   category: 'Dock Layout',
  //   rank: 0
  // });

  BoxPanel.setStretch(dock, 1);

  let main = new BoxPanel({ direction: 'left-to-right', spacing: 0 });
  main.id = 'main';
  
  //main.addWidget(palette);
  let sidePanel = new Widget();
  sidePanel.id = "vn-sidepanel";
  //sidePanel.addClass('content');
  //sidePanel.title.text = 'left-side-panel';
  let sidePanelSearchBox = document.createElement('input');
  sidePanelSearchBox.type = "text";
  sidePanelSearchBox.id = "sp-searchbox";
  sidePanelSearchBox.placeholder = "(doesn't do anything yet...)";
  sidePanel.node.appendChild(sidePanelSearchBox);
  let sidePanelDatatreeDiv = document.createElement('div');
  sidePanelDatatreeDiv.id = "datatree";
  sidePanel.node.appendChild(sidePanelDatatreeDiv);
  main.addWidget(sidePanel);

  main.addWidget(dock);

  window.onresize = () => { main.update(); };

  Widget.attach(bar, document.body);
  Widget.attach(main, document.body);

  // $("#datatree").fancytree({
  //   source: [
  //     {title: "Node 1", key: "1"},
  //     {title: "Folder 2", key: "2", folder: true, children: [
  //       {title: "Node 2.1", key: "3", myOwnAttr: "abc"},
  //       {title: "Node 2.2", key: "4"}
  //     ]}
  //   ]
  // });
  $("#datatree").fancytree({
    source: {
      url: "http://localhost:8080/api/v1/visinum/dataset/treename?vn_uri=NOR%3A%3ASKARV%3A%3ASUBSEA&treename=ast&max_time_ms=3000",
      cache: false      
    }
  });

  let newDiv = document.createElement('div');
  newDiv.setAttribute("id", "data-tree2");
  newDiv.setAttribute("src", "");
  sidePanel.node.appendChild(newDiv);
  $("#data-tree2").fancytree({
    source: {
      url: "http://localhost:8080/api/v1/visinum/dataset/treename?vn_uri=0a2c14ee-6fc1-4367-bd44-d674d9836e50%7C%7C%2Fhome%2Fcirtap%2Fvn-data-temp-storage%2FL51_dataset_testing&treename=ofs&max_time_ms=3000",
      cache: false      
    }
  });

}

// function addNewGISTab() {
//   dock.addWidget(gisTab);
// }

window.onload = main;

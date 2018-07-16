
import { BoxPanel } from '@phosphor/widgets';
import * as THREE from 'three';
//import '../../node_modules/three/examples/js/libs/dat.gui.min';
import * as dat from './dat.gui.min';
//import * as TrackballControls from './TrackballControls';
import TrackballControls from './TrackballControls';
//console.log("TrackballControls", TrackballControls);
//import {TrackballControls} from './TrackballControls';
//import * as terrainLoader from './terrain-loader';

import '../../libs/phosphor/base.css';
//import '../../libs/phosphor/style/index.css';
// import '../assets/jsTree/themes/default/style.min.css';

let _dtmDivIndex=0;
//let renderer, scene, camera;


export class DtmBoxPanel extends BoxPanel {

    constructor() {
        super();
        this.title.closable = true;
        this.title.label = 'DTM viewer test';

        this.divIndex = _dtmDivIndex++;
        this.dtmDivId = "dtm-viewer-" + this.divIndex;
        this.iframe = document.createElement('iframe');
        //let _that = this;
        this.iframe.setAttribute("id", this.dtmDivId);
        // which attribute is required for the iframe file: src or location ????
        // http://stackoverflow.com/questions/8082827/reload-iframe-src-location-with-new-url-not-working-in-safari
        // this.iframe.setAttribute("src", "./view3d.html");
        // this.iframe.setAttribute("location", "./view3d.html");
        this.iframe.setAttribute("frameborder", "1");
        this.iframe.setAttribute("allowfullscreen", "");
        this.iframe.setAttribute("width", "100%");
        this.iframe.setAttribute("height", "100%");
        // this.iframe.style.margin=0;
        // this.iframe.style.overflow="hidden";
        this.iframe.style.position="relative";
        this.iframe.style.top="0px";
        this.iframe.style.left="0px";
        this.iframe.style["z-index"]=1; 

        // this.topLevelDiv = document.createElement('div');
        // this.node.appendChild(this.topLevelDiv);

        let guiControl = true;

        if (guiControl) {
            // Positioning dat.GUI - JSFiddle  https://jsfiddle.net/2pha/zka4qkt2/
            let controls = new function () {
                this.rotationSpeed = 0.02;
                this.bouncingSpeed = 0.03;
            };
            // https://workshop.chromeexperiments.com/examples/gui/#8--Custom-Placement
            this.gui = new dat.GUI({ autoPlace: false });
            this.gui.add(controls, 'rotationSpeed', 0, 0.5);
            this.gui.add(controls, 'bouncingSpeed', 0, 0.5);  
            this.gui.closed = true; //this.gui.close(); // https://stackoverflow.com/questions/14710559/dat-gui-how-to-hide-menu-with-code
            // this.node.appendChild(this.gui.domElement);     
            this.guiCtrlId = "dat-gui-" + this.divIndex;  
            let guiDiv = document.createElement('div');
            guiDiv.setAttribute("id", this.guiCtrlId);
            guiDiv.style.position="absolute";
            guiDiv.style["z-index"]=10;
            //guiDiv.setAttribute("class", "dg.a");
            guiDiv.appendChild(this.gui.domElement);
            this.node.appendChild(guiDiv); 
            // this.topLevelDiv.appendChild(guiDiv);
        }

        this.node.appendChild(this.iframe);
        // this.topLevelDiv.appendChild(this.iframe);

        

        this.iframe.onload = () => {
            // not using "./view3d.html", so set body style here..
            this.iframe.contentWindow.document.body.style.margin=0;
            this.iframe.contentWindow.document.body.style.overflow="hidden";

            this.windowWidth  = this.iframe.contentWindow.innerWidth;
            this.windowHeight = this.iframe.contentWindow.innerHeight;
            this.scene = new THREE.Scene();
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                preserveDrawingBuffer: true
            });
            this.renderer.setClearColor(0xedf0f0, 1.0);
            this.renderer.setSize(this.windowWidth, this.windowHeight);
            // position and point the camera to the center of the scene
            // this.camera.position.x = 0;
            // this.camera.position.y = 0;
            // this.camera.position.z = 10;
            this.camera = new THREE.PerspectiveCamera(45, this.windowWidth/this.windowHeight, 0.1, 5000);
            this.camera.position.set(0, 0, 10);
            this.camera.lookAt(this.scene.position);
            // let ambientLight = new THREE.AmbientLight(0x1c1c1c);
            // this.scene.add(ambientLight);
            // needs spotlight to show meshes 
            let spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(100, 100, 1000); // TODO: light the whole scene
            spotLight.castShadow = false;
            this.scene.add(spotLight);
            //document.getElementById(this.dtmDivId).contentWindow.document.body.appendChild(this.renderer.domElement);
            this.iframe.contentWindow.document.body.appendChild(this.renderer.domElement);
            // http://stackoverflow.com/questions/18813481/three-js-mousedown-not-working-when-trackball-controls-enabled
            this.cam_control = new TrackballControls(this.camera, this.renderer.domElement, this.dtmDivId);           

            // placing new dat.GUI inside the iframe strips off the css styles...
            // // https://stackoverflow.com/questions/40096704/new-function-vs-new-function
            // let controls = new function () {
            //     this.rotationSpeed = 0.02;
            //     this.bouncingSpeed = 0.03;
            // };
            // // https://workshop.chromeexperiments.com/examples/gui/#8--Custom-Placement
            // this.gui = new dat.GUI({ autoPlace: false });
            // this.gui.add(controls, 'rotationSpeed', 0, 0.5);
            // this.gui.add(controls, 'bouncingSpeed', 0, 0.5);       
            // // this.guiCtrlId = "dat-gui-" + this.divIndex;  
            // // let customContainer = document.getElementById(this.guiCtrlId);
            // // let guiDiv = document.createElement('div');
            // // guiDiv.setAttribute("id", this.guiCtrlId);
            // // guiDiv.appendChild(this.gui.domElement);
            // this.iframe.contentWindow.document.body.appendChild(this.gui.domElement);    

            this.render();
            this.addTestCube(); 
        
        }   
    }

    // https://github.com/Microsoft/TypeScript/wiki/%27this%27-in-TypeScript
    // conventional function definiton gives TypeError: this is undefined
    //render = () => {
    //render() {
    render = () => {
        this.renderer.render(this.scene, this.camera);
        this.cam_control.update();
        requestAnimationFrame(this.render);
    }

    //addTestCube = () => {
    //addTestCube() {
    addTestCube = () => {
        //Add Cube - width, height, depth
        let cubeGeom = new THREE.CubeGeometry(3, 3, 6);
        let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
        let cube = new THREE.Mesh(cubeGeom, cubeMaterial);
        //Rotate cube 45 degrees
        cube.rotation.y = Math.PI * 45 / 180;
        //Add cube to scene
        this.scene.add(cube);
        this.camera.lookAt(cube.position);
    }

}



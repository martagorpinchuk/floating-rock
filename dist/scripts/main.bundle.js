/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/Combustion.ts":
/*!***********************************!*\
  !*** ./src/scripts/Combustion.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CombustionGfx = void 0;
const three_11 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
const OrbitControls_2 = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
const GLTFLoader_2 = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
const tweakpane_4 = __webpack_require__(/*! tweakpane */ "./node_modules/tweakpane/dist/tweakpane.js");
const _ombustion_Shader_1 = __webpack_require__(/*! ./shaders/–°ombustion.Shader */ "./src/scripts/shaders/–°ombustion.Shader.ts");
class CombustionGfx {
    constructor() {
        // this.init();
        this.delta = 0;
        this.elapsedTime = 0;
        this.timeCoef = 1;
        this.timeStop = false;
        this.sizes = {
            width: 0,
            height: 0
        };
        this.tick = () => {
            window.requestAnimationFrame(this.tick);
            if (this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight) {
                this.resize();
            }
            //
            if (this.timeStop) {
                this.delta = this.clock.getDelta() * 1000;
                this.elapsedTime += this.delta;
            }
            else {
                this.clock.running = false;
            }
            if (this.potatoMaterial)
                this.potatoMaterial.uniforms.uTime.value = this.elapsedTime / 10 / 1000;
            //
            this.mapControls.update();
            this.renderer.render(this.scene, this.camera);
        };
    }
    ;
    init() {
        // Canvas
        this.canvas = document.querySelector('canvas.webglViewCombustion');
        // Scene
        this.scene = new three_11.Scene();
        this.scene.background = new three_11.Color('#78614c');
        // Camera
        this.camera = new three_11.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 1000);
        this.camera.position.set(0, 10, 10);
        this.scene.add(this.camera);
        // Controls
        this.mapControls = new OrbitControls_2.MapControls(this.camera, this.canvas);
        this.mapControls.enableDamping = true;
        // Renderer
        this.renderer = new three_11.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        // Plane
        let planeGeometry = new three_11.PlaneBufferGeometry(3000, 3000, 1, 1);
        let planeMaterial = new three_11.MeshBasicMaterial({ color: '#453322' });
        let plane = new three_11.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x -= Math.PI / 2;
        this.scene.add(plane);
        /// Light
        const light = new three_11.PointLight(0xe9f7ec, 1, 500);
        light.position.set(1, 3, 5);
        this.scene.add(light);
        this.clock = new three_11.Clock();
        this.potatoLoading();
        if (this.potato) {
            this.potato.rotation.z += Math.PI;
            this.potato.position.y = 1.35;
        }
        this.debug();
        //
        this.tick();
    }
    ;
    debug() {
        const combustionTwp = new tweakpane_4.Pane({ title: "Combustion", expanded: false });
        combustionTwp.element.parentElement.style['z-index'] = '20';
        combustionTwp.element.parentElement.style['margin-top'] = '80px';
        combustionTwp.element.parentElement.style['width'] = '330px';
        combustionTwp.addInput(this, 'timeStop', { title: 'Time stop' }).on('change', () => {
            if (this.timeStop) {
                this.timeCoef = this.elapsedTime;
                this.potatoMaterial.uniforms.uTime.value = this.timeCoef / 10 / 100;
                // this.clock.stop;
                // console.log(this.elapsedTime);
                // this.timeCoef = 0;
            }
            else
                this.timeCoef = 1;
        });
        combustionTwp.addInput(this, 'timeCoef', { min: 0.00001, max: 1 });
    }
    ;
    resize() {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    ;
    potatoLoading() {
        // this.potatoMaterial = new –°ombustionMaterial();
        // Loading potato_character
        this.loader = new GLTFLoader_2.GLTFLoader();
        this.loader.load('resources/models/potato_character/scene.gltf', (gltf) => {
            this.potato = gltf.scene.children[0];
            this.potato.traverse((item) => {
                if (item instanceof three_11.Mesh && item.material instanceof three_11.Material) {
                    // @ts-ignore
                    this.potatoMaterial = new _ombustion_Shader_1.–°ombustionMaterial({ color: 0xffffff });
                    // @ts-ignore
                    this.potatoMaterial.uniforms.tDiffuse.value = item.material.map;
                    // @ts-ignore
                    item.material = this.potatoMaterial;
                }
                this.potato.rotation.z += Math.PI;
                this.potato.position.y = 1.35;
                this.scene.add(this.potato);
            });
        });
    }
    ;
}
exports.CombustionGfx = CombustionGfx;
;
exports["default"] = new CombustionGfx();


/***/ }),

/***/ "./src/scripts/FireFog.ts":
/*!********************************!*\
  !*** ./src/scripts/FireFog.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FogGfx = void 0;
const three_2 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
const FireFog_Shader_1 = __webpack_require__(/*! ./shaders/FireFog.Shader */ "./src/scripts/shaders/FireFog.Shader.ts");
//
class FogGfx {
    //
    constructor(color, numberOfSprites, height, width, depth) {
        this.numberOfSprites = 10;
        this.height = 1;
        this.width = 1;
        this.depth = 1;
        this.density = 105;
        this.velocity = [];
        this.positions = [];
        this.randomPos = (Math.random() - 0.5) * 2;
        this.speedSizeChange = 0.137;
        this.coordEpearingParticle = 0;
        this.opacityCoef = 0.999;
        this.wrapper = new three_2.Object3D();
        this.newPosition = new three_2.Vector3(-0.946, -0.37, -0.946); // --
        this.soursePosition = new three_2.Vector3(0, 0.5, 0);
        this.cubeVisibility = true;
        this.sizeCoef = 0.1;
        this.externalForce = new three_2.Vector3(0, 0, 0);
        this._frameDuration = 300;
        this.height = height;
        this.width = width;
        this.depth = depth;
        this.numberOfSprites = numberOfSprites;
        // create fog
        this.material = new FireFog_Shader_1.FogMaterial();
        this.material.side = three_2.DoubleSide;
        this.material.uniforms.uColor.value.setHex(color);
        this.material.uniforms.uFrameDuration.value = this._frameDuration;
        this.generate(this.density, this.height, this.width, this.depth, this.newPosition);
    }
    ;
    generate(density, height, width, depth, newPosition) {
        const boxGeometry = new three_2.BoxGeometry(0.3, 0.3, 0.3);
        const boxMaterial = new three_2.MeshBasicMaterial({ color: 0x000000 });
        boxMaterial.wireframe = true;
        if (!this.cube) {
            this.cube = new three_2.Mesh(boxGeometry, boxMaterial);
            // this.wrapper.add( this.cube );
        }
        if (this.mesh) {
            this.geometry.dispose();
            boxGeometry.dispose();
            this.wrapper.remove(this.mesh);
        }
        this.newPosition.x = newPosition.x;
        this.newPosition.y = newPosition.y;
        this.newPosition.z = newPosition.z;
        this.height = height;
        this.width = width;
        this.depth = depth;
        let fogPointPosition = new three_2.Vector3(0, 0, 0);
        this.numberOfSprites = density * height * width * depth;
        let size = [], uv, offsetFrame = [], sizeIncrease = [], opacityDecrease = [], color = [];
        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];
        for (let i = 0; i < this.numberOfSprites; i++) {
            let scaleX = 1;
            let scaleY = 1;
            let scaleZ = 1;
            const rotationX = 0;
            const rotationY = 0;
            const rotationZ = 0;
            let transformMatrix = new three_2.Matrix4().compose(new three_2.Vector3(-0.946, -0.3, -0.946), new three_2.Quaternion().setFromEuler(new three_2.Euler(rotationX, rotationY, rotationZ)), new three_2.Vector3(scaleX, scaleY, scaleZ)).toArray();
            transformRow1.push(transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3]);
            transformRow2.push(transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7]);
            transformRow3.push(transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11]);
            transformRow4.push(transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15]);
            size.push(0.3);
            sizeIncrease.push(Math.random() * 0.02);
            opacityDecrease.push(0.9);
            this.velocity.push((Math.random() - 0.5) * 2 / 100, (Math.random() - 0.5) * 2 / 100, (Math.random() - 0.5) * 2 / 100);
            offsetFrame.push(Math.floor(Math.random() * 50 * 16));
        }
        this.positions = [
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            -1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0
        ];
        uv = [
            0, 0,
            1, 0,
            1, 1,
            1, 1,
            0, 1,
            0, 0
        ];
        this.geometry = new three_2.InstancedBufferGeometry();
        this.geometry.setAttribute('position', new three_2.Float32BufferAttribute(this.positions, 3));
        this.geometry.setAttribute('uv', new three_2.Float32BufferAttribute(uv, 2));
        this.geometry.setAttribute('transformRow1', new three_2.InstancedBufferAttribute(new Float32Array(transformRow1), 4));
        this.geometry.setAttribute('transformRow2', new three_2.InstancedBufferAttribute(new Float32Array(transformRow2), 4));
        this.geometry.setAttribute('transformRow3', new three_2.InstancedBufferAttribute(new Float32Array(transformRow3), 4));
        this.geometry.setAttribute('transformRow4', new three_2.InstancedBufferAttribute(new Float32Array(transformRow4), 4));
        this.geometry.setAttribute('offsetFrame', new three_2.InstancedBufferAttribute(new Float32Array(offsetFrame), 1));
        this.geometry.setAttribute('velocity', new three_2.InstancedBufferAttribute(new Float32Array(this.velocity), 3));
        this.geometry.setAttribute('opacityDecrease', new three_2.InstancedBufferAttribute(new Float32Array(opacityDecrease), 1));
        this.geometry.setAttribute('size', new three_2.InstancedBufferAttribute(new Float32Array(size), 1));
        this.mesh = new three_2.Mesh(this.geometry, this.material);
        this.wrapper.add(this.mesh);
    }
    ;
    update(delta, intersects, externalForce) {
        for (let i = 0; i < this.numberOfSprites; i++) {
            const newSize = this.geometry.attributes.size.getX(i) + this.speedSizeChange * this.sizeCoef;
            this.geometry.attributes.size.setX(i, newSize);
            let velosityX = this.geometry.attributes.velocity.getX(i);
            let velosityY = this.geometry.attributes.velocity.getY(i);
            let velosityZ = this.geometry.attributes.velocity.getZ(i);
            let newPosX = this.geometry.attributes.transformRow4.getX(i);
            let newPosY = this.geometry.attributes.transformRow4.getY(i);
            let newPosZ = this.geometry.attributes.transformRow4.getZ(i);
            let velosityAccelerationX = (intersects.x - newPosX + externalForce.x) / 200;
            let velosityAccelerationY = (intersects.y - newPosY + externalForce.y) / 200;
            ;
            let velosityAccelerationZ = (intersects.z - newPosZ + externalForce.z) / 200;
            const newOpacity = this.geometry.attributes.opacityDecrease.getX(i) - this.opacityCoef;
            this.geometry.attributes.opacityDecrease.setX(i, newOpacity);
            newPosX += ((velosityX + velosityAccelerationX * newOpacity) * delta) / 16;
            newPosY += ((velosityY + velosityAccelerationY * newOpacity) * delta) / 16;
            newPosZ += ((velosityZ + velosityAccelerationZ * newOpacity) * delta) / 16;
            if (newOpacity <= 0.001) {
                newPosX = (Math.random() - 0.5) * this.coordEpearingParticle + this.soursePosition.x;
                newPosY = (Math.random() - 0.5) * this.coordEpearingParticle + this.soursePosition.y;
                newPosZ = (Math.random() - 0.5) * this.coordEpearingParticle + this.soursePosition.z;
                this.geometry.attributes.size.setX(i, 0);
                this.geometry.attributes.opacityDecrease.setX(i, 1);
            }
            this.geometry.attributes.transformRow4.setX(i, newPosX);
            this.geometry.attributes.transformRow4.setY(i, newPosY);
            this.geometry.attributes.transformRow4.setZ(i, newPosZ);
        }
        this.geometry.attributes.opacityDecrease.needsUpdate = true;
        this.geometry.attributes.size.needsUpdate = true;
        this.geometry.attributes.transformRow4.needsUpdate = true;
    }
    ;
    //
    get frameDuration() {
        return this._frameDuration;
    }
    ;
    set frameDuration(frameDuration) {
        this.material.uniforms.uFrameDuration.value = frameDuration;
        this._frameDuration = this.material.uniforms.uFrameDuration.value;
    }
    ;
    get outerColor() {
        return this._outerColor;
    }
    ;
    set outerColor(color) {
        this._outerColor = color;
        if (typeof color === 'string') {
            this.material.uniforms.uColor.value.setHex(parseInt(color.replace('#', '0x')));
        }
        else {
            this.material.uniforms.uColor.value.setHex(color);
        }
    }
    ;
    get innerColor() {
        return this._innerColor;
    }
    ;
    set innerColor(color) {
        this._innerColor = color;
        if (typeof color === 'string') {
            this.material.uniforms.uInnerColor.value.setHex(parseInt(color.replace('#', '0x')));
        }
        else {
            this.material.uniforms.uInnerColor.value.setHex(color);
        }
    }
    ;
}
exports.FogGfx = FogGfx;


/***/ }),

/***/ "./src/scripts/FloatingRock.ts":
/*!*************************************!*\
  !*** ./src/scripts/FloatingRock.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const three_1 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
const OrbitControls_js_1 = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
const GLTFLoader_1 = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
const gsap_1 = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
const Fire_Shader_1 = __webpack_require__(/*! ./shaders/Fire.Shader */ "./src/scripts/shaders/Fire.Shader.ts");
const FoamParticles_Shader_1 = __webpack_require__(/*! ./shaders/FoamParticles.Shader */ "./src/scripts/shaders/FoamParticles.Shader.ts");
const Warerfall_Shader_1 = __webpack_require__(/*! ./shaders/Warerfall.Shader */ "./src/scripts/shaders/Warerfall.Shader.ts");
const BottomFoam_Shader_1 = __webpack_require__(/*! ./shaders/BottomFoam.Shader */ "./src/scripts/shaders/BottomFoam.Shader.ts");
const TopFoam_Shader_1 = __webpack_require__(/*! ./shaders/TopFoam.Shader */ "./src/scripts/shaders/TopFoam.Shader.ts");
const tweakpane_1 = __webpack_require__(/*! tweakpane */ "./node_modules/tweakpane/dist/tweakpane.js");
const FireFog_1 = __webpack_require__(/*! ./FireFog */ "./src/scripts/FireFog.ts");
//
class FloatingRock {
    constructor() {
        this.elapsedTime = 0;
        this.sceneReady = false;
        this.foamPointCount = 200;
        this.sizes = {
            width: 0,
            height: 0
        };
        this.tick = () => {
            window.requestAnimationFrame(this.tick);
            this.delta = this.clock.getDelta() * 1000;
            this.elapsedTime += this.delta;
            if (this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight) {
                this.resize();
            }
            if (this.flameMaterial) {
                this.flameMaterial.uniforms.uTime.value = this.elapsedTime / 3000;
            }
            this.waterfallMaterial.uniforms.uTime.value = this.elapsedTime / 1500;
            this.bottomFoamMaterial.uniforms.uTime.value = this.elapsedTime / 6000;
            this.topFoamMaterial.uniforms.uTime.value = this.elapsedTime / 6000;
            if (this.rightRock)
                this.rightRock.position.y -= Math.sin(this.elapsedTime / 700) / 4500 + Math.cos(this.elapsedTime / 700) / 4300;
            if (this.leftRock)
                this.leftRock.position.y -= Math.sin(this.elapsedTime / 980) / 4500 + Math.cos(this.elapsedTime / 930) / 3500;
            if (this.fog)
                this.fog.material.uniforms.uTime.value = this.elapsedTime;
            this.foamParticleMaterial.uniforms.uTime.value = Math.sin(this.elapsedTime / 500) * 0.005 + Math.cos(this.elapsedTime / 500) * 0.005;
            this.mapControls.update();
            this.renderer.render(this.scene, this.camera);
        };
    }
    init() {
        // Canvas
        this.canvas = document.querySelector('canvas.webglView');
        // Scene
        this.scene = new three_1.Scene();
        this.scene.background = new three_1.Color('#69deeb'); //324345 - at night  // b2eef5
        // Sizes
        this.sizes.width = window.innerWidth,
            this.sizes.height = window.innerHeight;
        // Camera
        this.camera = new three_1.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set(1, 0.4, 1);
        this.scene.add(this.camera);
        // Light
        const light = new three_1.PointLight(0xffffff, 3, 10);
        light.position.set(3, 7, 3);
        this.scene.add(light);
        const ambientLight = new three_1.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        // Controls
        this.mapControls = new OrbitControls_js_1.OrbitControls(this.camera, this.canvas);
        this.mapControls.enableZoom = false;
        // Renderer
        this.renderer = new three_1.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // Resize
        window.addEventListener('resize', this.resize());
        this.clock = new three_1.Clock();
        const axesHelper = new three_1.AxesHelper(5);
        this.scene.add(axesHelper);
        //
        this.loadingBar();
        this.debug();
        this.loadModel();
        this.addFog();
        this.backgroundGradient();
        this.addWaterfall();
        this.addTopFoam();
        this.fireFlame();
        this.addBottomFoam();
        this.tick();
    }
    ;
    addFog() {
        // Fog
        let props = {
            numberOfSprites: 106,
            height: 0.001,
            width: 0.001,
            depth: 0.001,
            outerColor: '#ff0000',
            innerColor: '#FFCE00',
            newPosition: new three_1.Vector3(-0.946, 1.37, -0.946) // -0.49, -0.8, -0.4 --
        };
        this.fog = new FireFog_1.FogGfx(new three_1.Color().setHex(+props.outerColor.replace('#', '0x')).getHex(), props.numberOfSprites, props.height, props.width, props.depth);
        this.animation = new Animation();
        this.scene.add(this.fog.wrapper);
        props.newPosition = this.fog.newPosition;
    }
    ;
    debug() {
        let props = {
            color: '#fff30f',
            outerColor: '#ff0000',
            innerColor: '#FFCE00',
        };
        let pane = new tweakpane_1.Pane({ title: "Fireplace", expanded: false });
        pane.element.parentElement.style['width'] = '330px';
        pane.element.parentElement.style['margin-top'] = '171px';
        pane.element.parentElement.style['z-index'] = '10';
        pane.addInput(props, 'color', { label: 'inner color' }).on('change', () => {
            this.flameMaterial.uniforms.uInnerColor.value.setHex(parseInt(props.color.replace('#', '0x')));
        });
        pane.addInput(props, 'color', { label: 'outer color' }).on('change', () => {
            this.flameMaterial.uniforms.uOuterColor.value.setHex(parseInt(props.color.replace('#', '0x')));
        });
        pane.addInput(props, 'outerColor', { view: 'color', alpha: true, label: 'outer fog color' }).on('change', (ev) => {
            this.fog.outerColor = ev.value;
        });
        pane.addInput(props, 'innerColor', { view: 'color', alpha: true, label: 'inner fog color' }).on('change', (ev) => {
            this.fog.innerColor = ev.value;
        });
    }
    ;
    //
    loadModel() {
        this.loader = new GLTFLoader_1.GLTFLoader(this.loadingManager);
        this.loader.load('resources/models/scene.gltf', (gltf) => {
            gltf.scene.children.forEach(element => {
                // gltf.scene.children[0] as Mesh;
                this.scene.add(element);
            });
        });
        //  middle rock
        this.loader = new GLTFLoader_1.GLTFLoader(this.loadingManager);
        this.loader.load('resources/models/stone1.gltf', (gltf) => {
            this.middleRock = gltf.scene.children[0];
            this.middleRock.scale.set(0.3, 0.3, 0.3);
            this.middleRock.rotation.z += Math.PI / 1;
            this.middleRock.position.set(0, -0.056, 0);
            this.scene.add(this.middleRock);
        });
        //  right rock
        this.loader = new GLTFLoader_1.GLTFLoader(this.loadingManager);
        this.loader.load('resources/models/stone3.gltf', (gltf) => {
            this.rightRock = gltf.scene.children[0];
            this.rightRock.scale.set(0.03, 0.03, 0.03);
            this.rightRock.rotation.z += Math.PI / 1;
            this.rightRock.rotation.x += Math.PI / 7;
            this.rightRock.rotation.y += Math.PI / 7;
            this.rightRock.position.set(0.5, -0.25, -0.120);
            this.scene.add(this.rightRock);
        });
        //  left rock
        this.loader.load('resources/models/stone2.gltf', (gltf) => {
            this.leftRock = gltf.scene.children[0];
            this.leftRock.scale.set(0.08, 0.08, 0.08);
            this.leftRock.rotation.z += Math.PI;
            this.leftRock.position.set(-0.55, 0.16, 0.35);
            this.scene.add(this.leftRock);
        });
        //
        this.loader.load('resources/models/house.gltf', (gltf) => {
            this.house = gltf.scene.children[0];
            this.house.scale.set(0.1, 0.07, 0.0002);
            // this.house.rotation.z += Math.PI / 3;
            // this.house.rotation.x -= Math.PI / 2;
            this.house.rotation.y = Math.PI / 2.3;
            this.house.position.set(-0.09, 0.1, 0.06);
            this.scene.add(this.house);
        });
        //
        this.loader.load('resources/models/treeNew.gltf', (gltf) => {
            let tree = gltf.scene.children[0];
            tree.scale.set(0.014, 0.014, 0.014);
            tree.position.set(0.17, 0.04, -0.02);
            this.scene.add(tree);
        });
        this.loader.load('resources/models/cloud.gltf', (gltf) => {
            this.cloud1 = gltf.scene.children[0];
            this.cloud1.scale.set(0.03, 0.03, 0.03);
            this.cloud1.rotation.y = Math.PI / 3.3;
            this.cloud1.position.set(0.2, 0.3, -0.2);
            this.scene.add(this.cloud1);
        });
        //
        this.loader.load('resources/models/cloud2.gltf', (gltf) => {
            this.cloud2 = gltf.scene.children[0];
            this.cloud2.scale.set(0.03, 0.03, 0.03);
            this.cloud2.rotation.y = Math.PI / 4;
            this.cloud2.position.set(-0.1, 0.35, 0.2);
            this.scene.add(this.cloud2);
        });
        // rocksOnMiddleRock.gltf
        this.loader.load('resources/models/rocksOnMiddleRock.gltf', (gltf) => {
            let rocksOnMiddleRock = gltf.scene.children[0];
            rocksOnMiddleRock.scale.set(0.65, 0.65, 0.65);
            rocksOnMiddleRock.rotation.y = Math.PI / 4;
            rocksOnMiddleRock.position.set(0.34, 0.0, 0.13);
            this.scene.add(rocksOnMiddleRock);
        });
    }
    ;
    backgroundGradient() {
        let planeGeometry = new three_1.PlaneGeometry(2, 2);
        let planeMaterial = new three_1.ShaderMaterial({
            depthWrite: false,
            vertexShader: `
                varying vec2 vUv;

                void main() {

                    gl_Position = vec4( position, 1.0 );

                    vUv = uv;

                }
            `,
            fragmentShader: `
                varying vec2 vUv;

                uniform vec3 uInnerColor;
                uniform vec3 uOuterColor;

                void main() {

                    vec2 centeredUv = vec2( vUv.x - 0.5, vUv.y - 0.35 );
                    float distance = length( centeredUv ) * 7.0;

                    vec3 color = mix( uInnerColor, uOuterColor, distance );

                    float yGradient = clamp( 0.5 - vUv.y, 0.0, 1.0 ) * 1.986;

                    color = mix( color, uOuterColor, yGradient );

                    gl_FragColor = vec4( color, 1.0 );

                }
            `,
            uniforms: {
                uInnerColor: { value: new three_1.Color(0xedf6f7) },
                uOuterColor: { value: new three_1.Color(0xb3eeff) }
            }
        });
        let backgroundPlane = new three_1.Mesh(planeGeometry, planeMaterial);
        // backgroundPlane.position.set( -2, -2, -2 );
        this.scene.add(backgroundPlane);
    }
    ;
    fireFlame() {
        this.flameMaterial = new Fire_Shader_1.FlameMaterial();
        let flameGeometry = new three_1.PlaneGeometry(0.18, 0.23);
        let flame = new three_1.Mesh(flameGeometry, this.flameMaterial);
        flame.scale.set(0.66, 0.66, 0.66);
        flame.position.set(-0.946, -0.37, -0.946);
        this.scene.add(flame);
    }
    ;
    loadingBar() {
        const loadingBarElement = document.querySelector('.loading-bar');
        this.loadingManager = new three_1.LoadingManager(() => {
            window.setTimeout(() => {
                gsap_1.gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 });
                loadingBarElement.classList.add('ended');
                // @ts-ignore
                loadingBarElement.style.transform = '';
            }, 500);
            window.setTimeout(() => {
                this.sceneReady = true;
            }, 2000);
        }, (itemUrl, itemsLoaded, itemsTotal) => {
            const progressRatio = itemsLoaded / itemsTotal;
            // @ts-ignore
            loadingBarElement.style.transform = `scaleX(${progressRatio})`;
        });
        /**
         * Overlay
         */
        const overlayGeometry = new three_1.PlaneGeometry(2, 2, 1, 1);
        const overlayMaterial = new three_1.ShaderMaterial({
            // wireframe: true,
            transparent: true,
            uniforms: {
                uAlpha: { value: 1 }
            },
            vertexShader: `
                void main() {

                    gl_Position = vec4(position, 1.0);

                }
            `,
            fragmentShader: `
                uniform float uAlpha;

                void main() {

                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);

                }
            `
        });
        const overlay = new three_1.Mesh(overlayGeometry, overlayMaterial);
        this.scene.add(overlay);
    }
    ;
    resize() {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    ;
    addWaterfall() {
        this.waterfallMaterial = new Warerfall_Shader_1.WaterfallMaterial();
        let waterfallGeometry = new three_1.PlaneGeometry(0.14, 0.327);
        let waterfall = new three_1.Mesh(waterfallGeometry, this.waterfallMaterial);
        let brightness = [];
        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];
        for (let i = 0; i < 50; i++) {
            brightness.push((Math.random() - 0.5) * 2);
            let rotationX = 0;
            let rotationY = Math.PI / 9;
            let rotationZ = 0;
            let transformMatrix = new three_1.Matrix4().compose(new three_1.Vector3(-0.1, 0, 0.05), new three_1.Quaternion().setFromEuler(new three_1.Euler(rotationX, rotationY, rotationZ)), new three_1.Vector3(1, 1, 1)).toArray();
            transformRow1.push(transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3]);
            transformRow2.push(transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7]);
            transformRow3.push(transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11]);
            transformRow4.push(transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15]);
        }
        waterfallGeometry.setAttribute('brightness', new three_1.Float32BufferAttribute(brightness, 1));
        waterfallGeometry.setAttribute('transformRow1', new three_1.Float32BufferAttribute(new Float32Array(transformRow1), 4));
        waterfallGeometry.setAttribute('transformRow2', new three_1.Float32BufferAttribute(new Float32Array(transformRow2), 4));
        waterfallGeometry.setAttribute('transformRow3', new three_1.Float32BufferAttribute(new Float32Array(transformRow3), 4));
        waterfallGeometry.setAttribute('transformRow4', new three_1.Float32BufferAttribute(new Float32Array(transformRow4), 4));
        this.scene.add(waterfall);
    }
    ;
    addBottomFoam() {
        this.bottomFoamMaterial = new BottomFoam_Shader_1.BottomFoamMaterial();
        let waterFoamGeometry = new three_1.PlaneGeometry(0.13, 0.2);
        let waterFoam = new three_1.Mesh(waterFoamGeometry, this.bottomFoamMaterial);
        let foamFade = [];
        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];
        for (let i = 0; i < 50; i++) {
            foamFade.push(1 - i * 0.02);
            let rotationX = 0;
            let rotationY = Math.PI / 9;
            let rotationZ = 0;
            let transformMatrix = new three_1.Matrix4().compose(new three_1.Vector3(-0.1, 0, 0.05), new three_1.Quaternion().setFromEuler(new three_1.Euler(rotationX, rotationY, rotationZ)), new three_1.Vector3(1, 1, 1)).toArray();
            transformRow1.push(transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3]);
            transformRow2.push(transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7]);
            transformRow3.push(transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11]);
            transformRow4.push(transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15]);
        }
        waterFoamGeometry.setAttribute('transformRow1', new three_1.Float32BufferAttribute(new Float32Array(transformRow1), 4));
        waterFoamGeometry.setAttribute('transformRow2', new three_1.Float32BufferAttribute(new Float32Array(transformRow2), 4));
        waterFoamGeometry.setAttribute('transformRow3', new three_1.Float32BufferAttribute(new Float32Array(transformRow3), 4));
        waterFoamGeometry.setAttribute('transformRow4', new three_1.Float32BufferAttribute(new Float32Array(transformRow4), 4));
        waterFoamGeometry.setAttribute('foamFade', new three_1.Float32BufferAttribute(foamFade, 1));
        this.scene.add(waterFoam);
        // Particle
        this.foamParticleMaterial = new FoamParticles_Shader_1.FoamParticle();
        this.foamParticleGeom = new three_1.BufferGeometry();
        this.foamPointPositions = new Float32Array(this.foamPointCount * 3);
        let foamSize = [];
        for (let i = 0; i < this.foamPointCount; i++) {
            this.foamPointPositions[i * 3] = (Math.random() - 0.5) * 0.05;
            this.foamPointPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
            this.foamPointPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
            if (Math.abs(this.foamPointPositions[i * 3 + 1]) > Math.random() * 0.005) {
                this.foamPointPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
            }
            foamSize.push(Math.random());
        }
        this.foamParticleGeom.setAttribute('position', new three_1.BufferAttribute(this.foamPointPositions, 3));
        this.foamParticleGeom.setAttribute('foamSize', new three_1.Float32BufferAttribute(foamSize, 1));
        let foamParticle = new three_1.Points(this.foamParticleGeom, this.foamParticleMaterial);
        foamParticle.position.x += 0.93;
        foamParticle.position.z += 0.93;
        foamParticle.position.y += 0.355;
        // this.scene.add( foamParticle );
    }
    ;
    addTopFoam() {
        let topFoamGeom = new three_1.PlaneGeometry(0.16, 0.33);
        this.topFoamMaterial = new TopFoam_Shader_1.TopmFoamShader();
        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];
        for (let i = 0; i < 50; i++) {
            let rotationX = 0;
            let rotationY = Math.PI / 9;
            let rotationZ = 0;
            let transformMatrix = new three_1.Matrix4().compose(new three_1.Vector3(-0.1, 0, 0.05), new three_1.Quaternion().setFromEuler(new three_1.Euler(rotationX, rotationY, rotationZ)), new three_1.Vector3(1, 1, 1)).toArray();
            transformRow1.push(transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3]);
            transformRow2.push(transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7]);
            transformRow3.push(transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11]);
            transformRow4.push(transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15]);
        }
        topFoamGeom.setAttribute('transformRow1', new three_1.Float32BufferAttribute(new Float32Array(transformRow1), 4));
        topFoamGeom.setAttribute('transformRow2', new three_1.Float32BufferAttribute(new Float32Array(transformRow2), 4));
        topFoamGeom.setAttribute('transformRow3', new three_1.Float32BufferAttribute(new Float32Array(transformRow3), 4));
        topFoamGeom.setAttribute('transformRow4', new three_1.Float32BufferAttribute(new Float32Array(transformRow4), 4));
        let topFoam = new three_1.Mesh(topFoamGeom, this.topFoamMaterial);
        this.scene.add(topFoam);
    }
    ;
}
exports["default"] = FloatingRock;
;


/***/ }),

/***/ "./src/scripts/Fog.ts":
/*!****************************!*\
  !*** ./src/scripts/Fog.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const three_9 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
const OrbitControls_js_2 = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
const FogGfx_1 = __webpack_require__(/*! ./FogGfx */ "./src/scripts/FogGfx.ts");
const tweakpane_2 = __webpack_require__(/*! tweakpane */ "./node_modules/tweakpane/dist/tweakpane.js");
//
class FogScene {
    constructor() {
        // this.init();
        this.elapsedTime = 0;
        this.fogMovement = true;
        this.sizes = {
            width: 0,
            height: 0
        };
        this.addRaycasterPointer = (event) => {
            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.pointer, this.camera);
        };
        this.tick = () => {
            window.requestAnimationFrame(this.tick);
            this.delta = this.clock.getDelta() * 1000;
            this.elapsedTime += this.delta;
            //
            this.intersects = this.raycaster.intersectObject(this.plane)[0].point;
            this.fog.soursePosition.set(this.intersects.x, 0.5, this.intersects.z);
            this.fog.cube.position.set(this.intersects.x, 0.5, this.intersects.z);
            this.fog.update(this.delta, this.intersects, this.fog.externalForce);
            //
            this.fog.material.uniforms.uTime.value = this.elapsedTime;
            //
            if (this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight) {
                this.resize();
            }
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        };
    }
    ;
    init() {
        // Canvas
        this.canvas = document.querySelector('canvas.webglViewFog');
        // Scene
        this.scene = new three_9.Scene();
        this.scene.background = new three_9.Color('#c7c1b7');
        // Sizes
        this.sizes.width = window.innerWidth,
            this.sizes.height = window.innerHeight;
        // Camera
        this.camera = new three_9.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set(3, 4, 2);
        this.scene.add(this.camera);
        // Controls
        this.controls = new OrbitControls_js_2.OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        // Plane
        let planeGeometry = new three_9.PlaneBufferGeometry(3000, 3000, 1, 1);
        let planeMaterial = new three_9.MeshBasicMaterial({ color: '#e6a67a' });
        this.plane = new three_9.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x -= Math.PI / 2;
        this.scene.add(this.plane);
        // Renderer
        this.renderer = new three_9.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // Resize
        window.addEventListener('resize', this.resize());
        this.clock = new three_9.Clock();
        // Fog
        let props = {
            numberOfSprites: 16,
            height: 1,
            width: 1,
            depth: 1,
            outerColor: '#ff0000',
            innerColor: '#FFCE00',
            newPosition: new three_9.Vector3(0, 0.5, 0)
        };
        this.fog = new FogGfx_1.FogGfx(new three_9.Color().setHex(+props.outerColor.replace('#', '0x')).getHex(), props.numberOfSprites, props.height, props.width, props.depth);
        this.animation = new Animation();
        this.scene.add(this.fog.wrapper);
        props.newPosition = this.fog.newPosition;
        // debug fog
        this.pane = new tweakpane_2.Pane();
        this.pane.element.parentElement.style['width'] = '330px';
        this.pane.element.parentElement.style['margin-top'] = '110px';
        this.pane.element.parentElement.style['z-index'] = '19';
        const fogFolder = this.pane.addFolder({
            title: 'Fog',
            expanded: false
        });
        const fogParam = fogFolder.addFolder({
            title: 'Fog',
            expanded: false
        });
        const fogSize = fogFolder.addFolder({
            title: 'Size',
            expanded: false
        });
        const fogAnimation = fogFolder.addFolder({
            title: 'Animation',
            expanded: false
        });
        this.mouseMoveFog('click');
        fogParam.addInput(props, 'outerColor', { view: 'color', alpha: true, label: 'outer color' }).on('change', (ev) => {
            this.fog.outerColor = ev.value;
        });
        fogParam.addInput(props, 'innerColor', { view: 'color', alpha: true, label: 'inner color' }).on('change', (ev) => {
            this.fog.innerColor = ev.value;
        });
        fogAnimation.addInput(this.fog, 'frameDuration', { min: 10, max: 800, label: 'frameDuration' }).on('change', (ev) => {
            this.fog.frameDuration = ev.value;
        });
        fogSize.addInput(this.fog, 'height', { min: 0, max: 5, step: 0.01, label: 'size X' }).on('change', (ev) => {
            this.fog.height = ev.value;
            this.fog.generate(this.fog.density, this.fog.height, this.fog.width, this.fog.depth, props.newPosition);
        });
        fogSize.addInput(this.fog, 'width', { min: 0, max: 5, step: 0.01, label: 'size Y' }).on('change', (ev) => {
            this.fog.width = ev.value;
            this.fog.generate(this.fog.density, this.fog.height, this.fog.width, this.fog.depth, props.newPosition);
        });
        fogSize.addInput(this.fog, 'depth', { min: 0, max: 5, step: 0.01, label: 'size Z' }).on('change', (ev) => {
            this.fog.depth = ev.value;
            this.fog.generate(this.fog.density, this.fog.height, this.fog.width, this.fog.depth, props.newPosition);
        });
        fogParam.addInput(this.fog, 'density', { min: 3, max: 1000, step: 1, label: 'density' }).on('change', (ev) => {
            this.fog.density = ev.value;
            this.fog.generate(this.fog.density, this.fog.height, this.fog.width, this.fog.depth, props.newPosition);
        });
        fogAnimation.addInput(this.fog, 'speedSizeChange', { min: 0, max: 0.5, step: 0.001, label: 'growth speed' }).on('change', (ev) => {
            this.fog.speedSizeChange = ev.value;
        });
        fogSize.addInput(this.fog, 'coordEpearingParticle', { min: 0, max: 1, step: 0.001, label: 'circle of appearance' }).on('change', (ev) => {
            this.fog.coordEpearingParticle = ev.value;
        });
        fogAnimation.addInput(this.fog, 'opacityCoef', { min: 0, max: 0.03, step: 0.001, label: 'fade' }).on('change', (ev) => {
            this.fog.opacityCoef = ev.value;
        });
        fogParam.addInput(this.fog, 'cubeVisibility', { label: 'bounding box' }).on('change', (ev) => {
            if (!ev.value) {
                this.fog.wrapper.remove(this.fog.cube);
            }
            if (ev.value) {
                this.fog.wrapper.add(this.fog.cube);
            }
        });
        fogParam.addInput(this, 'fogMovement', { label: 'mouse follow' }).on('change', (ev) => {
            if (ev.value) {
                let movementProp = 'mousemove';
                this.canvas.removeEventListener('click', this.addRaycasterPointer);
                this.mouseMoveFog(movementProp);
            }
            else {
                let movementProp = 'click';
                this.canvas.removeEventListener('mousemove', this.addRaycasterPointer);
                this.mouseMoveFog(movementProp);
            }
        });
        fogParam.addInput(this.fog.material.uniforms.uOpacity, 'value', { min: 0, max: 0.9, step: 0.001, label: 'opacity' });
        fogSize.addInput(this.fog.externalForce, 'x', { min: -20, max: 20, step: 0.1, label: 'external force X' }).on('change', (ev) => {
            this.fog.externalForce.x = ev.value;
        });
        fogSize.addInput(this.fog.externalForce, 'y', { min: -20, max: 20, step: 0.1, label: 'external force Y' }).on('change', (ev) => {
            this.fog.externalForce.y = ev.value;
        });
        fogSize.addInput(this.fog.externalForce, 'z', { min: -20, max: 20, step: 0.1, label: 'external force Z' }).on('change', (ev) => {
            this.fog.externalForce.z = ev.value;
        });
        //
        this.tick();
    }
    ;
    mouseMoveFog(movementProp) {
        // Raycaster
        this.raycaster = new three_9.Raycaster();
        this.pointer = new three_9.Vector2();
        this.canvas.addEventListener(movementProp, this.addRaycasterPointer);
    }
    ;
    resize() {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    ;
}
exports["default"] = FogScene;


/***/ }),

/***/ "./src/scripts/FogGfx.ts":
/*!*******************************!*\
  !*** ./src/scripts/FogGfx.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FogGfx = void 0;
const three_12 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
const Fog_Shader_1 = __webpack_require__(/*! ./shaders/Fog.Shader */ "./src/scripts/shaders/Fog.Shader.ts");
//
class FogGfx {
    //
    constructor(color, numberOfSprites, height, width, depth) {
        this.numberOfSprites = 60;
        this.height = 1;
        this.width = 1;
        this.depth = 1;
        this.density = 105;
        this.velocity = [];
        this.positions = [];
        this.randomPos = (Math.random() - 0.5) * 2;
        this.speedSizeChange = 0.137;
        this.coordEpearingParticle = 0.3;
        this.opacityCoef = 0.00999;
        this.wrapper = new three_12.Object3D();
        this.newPosition = new three_12.Vector3(0, 0.5, 0);
        this.soursePosition = new three_12.Vector3(0, 0.5, 0);
        this.cubeVisibility = true;
        this.sizeCoef = 0.1;
        this.externalForce = new three_12.Vector3(0, 0, 0);
        this._frameDuration = 300;
        this.height = height;
        this.width = width;
        this.depth = depth;
        this.numberOfSprites = numberOfSprites;
        // create fog
        this.material = new Fog_Shader_1.FogMaterial();
        this.material.side = three_12.DoubleSide;
        this.material.uniforms.uColor.value.setHex(color);
        this.material.uniforms.uFrameDuration.value = this._frameDuration;
        this.generate(this.density, this.height, this.width, this.depth, this.newPosition);
    }
    ;
    generate(density, height, width, depth, newPosition) {
        const boxGeometry = new three_12.BoxGeometry(1, 1, 1);
        const boxMaterial = new three_12.MeshBasicMaterial({ color: 0x00ff00 });
        boxMaterial.wireframe = true;
        if (!this.cube) {
            this.cube = new three_12.Mesh(boxGeometry, boxMaterial);
            this.wrapper.add(this.cube);
        }
        if (this.mesh) {
            this.geometry.dispose();
            boxGeometry.dispose();
            this.wrapper.remove(this.mesh);
        }
        this.newPosition.x = newPosition.x;
        this.newPosition.y = newPosition.y;
        this.newPosition.z = newPosition.z;
        this.height = height;
        this.width = width;
        this.depth = depth;
        let fogPointPosition = new three_12.Vector3(0, 0, 0);
        this.numberOfSprites = density * height * width * depth;
        let size = [], uv, offsetFrame = [], sizeIncrease = [], opacityDecrease = [];
        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];
        for (let i = 0; i < this.numberOfSprites; i++) {
            let x = (Math.random() - 0.5) * width;
            let y = Math.random() * height;
            let z = (Math.random() - 0.5) * depth;
            let distanceX = fogPointPosition.x - x;
            let distanceY = y - fogPointPosition.y;
            let distanceZ = fogPointPosition.z - z;
            if (Math.abs(distanceX) > width / 2.5 - Math.random() - 0.5) {
                distanceX -= Math.random() - 0.5;
            }
            if (Math.abs(distanceY) > height / 2.5 - Math.random() - 0.5) {
                distanceY -= Math.random() - 0.5;
            }
            if (Math.abs(distanceZ) > depth / 2.5 - Math.random() - 0.5) {
                distanceZ -= Math.random() - 0.5;
            }
            let scaleX = 1;
            let scaleY = 1;
            let scaleZ = 1;
            const rotationX = 0;
            const rotationY = 0;
            const rotationZ = 0;
            let transformMatrix = new three_12.Matrix4().compose(new three_12.Vector3(distanceX, distanceY, distanceZ), new three_12.Quaternion().setFromEuler(new three_12.Euler(rotationX, rotationY, rotationZ)), new three_12.Vector3(scaleX, scaleY, scaleZ)).toArray();
            transformRow1.push(transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3]);
            transformRow2.push(transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7]);
            transformRow3.push(transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11]);
            transformRow4.push(transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15]);
            size.push(Math.random());
            sizeIncrease.push(Math.random() * 0.02);
            opacityDecrease.push(Math.random());
            this.velocity.push((Math.random() - 0.5) * 2 / 100, (Math.random() - 0.5) * 2 / 100, (Math.random() - 0.5) * 2 / 100);
            offsetFrame.push(Math.floor(Math.random() * 50 * 16));
        }
        this.positions = [
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            -1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0
        ];
        uv = [
            0, 0,
            1, 0,
            1, 1,
            1, 1,
            0, 1,
            0, 0
        ];
        this.geometry = new three_12.InstancedBufferGeometry();
        this.geometry.setAttribute('position', new three_12.Float32BufferAttribute(this.positions, 3));
        this.geometry.setAttribute('uv', new three_12.Float32BufferAttribute(uv, 2));
        this.geometry.setAttribute('transformRow1', new three_12.InstancedBufferAttribute(new Float32Array(transformRow1), 4));
        this.geometry.setAttribute('transformRow2', new three_12.InstancedBufferAttribute(new Float32Array(transformRow2), 4));
        this.geometry.setAttribute('transformRow3', new three_12.InstancedBufferAttribute(new Float32Array(transformRow3), 4));
        this.geometry.setAttribute('transformRow4', new three_12.InstancedBufferAttribute(new Float32Array(transformRow4), 4));
        this.geometry.setAttribute('offsetFrame', new three_12.InstancedBufferAttribute(new Float32Array(offsetFrame), 1));
        this.geometry.setAttribute('velocity', new three_12.InstancedBufferAttribute(new Float32Array(this.velocity), 3));
        this.geometry.setAttribute('opacityDecrease', new three_12.InstancedBufferAttribute(new Float32Array(opacityDecrease), 1));
        this.geometry.setAttribute('size', new three_12.InstancedBufferAttribute(new Float32Array(size), 1));
        this.mesh = new three_12.Mesh(this.geometry, this.material);
        this.wrapper.add(this.mesh);
    }
    ;
    update(delta, intersects, externalForce) {
        for (let i = 0; i < this.numberOfSprites; i++) {
            const newSize = this.geometry.attributes.size.getX(i) + this.speedSizeChange * this.sizeCoef;
            this.geometry.attributes.size.setX(i, newSize);
            let velosityX = this.geometry.attributes.velocity.getX(i);
            let velosityY = this.geometry.attributes.velocity.getY(i);
            let velosityZ = this.geometry.attributes.velocity.getZ(i);
            let newPosX = this.geometry.attributes.transformRow4.getX(i);
            let newPosY = this.geometry.attributes.transformRow4.getY(i);
            let newPosZ = this.geometry.attributes.transformRow4.getZ(i);
            let velosityAccelerationX = (intersects.x - newPosX + externalForce.x) / 200;
            let velosityAccelerationY = (intersects.y - newPosY + externalForce.y) / 200;
            ;
            let velosityAccelerationZ = (intersects.z - newPosZ + externalForce.z) / 200;
            const newOpacity = this.geometry.attributes.opacityDecrease.getX(i) - this.opacityCoef;
            this.geometry.attributes.opacityDecrease.setX(i, newOpacity);
            newPosX += ((velosityX + velosityAccelerationX * newOpacity) * delta) / 16;
            newPosY += ((velosityY + velosityAccelerationY * newOpacity) * delta) / 16;
            newPosZ += ((velosityZ + velosityAccelerationZ * newOpacity) * delta) / 16;
            if (newOpacity <= 0.001) {
                newPosX = (Math.random() - 0.5) * this.coordEpearingParticle + this.soursePosition.x;
                newPosY = (Math.random() - 0.5) * this.coordEpearingParticle + this.soursePosition.y;
                newPosZ = (Math.random() - 0.5) * this.coordEpearingParticle + this.soursePosition.z;
                this.geometry.attributes.size.setX(i, 0);
                this.geometry.attributes.opacityDecrease.setX(i, 1);
            }
            this.geometry.attributes.transformRow4.setX(i, newPosX);
            this.geometry.attributes.transformRow4.setY(i, newPosY);
            this.geometry.attributes.transformRow4.setZ(i, newPosZ);
        }
        this.geometry.attributes.opacityDecrease.needsUpdate = true;
        this.geometry.attributes.size.needsUpdate = true;
        this.geometry.attributes.transformRow4.needsUpdate = true;
    }
    ;
    //
    get frameDuration() {
        return this._frameDuration;
    }
    ;
    set frameDuration(frameDuration) {
        this.material.uniforms.uFrameDuration.value = frameDuration;
        this._frameDuration = this.material.uniforms.uFrameDuration.value;
    }
    ;
    get outerColor() {
        return this._outerColor;
    }
    ;
    set outerColor(color) {
        this._outerColor = color;
        if (typeof color === 'string') {
            this.material.uniforms.uColor.value.setHex(parseInt(color.replace('#', '0x')));
        }
        else {
            this.material.uniforms.uColor.value.setHex(color);
        }
    }
    ;
    get innerColor() {
        return this._innerColor;
    }
    ;
    set innerColor(color) {
        this._innerColor = color;
        if (typeof color === 'string') {
            this.material.uniforms.uInnerColor.value.setHex(parseInt(color.replace('#', '0x')));
        }
        else {
            this.material.uniforms.uInnerColor.value.setHex(color);
        }
    }
    ;
}
exports.FogGfx = FogGfx;


/***/ }),

/***/ "./src/scripts/Water.ts":
/*!******************************!*\
  !*** ./src/scripts/Water.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Water = void 0;
const three_10 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
const OrbitControls_1 = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
const GLTFLoader_js_1 = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
const Water_Shader_1 = __webpack_require__(/*! ./shaders/Water.Shader */ "./src/scripts/shaders/Water.Shader.ts");
const tweakpane_3 = __webpack_require__(/*! tweakpane */ "./node_modules/tweakpane/dist/tweakpane.js");
//
class Water {
    constructor() {
        // this.init();
        this.elapsedTime = 0;
        this.sizes = {
            width: 0,
            height: 0
        };
        this.tick = () => {
            window.requestAnimationFrame(this.tick);
            this.delta = this.clock.getDelta() * 1000;
            this.elapsedTime += this.delta;
            //
            if (this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight) {
                this.resize();
            }
            // render scene into target
            this.waterMesh.visible = false;
            this.renderer.setRenderTarget(this.target);
            this.renderer.render(this.scene, this.camera);
            this.mapControls.update();
            this.renderer.setRenderTarget(null);
            this.waterMesh.visible = true;
            this.waterMaterial.uniforms.tDepth.value = this.target.depthTexture;
            this.waterMaterial.uniforms.cameraNear.value = this.camera.near;
            this.waterMaterial.uniforms.cameraFar.value = this.camera.far;
            this.waterMaterial.uniforms.uTime.value = Math.sin(this.elapsedTime / 1068) + 2; //1068
            this.renderer.render(this.scene, this.camera);
        };
    }
    ;
    init() {
        // Canvas
        this.canvas = document.querySelector('canvas.webglViewWater');
        // Scene
        this.scene = new three_10.Scene();
        this.scene.background = new three_10.Color('#c7c1b7');
        // Camera
        this.camera = new three_10.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set(1, 2, 2);
        this.scene.add(this.camera);
        // Controls
        this.mapControls = new OrbitControls_1.MapControls(this.camera, this.canvas);
        this.mapControls.enableDamping = true;
        // Light
        const light = new three_10.PointLight(0xe9f7ec, 1, 100);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        // Plane
        this.loadPlane();
        // Water
        let waterGeom = new three_10.PlaneGeometry(1.9, 1.9);
        this.waterMaterial = new Water_Shader_1.WaterMaterial();
        this.waterMesh = new three_10.Mesh(waterGeom, this.waterMaterial);
        this.waterMesh.rotation.x = -Math.PI / 2;
        this.waterMesh.position.set(0, -0.05, 0);
        this.scene.add(this.waterMesh);
        // Renderer
        this.renderer = new three_10.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.scene.add(new three_10.Mesh(new three_10.BoxGeometry(0.2, 0.2, 0.2), new three_10.MeshBasicMaterial({ color: 0xebb734 })));
        // Create a render target with depth texture
        this.setupRenderTarget();
        // Resize
        window.addEventListener('resize', this.resize());
        // Debug
        let props = { waterColor: '#8eb4e6' };
        const waterTwp = new tweakpane_3.Pane({ title: "Water", expanded: false });
        waterTwp.element.parentElement.style['width'] = '330px';
        waterTwp.element.parentElement.style['margin-top'] = '140px';
        waterTwp.element.parentElement.style['z-index'] = '18';
        waterTwp.addInput(props, 'waterColor', { view: 'color', alpha: true, label: 'inner color' }).on('change', (ev) => {
            this.waterMaterial.uniforms.uColor.value.setHex(parseInt(ev.value.replace('#', '0x')));
        });
        this.clock = new three_10.Clock();
        //
        this.tick();
    }
    ;
    findingDepth() {
        // Setup post processing stage
        this.postCamera = new three_10.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.postMaterial = new three_10.ShaderMaterial({
            vertexShader: `
            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
            `,
            fragmentShader: `
            #include <packing>

            varying vec2 vUv;
            uniform sampler2D tDiffuse;
            uniform sampler2D tDepth;
            uniform float cameraNear;
            uniform float cameraFar;


            float readDepth( sampler2D depthSampler, vec2 coord ) {
                float fragCoordZ = texture2D( depthSampler, coord ).x;
                float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
                return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
            }

            void main() {
                //vec3 diffuse = texture2D( tDiffuse, vUv ).rgb;
                float depth = readDepth( tDepth, vUv );

                gl_FragColor.rgb = 1.0 - vec3( pow( depth, 0.2 ) );
                gl_FragColor.a = 1.0;
            }
            `,
            uniforms: {
                cameraNear: { value: this.camera.near },
                cameraFar: { value: this.camera.far },
                tDiffuse: { value: null },
                tDepth: { value: null }
            }
        });
        const postPlane = new three_10.PlaneGeometry(2, 2);
        const postQuad = new three_10.Mesh(postPlane, this.postMaterial);
        this.postScene = new three_10.Scene();
        this.postScene.add(postQuad);
    }
    ;
    loadPlane() {
        // Loading tree
        this.loader = new GLTFLoader_js_1.GLTFLoader();
        this.loader.load('resources/models/plane.gltf', (gltf) => {
            gltf.scene.children[0].scale;
            this.scene.add(gltf.scene.children[0]);
        });
    }
    ;
    setupRenderTarget() {
        if (this.target)
            this.target.dispose();
        //
        this.target = new three_10.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.target.texture.format = three_10.RGBFormat;
        this.target.texture.minFilter = three_10.NearestFilter;
        this.target.texture.magFilter = three_10.NearestFilter;
        this.target.texture.generateMipmaps = false;
        this.target.stencilBuffer = false;
        this.target.depthBuffer = true;
        this.target.depthTexture = new three_10.DepthTexture(window.innerWidth, window.innerHeight);
        this.target.depthTexture.type = three_10.UnsignedShortType;
        this.target.depthTexture.format = three_10.DepthFormat;
    }
    ;
    resize() {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
        const dpr = this.renderer.getPixelRatio();
        this.target.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
        this.renderer.setSize(this.sizes.width, this.sizes.height);
    }
    ;
}
exports.Water = Water;
;
exports["default"] = new Water();


/***/ }),

/***/ "./src/scripts/shaders/BottomFoam.Shader.ts":
/*!**************************************************!*\
  !*** ./src/scripts/shaders/BottomFoam.Shader.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BottomFoamMaterial = exports.noise = void 0;
const three_6 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
exports.noise = new three_6.TextureLoader().load('resources/textures/noise.png');
class BottomFoamMaterial extends three_6.ShaderMaterial {
    constructor() {
        super(),
            this.vertexShader = `
        varying vec2 vUv;

        attribute float brightness;
        attribute vec4 transformRow1;
        attribute vec4 transformRow2;
        attribute vec4 transformRow3;
        attribute vec4 transformRow4;

        void main () {

            mat4 transforms = mat4 (
                transformRow1,
                transformRow2,
                transformRow3,
                transformRow4
            );

            gl_Position = projectionMatrix * modelViewMatrix  * transforms * vec4( vec3( position.x - 0.01, position.y - 0.37, position.z + 0.44 ), 1.0 );

            vUv = uv;

        }`,
            this.fragmentShader = `
        uniform sampler2D uNoise;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uWhiteColor;
        uniform float uTime;

        varying vec2 vUv;

        vec2 hash( in vec2 x )  // replace this by something better
        {
            const vec2 k = vec2( 0.3183099, 0.3678794 );
            x = x*k + k.yx;
            return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
        }


        // return gradient noise (in x) and its derivatives (in yz)
        vec3 noised( in vec2 p )
        {
            vec2 i = floor( p );
            vec2 f = fract( p );

        #if 1
            // quintic interpolation
            vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
            vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);
        #else
            // cubic interpolation
            vec2 u = f*f*(3.0-2.0*f);
            vec2 du = 6.0*f*(1.0-f);
        #endif

            vec2 ga = hash( i + vec2(0.0,0.0) );
            vec2 gb = hash( i + vec2(1.0,0.0) );
            vec2 gc = hash( i + vec2(0.0,1.0) );
            vec2 gd = hash( i + vec2(1.0,1.0) );

            float va = dot( ga, f - vec2(0.0,0.0) );
            float vb = dot( gb, f - vec2(1.0,0.0) );
            float vc = dot( gc, f - vec2(0.0,1.0) );
            float vd = dot( gd, f - vec2(1.0,1.0) );

            return vec3( va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd),   // value
                        ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) +  // derivatives
                        du * (u.yx*(va-vb-vc+vd) + vec2(vb,vc) - va));
        }

        void main () {

            vec2 centeredUv = ( vUv - 0.5 ) * 2.0;
            float distanceToCenter = length( centeredUv );

            vec3 noise = noised( vec2( vUv.x * 10.0 + sin( uTime * 5.0 ) * 0.15, vUv.y * 5.0 - uTime * 5.0 ) );
            vec3 col = 0.055 + 8.99 * vec3( noise.x, noise.x, noise.x );
            col = mix( uColor2, uColor1, noise.x );

            float yGradient = clamp( 0.65 - vUv.y, abs( vUv.x - 0.5 ) * 0.4, 1.0 ) * 0.15;

            if ( 3.4 * distanceToCenter * abs( centeredUv.y * 1.45 + 0.2 ) > 0.7 + noise.x ) { discard; };

            gl_FragColor.rgb = mix( col,  uWhiteColor, noise.x * 5.0 ) + vec3( yGradient );
            gl_FragColor.a = 1.0;

        }`,
            this.uniforms = {
                uNoise: { value: exports.noise },
                uColor1: { value: new three_6.Color(0x09a0e0) },
                uColor2: { value: new three_6.Color(0xd7e8fa) },
                uWhiteColor: { value: new three_6.Color(0xffffff) },
                uTime: { value: 0 }
            };
    }
}
exports.BottomFoamMaterial = BottomFoamMaterial;


/***/ }),

/***/ "./src/scripts/shaders/Fire.Shader.ts":
/*!********************************************!*\
  !*** ./src/scripts/shaders/Fire.Shader.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlameMaterial = exports.noise = void 0;
const three_3 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
exports.noise = new three_3.TextureLoader().load('resources/textures/noise.png');
class FlameMaterial extends three_3.ShaderMaterial {
    constructor() {
        super();
        this.vertexShader = `
        varying vec2 vUv;

        void main() {

            gl_Position = projectionMatrix * ( modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0) + vec4( position, 1.0 ) );

            vUv = uv;

        }
        `,
            this.fragmentShader = `
        uniform sampler2D uNoise;
        uniform float uTime;
        uniform vec3 uInnerColor;
        uniform vec3 uOuterColor;

        varying vec2 vUv;

        vec2 hash( in vec2 x )  // replace this by something better
        {
            const vec2 k = vec2( 0.3183099, 0.3678794 );
            x = x*k + k.yx;
            return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
        }


        // return gradient noise (in x) and its derivatives (in yz)
        vec3 noised( in vec2 p )
        {
            vec2 i = floor( p );
            vec2 f = fract( p );

        #if 1
            // quintic interpolation
            vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
            vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);
        #else
            // cubic interpolation
            vec2 u = f*f*(3.0-2.0*f);
            vec2 du = 6.0*f*(1.0-f);
        #endif

            vec2 ga = hash( i + vec2(0.0,0.0) );
            vec2 gb = hash( i + vec2(1.0,0.0) );
            vec2 gc = hash( i + vec2(0.0,1.0) );
            vec2 gd = hash( i + vec2(1.0,1.0) );

            float va = dot( ga, f - vec2(0.0,0.0) );
            float vb = dot( gb, f - vec2(1.0,0.0) );
            float vc = dot( gc, f - vec2(0.0,1.0) );
            float vd = dot( gd, f - vec2(1.0,1.0) );

            return vec3( va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd),   // value
                        ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) +  // derivatives
                        du * (u.yx*(va-vb-vc+vd) + vec2(vb,vc) - va));
        }

        void main() {

            float yGradient = clamp( 0.9 - vUv.y, 0.0, 1.0 ) * 1.2;

            vec3 noise = noised( vec2( 9.0 * vUv.x, 6.4 * vUv.y - uTime * 4.0 ) ) * 0.8;

            vec3 col = 0.55 + 0.99 * vec3( noise.x, noise.x, noise.x );

            vec2 centeredUv = vec2( vUv.x - 0.3, vUv.y + 0.1 );
            float distanceToCenter = length( centeredUv );
            float strength = step( distance( vec2( vUv.x, vUv.y + 0.1 ), vec2(2.5) ), 0.4 );

            if ( 8.0 * distanceToCenter * max( abs( vUv.x - 0.5 ) * 2.0, 0.1 ) * max( vUv.y, 0.24 ) > 0.5 + ( noise.x / 1.5 + noise.y / 4.0 ) ) { discard; }

            gl_FragColor = vec4( vec3(yGradient) + col + uInnerColor, 1.0 );
            gl_FragColor.rgb = mix( gl_FragColor.rgb, uOuterColor, 0.7 );

        }
        `,
            this.uniforms = {
                uTime: { value: 0 },
                uNoise: { value: exports.noise },
                uInnerColor: { value: new three_3.Color(0xfff30f) },
                uOuterColor: { value: new three_3.Color(0xfc4e03) }
            };
    }
}
exports.FlameMaterial = FlameMaterial;
;


/***/ }),

/***/ "./src/scripts/shaders/FireFog.Shader.ts":
/*!***********************************************!*\
  !*** ./src/scripts/shaders/FireFog.Shader.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FogMaterial = void 0;
const three_8 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
// import FogScene from '../index';
let randomnum = Math.random();
const textureLoader = new three_8.TextureLoader();
const fogTexture = textureLoader.load('resources/textures/fog1.png');
const noise = textureLoader.load('resources/textures/noise.png');
class FogMaterial extends three_8.ShaderMaterial {
    constructor() {
        super();
        this.vertexShader = `
            attribute vec4 transformRow1;
            attribute vec4 transformRow2;
            attribute vec4 transformRow3;
            attribute vec4 transformRow4;
            attribute float offsetFrame;
            attribute float size;
            attribute vec3 velocity;
            attribute float opacityDecrease;

            varying vec2 vUv;
            varying float vOffsetFrame;
            varying float vCurrentFrameId;
            varying float vNextFrameId;
            varying float vOpacityDecrease;
            varying float vOpacity;
            varying vec3 vPosition;

            uniform float uRandomNum;
            uniform sampler2D uNoise;
            uniform float uTime;
            uniform float uFrameDuration;
            uniform float uOpacity;

            void main() {

                float numOfFrames = 16.0;

                float currentFrameId = mod( floor( mod( uTime + offsetFrame, numOfFrames * uFrameDuration ) / uFrameDuration ), numOfFrames );

                float nextFrameId;
                if ( currentFrameId == numOfFrames - 1.0 ) {

                    nextFrameId = 0.0;

                } else {

                    nextFrameId = currentFrameId + 1.0;

                }

                mat4 transforms = mat4(
                    transformRow1,
                    transformRow2,
                    transformRow3,
                    transformRow4
                );

                gl_Position = projectionMatrix * ( modelViewMatrix * transforms * vec4(0.0, 0.0, 0.0, 1.0) + vec4( position * size, 1.0 ) );

                vUv = uv;
                vOffsetFrame = offsetFrame;
                vNextFrameId = nextFrameId;
                vCurrentFrameId  = currentFrameId;
                vOpacityDecrease = opacityDecrease;
                vOpacity = uOpacity;
                vPosition = transformRow4.xyz;

            }
        `;
        this.depthWrite = false;
        this.transparent = true;
        this.blending = three_8.AdditiveBlending;
        // this.wireframe = true;
        this.fragmentShader = `
            varying vec2 vUv;
            varying float vOffsetFrame;
            varying float vCurrentFrameId;
            varying float vNextFrameId;
            varying float vOpacityDecrease;
            varying float vOpacity;
            varying vec3 vPosition;

            uniform sampler2D uPointTexture;
            uniform float alphaTest;
            uniform vec3 uColor;
            uniform float uTime;
            uniform float uFrameDuration;
            uniform vec3 uInnerColor;

            void main() {

                gl_FragColor = vec4( uColor, 0.04 );

                //

                vec4 offsets;

                offsets.y = floor( vCurrentFrameId / 4.0 ) * 0.25;
                offsets.x = mod( vCurrentFrameId, 4.0 ) * 0.25;

                offsets.w = floor( vNextFrameId / 4.0 ) * 0.25;
                offsets.z = mod( vNextFrameId, 4.0 ) * 0.25;

                //

                vec4 texture1 = texture2D( uPointTexture, vec2( vUv.x * 0.25 + offsets.x, vUv.y * 0.25 + offsets.y ) );
                vec4 texture2 = texture2D( uPointTexture, vec2( vUv.x * 0.25 + offsets.z, vUv.y * 0.25 + offsets.w ) );

                float fragmentTime = mod( uTime + vOffsetFrame, uFrameDuration ) / uFrameDuration;

                gl_FragColor = mix( texture1, texture2, fragmentTime );
                vec3 finalColor = uColor;

                finalColor = mix( uColor, uInnerColor, step( 0.3, vOpacityDecrease ) * vOpacityDecrease );

                gl_FragColor *= vec4( finalColor, vOpacityDecrease );

                if ( gl_FragColor.a < alphaTest ) discard;

            }
        `;
        this.uniforms = {
            uRandomNum: { value: randomnum },
            uPointTexture: { value: fogTexture },
            uNoise: { value: noise },
            alphaTest: { value: 0.0001 },
            uColor: { value: new three_8.Color(0x1A75FF) },
            uTime: { value: 0.0 },
            uTimeX: { value: 0.0 },
            uTimeY: { value: 0.0 },
            uFrameDuration: { value: 16.0 },
            uOpacity: { value: 0.9 },
            uInnerColor: { value: new three_8.Color(0x716222) }
        };
    }
}
exports.FogMaterial = FogMaterial;


/***/ }),

/***/ "./src/scripts/shaders/FoamParticles.Shader.ts":
/*!*****************************************************!*\
  !*** ./src/scripts/shaders/FoamParticles.Shader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FoamParticle = exports.textureLoader = void 0;
const three_4 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
exports.textureLoader = new three_4.TextureLoader();
const particleTexture = exports.textureLoader.load('/resources/textures/particle.png');
class FoamParticle extends three_4.ShaderMaterial {
    constructor() {
        super();
        this.transparent = true;
        this.vertexShader = `
        attribute float foamSize;

        uniform float uTime;

        void main () {

            vec4 mvPosition = modelViewMatrix * vec4( vec3( position.x - 0.057 + uTime / 10.0, position.y - 0.05 + uTime / 10.0, position.z + uTime / 10.0 ), 1.0 );

            gl_PointSize = foamSize * 0.0068  * ( 300.0 / -mvPosition.z );

            gl_Position = projectionMatrix * mvPosition;

        }`,
            this.fragmentShader = `
        uniform sampler2D uPointTexture;
        uniform vec3 uColor;

        void main () {

            gl_FragColor = vec4( uColor, 1.0 ) * texture2D( uPointTexture, gl_PointCoord );
            if ( gl_FragColor.a < 0.3 ) discard;

        }`,
            this.uniforms = {
                uPointTexture: { value: particleTexture },
                uColor: { value: new three_4.Color(0xc5e0fc) },
                uTime: { value: 0 }
            };
    }
}
exports.FoamParticle = FoamParticle;
;


/***/ }),

/***/ "./src/scripts/shaders/Fog.Shader.ts":
/*!*******************************************!*\
  !*** ./src/scripts/shaders/Fog.Shader.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FogMaterial = void 0;
const three_15 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
// import FogScene from '../index';
let randomnum = Math.random();
const textureLoader = new three_15.TextureLoader();
const fogTexture = textureLoader.load('resources/textures/fog1.png');
const noise = textureLoader.load('resources/textures/tNoise.png');
class FogMaterial extends three_15.ShaderMaterial {
    constructor() {
        super();
        this.vertexShader = `
            attribute vec4 transformRow1;
            attribute vec4 transformRow2;
            attribute vec4 transformRow3;
            attribute vec4 transformRow4;
            attribute float offsetFrame;
            attribute float size;
            attribute vec3 velocity;
            attribute float opacityDecrease;

            varying vec2 vUv;
            varying float vOffsetFrame;
            varying float vCurrentFrameId;
            varying float vNextFrameId;
            varying float vOpacityDecrease;
            varying float vOpacity;
            varying vec3 vPosition;

            uniform float uRandomNum;
            uniform sampler2D uNoise;
            uniform float uTime;
            uniform float uFrameDuration;
            uniform float uOpacity;

            void main() {

                float numOfFrames = 16.0;

                float currentFrameId = mod( floor( mod( uTime + offsetFrame, numOfFrames * uFrameDuration ) / uFrameDuration ), numOfFrames );

                float nextFrameId;
                if ( currentFrameId == numOfFrames - 1.0 ) {

                    nextFrameId = 0.0;

                } else {

                    nextFrameId = currentFrameId + 1.0;

                }

                mat4 transforms = mat4(
                    transformRow1,
                    transformRow2,
                    transformRow3,
                    transformRow4
                );

                gl_Position = projectionMatrix * ( modelViewMatrix * transforms * vec4(0.0, 0.0, 0.0, 1.0) + vec4( position * size, 1.0 ) );

                vUv = uv;
                vOffsetFrame = offsetFrame;
                vNextFrameId = nextFrameId;
                vCurrentFrameId  = currentFrameId;
                vOpacityDecrease = opacityDecrease;
                vOpacity = uOpacity;
                vPosition = transformRow4.xyz;

            }
        `;
        this.depthWrite = false;
        this.transparent = true;
        // this.wireframe = true;
        this.fragmentShader = `
            varying vec2 vUv;
            varying float vOffsetFrame;
            varying float vCurrentFrameId;
            varying float vNextFrameId;
            varying float vOpacityDecrease;
            varying float vOpacity;
            varying vec3 vPosition;

            uniform sampler2D uPointTexture;
            uniform float alphaTest;
            uniform vec3 uColor;
            uniform float uTime;
            uniform float uFrameDuration;
            uniform vec3 uInnerColor;

            void main() {

                gl_FragColor = vec4( uColor, 0.04 );

                //

                vec4 offsets;

                offsets.y = floor( vCurrentFrameId / 4.0 ) * 0.25;
                offsets.x = mod( vCurrentFrameId, 4.0 ) * 0.25;

                offsets.w = floor( vNextFrameId / 4.0 ) * 0.25;
                offsets.z = mod( vNextFrameId, 4.0 ) * 0.25;

                //

                vec4 texture1 = texture2D( uPointTexture, vec2( vUv.x * 0.25 + offsets.x, vUv.y * 0.25 + offsets.y ) );
                vec4 texture2 = texture2D( uPointTexture, vec2( vUv.x * 0.25 + offsets.z, vUv.y * 0.25 + offsets.w ) );

                float fragmentTime = mod( uTime + vOffsetFrame, uFrameDuration ) / uFrameDuration;

                gl_FragColor = mix( texture1, texture2, fragmentTime );
                vec3 finalColor = uColor;

                finalColor = mix( uColor, uInnerColor, step( 0.3, vOpacityDecrease ) * vOpacityDecrease );

                gl_FragColor *= vec4( finalColor, vOpacityDecrease * vOpacity );

                if ( gl_FragColor.a < alphaTest ) discard;

            }
        `;
        this.uniforms = {
            uRandomNum: { value: randomnum },
            uPointTexture: { value: fogTexture },
            uNoise: { value: noise },
            alphaTest: { value: 0.0001 },
            uColor: { value: new three_15.Color(0x1A75FF) },
            uTime: { value: 0.0 },
            uTimeX: { value: 0.0 },
            uTimeY: { value: 0.0 },
            uFrameDuration: { value: 16.0 },
            uOpacity: { value: 0.9 },
            uInnerColor: { value: new three_15.Color(0xFFCE00) }
        };
    }
}
exports.FogMaterial = FogMaterial;


/***/ }),

/***/ "./src/scripts/shaders/TopFoam.Shader.ts":
/*!***********************************************!*\
  !*** ./src/scripts/shaders/TopFoam.Shader.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopmFoamShader = void 0;
const three_7 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
class TopmFoamShader extends three_7.ShaderMaterial {
    constructor() {
        super();
        this.vertexShader = `
        varying vec2 vUv;

        attribute float brightness;
        attribute vec4 transformRow1;
        attribute vec4 transformRow2;
        attribute vec4 transformRow3;
        attribute vec4 transformRow4;

        void main () {

            mat4 transforms = mat4 (
                transformRow1,
                transformRow2,
                transformRow3,
                transformRow4
            );

            gl_Position = projectionMatrix * modelViewMatrix * transforms * vec4( vec3( position.x + 0.01, position.y - 0.1354, position.z + 0.45 ), 1.0 );

            vUv = uv;

        }`,
            this.fragmentShader = `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uWhiteColor;
        uniform float uTime;

        varying vec2 vUv;

        vec2 hash( in vec2 x )  // replace this by something better
        {
            const vec2 k = vec2( 0.3183099, 0.3678794 );
            x = x*k + k.yx;
            return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
        }


        // return gradient noise (in x) and its derivatives (in yz)
        vec3 noised( in vec2 p )
        {
            vec2 i = floor( p );
            vec2 f = fract( p );

        #if 1
            // quintic interpolation
            vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
            vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);
        #else
            // cubic interpolation
            vec2 u = f*f*(3.0-2.0*f);
            vec2 du = 6.0*f*(1.0-f);
        #endif

            vec2 ga = hash( i + vec2(0.0,0.0) );
            vec2 gb = hash( i + vec2(1.0,0.0) );
            vec2 gc = hash( i + vec2(0.0,1.0) );
            vec2 gd = hash( i + vec2(1.0,1.0) );

            float va = dot( ga, f - vec2(0.0,0.0) );
            float vb = dot( gb, f - vec2(1.0,0.0) );
            float vc = dot( gc, f - vec2(0.0,1.0) );
            float vd = dot( gd, f - vec2(1.0,1.0) );

            return vec3( va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd),   // value
                        ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) +  // derivatives
                        du * (u.yx*(va-vb-vc+vd) + vec2(vb,vc) - va));
        }

        void main () {

            vec2 centeredUv = ( vec2( ( vUv.x - 0.5 ) * 2.1, vUv.y - 0.5 ) ) * 2.0;
            float distanceToCenter = length( centeredUv );

            vec3 noise = noised( vec2( vUv.x * 20.0 + sin( uTime * 10.0 ) * 0.35, vUv.y * 8.0 + uTime * 5.0 ) );
            vec3 noiseBorder = noised( vec2( vUv.x * 10.0 + sin( uTime * 10.0 ) * 0.45, vUv.y * 5.0 + uTime * 10.0 ) );
            vec3 col = 0.055 + 8.99 * vec3( noise.x, noise.x, noise.x );
            col = mix( uColor2, uColor1, noise.x );

            float yGradient = clamp( 0.65 - vUv.y, abs( vUv.x - 0.5 ) * 0.4, 1.0 ) * 0.35;

            if ( 2.0 * distanceToCenter * abs( centeredUv.y * 1.45 - 0.7 ) > 0.5 + yGradient + noiseBorder.x ) { discard; };

            gl_FragColor.rgb = mix( col,  uWhiteColor, noise.x * 5.0 ) + vec3( yGradient );
            gl_FragColor.a = 0.7;

        }`,
            this.uniforms = {
                uColor1: { value: new three_7.Color(0x7784b5) },
                uColor2: { value: new three_7.Color(0xd7e8fa) },
                uWhiteColor: { value: new three_7.Color(0xffffff) },
                uTime: { value: 0 }
            };
    }
}
exports.TopmFoamShader = TopmFoamShader;


/***/ }),

/***/ "./src/scripts/shaders/Warerfall.Shader.ts":
/*!*************************************************!*\
  !*** ./src/scripts/shaders/Warerfall.Shader.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WaterfallMaterial = void 0;
const three_5 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
class WaterfallMaterial extends three_5.ShaderMaterial {
    constructor() {
        super(),
            this.vertexShader = `
        varying vec2  vUv;
        varying float vBrightness;

        attribute float brightness;
        attribute vec4 transformRow1;
        attribute vec4 transformRow2;
        attribute vec4 transformRow3;
        attribute vec4 transformRow4;

        void main () {

            mat4 transforms = mat4 (
                transformRow1,
                transformRow2,
                transformRow3,
                transformRow4
            );

            gl_Position = projectionMatrix * modelViewMatrix * transforms * vec4( position.x + 0.01, position.y - 0.234, position.z + 0.439, 1.0 );

            vUv = uv;
            vBrightness = brightness;

        }`,
            this.fragmentShader = `
        varying vec2 vUv;
        varying float vBrightness;

        uniform float uTime;
        uniform vec3 uLightColor;
        uniform vec3 uDarkColor;
        uniform vec3 uWhiteColor;
        uniform vec3 uFoamColor;

        vec2 hash( in vec2 x )  // replace this by something better
        {
            const vec2 k = vec2( 0.3183099, 0.3678794 );
            x = x*k + k.yx;
            return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
        }


        // return gradient noise (in x) and its derivatives (in yz)
        vec3 noised( in vec2 p )
        {
            vec2 i = floor( p );
            vec2 f = fract( p );

        #if 1
            // quintic interpolation
            vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
            vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);
        #else
            // cubic interpolation
            vec2 u = f*f*(3.0-2.0*f);
            vec2 du = 6.0*f*(1.0-f);
        #endif

            vec2 ga = hash( i + vec2(0.0,0.0) );
            vec2 gb = hash( i + vec2(1.0,0.0) );
            vec2 gc = hash( i + vec2(0.0,1.0) );
            vec2 gd = hash( i + vec2(1.0,1.0) );

            float va = dot( ga, f - vec2(0.0,0.0) );
            float vb = dot( gb, f - vec2(1.0,0.0) );
            float vc = dot( gc, f - vec2(0.0,1.0) );
            float vd = dot( gd, f - vec2(1.0,1.0) );

            return vec3( va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd),   // value
                        ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) +  // derivatives
                        du * (u.yx*(va-vb-vc+vd) + vec2(vb,vc) - va));
        }

        void main () {

            vec3 noise = noised( vec2( vUv.x * 15.0 + sin( uTime * 5.0 ) * 0.15, vUv.y * 5.0 + uTime * 5.0 - 0.2 ) );

            vec2 centeredUv = vec2( ( vUv.x - 0.5 ) * 14.0, ( vUv.y - 4.0 ) * 2.0 );
            float distanceToCenter = length( centeredUv );

            vec2 centeredUvWhite = vec2( ( vUv.x - 0.5 ) * 10.0, ( vUv.y - 0.8 ) * 2.0 );
            float distanceToCenterWhite = length( centeredUvWhite );

            vec2 centeredUvFoam = vec2( ( vUv.x - 0.5 ), ( vUv.y - 1.0 ) );
            float distanceToCenterFoam = length( centeredUvFoam );

            vec3 col = 0.055 + 8.99 * vec3( noise.x, noise.x, noise.x );
            col = step( 0.1, 0.2 + col );
            float mix1 = step( 0.1 + ( sin( uTime * vBrightness ) ) * 0.0007, ( distanceToCenterWhite - 0.5 ) * noise.y * 0.09 );
            vec3 whiteCol = mix( col, uWhiteColor, mix1 );

            //

            gl_FragColor = vec4( col, 1.0 );

            if ( distanceToCenter * abs( ( vUv.x - 0.5 ) * 25.0 ) * abs( ( vUv.y - 1.55 ) * 2.0 ) > 0.5f + abs( ( noise.x + 0.8 ) * 194.7 ) ) { discard; };

            gl_FragColor.rgb = mix( gl_FragColor.rgb, uLightColor + abs( sin( uTime * 10.0 ) ) * vUv.y * vBrightness,  0.4 );
            gl_FragColor.rgb = mix( gl_FragColor.rgb, uDarkColor, 0.75 );
            gl_FragColor.rgb += mix( uDarkColor, whiteCol, mix1 );

        }`,
            this.uniforms = {
                uTime: { value: 0 },
                uLightColor: { value: new three_5.Color(0xc0fafa) },
                uDarkColor: { value: new three_5.Color(0x3250a8) },
                uWhiteColor: { value: new three_5.Color(0xffffff) },
                uFoamColor: { value: new three_5.Color(0xf5f6ff) },
                uRandom: { value: Math.random() }
            };
    }
}
exports.WaterfallMaterial = WaterfallMaterial;
;


/***/ }),

/***/ "./src/scripts/shaders/Water.Shader.ts":
/*!*********************************************!*\
  !*** ./src/scripts/shaders/Water.Shader.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WaterMaterial = void 0;
const three_14 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
class WaterMaterial extends three_14.ShaderMaterial {
    constructor() {
        super();
        this.vertexShader = `
        #include <packing>

        varying vec2 vUv;
        varying vec4 vPos;
        varying vec3 vPosFoam;

        uniform sampler2D tDiffuse;
        uniform sampler2D tDepth;
        uniform float cameraNear;
        uniform float cameraFar;

        float readDepth( sampler2D depthSampler, vec2 coord ) {
            float fragCoordZ = texture2D( depthSampler, coord ).x;
            float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
            return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
        }

        void main() {

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

            vPos = gl_Position.xyzw;

            vUv = uv;

            vPosFoam = position;

        }

        `,
            this.transparent = true;
        this.fragmentShader = `
        #include <packing>
        #define PI 3.1415926538;

        varying vec2 vUv;
        varying float vDepth;
        varying vec4 vPos;
        varying vec3 vPosFoam;

        uniform sampler2D tDiffuse;
        uniform sampler2D tDepth;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform vec3 uColor;
        uniform vec3 uFoamColor1;
        uniform vec3 uFoamColor2;
        uniform vec3 uFoamColor3;
        uniform float uTime;

        //	Classic Perlin 2D Noise
        //	by Stefan Gustavson
        //
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

        float getPerlinNoise2d(vec2 P)
        {
            vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
            vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
            Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
            vec4 ix = Pi.xzxz;
            vec4 iy = Pi.yyww;
            vec4 fx = Pf.xzxz;
            vec4 fy = Pf.yyww;
            vec4 i = permute(permute(ix) + iy);
            vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
            vec4 gy = abs(gx) - 0.5;
            vec4 tx = floor(gx + 0.5);
            gx = gx - tx;
            vec2 g00 = vec2(gx.x,gy.x);
            vec2 g10 = vec2(gx.y,gy.y);
            vec2 g01 = vec2(gx.z,gy.z);
            vec2 g11 = vec2(gx.w,gy.w);
            vec4 norm = 1.79284291400159 - 0.85373472095314 *
            vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
            g00 *= norm.x;
            g01 *= norm.y;
            g10 *= norm.z;
            g11 *= norm.w;
            float n00 = dot(g00, vec2(fx.x, fy.x));
            float n10 = dot(g10, vec2(fx.y, fy.y));
            float n01 = dot(g01, vec2(fx.z, fy.z));
            float n11 = dot(g11, vec2(fx.w, fy.w));
            vec2 fade_xy = fade(Pf.xy);
            vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
            float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
            return 2.3 * n_xy;
        }

        float convertDepth ( float depth ) {

            float viewZ = perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
            return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

        }

        float readDepth( sampler2D depthSampler, vec2 coord ) {

            float fragCoordZ = texture2D( depthSampler, coord ).x;
            return convertDepth( fragCoordZ );

        }

        void main() {

            vec2 centeredUv = vUv - 0.5;
            float distanceToCenter = length( centeredUv );

            //

            vec2 vViewportCoord = vPos.xy;
            vViewportCoord /= vPos.w;
            vViewportCoord = vViewportCoord * 0.5 + 0.5;

            float depth = readDepth( tDepth, vViewportCoord );

            float waterDepth = ( depth - convertDepth( gl_FragCoord.z ) );

            float perlinNoise = getPerlinNoise2d( centeredUv * 203.0 + uTime / 20.0 );
            vec3 color = uColor;
            float foamDiff = min( ( waterDepth * 700.0 ) / ( uTime ) / 0.55, 1.0 );

            float foam = 1.0 - step( foamDiff - clamp( sin( ( foamDiff + sin( uTime / 30.0 ) ) * 9.0 * 3.1415 ), 0.0, 1.0 ) * ( 1.0 - foamDiff ), perlinNoise );
            color = mix( uFoamColor2, uColor, foamDiff );

            gl_FragColor.rgb = vec3( color );
            gl_FragColor.a = mix( foam, 0.8, foamDiff + 1.5 );

        }
        `;
        this.uniforms = {
            cameraNear: { value: 0 },
            cameraFar: { value: 0 },
            tDiffuse: { value: null },
            tDepth: { value: null },
            uColor: { value: new three_14.Color(0x8eb4e6) },
            uFoamColor1: { value: new three_14.Color(0xc2e3ff) },
            uFoamColor2: { value: new three_14.Color(0xe6f6ff) },
            uFoamColor3: { value: new three_14.Color(0x000001) },
            uTime: { value: 0 }
        };
    }
}
exports.WaterMaterial = WaterMaterial;
;


/***/ }),

/***/ "./src/scripts/shaders/–°ombustion.Shader.ts":
/*!**************************************************!*\
  !*** ./src/scripts/shaders/–°ombustion.Shader.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["–°ombustionMaterial"] = exports.uNoise = void 0;
const three_13 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
// perlin noise texture
exports.uNoise = new three_13.TextureLoader().load('resources/textures/tNoise.png');
class –°ombustionMaterial extends three_13.ShaderMaterial {
    constructor() {
        super();
        this.transparent = true;
        this.vertexShader = `
        varying vec2 vUv;

        void main() {

            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );

            vUv = uv;

        }
        `,
            this.fragmentShader = `
        varying vec2 vUv;

        uniform sampler2D uNoise;
        uniform float uTime;
        uniform vec3 uColor;
        uniform sampler2D tDiffuse;

        void main() {

            vec2 newUv = vUv;
            vec2 displUV = texture2D( uNoise, vUv ).xy + uTime / 5.0;
            vec4 potatoTexture = texture2D( tDiffuse, vUv );

            float col = pow( clamp( mix( 0.5, texture2D( uNoise, newUv + displUV ).x, 2.0 ), 0.0, 1.0 ), 20.0 );

            float nn = texture2D( uNoise, newUv / 15.0 + displUV ).r;
            gl_FragColor.rgb = vec3( max( 1.0, 24.0 * smoothstep( 1.0 - uTime / 0.7, 1.0 - uTime / 1.0, nn ) ) ) * potatoTexture.rgb;
            gl_FragColor.a = 1.0 - smoothstep( 1.0 - uTime / 0.8, 1.0 - uTime / 1.0, nn );

        }
        `,
            this.uniforms = {
                uTime: { value: 0.0 },
                uNoise: { value: exports.uNoise },
                uColor: { value: new three_13.Color(0xff0000) },
                tDiffuse: { value: null }
            };
    }
}
exports["–°ombustionMaterial"] = –°ombustionMaterial;
;


/***/ }),

/***/ "./src/scripts/MainPage.tsx":
/*!**********************************!*\
  !*** ./src/scripts/MainPage.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const FloatingRock_1 = __importDefault(__webpack_require__(/*! ./FloatingRock */ "./src/scripts/FloatingRock.ts"));
class MainPage {
    constructor() {
        this.floatingRock = new FloatingRock_1.default();
        //
        this.init = () => {
            // this.devUI = new Pane();
            this.floatingRock.init();
            //
            // this.dispatch({ type: APP_INITED });
        };
    }
}
;
exports["default"] = new MainPage();


/***/ }),

/***/ "./src/scripts/actions/Application.Actions.tsx":
/*!*****************************************************!*\
  !*** ./src/scripts/actions/Application.Actions.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APP_INITED = void 0;
exports.APP_INITED = 'APP_INITED';


/***/ }),

/***/ "./src/scripts/components/combustion/Combustion.Component.tsx":
/*!********************************************************************!*\
  !*** ./src/scripts/components/combustion/Combustion.Component.tsx ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CombustionComponent = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const Combustion_1 = __webpack_require__(/*! ../../Combustion */ "./src/scripts/Combustion.ts");
//
const CombistionConteiner = styled_components_1.default.canvas `
    color: black;

    display: ${(props) => (props.visible ? 'block' : 'none')};
`;
const combustion = new Combustion_1.CombustionGfx();
const CombustionComponent = ({ visible }) => {
    const canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (canvasRef) {
            combustion.init();
        }
    }, [canvasRef]);
    return (react_1.default.createElement(CombistionConteiner, { visible: visible, className: 'webglViewCombustion' }, "Combustion"));
};
exports.CombustionComponent = CombustionComponent;


/***/ }),

/***/ "./src/scripts/components/fog/Fog.Component.tsx":
/*!******************************************************!*\
  !*** ./src/scripts/components/fog/Fog.Component.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FogComponent = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const Fog_1 = __importDefault(__webpack_require__(/*! ../../Fog */ "./src/scripts/Fog.ts"));
//
const FogConteiner = styled_components_1.default.canvas `
    color: green;
    position: static;
    // text-align: center;
    // margin-top: 20px;

    display: ${(props) => (props.visible ? 'block' : 'none')};
`;
const fog = new Fog_1.default();
const FogComponent = ({ visible }) => {
    const canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (canvasRef) {
            fog.init();
        }
    }, [canvasRef]);
    //
    return (react_1.default.createElement(FogConteiner, { ref: canvasRef, visible: visible, className: "webglViewFog" }));
};
exports.FogComponent = FogComponent;


/***/ }),

/***/ "./src/scripts/components/footer/Footer.Component.tsx":
/*!************************************************************!*\
  !*** ./src/scripts/components/footer/Footer.Component.tsx ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FooterComponent = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
//
const Logo = styled_components_1.default.a `
    line-height: 50px;
    height: 100%;
    padding-left: 30px;
    font-size: 22px;
    display: inline-block;
    position: relative;
    z-index: 1;
    text-decoration: none;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
    opacity: 0.8;
`;
const FooterBasic = styled_components_1.default.div `
    padding: 20px 0;
    margin-top: 8.35%;
    background-color: #111;
    color: #4b4c4d;
    opacity: 0.8;
`;
const FooterItem = styled_components_1.default.li `
    padding:0;
    list-style:none;
    text-align:center;
    font-size:18px;
    line-height:1.6;
    margin-bottom:0;
    text-decoration: none;
    color: white;
    cursor: pointer;
`;
const Copyright = styled_components_1.default.p `
    margin-top: 15px;
    text-align: center;
    font-size: 13px;
    color: #aaa;
    margin-bottom: 0;
`;
const FooterUL = styled_components_1.default.ul `
    display: grid;
    justify-content: center;
    align-content: center;
    gap: 30px;
    grid-auto-flow: column;
    padding-top: 20px;
`;
const AFooter = styled_components_1.default.a `
    color: inherit;
    text-decoration: none;
    opacity: 0.6;
    font-family: Menlo, monospace;
`;
const Contact = styled_components_1.default.div `
    display: grid;
    justify-content: center;
    margin-top: 25px;
    font-family: Menlo, monospace;
    font-size: 20px;
    opacity: 1;
    color: #aaa;
`;
const FooterComponent = () => {
    return (react_1.default.createElement(FooterBasic, null,
        react_1.default.createElement(Logo, { href: '' }, "Flat earth"),
        react_1.default.createElement(Contact, null, "Contacts:"),
        react_1.default.createElement(FooterUL, null,
            react_1.default.createElement(FooterItem, null,
                react_1.default.createElement(AFooter, { href: "#" }, "Email")),
            react_1.default.createElement(FooterItem, null,
                react_1.default.createElement(AFooter, { href: "#" }, "Facebook")),
            react_1.default.createElement(FooterItem, null,
                react_1.default.createElement(AFooter, { href: "#" }, "Twitter")),
            react_1.default.createElement(FooterItem, null,
                react_1.default.createElement(AFooter, { href: "#" }, "Telegram"))),
        react_1.default.createElement(Copyright, null, "\u00A9 2022. All rights reserved.")));
};
exports.FooterComponent = FooterComponent;


/***/ }),

/***/ "./src/scripts/components/form/Form.Component.tsx":
/*!********************************************************!*\
  !*** ./src/scripts/components/form/Form.Component.tsx ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormComponent = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
//
const FormConteiner = styled_components_1.default.div `
    width: 100%;
    display: grid;
    justify-content: center;
`;
const Form = styled_components_1.default.div `
    position: static;
    text-align: center;
    padding-top: 40px;
    padding-bottom: 11px;
    margin-top: 20%;
    width: 510px;
    height: 480px;
    opacity: 0.75;
    background-color: #000;
    z-index: 105;
    color: white;
    // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;
const Label = styled_components_1.default.label `
    width: 650px;
`;
const Input = styled_components_1.default.input `
    font-family: montserrat, arial, verdana;
    padding: 15px;
	border: 1px solid #ccc;
	border-radius: 2px;
	margin-bottom: 5px;
    margin-top: 5px;
	width: 71%;
	box-sizing: border-box;
	color: white;
	font-size: 15px;
    background-color: #111;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);

    &:focus {
        background-color: #111;
    }
`;
const Warning = styled_components_1.default.div `
    position: static;
    text-align: left;
    margin-right: 10em;
    padding-left: 18%;
    font-size: 12px;
    padding-top: 0px;
    color: red;

    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
const Button = styled_components_1.default.button.attrs({
    type: 'submit',
    value: 'Submit'
}) `
    background-color: #111;
    border-radius: 2px;
    border-width: 1;
    color: white;
    cursor: pointer;
    display: inline-block;
    // font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    // font-weight: 500;
    // line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 34px;
    text-align: center;
    // transition: all 200ms;
    // vertical-align: baseline;
    // white-space: nowrap;
    // user-select: none;
    // -webkit-user-select: none;
    // touch-action: manipulation;
    margin-top: 5%;
    opacity: 0.8;
    font-family: montserrat, arial, verdana;

    &:hover {
        opacity: 0.67;
    }
`;
let visible = false;
const SuccesfulSub = styled_components_1.default.div `
    // opacity: visible ? 0 : 0.25;
    margin-bottom: 10px;
    margin-top: 20px;
    opacity: 0.8;

    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
const HForm = styled_components_1.default.p `
    // font-family: Menlo, monospace;
    font-size: 22px;
    // float: left;
    // padding-left: 19%;
    text-transform: uppercase;
`;
//
// const [ visible, setVisible ] = useState('hidden');
const FormComponent = () => {
    const [submited, setSubmitting] = (0, react_1.useState)(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (name && lastName && email && question)
            visible = true;
        setSubmitting(true);
    };
    const [name, setName] = (0, react_1.useState)('');
    const [lastName, setLastName] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [question, setQuestion] = (0, react_1.useState)('');
    const changeName = (event) => {
        event.preventDefault();
        setName(event.target.value);
        setSubmitting(false);
    };
    const changeLastName = (event) => {
        event.preventDefault();
        setLastName(event.target.value);
        setSubmitting(false);
    };
    const changeEmail = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
        setSubmitting(false);
    };
    const changeQuestion = (event) => {
        event.preventDefault();
        setQuestion(event.target.value);
        setSubmitting(false);
    };
    return (react_1.default.createElement(FormConteiner, null,
        react_1.default.createElement(Form, null,
            react_1.default.createElement(HForm, null, "Leave you question here:"),
            react_1.default.createElement("form", { onSubmit: handleSubmit },
                react_1.default.createElement(Label, null,
                    visible ?
                        react_1.default.createElement(SuccesfulSub, { visible: visible }, "Form submitted.") : react_1.default.createElement(SuccesfulSub, { visible: visible }, "Form submitted"),
                    react_1.default.createElement(Input, { name: "name", placeholder: 'Name', value: name, onChange: changeName, type: 'text' }),
                    !name && submited ? react_1.default.createElement(Warning, { visible: true }, "Please enter your name") : react_1.default.createElement(Warning, { visible: false }, "Please enter your email"),
                    react_1.default.createElement(Input, { name: "lastName", placeholder: 'Last name', value: lastName, onChange: changeLastName, type: 'text' }),
                    !lastName && submited ? react_1.default.createElement(Warning, { visible: true }, "Please enter your last name") : react_1.default.createElement(Warning, { visible: false }, "Please enter your email"),
                    react_1.default.createElement(Input, { name: "email", placeholder: 'Email', value: email, onChange: changeEmail, type: 'text' }),
                    !email && submited ? react_1.default.createElement(Warning, { visible: true }, "Please enter your email") : react_1.default.createElement(Warning, { visible: false }, "Please enter your email"),
                    react_1.default.createElement(Input, { name: "question", placeholder: 'Question', value: question, onChange: changeQuestion, type: 'text' }),
                    !question && submited ? react_1.default.createElement(Warning, { visible: true }, "Please enter your question") : react_1.default.createElement(Warning, { visible: false }, "Please enter your question")),
                react_1.default.createElement(Button, null, "Submit")))));
};
exports.FormComponent = FormComponent;


/***/ }),

/***/ "./src/scripts/components/form/index.tsx":
/*!***********************************************!*\
  !*** ./src/scripts/components/form/index.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Form_Component_1 = __webpack_require__(/*! ./Form.Component */ "./src/scripts/components/form/Form.Component.tsx");
exports["default"] = Form_Component_1.FormComponent;


/***/ }),

/***/ "./src/scripts/components/items/Items.Component.tsx":
/*!**********************************************************!*\
  !*** ./src/scripts/components/items/Items.Component.tsx ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsComponent = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
//
const Items = styled_components_1.default.div `
    padding-top: 100vh;
    opacity: 0.85;
    z-index: 1000;
    color: white;
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto;
    grid-gap: 7%;
`;
const Item = styled_components_1.default.div `
    padding-top: 43px;
    padding-bottom: 40px;
    background-color: #000;
    height: 390px;
    width: 480px;
    display: grid;
    justify-content: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;
const ItemHeader = styled_components_1.default.div `
    position: static;
    text-align: center;
    padding-bottom: 16px;
    text-decoration: none;
    text-transform: uppercase;
    opacity: 0.89;
    font-size: 27px;
`;
const ItemContent = styled_components_1.default.div `
    position: static;
    text-align: center;
    opacity: 0.79;
`;
const ItemsComponent = () => {
    return (react_1.default.createElement(Items, null,
        react_1.default.createElement(Item, null,
            react_1.default.createElement(ItemHeader, null, "Combustion effect"),
            react_1.default.createElement("img", { src: '../../../resources/img/3.png', className: 'img' }),
            react_1.default.createElement(ItemContent, null, "Here is combustion effect made with shader."),
            react_1.default.createElement(ItemContent, null, "Made with perlin noise function.")),
        react_1.default.createElement(Item, null,
            react_1.default.createElement(ItemHeader, null, "Fog effect"),
            react_1.default.createElement("img", { src: '../../../resources/img/2.png', className: 'img' }),
            react_1.default.createElement(ItemContent, null, "Here you can look at fog effect made with shader."),
            react_1.default.createElement(ItemContent, null, "Made with sprites.")),
        react_1.default.createElement(Item, null,
            react_1.default.createElement(ItemHeader, null, "Face effect"),
            react_1.default.createElement("img", { src: '../../../resources/img/1.png', className: 'img' }),
            react_1.default.createElement(ItemContent, null, "Here is face model made with shader."),
            react_1.default.createElement(ItemContent, null, "Made with depth from model face.")),
        react_1.default.createElement(Item, null,
            react_1.default.createElement(ItemHeader, null, "Water effect"),
            react_1.default.createElement("img", { src: '../../../resources/img/4.png', className: 'img' }),
            react_1.default.createElement(ItemContent, null, "Here you can look at Water effect made with shader."),
            react_1.default.createElement(ItemContent, null, "Made with depth."))));
};
exports.ItemsComponent = ItemsComponent;


/***/ }),

/***/ "./src/scripts/components/items/index.tsx":
/*!************************************************!*\
  !*** ./src/scripts/components/items/index.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Items_Component_1 = __webpack_require__(/*! ./Items.Component */ "./src/scripts/components/items/Items.Component.tsx");
exports["default"] = Items_Component_1.ItemsComponent;


/***/ }),

/***/ "./src/scripts/components/main/Main.tsx":
/*!**********************************************!*\
  !*** ./src/scripts/components/main/Main.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainComponent = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const TopMenu_Component_1 = __webpack_require__(/*! ../top-menu/TopMenu.Component */ "./src/scripts/components/top-menu/TopMenu.Component.tsx");
const view_1 = __importDefault(__webpack_require__(/*! ../view */ "./src/scripts/components/view/index.tsx"));
const items_1 = __importDefault(__webpack_require__(/*! ../items */ "./src/scripts/components/items/index.tsx"));
const form_1 = __importDefault(__webpack_require__(/*! ../form */ "./src/scripts/components/form/index.tsx"));
const Footer_Component_1 = __webpack_require__(/*! ../footer/Footer.Component */ "./src/scripts/components/footer/Footer.Component.tsx");
const Fog_Component_1 = __webpack_require__(/*! ../fog/Fog.Component */ "./src/scripts/components/fog/Fog.Component.tsx");
const Water_Component_1 = __webpack_require__(/*! ../water/Water.Component */ "./src/scripts/components/water/Water.Component.tsx");
const Combustion_Component_1 = __webpack_require__(/*! ../combustion/Combustion.Component */ "./src/scripts/components/combustion/Combustion.Component.tsx");
//
const Div = styled_components_1.default.div `
    position: absolute;
    width: 100%;
    height: 349ivh;
    background-color: #b2eeff;
`;
const TopPanelLeft = styled_components_1.default.div `
    line-height: 50px;
    height: 2.1%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 9px;
    font-size: 1.2em;
    position: relative;
    z-index: 100;
    text-decoration: none;
    text-transform: uppercase;
    text-align: left;
    color: white;
    cursor: pointer;
    float: right;
    opacity: 0.8;
`;
const Menu = styled_components_1.default.div `
    z-index: 20;
`;
const MainComponent = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    // Game.dispatch = dispatch;
    const appInited = (0, react_redux_1.useSelector)((state) => state.application.inited);
    // example
    console.log('isAppInited:' + appInited);
    //
    const [path, setPath] = (0, react_1.useState)('/');
    //
    const HomeClick = () => { setPath('/'); };
    const WaterClick = () => { setPath('/water'); };
    const FogClick = () => { setPath('/fog'); };
    const CombustionClick = () => { setPath('/combustion'); };
    return (react_1.default.createElement(Div, null,
        react_1.default.createElement(TopMenu_Component_1.TopMenuComponent, null),
        react_1.default.createElement(Menu, null,
            react_1.default.createElement(TopPanelLeft, { onClick: HomeClick }, "Home"),
            react_1.default.createElement(TopPanelLeft, { onClick: WaterClick }, "Water"),
            react_1.default.createElement(TopPanelLeft, { onClick: FogClick }, "Fog"),
            react_1.default.createElement(TopPanelLeft, { onClick: CombustionClick }, "Combustion")),
        react_1.default.createElement(view_1.default, { visible: path === '/' }),
        react_1.default.createElement(Water_Component_1.WaterComponent, { visible: path === '/water' }),
        react_1.default.createElement(Fog_Component_1.FogComponent, { visible: path === '/fog' }),
        react_1.default.createElement(Combustion_Component_1.CombustionComponent, { visible: path === '/combustion' }),
        react_1.default.createElement(items_1.default, null),
        react_1.default.createElement(form_1.default, null),
        react_1.default.createElement(Footer_Component_1.FooterComponent, null)));
};
exports.MainComponent = MainComponent;


/***/ }),

/***/ "./src/scripts/components/main/index.tsx":
/*!***********************************************!*\
  !*** ./src/scripts/components/main/index.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Main_1 = __webpack_require__(/*! ./Main */ "./src/scripts/components/main/Main.tsx");
exports["default"] = Main_1.MainComponent;


/***/ }),

/***/ "./src/scripts/components/top-menu/TopMenu.Component.tsx":
/*!***************************************************************!*\
  !*** ./src/scripts/components/top-menu/TopMenu.Component.tsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopMenuComponent = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
//
const TopMenu = styled_components_1.default.div `
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 60px;
    background-color: #100;
    opacity: 0.7;
    z-index: 16;
    color: white;
    padding-top: 7px;
`;
const TopPanel = styled_components_1.default.a `
	line-height: 50px;
	height: 100%;
    padding-left: 20px;
    padding-top: 6px;
	font-size: 1.24em;
	position: relative;
	z-index: 17;
	text-decoration: none;
	text-transform: uppercase;
	text-align: left;
	color: white;
	cursor: pointer;
`;
const TopMenuComponent = () => {
    return (react_1.default.createElement(TopMenu, null,
        react_1.default.createElement(TopPanel, { href: '' }, "Flat earth")));
};
exports.TopMenuComponent = TopMenuComponent;


/***/ }),

/***/ "./src/scripts/components/view/View.Component.tsx":
/*!********************************************************!*\
  !*** ./src/scripts/components/view/View.Component.tsx ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ViewComponent = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
//
const ViewCanvas = styled_components_1.default.canvas `
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 10000%;
    bottom: 10px;

    display: ${(props) => (props.visible ? 'block' : 'none')};
`;
const handleOnWheel = () => { console.log('worked'); };
const ViewComponent = ({ visible }) => {
    return (react_1.default.createElement(ViewCanvas, { visible: visible, className: "webglView", onWheel: handleOnWheel }));
};
exports.ViewComponent = ViewComponent;


/***/ }),

/***/ "./src/scripts/components/view/index.tsx":
/*!***********************************************!*\
  !*** ./src/scripts/components/view/index.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const View_Component_1 = __webpack_require__(/*! ./View.Component */ "./src/scripts/components/view/View.Component.tsx");
exports["default"] = View_Component_1.ViewComponent;


/***/ }),

/***/ "./src/scripts/components/water/Water.Component.tsx":
/*!**********************************************************!*\
  !*** ./src/scripts/components/water/Water.Component.tsx ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WaterComponent = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
const Water_1 = __webpack_require__(/*! ../../Water */ "./src/scripts/Water.ts");
//
const WaterConteiner = styled_components_1.default.canvas `
    color: red;

    display: ${(props) => (props.visible ? 'block' : 'none')};
`;
const water = new Water_1.Water();
const WaterComponent = ({ visible }) => {
    const canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (canvasRef) {
            water.init();
        }
    }, [canvasRef]);
    return (react_1.default.createElement(WaterConteiner, { visible: visible, className: 'webglViewWater' }, "Water"));
};
exports.WaterComponent = WaterComponent;


/***/ }),

/***/ "./src/scripts/index.tsx":
/*!*******************************!*\
  !*** ./src/scripts/index.tsx ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const React = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const ReactDOM = __importStar(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const react_redux_1 = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
const store_1 = __webpack_require__(/*! ./store */ "./src/scripts/store/index.tsx");
const main_1 = __importDefault(__webpack_require__(/*! ./components/main */ "./src/scripts/components/main/index.tsx"));
const MainPage_1 = __importDefault(__webpack_require__(/*! ./MainPage */ "./src/scripts/MainPage.tsx"));
//
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(main_1.default, null)), document.getElementById('reactRoot'));
//
window.addEventListener('DOMContentLoaded', MainPage_1.default.init);
window['mainPage'] = MainPage_1.default;


/***/ }),

/***/ "./src/scripts/store/index.tsx":
/*!*************************************!*\
  !*** ./src/scripts/store/index.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.store = void 0;
const redux_1 = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
const application_reducer_1 = __webpack_require__(/*! ./reducers/application.reducer */ "./src/scripts/store/reducers/application.reducer.tsx");
//
const initialState = {
    application: application_reducer_1.applicationInitialState
};
//
exports.store = (0, redux_1.createStore)((0, redux_1.combineReducers)({
    application: application_reducer_1.application
}), initialState);
;
;


/***/ }),

/***/ "./src/scripts/store/reducers/application.reducer.tsx":
/*!************************************************************!*\
  !*** ./src/scripts/store/reducers/application.reducer.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.application = exports.applicationInitialState = void 0;
const Application_Actions_1 = __webpack_require__(/*! ../../actions/Application.Actions */ "./src/scripts/actions/Application.Actions.tsx");
;
exports.applicationInitialState = {
    inited: false
};
const application = (state = exports.applicationInitialState, action) => {
    switch (action.type) {
        case Application_Actions_1.APP_INITED:
            {
                return Object.assign(Object.assign({}, state), { inited: true });
            }
            ;
        default:
            {
                return Object.assign({}, state);
            }
            ;
    }
};
exports.application = application;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfloating_rock"] = self["webpackChunkfloating_rock"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/scripts/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map
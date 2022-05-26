/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const tweakpane_1 = __webpack_require__(/*! tweakpane */ "./node_modules/tweakpane/dist/tweakpane.js");
//
class FloatingRock {
    constructor() {
        this.elapsedTime = 0;
        this.sceneReady = false;
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
            this.mapControls.update();
            this.renderer.render(this.scene, this.camera);
        };
    }
    init() {
        // Canvas
        this.canvas = document.querySelector('canvas.webglView');
        // Scene
        this.scene = new three_1.Scene();
        this.scene.background = new three_1.Color('#b2eef5'); //324345 - at night
        // Sizes
        this.sizes.width = window.innerWidth,
            this.sizes.height = window.innerHeight;
        // Camera
        this.camera = new three_1.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set(1, 2, 1);
        this.scene.add(this.camera);
        // Light
        const light = new three_1.PointLight(0xffffff, 3, 10);
        light.position.set(3, 7, 3);
        this.scene.add(light);
        const ambientLight = new three_1.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        // Controls
        this.mapControls = new OrbitControls_js_1.OrbitControls(this.camera, this.canvas);
        // this.mapControls.enableDamping = true;
        this.mapControls.enableZoom = false;
        // Renderer
        this.renderer = new three_1.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // Resize
        window.addEventListener('resize', this.resize());
        this.clock = new three_1.Clock();
        const axesHelper = new three_1.AxesHelper(5);
        this.scene.add(axesHelper);
        //
        this.debug();
        // this.loadingBar();
        this.loadModels();
        this.fireFlame();
        this.tick();
    }
    ;
    debug() {
        let props = { color: '#fff30f' };
        let pane = new tweakpane_1.Pane({ title: "Tweakpane" });
        pane.element.parentElement.style['z-index'] = '10';
        pane.element.parentElement.style['padding-top'] = '60px';
        pane.addInput(props, 'color', { label: 'inner color' }).on('change', () => {
            this.flameMaterial.uniforms.uInnerColor.value.setHex(parseInt(props.color.replace('#', '0x')));
        });
        pane.addInput(props, 'color', { label: 'outer color' }).on('change', () => {
            this.flameMaterial.uniforms.uOuterColor.value.setHex(parseInt(props.color.replace('#', '0x')));
        });
    }
    ;
    loadModels() {
        this.loader = new GLTFLoader_1.GLTFLoader(this.loadingManager);
        this.loader.load('resources/models/stone1.gltf', (gltf) => {
            this.rock1 = gltf.scene.children[0];
            this.rock1.scale.set(0.4, 0.4, 0.4);
            this.rock1.rotation.z += Math.PI / 1.2;
            this.rock1.rotation.x -= Math.PI / 7;
            this.rock1.position.set(0, 0, 0);
            this.scene.add(this.rock1);
        });
        //
        this.loader.load('resources/models/stone2.gltf', (gltf) => {
            this.rock2 = gltf.scene.children[0];
            this.rock2.scale.set(0.1, 0.1, 0.1);
            // this.rock2.rotation.z += Math.PI;
            // this.rock2.rotation.z += Math.PI / 1.2;
            // this.rock2.rotation.x -= Math.PI / 7;
            this.rock2.rotation.y -= Math.PI / 3;
            this.rock2.rotation.z -= Math.PI / 1.01;
            this.rock2.rotation.x -= Math.PI / 9.5;
            this.rock2.position.set(-0.8, 0.3, 0.5);
            this.scene.add(this.rock2);
        });
        //
        this.loader.load('resources/models/stone3.gltf', (gltf) => {
            this.rock3 = gltf.scene.children[0];
            this.rock3.scale.set(0.03, 0.03, 0.03);
            this.rock3.rotation.z += Math.PI;
            // this.rock3.rotation.y += Math.PI / 3;
            this.rock3.position.set(1, 0.5, 0.25);
            this.scene.add(this.rock3);
        });
        //
        this.loader.load('resources/models/house.gltf', (gltf) => {
            this.house = gltf.scene.children[0];
            this.house.scale.set(0.1, 0.07, 0.0002);
            this.house.rotation.z += Math.PI / 3;
            this.house.rotation.x -= Math.PI / 2;
            this.house.rotation.y = Math.PI / 3.3;
            this.house.position.set(-0.18, 0.2, 0.18);
            this.scene.add(this.house);
        });
        //
        this.loader.load('resources/models/cloud.gltf', (gltf) => {
            this.cloud1 = gltf.scene.children[0];
            this.cloud1.scale.set(0.03, 0.03, 0.03);
            // this.cloud1.rotation.z += Math.PI / 3;
            // this.cloud1.rotation.x -= Math.PI / 2;
            this.cloud1.rotation.y = Math.PI / 3.3;
            this.cloud1.position.set(0.6, 1, -0.2);
            this.scene.add(this.cloud1);
        });
        //
        this.loader.load('resources/models/cloud2.gltf', (gltf) => {
            this.cloud2 = gltf.scene.children[0];
            this.cloud2.scale.set(0.03, 0.03, 0.03);
            // this.cloud2.rotation.z += Math.PI / 5;
            // this.cloud2.rotation.x -= Math.PI / 2;
            this.cloud2.rotation.y = Math.PI / 4;
            this.cloud2.position.set(-0.2, 0.5, -0.2);
            this.scene.add(this.cloud2);
        });
        //
        this.loader.load('resources/models/mount.gltf', (gltf) => {
            let stoneOnTheGround = gltf.scene.children[0];
            stoneOnTheGround.scale.set(0.07, 0.07, 0.07);
            stoneOnTheGround.rotation.z = Math.PI / 4.9;
            stoneOnTheGround.rotation.x -= Math.PI / 3.0;
            stoneOnTheGround.rotation.y = Math.PI / 3.5;
            stoneOnTheGround.position.set(0.3, 0.06, -0.28);
            this.scene.add(stoneOnTheGround);
        });
        //
        this.loader.load('resources/models/treeNew.gltf', (gltf) => {
            let tree = gltf.scene.children[0];
            tree.scale.set(0.023, 0.023, 0.023);
            tree.rotation.z += Math.PI / 4.5;
            tree.rotation.x -= Math.PI / 13;
            tree.rotation.y -= Math.PI / 6;
            // tree.rotation.z += Math.PI / 8.3; // 3
            // tree.rotation.x -= Math.PI / 7; // 2
            // tree.rotation.y = Math.PI / 7; // 3.3
            tree.position.set(0, 0.1, -0.05);
            this.scene.add(tree);
        });
        //
        this.loader.load('resources/models/fence.gltf', (gltf) => {
            let fence = gltf.scene.children[0];
            fence.scale.set(0.04, 0.04, 0.04);
            fence.rotation.z += Math.PI / 3;
            fence.rotation.x -= Math.PI / 2.1;
            fence.rotation.y = Math.PI / 3.1; //-= Math.PI / 4;
            fence.position.set(0.39, 0.5, 0.19);
            this.scene.add(fence);
        });
        //
        this.loader.load('resources/models/fireplace.gltf', (gltf) => {
            let fireplace = gltf.scene.children[0];
            fireplace.scale.set(0.03, 0.03, 0.03);
            fireplace.rotation.z += Math.PI / 3;
            fireplace.rotation.x -= Math.PI / 2.1;
            fireplace.rotation.y = Math.PI / 3.1; //-= Math.PI / 4;
            fireplace.position.set(0.1, 0.15, 0.1);
            this.scene.add(fireplace);
        });
        //
    }
    ;
    fireFlame() {
        this.flameMaterial = new Fire_Shader_1.FlameMaterial();
        let flameGeometry = new three_1.PlaneGeometry(0.18, 0.23);
        let flame = new three_1.Mesh(flameGeometry, this.flameMaterial);
        // flame.position.set( -0.03, 0.0, 0.02 ); 0.1, 0.15, 0.1
        flame.position.set(-0.49, -0.8, -0.4);
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
}
exports["default"] = FloatingRock;
;


/***/ }),

/***/ "./src/scripts/shaders/Fire.Shader.ts":
/*!********************************************!*\
  !*** ./src/scripts/shaders/Fire.Shader.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlameMaterial = exports.noise = void 0;
const three_2 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
exports.noise = new three_2.TextureLoader().load('resources/textures/noise.png');
class FlameMaterial extends three_2.ShaderMaterial {
    constructor() {
        super();
        this.vertexShader = `
        varying vec2 vUv;

        void main() {

            // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
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

            vec3 col = 0.6 + 0.99 * vec3( noise.x, noise.x, noise.x );

            vec2 centeredUv = vec2( vUv.x - 0.3, vUv.y + 0.1 );
            float distanceToCenter = length( centeredUv );
            float strength = step( distance( vec2( vUv.x, vUv.y + 0.1 ), vec2(2.5) ), 0.4 );

            if ( 8.0 * distanceToCenter * max( abs( vUv.x - 0.5 ) * 2.0, 0.1 ) * max( vUv.y, 0.24 ) > 0.5 + ( noise.x / 1.5 + noise.y / 4.0 ) ) { discard; }
            // if ( 10.0 * distanceToCenter * max( abs( vUv.x - 0.5 ) * 2.0, 0.1 ) * max( vUv.y, 0.1 ) > 0.3 + noise.x / 2.0 ) { discard; }

            gl_FragColor = vec4( vec3(yGradient) + col + uInnerColor, 1.0 );
            gl_FragColor.rgb = mix( gl_FragColor.rgb, uOuterColor, 0.7 );

            // gl_FragColor = vec4( yGradient );

        }
        `,
            this.uniforms = {
                uTime: { value: 0 },
                uNoise: { value: exports.noise },
                uInnerColor: { value: new three_2.Color(0xfff30f) },
                uOuterColor: { value: new three_2.Color(0xfc4e03) }
            };
    }
}
exports.FlameMaterial = FlameMaterial;
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


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CombustionComponent = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
//
const CombistionConteiner = styled_components_1.default.div `
    color: black;

    display: ${(props) => (props.visible ? 'block' : 'none')};
`;
const CombustionComponent = ({ visible }) => {
    return (react_1.default.createElement(CombistionConteiner, { visible: visible }, "Combustion"));
};
exports.CombustionComponent = CombustionComponent;


/***/ }),

/***/ "./src/scripts/components/fog/Fog.Component.tsx":
/*!******************************************************!*\
  !*** ./src/scripts/components/fog/Fog.Component.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FogComponent = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
//
const FogConteiner = styled_components_1.default.div `
    color: green;
    position: static;
    // text-align: center;
    // margin-top: 20px;

    display: ${(props) => (props.visible ? 'block' : 'none')};
`;
const FogComponent = ({ visible }) => {
    return (react_1.default.createElement(FogConteiner, { visible: visible }, "Fog"));
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
    background-color: #b2eef5;
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
        react_1.default.createElement(view_1.default, { visible: path === '/' }),
        react_1.default.createElement(Water_Component_1.WaterComponent, { visible: path === '/water' }),
        react_1.default.createElement(Fog_Component_1.FogComponent, { visible: path === '/fog' }),
        react_1.default.createElement(Combustion_Component_1.CombustionComponent, { visible: path === '/combustion' }),
        react_1.default.createElement(TopPanelLeft, { onClick: HomeClick }, "Home"),
        react_1.default.createElement(TopPanelLeft, { onClick: WaterClick }, "Water"),
        react_1.default.createElement(TopPanelLeft, { onClick: FogClick }, "Fog"),
        react_1.default.createElement(TopPanelLeft, { onClick: CombustionClick }, "Combustion"),
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


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WaterComponent = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const styled_components_1 = __importDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));
//
const WaterConteiner = styled_components_1.default.div `
    color: red;

    display: ${(props) => (props.visible ? 'block' : 'none')};
`;
const WaterComponent = ({ visible }) => {
    return (react_1.default.createElement(WaterConteiner, { visible: visible }, "Water"));
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
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunklive_city"] = self["webpackChunklive_city"] || [];
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
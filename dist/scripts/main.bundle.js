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
// import '../css/style.css';
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
            this.mapControls.update();
            this.renderer.render(this.scene, this.camera);
        };
    }
    init() {
        // Canvas
        this.canvas = document.querySelector('canvas.webglView');
        // Scene
        this.scene = new three_1.Scene();
        this.scene.background = new three_1.Color('#edb27b'); //  ebbf96
        // Sizes
        this.sizes.width = window.innerWidth,
            this.sizes.height = window.innerHeight;
        // Camera
        this.camera = new three_1.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set(1, 2, 1);
        this.scene.add(this.camera);
        // Light
        const light = new three_1.PointLight(0xffcff0, 1.6, 10);
        light.position.set(0.2, 1.3, 1);
        this.scene.add(light);
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
        // this.loadRock1();
        // this.loadRock2();
        // this.loadRock3();
        // this.loadHouse();
        // this.loadCloud1();
        // this.loadCloud2();
        this.loadModels();
        //
        // this.loadingBar();
        //
        if (this.rock1 && this.rock2 && this.rock3 && this.cloud1 && this.cloud2 && this.house)
            this.sceneReady = true;
        if (this.sceneReady)
            console.log('screen is ready');
        this.tick();
    }
    ;
    loadingBar() {
        const loadingBarElement = document.querySelector('.loading-bar');
        this.loadingManager = new three_1.LoadingManager(
        // Loaded
        () => {
            window.setTimeout(() => {
                // gsap.to( overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 } );
                loadingBarElement.classList.add('ended');
                // loadingBarElement.style.transform = '';
            }, 500);
            window.setTimeout(() => {
                this.sceneReady = true;
            }, 100);
        }, 
        // Progress
        (itemUrl, itemsLoaded, itemsTotal) => {
            // Calculate the progress and update the loadingBarElement
            const progressRatio = itemsLoaded / itemsTotal;
            // loadingBarElement.style.transform = `scaleX(${progressRatio})`;
        });
    }
    loadModels() {
        const loadingBarElement = document.querySelector('.loading-bar');
        this.loadingManager = new three_1.LoadingManager(
        // Loaded
        () => {
            window.setTimeout(() => {
                // gsap.to( overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 } );
                loadingBarElement.classList.add('ended');
                // loadingBarElement.style.transform = '';
            }, 500);
            window.setTimeout(() => {
                this.sceneReady = true;
            }, 100);
        }, 
        // Progress
        (itemUrl, itemsLoaded, itemsTotal) => {
            // Calculate the progress and update the loadingBarElement
            const progressRatio = itemsLoaded / itemsTotal;
            // loadingBarElement.style.transform = `scaleX(${progressRatio})`;
        });
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
            this.rock2.rotation.z += Math.PI / 1.2;
            this.rock2.rotation.x -= Math.PI / 7;
            this.rock2.position.set(-1.5, 0, 0);
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
            this.house.scale.set(0.1, 0.1, 0.0002);
            this.house.rotation.z += Math.PI / 3;
            this.house.rotation.x -= Math.PI / 2;
            this.house.rotation.y = Math.PI / 3.3;
            this.house.position.set(-0.08, 0.3, 0.1);
            this.scene.add(this.house);
        });
        //
        this.loader.load('resources/models/cloud.gltf', (gltf) => {
            this.cloud1 = gltf.scene.children[0];
            this.cloud1.scale.set(0.03, 0.03, 0.03);
            // this.cloud1.rotation.z += Math.PI / 3;
            // this.cloud1.rotation.x -= Math.PI / 2;
            this.cloud1.rotation.y = Math.PI / 3.3;
            this.cloud1.position.set(0.8, 0.7, 0.1);
            this.scene.add(this.cloud1);
        });
        //
        this.loader.load('resources/models/cloud2.gltf', (gltf) => {
            this.cloud2 = gltf.scene.children[0];
            this.cloud2.scale.set(0.02, 0.02, 0.02);
            // this.cloud2.rotation.z += Math.PI / 5;
            // this.cloud2.rotation.x -= Math.PI / 2;
            this.cloud2.rotation.y = Math.PI / 2;
            this.cloud2.position.set(-1, -0.1, -0.3);
            this.scene.add(this.cloud2);
        });
    }
    ;
    loadRock1() {
        this.loader = new GLTFLoader_1.GLTFLoader(this.loadingManager);
        this.loader.load('resources/models/stone1.gltf', (gltf) => {
            this.rock1 = gltf.scene.children[0];
            this.rock1.scale.set(0.4, 0.4, 0.4);
            this.rock1.rotation.z += Math.PI / 1.2;
            this.rock1.rotation.x -= Math.PI / 7;
            this.rock1.position.set(0, 0, 0);
            this.scene.add(this.rock1);
        });
    }
    ;
    loadRock2() {
        this.loader = new GLTFLoader_1.GLTFLoader(this.loadingManager);
        this.loader.load('resources/models/stone2.gltf', (gltf) => {
            this.rock2 = gltf.scene.children[0];
            this.rock2.scale.set(0.1, 0.1, 0.1);
            // this.rock2.rotation.z += Math.PI;
            this.rock2.rotation.z += Math.PI / 1.2;
            this.rock2.rotation.x -= Math.PI / 7;
            this.rock2.position.set(-1.5, 0, 0);
            this.scene.add(this.rock2);
        });
    }
    ;
    loadRock3() {
        this.loader = new GLTFLoader_1.GLTFLoader(this.loadingManager);
        this.loader.load('resources/models/stone3.gltf', (gltf) => {
            this.rock3 = gltf.scene.children[0];
            this.rock3.scale.set(0.03, 0.03, 0.03);
            this.rock3.rotation.z += Math.PI;
            // this.rock3.rotation.y += Math.PI / 3;
            this.rock3.position.set(1, 0.5, 0.25);
            this.scene.add(this.rock3);
        });
    }
    ;
    loadHouse() {
        this.loader = new GLTFLoader_1.GLTFLoader(this.loadingManager);
        this.loader.load('resources/models/house.gltf', (gltf) => {
            this.house = gltf.scene.children[0];
            this.house.scale.set(0.1, 0.1, 0.0002);
            this.house.rotation.z += Math.PI / 3;
            this.house.rotation.x -= Math.PI / 2;
            this.house.rotation.y = Math.PI / 3.3;
            this.house.position.set(-0.08, 0.3, 0.1);
            this.scene.add(this.house);
        });
    }
    ;
    loadCloud1() {
        this.loader = new GLTFLoader_1.GLTFLoader();
        this.loader.load('resources/models/cloud.gltf', (gltf) => {
            this.cloud1 = gltf.scene.children[0];
            this.cloud1.scale.set(0.03, 0.03, 0.03);
            // this.cloud1.rotation.z += Math.PI / 3;
            // this.cloud1.rotation.x -= Math.PI / 2;
            this.cloud1.rotation.y = Math.PI / 3.3;
            this.cloud1.position.set(0.8, 0.7, 0.1);
            this.scene.add(this.cloud1);
        });
    }
    ;
    loadCloud2() {
        this.loader = new GLTFLoader_1.GLTFLoader();
        this.loader.load('resources/models/cloud2.gltf', (gltf) => {
            this.cloud2 = gltf.scene.children[0];
            this.cloud2.scale.set(0.02, 0.02, 0.02);
            // this.cloud2.rotation.z += Math.PI / 5;
            // this.cloud2.rotation.x -= Math.PI / 2;
            this.cloud2.rotation.y = Math.PI / 2;
            this.cloud2.position.set(-1, -0.1, -0.3);
            this.scene.add(this.cloud2);
        });
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
const CombustionComponent = () => {
    return (react_1.default.createElement("h1", null, "Combustion"));
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
const FogComponent = () => {
    return (react_1.default.createElement("h1", null, "Fog"));
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
const FooterConteiner = styled_components_1.default.div `
    // display: grid;
    // justify-content: center;
    // grid-template-columns: auto auto auto;
    padding-top: 13px;
    height: 2%;
    margin-top: 100px;
    opacity: 0.4;
    background-color: #111;
    color: white;
    // justify-content: center;
`;
const Logo = styled_components_1.default.a `
    line-height: 50px;
    height: 100%;
    padding-left: 30px;
    padding-top: 2px;
    font-size: 25px;
    display: inline-block;
    position: relative;
    z-index: 1;
    text-decoration: none;
    text-transform: uppercase;
    // text-align: left;
    color: white;
    cursor: pointer;
`;
const Contact = styled_components_1.default.div `
    text-decoration: none;
    text-transform: uppercase;
    text-decoration: none;
    display: grid;
    justify-content: center;
    // padding-top: 20px;
    grid-gap: 7px;
    background-color: #111;
    opacity: 0.6;
    height: 150px;
`;
const Rights = styled_components_1.default.div `
    padding-top: 15px;
    padding-bottom: 15px;
    // text-align: center;
    display: grid;
    justify-content: center;
    color: black;
`;
const FooterComponent = () => {
    return (react_1.default.createElement(FooterConteiner, null,
        react_1.default.createElement(Logo, { href: '' }, "Flat earth"),
        react_1.default.createElement(Contact, null,
            react_1.default.createElement("h1", null, "Contact"),
            react_1.default.createElement("a", { href: "" }, "Email"),
            react_1.default.createElement("a", { href: "" }, "Facebook"),
            react_1.default.createElement("a", { href: "" }, "Phone number")),
        react_1.default.createElement(Rights, null, "\u00A9 2022. All rights reserved.")));
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
    padding-top: 60px;
    padding-bottom: 11px;
    margin-top: 20%;
    // margin-bottom: 30px;
    width: 650px;
    height: 450px;
    opacity: 0.75;
    background-color: #000;
    z-index: 105;
    border-radius: 16px;
    // display: grid;
    // justify-content: center;
    color: white;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;
const Label = styled_components_1.default.label `
    width: 750px;
    // padding-top: 20px;
    // padding-bottom: 20px;
`;
const Input = styled_components_1.default.input `
    width: 350px;
    height: 5px;
    padding-top: 14px;
    padding-bottom: 14px;
    padding-left: 5px;
    margin-top: 10px;
    // margin-bottom: 10px;
    border-radius: 5px;
    `;
const FormConteinerInner = styled_components_1.default.div `
    width: 360px;
    // height: 240px;
    background-color: #575755;
    margin-top: 17px;
    margin-left: auto;
    margin-right: auto;
    // margin: auto;
    // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    padding: 30px;
    border-radius: 16px;
`;
const Warning = styled_components_1.default.div `
    position: static;
    // width: 20px;
    text-align: left;
    margin-right: 10em;
    padding-left: 9px;
    font-size: 12px;
    padding-top: 2px;
    color: red;
`;
const Button = styled_components_1.default.button.attrs({
    type: 'submit',
    value: 'Submit'
}) `
    background-color: #fff3d1;
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 34px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    margin-top: 5%;
    opacity: 0.8;

    &:hover {
        opacity: 0.67;
    }
`;
//
const FormComponent = () => {
    const [submited, setSubmitting] = (0, react_1.useState)(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        // if ( name || lastName || email || question ) setSubmitting( true );
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
            react_1.default.createElement("h1", null, "Leave you question here:"),
            react_1.default.createElement(FormConteinerInner, null,
                react_1.default.createElement("form", { onSubmit: handleSubmit },
                    react_1.default.createElement(Label, null,
                        submited && name && lastName && email && question ?
                            react_1.default.createElement("div", null, "Form submitted") : null,
                        react_1.default.createElement(Input, { name: "name", placeholder: 'Name', value: name, onChange: changeName, type: 'text' }),
                        !name && submited ? react_1.default.createElement(Warning, null, "Please enter your name") : null,
                        react_1.default.createElement(Input, { name: "lastName", placeholder: 'Last name', value: lastName, onChange: changeLastName, type: 'text' }),
                        !lastName && submited ? react_1.default.createElement(Warning, null, "Please enter your last name") : null,
                        react_1.default.createElement(Input, { name: "email", placeholder: 'Email', value: email, onChange: changeEmail, type: 'text' }),
                        !email && submited ? react_1.default.createElement(Warning, null, "Please enter your email") : null,
                        react_1.default.createElement(Input, { name: "question", placeholder: 'Question', value: question, onChange: changeQuestion, type: 'text' }),
                        !question && submited ? react_1.default.createElement(Warning, null, "Please enter your question") : null),
                    react_1.default.createElement(Button, null, "Submit"))))));
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
// import img1 from '../../../resources/img/1.png';
// import img2 from '../../../resources/img/1.png';
//
const Items = styled_components_1.default.div `
    // position: absolute;
    // bottom: 30%;
    padding-top: 80%;
    // left: 45%;
    // width: 100%;
    // height: 310px;
    opacity: 0.85;
    z-index: 1000;
    color: white;
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto;
    grid-gap: 7%;
    // justify-content: space-between;
`;
const Item = styled_components_1.default.div `
    border-radius: 16px;
    padding-top: 43px;
    padding-bottom: 40px;
    background-color: #000;
    height: 390px;
    width: 480px;
    display: grid;
    justify-content: center;
    // grid-column: 100px 100px;
    // align-content: space-around;
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


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainComponent = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
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
    // bottom: -40px;
    // left: 45%;
    width: 100%;
    height: 3092px;
    background-color: #edb27b;
    // opacity: 0.5;
    // z-index: 1000;
    // border-radius: 10px;
    // color: red;
    // height: 70000%,
    // overflow: scroll
    // display: grid;
    // justify-content: center;
`;
const Menu = styled_components_1.default.button `
    display: grid;
    justify-content: center;
    z-index: 4000;
`;
const MainComponent = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    // Game.dispatch = dispatch;
    const appInited = (0, react_redux_1.useSelector)((state) => state.application.inited);
    // example
    console.log('isAppInited:' + appInited);
    //
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(Div, null,
            react_1.default.createElement(Menu, null,
                react_1.default.createElement("button", null,
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/' }, "Home")),
                react_1.default.createElement("button", null,
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/water' }, "Water")),
                react_1.default.createElement("button", null,
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/fog' }, "Fog")),
                react_1.default.createElement("button", null,
                    react_1.default.createElement(react_router_dom_1.Link, { to: '/combustion' }, "Combustion"))),
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(view_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/water', element: react_1.default.createElement(Water_Component_1.WaterComponent, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/fog', element: react_1.default.createElement(Fog_Component_1.FogComponent, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/combustion', element: react_1.default.createElement(Combustion_Component_1.CombustionComponent, null) })),
            react_1.default.createElement(TopMenu_Component_1.TopMenuComponent, null),
            react_1.default.createElement(items_1.default, null),
            react_1.default.createElement(form_1.default, null),
            react_1.default.createElement(Footer_Component_1.FooterComponent, null))));
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
    opacity: 0.4;
    z-index: 106;
    color: white;
`;
const Logo = styled_components_1.default.a `
	line-height: 50px;
	height: 100%;
    padding-left: 20px;
    padding-top: 6px;
	font-size: 25px;
	display: inline-block;
	position: relative;
	z-index: 1;
	text-decoration: none;
	text-transform: uppercase;
	text-align: center;
	color: white;
	cursor: pointer;
`;
const TopMenuComponent = () => {
    return (react_1.default.createElement(TopMenu, null,
        react_1.default.createElement(Logo, { href: '' }, "Flat earth")));
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
    height:70000%;
    bottom: 10px;
`;
const handleOnWheel = () => { console.log('worked'); };
const ViewComponent = () => {
    return (react_1.default.createElement(ViewCanvas, { className: "webglView", onWheel: handleOnWheel }));
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
//
const WaterComponent = () => {
    return (react_1.default.createElement("h1", null, "Water"));
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
import { AmbientLight, AxesHelper, BufferAttribute, BufferGeometry, Clock, Color, DynamicDrawUsage, Euler, Float32BufferAttribute, LoadingManager, Material, Matrix4, Mesh, PerspectiveCamera, PlaneGeometry, PointLight, Points, PointsMaterial, Quaternion, Scene, ShaderMaterial, SphereBufferGeometry, TextureLoader, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from 'gsap';
// @ts-ignore
import * as css from '../css/style.css';
import { FlameMaterial } from "./shaders/Fire.Shader";
import { FoamParticle } from "./shaders/FoamParticles.Shader";
import { WaterfallMaterial } from "./shaders/Warerfall.Shader";
import { BottomFoamMaterial } from "./shaders/BottomFoam.Shader";
import { TopmFoamShader } from "./shaders/TopFoam.Shader";
import { Pane } from "tweakpane";
import { FogGfx } from "./FireFog";

//

export default class FloatingRock {

    public renderer: WebGLRenderer;
    public camera: PerspectiveCamera;
    public scene: Scene;
    public canvas: HTMLCanvasElement;
    public mapControls: OrbitControls;
    public elapsedTime: number = 0;
    public delta: number;
    public clock: Clock;
    public loader: GLTFLoader;
    public middleRock: Mesh;
    public rightRock: Mesh;
    public leftRock: Mesh;
    public house: Mesh;
    public sceneReady: Boolean = false;
    public cloud1: Mesh;
    public cloud2: Mesh;
    public loadingManager: LoadingManager;
    public flames: ShaderMaterial;
    public flameMaterial: FlameMaterial;
    public animation: Animation;
    public waterfallMaterial: WaterfallMaterial;
    public bottomFoamMaterial: BottomFoamMaterial;
    public topFoamMaterial: BottomFoamMaterial;
    public foamPointPositions: Float32Array;
    public foamPointCount: number = 200;
    public foamParticleGeom: BufferGeometry;
    public foamParticleMaterial: FoamParticle;

    public fog: FogGfx;

    private sizes = {
        width: 0,
        height: 0
    };

    public init () : void {

        // Canvas
        this.canvas = document.querySelector( 'canvas.webglView' ) as HTMLCanvasElement;

        // Scene
        this.scene = new Scene();
        this.scene.background = new Color( '#69deeb' ); //324345 - at night  // b2eef5

        // Sizes
        this.sizes.width = window.innerWidth,
        this.sizes.height = window.innerHeight;

        // Camera
        this.camera = new PerspectiveCamera( 45, this.sizes.width / this.sizes.height, 0.1, 100 );
        this.camera.position.set( 1, 0.4, 1 );
        this.scene.add( this.camera );

        // Light
        const light = new PointLight( 0xffffff, 3, 10 );
        light.position.set( 3, 7, 3 );
        this.scene.add( light );

        const ambientLight = new AmbientLight( 0xffffff, 0.4 );
        this.scene.add( ambientLight );

        // Controls
        this.mapControls = new OrbitControls( this.camera, this.canvas );
        // this.mapControls.enableDamping = true;
        this.mapControls.enableZoom = false;

        // Renderer
        this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );

        // Resize
        window.addEventListener( 'resize', this.resize() );

        this.clock = new Clock();

        const axesHelper = new AxesHelper( 5 );
        this.scene.add( axesHelper );

        //
        this.addFog();
        this.backgroundGradient();
        // this.loadingBar();
        this.addWaterfall();
        this.addBottomFoam();
        this.addTopFoam();
        this.loadModel();   // current
        this.fireFlame();

        // this.debug();

        this.tick();

    };

    public addFog () : void {

        // Fog
        let props = {

            numberOfSprites: 106,
            height: 0.001,
            width: 0.001,
            depth: 0.001,
            outerColor: '#ff0000',
            innerColor: '#FFCE00',
            newPosition: new Vector3( -0.946, 1.37, -0.946 ) // -0.49, -0.8, -0.4 --

        }
        this.fog = new FogGfx( new Color().setHex( + props.outerColor.replace( '#', '0x' ) ).getHex(), props.numberOfSprites, props.height, props.width, props.depth );
        this.animation = new Animation();
        this.scene.add( this.fog.wrapper );

        props.newPosition = this.fog.newPosition;

    };

    public debug () : void {

        let props = {

            color: '#fff30f',
            outerColor: '#ff0000',
            innerColor: '#FFCE00',

        };

        let pane = new Pane( { title: "Tweakpane", expanded: false } );
        pane.element.parentElement.style['z-index'] = '10';
        pane.element.parentElement.style['padding-top'] = '100px';

        pane.addInput( props, 'color', { label: 'inner color' } ).on('change', () => {

            this.flameMaterial.uniforms.uInnerColor.value.setHex( parseInt( props.color.replace( '#', '0x' ) ) );

        } );
        pane.addInput( props, 'color', { label: 'outer color' } ).on('change', () => {

            this.flameMaterial.uniforms.uOuterColor.value.setHex( parseInt( props.color.replace( '#', '0x' ) ) );

        } );
        pane.addInput( props, 'outerColor', { view: 'color', alpha: true, label: 'outer fog color' } ).on( 'change', ( ev ) => {

            this.fog.outerColor =  ev.value;

        } );
        pane.addInput( props, 'innerColor', { view: 'color', alpha: true, label: 'inner fog color' } ).on( 'change', ( ev ) => {

            this.fog.innerColor = ev.value;

        } );

    };

    //

    public loadModel () : void {

        this.loader = new GLTFLoader( this.loadingManager );
        this.loader.load(

            'resources/models/scene.gltf',
            ( gltf ) => {

                gltf.scene.children.forEach( element => {

                    // gltf.scene.children[0] as Mesh;

                    this.scene.add( element );

                });

            }

        );

        //  middle rock
        this.loader = new GLTFLoader( this.loadingManager );
        this.loader.load(

            'resources/models/stone1.gltf',
            ( gltf ) => {

                this.middleRock = gltf.scene.children[0] as Mesh;
                this.middleRock.scale.set( 0.3, 0.3, 0.3 );
                this.middleRock.rotation.z += Math.PI / 1;
                this.middleRock.position.set( 0, - 0.056, 0 );
                this.scene.add( this.middleRock );

            }

        );

        //  right rock
        this.loader = new GLTFLoader( this.loadingManager );
        this.loader.load(

            'resources/models/stone3.gltf',
            ( gltf ) => {

                this.rightRock = gltf.scene.children[0] as Mesh;
                this.rightRock.scale.set( 0.03, 0.03, 0.03 );
                this.rightRock.rotation.z += Math.PI / 1;
                this.rightRock.rotation.x += Math.PI / 7;
                this.rightRock.rotation.y += Math.PI / 7;
                this.rightRock.position.set( 0.5, - 0.25, - 0.120 );
                this.scene.add( this.rightRock );

            }

        );

        //  left rock
        this.loader.load(

            'resources/models/stone2.gltf',
            ( gltf ) => {

                this.leftRock = gltf.scene.children[0] as Mesh;
                this.leftRock.scale.set( 0.08, 0.08, 0.08 );
                this.leftRock.rotation.z += Math.PI;
                this.leftRock.position.set( - 0.55, 0.16, 0.35 );
                this.scene.add( this.leftRock );

            }

        );

        //
        this.loader.load(

            'resources/models/house.gltf',
            ( gltf ) => {

                this.house = gltf.scene.children[0] as Mesh;
                this.house.scale.set( 0.1, 0.07, 0.0002 );
                // this.house.rotation.z += Math.PI / 3;
                // this.house.rotation.x -= Math.PI / 2;
                this.house.rotation.y = Math.PI / 2.3;
                this.house.position.set( -0.09, 0.1, 0.06 );
                this.scene.add( this.house );

            }

        );

        //

        this.loader.load(

            'resources/models/treeNew.gltf',
            ( gltf ) => {

                let tree = gltf.scene.children[0] as Mesh;
                tree.scale.set( 0.014, 0.014, 0.014 );
                tree.position.set( 0.17, 0.04, -0.02 );
                this.scene.add( tree );

            }

        );

        this.loader.load(

            'resources/models/cloud.gltf',
            ( gltf ) => {

                this.cloud1 = gltf.scene.children[0] as Mesh;
                this.cloud1.scale.set( 0.03, 0.03, 0.03 );
                this.cloud1.rotation.y = Math.PI / 3.3;
                this.cloud1.position.set( 0.2, 0.3, -0.2 );
                this.scene.add( this.cloud1 );

            }

        );

        //

        this.loader.load(

            'resources/models/cloud2.gltf',
            ( gltf ) => {

                this.cloud2 = gltf.scene.children[0] as Mesh;
                this.cloud2.scale.set( 0.03, 0.03, 0.03 );
                this.cloud2.rotation.y = Math.PI / 4;
                this.cloud2.position.set( -0.1, 0.35, 0.2 );
                this.scene.add( this.cloud2 );

            }

        );

        // rocksOnMiddleRock.gltf
        this.loader.load(

            'resources/models/rocksOnMiddleRock.gltf',
            ( gltf ) => {

                let rocksOnMiddleRock = gltf.scene.children[0] as Mesh;
                rocksOnMiddleRock.scale.set( 0.65, 0.65, 0.65 );
                rocksOnMiddleRock.rotation.y = Math.PI / 4;
                rocksOnMiddleRock.position.set( 0.34, 0.0, 0.13 );
                this.scene.add( rocksOnMiddleRock );

            }

        );

    };

    public backgroundGradient () : void {

        let planeGeometry = new PlaneGeometry( 2, 2 );
        let planeMaterial = new ShaderMaterial( {

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

                uInnerColor: { value: new Color( 0xedf6f7 ) }, //   0xe8fdff
                uOuterColor: { value: new Color( 0xb3eeff ) }

            }

        } );

        let backgroundPlane = new Mesh( planeGeometry, planeMaterial );
        // backgroundPlane.position.set( -2, -2, -2 );
        this.scene.add( backgroundPlane );


    };

    public fireFlame () : void {

        this.flameMaterial = new FlameMaterial();
        let flameGeometry = new PlaneGeometry( 0.18, 0.23 );
        let flame = new Mesh( flameGeometry, this.flameMaterial );

        flame.scale.set( 0.66, 0.66, 0.66 );
        flame.position.set( -0.946, -0.37, -0.946 );

        this.scene.add( flame );

    };

    public loadingBar () : void {

        const loadingBarElement = document.querySelector( '.loading-bar' );

        this.loadingManager = new LoadingManager(

            () => {

                window.setTimeout( () => {

                    gsap.to( overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 } );

                    loadingBarElement.classList.add('ended');
                    // @ts-ignore
                    loadingBarElement.style.transform = '';

                }, 500 )

                window.setTimeout( () => {

                    this.sceneReady = true;

                }, 2000 )

            },

            ( itemUrl, itemsLoaded, itemsTotal ) => {

                const progressRatio = itemsLoaded / itemsTotal;
                // @ts-ignore
                loadingBarElement.style.transform = `scaleX(${progressRatio})`;

            }

        );

        /**
         * Overlay
         */
        const overlayGeometry = new PlaneGeometry( 2, 2, 1, 1 );
        const overlayMaterial = new ShaderMaterial( {
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
        } );
        const overlay = new Mesh( overlayGeometry, overlayMaterial );
        this.scene.add( overlay );

    };

    private resize () : any {

        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );

    };

    public addWaterfall () : void {

        this.waterfallMaterial = new WaterfallMaterial();
        let waterfallGeometry = new PlaneGeometry( 0.14, 0.327 );
        let waterfall = new Mesh( waterfallGeometry,this.waterfallMaterial );

        let brightness = [];
        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];

        for ( let i = 0; i < 50; i ++ ) {

            brightness.push( ( Math.random() - 0.5 ) * 2 );

            let rotationX = 0;
            let rotationY = Math.PI / 9;
            let rotationZ = 0;

            let transformMatrix = new Matrix4().compose( new Vector3( - 0.1 , 0, 0.05 ), new Quaternion().setFromEuler( new Euler( rotationX, rotationY, rotationZ ) ), new Vector3( 1, 1, 1 ) ).toArray();

            transformRow1.push( transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3] );
            transformRow2.push( transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7] );
            transformRow3.push( transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11] );
            transformRow4.push( transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15] );

        }

        waterfallGeometry.setAttribute( 'brightness', new Float32BufferAttribute( brightness, 1 ) );
        waterfallGeometry.setAttribute( 'transformRow1', new Float32BufferAttribute( new Float32Array( transformRow1 ), 4 ) );
        waterfallGeometry.setAttribute( 'transformRow2', new Float32BufferAttribute( new Float32Array( transformRow2 ), 4 ) );
        waterfallGeometry.setAttribute( 'transformRow3', new Float32BufferAttribute( new Float32Array( transformRow3 ), 4 ) );
        waterfallGeometry.setAttribute( 'transformRow4', new Float32BufferAttribute( new Float32Array( transformRow4 ), 4 ) );

        this.scene.add( waterfall );

    };

    public addBottomFoam () : void {

        this.bottomFoamMaterial = new BottomFoamMaterial();
        let waterFoamGeometry = new PlaneGeometry( 0.13, 0.2 );
        let waterFoam = new Mesh( waterFoamGeometry, this.bottomFoamMaterial );

        let foamFade = [];
        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];

        for ( let i = 0; i < 50; i ++ ) {

            foamFade.push( 1 - i * 0.02 );

            let rotationX = 0;
            let rotationY = Math.PI / 9;
            let rotationZ = 0;

            let transformMatrix = new Matrix4().compose( new Vector3( - 0.1 , 0, 0.05 ), new Quaternion().setFromEuler( new Euler( rotationX, rotationY, rotationZ ) ), new Vector3( 1, 1, 1 ) ).toArray();

            transformRow1.push( transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3] );
            transformRow2.push( transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7] );
            transformRow3.push( transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11] );
            transformRow4.push( transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15] );

        }

        waterFoamGeometry.setAttribute( 'transformRow1', new Float32BufferAttribute( new Float32Array( transformRow1 ), 4 ) );
        waterFoamGeometry.setAttribute( 'transformRow2', new Float32BufferAttribute( new Float32Array( transformRow2 ), 4 ) );
        waterFoamGeometry.setAttribute( 'transformRow3', new Float32BufferAttribute( new Float32Array( transformRow3 ), 4 ) );
        waterFoamGeometry.setAttribute( 'transformRow4', new Float32BufferAttribute( new Float32Array( transformRow4 ), 4 ) );

        waterFoamGeometry.setAttribute( 'foamFade', new Float32BufferAttribute( foamFade, 1 ) );

        this.scene.add( waterFoam );

        // Particle

        this.foamParticleMaterial = new FoamParticle();
        this.foamParticleGeom = new BufferGeometry();

        this.foamPointPositions = new Float32Array( this.foamPointCount * 3 );

        let foamSize = [];

        for ( let i = 0; i < this.foamPointCount; i++ ) {

            this.foamPointPositions[ i * 3 ] = ( Math.random() - 0.5 ) * 0.05;
            this.foamPointPositions[ i * 3 + 1 ] = ( Math.random() - 0.5 ) * 0.03;
            this.foamPointPositions[ i * 3 + 2 ] = ( Math.random() - 0.5 ) * 0.01;

            if ( Math.abs( this.foamPointPositions[ i * 3 + 1 ] ) > Math.random() * 0.005 ) {

                this.foamPointPositions[ i * 3 + 1 ] = ( Math.random() - 0.5 ) * 0.001;

            }

            foamSize.push( Math.random() );

        }

        this.foamParticleGeom.setAttribute( 'position', new BufferAttribute( this.foamPointPositions, 3 ) );
        this.foamParticleGeom.setAttribute( 'foamSize', new Float32BufferAttribute( foamSize, 1 ) );

        let foamParticle = new Points( this.foamParticleGeom, this.foamParticleMaterial );
        foamParticle.position.x += 0.93;
        foamParticle.position.z += 0.93;
        foamParticle.position.y += 0.355;
        this.scene.add( foamParticle );

    };

    public addTopFoam () : void {

        let topFoamGeom = new PlaneGeometry( 0.16, 0.33 );
        this.topFoamMaterial = new TopmFoamShader();

        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];

        for ( let i = 0; i < 50; i ++ ) {

            let rotationX = 0;
            let rotationY = Math.PI / 9;
            let rotationZ = 0;

            let transformMatrix = new Matrix4().compose( new Vector3( - 0.1 , 0, 0.05 ), new Quaternion().setFromEuler( new Euler( rotationX, rotationY, rotationZ ) ), new Vector3( 1, 1, 1 ) ).toArray();

            transformRow1.push( transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3] );
            transformRow2.push( transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7] );
            transformRow3.push( transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11] );
            transformRow4.push( transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15] );

        }

        topFoamGeom.setAttribute( 'transformRow1', new Float32BufferAttribute( new Float32Array( transformRow1 ), 4 ) );
        topFoamGeom.setAttribute( 'transformRow2', new Float32BufferAttribute( new Float32Array( transformRow2 ), 4 ) );
        topFoamGeom.setAttribute( 'transformRow3', new Float32BufferAttribute( new Float32Array( transformRow3 ), 4 ) );
        topFoamGeom.setAttribute( 'transformRow4', new Float32BufferAttribute( new Float32Array( transformRow4 ), 4 ) );

        let topFoam = new Mesh( topFoamGeom, this.topFoamMaterial );
        this.scene.add( topFoam );

    };

    public tick = () : void => {

        window.requestAnimationFrame( this.tick );

        this.delta = this.clock.getDelta() * 1000;
        this.elapsedTime += this.delta;

        if ( this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight ) {

            this.resize();

        }

        if ( this.flameMaterial ) {

            this.flameMaterial.uniforms.uTime.value = this.elapsedTime / 3000;

        }

        this.waterfallMaterial.uniforms.uTime.value = this.elapsedTime / 1500;
        this.bottomFoamMaterial.uniforms.uTime.value = this.elapsedTime / 6000;
        this.topFoamMaterial.uniforms.uTime.value = this.elapsedTime / 6000;

        if ( this.rightRock ) this.rightRock.position.y -= Math.sin( this.elapsedTime / 700 ) / 4500 + Math.cos( this.elapsedTime / 700 ) / 4300;
        if ( this.leftRock ) this.leftRock.position.y -= Math.sin( this.elapsedTime / 980 ) / 4500 + Math.cos( this.elapsedTime / 930 ) / 3500;

        if ( this.fog ) this.fog.material.uniforms.uTime.value = this.elapsedTime;

        this.foamParticleMaterial.uniforms.uTime.value = Math.sin( this.elapsedTime / 500 ) * 0.005 + Math.cos( this.elapsedTime / 500 ) * 0.005;

        this.mapControls.update();
        this.renderer.render( this.scene, this.camera );

    };

};

import { Clock, Color, LoadingManager, Mesh, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from 'gsap';
// import '../css/style.css';


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
    public rock1: Mesh;
    public rock2: Mesh;
    public rock3: Mesh;
    public house: Mesh;
    public sceneReady: Boolean = false;
    public cloud1: Mesh;
    public cloud2: Mesh;
    public loadingManager: LoadingManager;

    private sizes = {
        width: 0,
        height: 0
    };

    public init () : void {

        // Canvas
        this.canvas = document.querySelector( 'canvas.webglView' ) as HTMLCanvasElement;

        // Scene
        this.scene = new Scene();
        this.scene.background = new Color( '#edb27b' ); //  ebbf96

        // Sizes
        this.sizes.width = window.innerWidth,
        this.sizes.height = window.innerHeight;

        // Camera
        this.camera = new PerspectiveCamera( 45, this.sizes.width / this.sizes.height, 0.1, 100 );
        this.camera.position.set( 1, 2, 1 );
        this.scene.add( this.camera );

        // Light
        const light = new PointLight( 0xffcff0, 1.6, 10 );
        light.position.set( 0.2, 1.3, 1 );
        this.scene.add( light );

        // Controls
        this.mapControls = new OrbitControls( this.camera, this.canvas );
        // this.mapControls.enableDamping = true;
        this.mapControls.enableZoom = false;

        // Renderer
        this.renderer = new WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );

        // Resize
        window.addEventListener( 'resize', this.resize() );

        this.clock = new Clock();

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

        if ( this.rock1 && this.rock2 && this.rock3 && this.cloud1 && this.cloud2 && this.house ) this.sceneReady = true;

        if( this.sceneReady ) console.log('screen is ready');

        this.tick();

    };

    public loadingBar () : void {

        const loadingBarElement = document.querySelector( '.loading-bar' );

        this.loadingManager = new LoadingManager(
            // Loaded
            () => {

                window.setTimeout( () => {

                    // gsap.to( overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 } );

                    loadingBarElement.classList.add( 'ended' );
                    // loadingBarElement.style.transform = '';

                }, 500 );

                window.setTimeout( () => {

                    this.sceneReady = true;

                }, 100 );
            },

            // Progress
            ( itemUrl, itemsLoaded, itemsTotal ) => {

                // Calculate the progress and update the loadingBarElement
                const progressRatio = itemsLoaded / itemsTotal;
                // loadingBarElement.style.transform = `scaleX(${progressRatio})`;
            }
        )

    }

    public loadModels () : void {

        const loadingBarElement = document.querySelector( '.loading-bar' );

        this.loadingManager = new LoadingManager(
            // Loaded
            () => {

                window.setTimeout( () => {

                    // gsap.to( overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 } );

                    loadingBarElement.classList.add( 'ended' );
                    // loadingBarElement.style.transform = '';

                }, 500 );

                window.setTimeout( () => {

                    this.sceneReady = true;

                }, 100 );
            },

            // Progress
            ( itemUrl, itemsLoaded, itemsTotal ) => {

                // Calculate the progress and update the loadingBarElement
                const progressRatio = itemsLoaded / itemsTotal;
                // loadingBarElement.style.transform = `scaleX(${progressRatio})`;
            }
        )

        this.loader = new GLTFLoader( this.loadingManager );
        this.loader.load(

            'resources/models/stone1.gltf',
            ( gltf ) => {

                this.rock1 = gltf.scene.children[0] as Mesh;
                this.rock1.scale.set( 0.4, 0.4, 0.4 );
                this.rock1.rotation.z += Math.PI / 1.2;
                this.rock1.rotation.x -= Math.PI / 7;
                this.rock1.position.set( 0, 0, 0 );
                this.scene.add( this.rock1 );

            }

        )

        //

        this.loader.load(

            'resources/models/stone2.gltf',
            ( gltf ) => {

                this.rock2 = gltf.scene.children[0] as Mesh;
                this.rock2.scale.set( 0.1, 0.1, 0.1 );
                // this.rock2.rotation.z += Math.PI;
                this.rock2.rotation.z += Math.PI / 1.2;
                this.rock2.rotation.x -= Math.PI / 7;
                this.rock2.position.set( - 1.5, 0, 0 );
                this.scene.add( this.rock2 );

            }

        )

        //

        this.loader.load(

            'resources/models/stone3.gltf',
            ( gltf ) => {

                this.rock3 = gltf.scene.children[0] as Mesh;
                this.rock3.scale.set( 0.03, 0.03, 0.03 );
                this.rock3.rotation.z += Math.PI;
                // this.rock3.rotation.y += Math.PI / 3;
                this.rock3.position.set( 1, 0.5, 0.25 );
                this.scene.add( this.rock3 );

            }

        )

        //

        this.loader.load(

            'resources/models/house.gltf',
            ( gltf ) => {

                this.house = gltf.scene.children[0] as Mesh;
                this.house.scale.set( 0.1, 0.1, 0.0002 );
                this.house.rotation.z += Math.PI / 3;
                this.house.rotation.x -= Math.PI / 2;
                this.house.rotation.y = Math.PI / 3.3;
                this.house.position.set( -0.08, 0.3, 0.1 );
                this.scene.add( this.house );

            }

        )

        //

        this.loader.load(

            'resources/models/cloud.gltf',
            ( gltf ) => {

                this.cloud1 = gltf.scene.children[0] as Mesh;
                this.cloud1.scale.set( 0.03, 0.03, 0.03 );
                // this.cloud1.rotation.z += Math.PI / 3;
                // this.cloud1.rotation.x -= Math.PI / 2;
                this.cloud1.rotation.y = Math.PI / 3.3;
                this.cloud1.position.set( 0.8, 0.7, 0.1 );
                this.scene.add( this.cloud1 );

            }

        )

        //

        this.loader.load(

            'resources/models/cloud2.gltf',
            ( gltf ) => {

                this.cloud2 = gltf.scene.children[0] as Mesh;
                this.cloud2.scale.set( 0.02, 0.02, 0.02 );
                // this.cloud2.rotation.z += Math.PI / 5;
                // this.cloud2.rotation.x -= Math.PI / 2;
                this.cloud2.rotation.y = Math.PI / 2;
                this.cloud2.position.set( -1, -0.1, -0.3 );
                this.scene.add( this.cloud2 );

            }

        )

    };

    public loadRock1 () : void {

        this.loader = new GLTFLoader( this.loadingManager );
        this.loader.load(

            'resources/models/stone1.gltf',
            ( gltf ) => {

                this.rock1 = gltf.scene.children[0] as Mesh;
                this.rock1.scale.set( 0.4, 0.4, 0.4 );
                this.rock1.rotation.z += Math.PI / 1.2;
                this.rock1.rotation.x -= Math.PI / 7;
                this.rock1.position.set( 0, 0, 0 );
                this.scene.add( this.rock1 );

            }

        )

    };

    public loadRock2 () : void {

        this.loader = new GLTFLoader( this.loadingManager );
        this.loader.load(

            'resources/models/stone2.gltf',
            ( gltf ) => {

                this.rock2 = gltf.scene.children[0] as Mesh;
                this.rock2.scale.set( 0.1, 0.1, 0.1 );
                // this.rock2.rotation.z += Math.PI;
                this.rock2.rotation.z += Math.PI / 1.2;
                this.rock2.rotation.x -= Math.PI / 7;
                this.rock2.position.set( - 1.5, 0, 0 );
                this.scene.add( this.rock2 );

            }

        )

    };

    public loadRock3 () : void {

        this.loader = new GLTFLoader( this.loadingManager );
        this.loader.load(

            'resources/models/stone3.gltf',
            ( gltf ) => {

                this.rock3 = gltf.scene.children[0] as Mesh;
                this.rock3.scale.set( 0.03, 0.03, 0.03 );
                this.rock3.rotation.z += Math.PI;
                // this.rock3.rotation.y += Math.PI / 3;
                this.rock3.position.set( 1, 0.5, 0.25 );
                this.scene.add( this.rock3 );

            }

        )

    };

    public loadHouse () : void {

        this.loader = new GLTFLoader( this.loadingManager );
        this.loader.load(

            'resources/models/house.gltf',
            ( gltf ) => {

                this.house = gltf.scene.children[0] as Mesh;
                this.house.scale.set( 0.1, 0.1, 0.0002 );
                this.house.rotation.z += Math.PI / 3;
                this.house.rotation.x -= Math.PI / 2;
                this.house.rotation.y = Math.PI / 3.3;
                this.house.position.set( -0.08, 0.3, 0.1 );
                this.scene.add( this.house );

            }

        )

    };

    public loadCloud1 () : void {

        this.loader = new GLTFLoader();
        this.loader.load(

            'resources/models/cloud.gltf',
            ( gltf ) => {

                this.cloud1 = gltf.scene.children[0] as Mesh;
                this.cloud1.scale.set( 0.03, 0.03, 0.03 );
                // this.cloud1.rotation.z += Math.PI / 3;
                // this.cloud1.rotation.x -= Math.PI / 2;
                this.cloud1.rotation.y = Math.PI / 3.3;
                this.cloud1.position.set( 0.8, 0.7, 0.1 );
                this.scene.add( this.cloud1 );

            }

        )

    };

    public loadCloud2 () : void {

        this.loader = new GLTFLoader();
        this.loader.load(

            'resources/models/cloud2.gltf',
            ( gltf ) => {

                this.cloud2 = gltf.scene.children[0] as Mesh;
                this.cloud2.scale.set( 0.02, 0.02, 0.02 );
                // this.cloud2.rotation.z += Math.PI / 5;
                // this.cloud2.rotation.x -= Math.PI / 2;
                this.cloud2.rotation.y = Math.PI / 2;
                this.cloud2.position.set( -1, -0.1, -0.3 );
                this.scene.add( this.cloud2 );

            }

        )

    };

    private resize () : any {

        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );

    };

    public tick = () : void => {

        window.requestAnimationFrame( this.tick );

        this.delta = this.clock.getDelta() * 1000;
        this.elapsedTime += this.delta;

        if ( this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight ) {

            this.resize();

        }

        this.mapControls.update();
        this.renderer.render( this.scene, this.camera );

    };

};

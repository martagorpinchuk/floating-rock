import { Clock, Color, Mesh, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


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

    private sizes = {
        width: 0,
        height: 0
    };

    public init () : void {

        // Canvas
        this.canvas = document.querySelector( 'canvas.webglView' ) as HTMLCanvasElement;

        // Scene
        this.scene = new Scene();
        this.scene.background = new Color( '#fff3d1' );

        // Sizes
        this.sizes.width = window.innerWidth,
        this.sizes.height = window.innerHeight;

        // Camera
        this.camera = new PerspectiveCamera( 45, this.sizes.width / this.sizes.height, 0.1, 100 );
        this.camera.position.set( 1, 2, 1 );
        this.scene.add( this.camera );

        // Light
        const light = new PointLight( 0xf6f7e4, 2, 10 );
        light.position.set( 0, 5, 2 );
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

        this.loadRock1();
        this.loadRock2();
        this.loadRock3();

        //

        this.tick();

    };

    public loadRock1 () : void {

        this.loader = new GLTFLoader();
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

        this.loader = new GLTFLoader();
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

        this.loader = new GLTFLoader();
        this.loader.load(

            'resources/models/stone3.gltf',
            ( gltf ) => {

                this.rock3 = gltf.scene.children[0] as Mesh;
                this.rock3.scale.set( 0.03, 0.03, 0.03 );
                this.rock3.rotation.z += Math.PI;
                this.rock3.position.set( 1, 0.5, 0.25 );
                this.scene.add( this.rock3 );

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

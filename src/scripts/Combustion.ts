import { BoxBufferGeometry, Clock, Color, Material, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneBufferGeometry, PointLight, RepeatWrapping, Scene, WebGLRenderer } from "three";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Pane } from "tweakpane";
import { СombustionMaterial } from './shaders/Сombustion.Shader';


export class CombustionGfx {

    public scene: Scene;
    public canvas: HTMLCanvasElement;
    public camera: PerspectiveCamera;
    public cube: Mesh;
    public mapControls: MapControls;
    public renderer: WebGLRenderer;
    public cubeMaterial: СombustionMaterial;
    public cubeGeometry: BoxBufferGeometry;
    public clock: Clock;
    public delta: number = 0;
    public elapsedTime: number = 0;
    public loader: GLTFLoader;
    public potato: Mesh;
    public potatoGeometry: any;
    public potatoMaterial: СombustionMaterial;
    public timeCoef: number = 1;
    public timeStop: Boolean = false;

    public renderScene: boolean;

    private sizes = {
        width: 0,
        height: 0
    };

    constructor () {

        // this.init();

    };

    public init () : void {

        // Canvas
        this.canvas = document.querySelector( 'canvas.webglViewCombustion' ) as HTMLCanvasElement;

        // Scene
        this.scene = new Scene();
        this.scene.background = new Color( '#78614c' );

        // Camera
        this.camera = new PerspectiveCamera( 45, this.sizes.width / this.sizes.height, 0.1, 1000 );
        this.camera.position.set( 0, 10, 10 );
        this.scene.add( this.camera );

        // Controls
        this.mapControls = new MapControls( this.camera, this.canvas );
        this.mapControls.enableDamping = true;

        // Renderer
        this.renderer = new WebGLRenderer( { canvas: this.canvas } );
        this.renderer.setSize( this.sizes.width, this.sizes.height );

        // Plane
        let planeGeometry = new PlaneBufferGeometry( 3000, 3000, 1, 1 );
        let planeMaterial = new MeshBasicMaterial( { color: '#453322' } );
        let plane = new Mesh( planeGeometry, planeMaterial );
        plane.rotation.x -= Math.PI / 2;
        this.scene.add( plane );

        /// Light
        const light = new PointLight( 0xe9f7ec, 1, 500 );
        light.position.set( 1, 3, 5 );
        this.scene.add( light );

        this.clock = new Clock();

        this.potatoLoading();

        if ( this.potato ) {

            this.potato.rotation.z += Math.PI;
            this.potato.position.y = 1.35;

        }

        this.debug();

        //

        this.tick();

    };

    public debug () : void {

        const combustionTwp: any = new Pane( { title: "Combustion", expanded: false } );
        combustionTwp.element.parentElement.style['z-index'] = '20';
        combustionTwp.element.parentElement.style['margin-top'] = '80px';
        combustionTwp.element.parentElement.style['width'] = '330px';

        combustionTwp.addInput( this, 'timeStop', { title: 'Time stop' } ).on( 'change', () => {

            if ( this.timeStop ) {

                this.timeCoef = this.elapsedTime;
                this.potatoMaterial.uniforms.uTime.value = this.timeCoef / 10 / 100;

            } else this.timeCoef = 1;

        } );

    };

    private resize () : any {

        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );

    };

    public potatoLoading () : void {

        // Loading potato_character
        this.loader = new GLTFLoader();
        this.loader.load(

            'resources/models/potato_character/scene.gltf',
            ( gltf ) => {

                this.potato = gltf.scene.children[0] as Mesh;

                this.potato.traverse( ( item ) => {

                    if ( item instanceof Mesh && item.material instanceof Material ) {

                        // @ts-ignore
                        this.potatoMaterial = new СombustionMaterial( { color: 0xffffff } );

                        // @ts-ignore
                        this.potatoMaterial.uniforms.tDiffuse.value = item.material.map;

                        // @ts-ignore
                        item.material = this.potatoMaterial;

                    }

                    this.potato.rotation.z += Math.PI;
                    this.potato.position.y = 1.35;
                    this.scene.add( this.potato );

                } )

            }

        )

    };

    public tick = () => {

        window.requestAnimationFrame( this.tick );

        if( this.renderScene == false ) return;

        if ( this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight ) {

            this.resize();

        }

        //

        if ( this.timeStop ) {

            this.delta = this.clock.getDelta() * 1000;
            this.elapsedTime += this.delta;

        } else {

            this.clock.running = false;

        }
        if ( this.potatoMaterial ) this.potatoMaterial.uniforms.uTime.value = this.elapsedTime / 10 / 1000;

        //

        this.mapControls.update();
        this.renderer.render( this.scene, this.camera );


    };

};

export default new CombustionGfx();
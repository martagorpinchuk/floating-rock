import { AmbientLight, BufferGeometry, Clock, Color, Float32BufferAttribute, Mesh, PerspectiveCamera, PlaneGeometry, Points, Scene, SphereBufferGeometry, Vector3, WebGLRenderer } from "three";
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RedSphereMaterial } from './shaders/sphereShaders/redSphere.Shader';
import { BlueSphereMaterial } from './shaders/sphereShaders/blueSphere.Shader';
import { PointsShaderMaterial } from './shaders/sphereShaders/points.Shader';
import { BackgroundLShaderMaterial } from './shaders/sphereShaders/backgroundL.Shader';
import { BackgroundRShaderMaterial } from './shaders/sphereShaders/backgroundR.Shader';
import { Pane } from "tweakpane";

//

export class SphereGfx {

    public camera: PerspectiveCamera;
    public plane: Mesh;
    public sceneL: Scene;
    public sceneR: Scene;
    public canvas: HTMLCanvasElement;
    public controls: MapControls;
    public renderer: WebGLRenderer;
    public delta: number;
    public elapsedTime: number = 0;
    public clock: Clock;
    public redSphereMaterial: RedSphereMaterial;
    public blueSphereMaterial: BlueSphereMaterial;
    public redSphere: Mesh;
    public blueSphere: Mesh;
    public pointsShaderMaterial: PointsShaderMaterial;
    public points: Points;
    public pointGeometry: BufferGeometry;
    public velocityAttribute: Array<number> = [];
    public numbersOfPoints: number = 1000;
    public backgroundLShaderMaterial: BackgroundLShaderMaterial;
    public backgroundRShaderMaterial: BackgroundRShaderMaterial;
    public planeL: Mesh;
    public planeR: Mesh;

    public renderScene: boolean;

    private previousRenderScene: boolean = this.renderScene;
    private backgroundColorTwp: Pane;

    private sizes = {
        width: 0,
        height: 0
    };

    constructor() {

        console.log('sphere loaded!');

    };

    public init () : void {

        // Canvas
        this.canvas = document.querySelector( 'canvas.webglViewSphere' ) as HTMLCanvasElement;

        // Scene
        this.sceneL = new Scene();
        this.sceneL.background = new Color( '#b3afbd' );

        this.sceneR = new Scene();
        this.sceneR.background = new Color( '#b3afbd' );

        // Sizes
        this.sizes.width = window.innerWidth,
        this.sizes.height = window.innerHeight;

        // Camera
        this.camera = new PerspectiveCamera( 45, this.sizes.width / this.sizes.height, 0.1, 100 );
        this.camera.position.set( 0, 0, 2.1 );
        this.sceneL.add( this.camera );

        const ambientLight = new AmbientLight( 0xffffff, 0.4 );
        this.sceneL.add( ambientLight );

        // Controls
        this.controls = new MapControls( this.camera, this.canvas );
        // this.controls.enableZoom = false;
        this.controls.minDistance = 0.8;
        this.controls.maxDistance = 2.5;

        // Renderer
        this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
        this.renderer.setScissorTest( true );

        // Resize
        window.addEventListener( 'resize', this.resize() );

        this.clock = new Clock();

        //

        this.addRedSphere();
        this.addBlueSphere();
        this.addBackgroundL();
        this.addBackgroundR();
        this.debug();

        //

        this.tick();

    };

    public addRedSphere () : void {

        this.redSphereMaterial = new RedSphereMaterial();
        const sphereGeom = new SphereBufferGeometry( 0.45 );
        this.redSphere = new Mesh( sphereGeom, this.redSphereMaterial );
        this.sceneL.add( this.redSphere );

    };

    public addBlueSphere () : void {

        this.blueSphereMaterial = new BlueSphereMaterial();
        const sphereGeom = new SphereBufferGeometry( 0.4, 5000 );
        this.blueSphere = new Mesh( sphereGeom, this.blueSphereMaterial );

        this.sceneR.add( this.blueSphere );

        const colors = [];
        const sizes: Array<number> = [];
        const positionAttribute: Array<number> = [];

        const color = new Color();

        for ( let i = 0; i < this.numbersOfPoints; i ++ ) {

            color.setHSL( Math.floor(Math.random()*(255 + 1)), Math.floor(Math.random()*(255 + 1)), Math.floor(Math.random()*(255 + 1)) );
            color.toArray( colors, i * 3 );

            sizes[ i ] = 0.04 * Math.random();// + 0.02;

            let x = ( Math.random() - 0.5 ) * 0.2;
            let y = ( Math.random() - 0.5 ) * 0.2;
            let z = ( Math.random() - 0.5 ) * 0.2;

            if ( Math.abs( x ) < 0.1 ) {

                x = ( Math.random() - 0.5 ) * 1.2;

            };

            if ( Math.abs( y ) < 0.1 ) {

                y = ( Math.random() - 0.5 ) * 1.2;

            };

            if ( Math.abs( z ) < 0.1 ) {

                z = ( Math.random() - 0.5 ) * 1.2;

            };

            positionAttribute.push( x, y, z );

            this.velocityAttribute.push( ( Math.random() - 0.5 ) * 10, ( Math.random() - 0.5 ) * 10, ( Math.random() - 0.5 ) * 10 )

        };

        this.pointsShaderMaterial = new PointsShaderMaterial();
        this.pointGeometry = new BufferGeometry();
        this.pointGeometry.setAttribute( 'position', new Float32BufferAttribute( positionAttribute, 3 ) );
        this.pointGeometry.setAttribute( 'velocity',  new Float32BufferAttribute( this.velocityAttribute, 3 ) );
        this.pointGeometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );
        this.pointGeometry.setAttribute( 'size', new Float32BufferAttribute( sizes, 1 ) );

        this.points = new Points( this.pointGeometry, this.pointsShaderMaterial );

		this.sceneR.add( this.points );

    };

    public updatePointsPositions ( elapsedTime: number ) : void {

        for ( let i = 0; i < this.numbersOfPoints; i ++ ) {

            this.points.geometry.attributes.velocity.setXYZ( i, Math.sin( i + elapsedTime / 2700 ) * 0.0006, Math.sin( i + elapsedTime / 2700 ) * 0.0006, Math.cos( elapsedTime / 2700 ) * 0.0006 );

            let x = this.points.geometry.attributes.position.getX( i ) + this.points.geometry.attributes.velocity.getX( i );
            let y = this.points.geometry.attributes.position.getY( i ) + this.points.geometry.attributes.velocity.getY( i );
            let z = this.points.geometry.attributes.position.getZ( i ) + this.points.geometry.attributes.velocity.getZ( i );

            this.points.geometry.attributes.position.setXYZ( i, x, y, z );

        };

        this.points.geometry.attributes.position.needsUpdate = true;
        this.points.geometry.attributes.velocity.needsUpdate = true;

    };

    public addBackgroundL () : void {

        this.backgroundLShaderMaterial = new BackgroundLShaderMaterial();
        let planeGeometry = new PlaneGeometry( 6, 6 );

        this.planeL = new Mesh( planeGeometry, this.backgroundLShaderMaterial );

        this.sceneL.add( this.planeL );

    };

    public addBackgroundR () : void {

        this.backgroundRShaderMaterial = new BackgroundRShaderMaterial();
        let planeGeometry = new PlaneGeometry( 6, 6 );

        this.planeR = new Mesh( planeGeometry, this.backgroundRShaderMaterial );

        this.sceneR.add( this.planeR );

    };

    public debug () : void {

        let props = {

            color: '#0f0017'

        };

        this.backgroundColorTwp = new Pane( { title: 'Background' } );
        this.backgroundColorTwp.element.parentElement.style[ 'width' ] = '330px';
        this.backgroundColorTwp.addInput( props, 'color', { label: 'Right background' } ).on( 'change', () => {

            this.backgroundRShaderMaterial.uniforms.uRedColor.value.setHex( parseInt( props.color.replace( '#', '0x' ) ) );

        } );

        this.backgroundColorTwp.addInput( props, 'color', { label: 'Left background' } ).on( 'change', () => {

            this.backgroundLShaderMaterial.uniforms.uBlackColor.value.setHex( parseInt( props.color.replace( '#', '0x' ) ) );

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

    public tick = () : void => {

        window.requestAnimationFrame( this.tick );

        if ( this.renderScene !== this.previousRenderScene ) {

            this.previousRenderScene = this.renderScene;

            if ( this.backgroundColorTwp ) {

                this.backgroundColorTwp.hidden = !this.renderScene;

            }

        }

        //

        this.delta = this.clock.getDelta() * 1000;
        this.elapsedTime += this.delta;

        if ( this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight ) {

            this.resize();

        };

        if ( this.redSphere ) this.redSphereMaterial.uniforms.uTime.value = this.elapsedTime / 300;

        if ( this.blueSphere ) {

            this.blueSphereMaterial.uniforms.uTime.value = this.elapsedTime / 300;
            this.pointsShaderMaterial.uniforms.uTime.value = this.elapsedTime / 300;

        };

        if ( this.points ) this.updatePointsPositions( this.elapsedTime );

        if ( this.planeL ) this.backgroundLShaderMaterial.uniforms.uTime.value = this.elapsedTime / 300;
        if ( this.planeR ) this.backgroundRShaderMaterial.uniforms.uTime.value = this.elapsedTime / 300;

        let sliderPos = Math.sin( this.elapsedTime * 0.001 ) * 100;

        // this.controls.update();
        this.renderer.setScissor( 0, 0, window.innerWidth / 2 - sliderPos, window.innerHeight );
        this.renderer.render( this.sceneL, this.camera );

        this.renderer.setScissor( window.innerWidth / 2 - sliderPos, 0, window.innerWidth / 2 + sliderPos, window.innerHeight );
        this.renderer.render( this.sceneR, this.camera );

    };

}

export default new SphereGfx();

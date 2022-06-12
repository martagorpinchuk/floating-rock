import { Color, ShaderMaterial, TextureLoader } from "three";

//

export const textureLoader = new TextureLoader();
const particleTexture = textureLoader.load( '/resources/textures/particle.png' );

export class FoamParticle extends ShaderMaterial {

    constructor () {

        super();
        this.transparent = true;

        this.vertexShader = `
        attribute float foamSize;

        uniform float uTime;

        void main () {

            vec4 mvPosition = modelViewMatrix * vec4( vec3( position.x + uTime / 10.0, position.y - 0.026 + uTime / 10.0, position.z + uTime / 10.0 ), 1.0 );

            gl_PointSize = foamSize * 0.006  * ( 300.0 / -mvPosition.z );

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
            uColor: { value: new Color( 0xc5e0fc ) },
            uTime: { value: 0 }

        }

    }

};

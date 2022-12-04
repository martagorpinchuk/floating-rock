import { Color, ShaderMaterial, TextureLoader, Vector3 } from "three";

//
const loader = new TextureLoader();
let noiseTexture = loader.load('/resources/textures/perlinNoise.png');

export class PointsShaderMaterial extends ShaderMaterial {

    constructor ( ) {

        super();

        this.transparent = true,

        this.vertexShader = `
        uniform sampler2D uNoiseTexture;

        attribute float size;
        attribute vec3 customColor;
        attribute vec3 particleColor;

        varying vec3 vColor;
        varying vec3 vParticleColor;

        uniform float uTime;

        void main() {

            vColor = customColor;

            vec4 txtNoise1 = texture2D( uNoiseTexture, uv + uTime * 0.05 );
            vec4 txtNoise2 = texture2D( uNoiseTexture, uv + sin( uTime * 0.05 ) );

            vec4 mvPosition = modelViewMatrix * ( vec4( position, 1.0 ) * 1.0 );// + sin( uTime / 10.0 ) / 20.0 + cos( uTime / 10.0 ) / 20.0, 1.0 );

            gl_PointSize = size * ( 700.0 / -mvPosition.z );

            gl_Position = projectionMatrix * mvPosition;

            vParticleColor = particleColor;

        }
        `,

        this.fragmentShader = `
        uniform vec3 uColor;
        uniform sampler2D uPointTexture;
        uniform float uTime;

        varying vec3 vColor;
        varying vec3 vParticleColor;

        void main() {

            gl_FragColor = vec4( vParticleColor + uColor, 0.5 );
            // gl_FragColor = vec4( color * vec3( abs( sin( uTime ) ) + 0.3 ), 1.0 );

            gl_FragColor = gl_FragColor * texture2D( uPointTexture, gl_PointCoord );

            if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

        }
        `,

        this.uniforms = {

            uColor: { value: new Color( 0x5796fa ) },
            uPointTexture: { value:  new TextureLoader().load( 'resources/textures/point.png' ) },
            uTime: { value: 0 },
            uNoiseTexture: { value: noiseTexture }

        };

    };

};

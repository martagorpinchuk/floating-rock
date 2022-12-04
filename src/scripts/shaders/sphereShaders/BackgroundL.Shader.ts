import { Color, ShaderMaterial, TextureLoader, Vector3 } from "three";

//
const loader = new TextureLoader();

export class BackgroundLShaderMaterial extends ShaderMaterial {

    constructor ( ) {

        super();

        this.transparent = true,

        this.vertexShader = `
        varying vec2 vUv;

        void main() {

            vec3 newPosition = position;
            newPosition.z -= 1.0;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

            vUv = uv;

        }
        `;

        this.fragmentShader= `
        varying vec2 vUv;

        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec3 uBlueColor;
        uniform vec3 uBlackColor;

        void main() {

            vec4 txtNoise1 = texture2D( uTexture, vec2( vUv.x * 1.5 * sin( uTime * 0.05 ), vUv.y + sin( uTime * 0.05 ) * 0.1 ) ) * 0.3;
            vec4 txtNoise2 = texture2D( uTexture, vec2( vUv.x * 1.5, vUv.y - sin( uTime * 0.05 + 3.14 / 2.0 ) * 0.2 ) ) * 0.3;

            gl_FragColor = vec4( vec3( vUv * 1.0, 0.2 ), 1.0 ) + txtNoise1 + txtNoise2;

            // gl_FragColor.rgb = mix( uBlueColor, gl_FragColor.rgb, ( txtNoise1.rgb +  txtNoise2.rgb ) * 0.5 );
            gl_FragColor.rgb = mix( uBlueColor, uBlackColor, ( txtNoise1.rgb +  txtNoise2.rgb ) * 2.0 );

        }
        `;

        this.uniforms = {

            uTexture: { value: loader.load( '/resources/textures/perlinNoise.png' ) },
            uTime: { value: 0 },
            uBlueColor: { value: new Color( 0x2936a6 ) },
            uBlackColor: { value: new Color( 0x000000 ) }

        };

    };

};

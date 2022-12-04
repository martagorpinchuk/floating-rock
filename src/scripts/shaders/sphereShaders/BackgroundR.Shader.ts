import { Color, ShaderMaterial, TextureLoader, Vector3 } from "three";

//
const loader = new TextureLoader();

export class BackgroundRShaderMaterial extends ShaderMaterial {

    constructor ( ) {

        super();

        this.transparent = true,

        this.vertexShader = `
        varying vec2 vUv;

        void main() {

            vec3 newPosition = position;
            newPosition.z -= 1.0;
            newPosition.x += 2.0;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

            vUv = uv;

        }
        `;

        this.fragmentShader= `
        varying vec2 vUv;

        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec3 uRedColor;
        uniform vec3 uBlackColor;

        void main() {

            vec4 txtNoise1 = texture2D( uTexture, vec2( vUv.x * 1.5 * sin( uTime * 0.05 ), vUv.y + sin( uTime * 0.05 ) * 0.1 ) ) * 0.3;
            vec4 txtNoise2 = texture2D( uTexture, vec2( vUv.x * 1.5, vUv.y - sin( uTime * 0.05 + 3.14 / 2.0 ) * 0.2 ) ) * 0.3;

            // txtNoise1 = step( txtNoise1, vec4( 0.1 ) );
            // txtNoise2 = step( txtNoise2, vec4( 0.1 ) );

            gl_FragColor = vec4( vec3( vUv * 1.0, 0.2 ), 1.0 ) + txtNoise1 + txtNoise2;

            // gl_FragColor.rgb = mix( uRedColor, gl_FragColor.rgb, ( txtNoise1.rgb +  txtNoise2.rgb ) * 0.5 );
            gl_FragColor.rgb = mix( uRedColor, uBlackColor, ( txtNoise1.rgb +  txtNoise2.rgb + vec3( vUv, 0.0 ) * 0.0 ) * 2.0 );

        }
        `;

        this.uniforms = {

            uTexture: { value: loader.load( '/resources/textures/perlinNoise.png' ) },
            uTime: { value: 0 },
            uRedColor: { value: new Color( 0xff0019 ) },
            uBlackColor: { value: new Color( 0x000000 ) }

        };

    };

};

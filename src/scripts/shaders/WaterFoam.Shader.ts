import { Color, ShaderMaterial, TextureLoader } from "three";

//

export let noise = new TextureLoader().load('resources/textures/noise.png');

export class WaterFoamMaterial extends ShaderMaterial {

    constructor() {

        super(),

        this.vertexShader = `
        varying vec2 vUv;

        void main () {

            gl_Position = vec4( vec3( position.x, position.y - 0.4, position.z ), 1.0 );

            vUv = uv;

        }
        `,

        this.fragmentShader = `
        uniform sampler2D uNoise;
        uniform vec3 uColor1;
        uniform vec3 uColor2;

        varying vec2 vUv;

        void main () {

            float noise = texture2D( uNoise, vUv ).r;
            float mix = step( -1.0, noise );
            vec3 color = vec3(mix( vec3( 0.2 ), vec3( 0.7 ), noise ));

            // vec3 color = mix( uColor1, uColor2, mix );

            gl_FragColor = vec4( vec3( mix ), 1.0 );

        }
        `,

        this.uniforms = {

            uNoise: { value: noise },
            uColor1: { value: new Color( 0xf5f6ff ) },
            uColor2: { value: new Color( 0xffffff ) }

        }

    }

}

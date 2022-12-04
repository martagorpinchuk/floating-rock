import { Color, ShaderMaterial, TextureLoader, Vector3 } from "three";


//

const loader = new TextureLoader();
let noiseTexture = loader.load('/resources/textures/perlinNoise.png');

export class RedSphereMaterial extends ShaderMaterial {

    constructor ( ) {

        super();

        this.transparent = true;

        this.vertexShader = `
        uniform sampler2D uNoiseTexture;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vFe;

        void main() {

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            vec3 fE = ( mvPosition * modelMatrix * vec4( position, 1.0 ) ).xyz;

            // gl_Position = vec4( position, 1.0 );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

            vUv = uv;
            vNormal = normal;
            vFe = fE;

        }
        `,

        this.fragmentShader = `

        uniform float uTime;
        uniform vec3 uColorRed;
        uniform vec3 uColorDarkRed;
        uniform vec3 uDirection;
        uniform vec3 uLightColor;
        uniform sampler2D uNoiseTexture;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vFe;

        void main() {

            // Diffuse
            vec3 norm = normalize( vNormal );
            float diff = max( dot( norm, uDirection ), 0.0 );
            vec3 diffuse = uLightColor * diff;

            // Specular light
            float shininess = 100.0;
            vec3 H = normalize( uDirection + vFe );
            float specular_intensity = pow( max( dot( norm, uDirection + vFe ), 0.0 ), shininess );
            vec4 specular_color = vec4( uLightColor, 1.0 );
            specular_color = specular_intensity * specular_color;

            vec4 txtNoise1 = texture2D( uNoiseTexture, vec2( vUv.x + sin( uTime * 0.3 ) * 0.05 + cos( uTime * 0.3 ) * 0.05, vUv.y - sin( uTime * 0.34 ) * 0.05 + cos( uTime * 0.3 ) * 0.05 ) );
            vec4 txtNoise2 = texture2D( uNoiseTexture, vec2( vUv.x - sin( uTime * 0.07 ) * 0.05 + cos( uTime * 0.07 ) * 0.05, vUv.y + sin( uTime * 0.077 ) * 0.05 + cos( uTime * 0.07 ) * 0.05 + 0.2 ) );

            gl_FragColor = ( txtNoise1 * 0.7 + txtNoise2 * 0.7 );// + specular_color * 100.4;

            // gl_FragColor.rgb = uColorRed;
            // gl_FragColor.rgb += diffuse * 0.6;

            gl_FragColor.rgb = mix( gl_FragColor.rgb, uColorDarkRed, txtNoise2.rgb * 10.0 );
            gl_FragColor.rgb = mix( gl_FragColor.rgb, uColorRed, txtNoise1.rgb * 1.0 );

            gl_FragColor.rgb = mix(  gl_FragColor.rgb, uLightColor, txtNoise1.rgb ) * 0.9;

        }
        `,

        this.uniforms = {

            uTime: { value: 0.0 },
            uColorRed: { value: new Color( 0xcc0014 ) },
            uColorDarkRed: { value: new Color( 0x731406 ) },
            uDirection: { value: new Vector3( - 0.5, 0.2, 1.7 ) },
            uLightColor: { value: new Color( 0xf7e00a ) },
            uNoiseTexture: { value: noiseTexture }

        }

    }

};

import { Color, ShaderMaterial, TextureLoader } from "three";

//

export let noise = new TextureLoader().load('resources/textures/noise.png');

export class BottomFoamMaterial extends ShaderMaterial {

    constructor() {

        super(),

        this.vertexShader = `
        varying vec2 vUv;

        attribute float brightness;
        attribute vec4 transformRow1;
        attribute vec4 transformRow2;
        attribute vec4 transformRow3;
        attribute vec4 transformRow4;

        void main () {

            mat4 transforms = mat4 (
                transformRow1,
                transformRow2,
                transformRow3,
                transformRow4
            );

            gl_Position = projectionMatrix * modelViewMatrix  * transforms * vec4( vec3( position.x - 0.01, position.y - 0.37, position.z + 0.44 ), 1.0 );

            vUv = uv;

        }`,

        this.fragmentShader = `
        uniform sampler2D uNoise;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uWhiteColor;
        uniform float uTime;

        varying vec2 vUv;

        vec2 hash( in vec2 x )  // replace this by something better
        {
            const vec2 k = vec2( 0.3183099, 0.3678794 );
            x = x*k + k.yx;
            return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
        }


        // return gradient noise (in x) and its derivatives (in yz)
        vec3 noised( in vec2 p )
        {
            vec2 i = floor( p );
            vec2 f = fract( p );

        #if 1
            // quintic interpolation
            vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);
            vec2 du = 30.0*f*f*(f*(f-2.0)+1.0);
        #else
            // cubic interpolation
            vec2 u = f*f*(3.0-2.0*f);
            vec2 du = 6.0*f*(1.0-f);
        #endif

            vec2 ga = hash( i + vec2(0.0,0.0) );
            vec2 gb = hash( i + vec2(1.0,0.0) );
            vec2 gc = hash( i + vec2(0.0,1.0) );
            vec2 gd = hash( i + vec2(1.0,1.0) );

            float va = dot( ga, f - vec2(0.0,0.0) );
            float vb = dot( gb, f - vec2(1.0,0.0) );
            float vc = dot( gc, f - vec2(0.0,1.0) );
            float vd = dot( gd, f - vec2(1.0,1.0) );

            return vec3( va + u.x*(vb-va) + u.y*(vc-va) + u.x*u.y*(va-vb-vc+vd),   // value
                        ga + u.x*(gb-ga) + u.y*(gc-ga) + u.x*u.y*(ga-gb-gc+gd) +  // derivatives
                        du * (u.yx*(va-vb-vc+vd) + vec2(vb,vc) - va));
        }

        void main () {

            vec2 centeredUv = ( vUv - 0.5 ) * 2.0;
            float distanceToCenter = length( centeredUv );

            vec3 noise = noised( vec2( vUv.x * 10.0 + sin( uTime * 5.0 ) * 0.15, vUv.y * 5.0 - uTime * 5.0 ) );
            vec3 col = 0.055 + 8.99 * vec3( noise.x, noise.x, noise.x );
            col = mix( uColor2, uColor1, noise.x );

            float yGradient = clamp( 0.65 - vUv.y, abs( vUv.x - 0.5 ) * 0.4, 1.0 ) * 0.15;

            if ( 3.4 * distanceToCenter * abs( centeredUv.y * 1.45 + 0.2 ) > 0.7 + noise.x ) { discard; };

            gl_FragColor.rgb = mix( col,  uWhiteColor, noise.x * 5.0 ) + vec3( yGradient );
            gl_FragColor.a = 1.0;

        }`,

        this.uniforms = {

            uNoise: { value: noise },
            uColor1: { value: new Color( 0x09a0e0 ) },  // dark
            uColor2: { value: new Color( 0xd7e8fa ) },   // light
            uWhiteColor: { value: new Color( 0xffffff ) },  // white
            uTime: { value: 0 }

        }

    }

}

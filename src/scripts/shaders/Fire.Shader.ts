import { Color, ShaderMaterial, TextureLoader } from "three";

//
export let noise = new TextureLoader().load( 'resources/textures/noise.png' );

export class FlameMaterial extends ShaderMaterial{

    constructor() {

        super();

        this.vertexShader = `
        varying vec2 vUv;

        void main() {

            gl_Position = projectionMatrix * ( modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0) + vec4( position, 1.0 ) );

            vUv = uv;

        }
        `,

        this.fragmentShader = `
        uniform sampler2D uNoise;
        uniform float uTime;
        uniform vec3 uInnerColor;
        uniform vec3 uOuterColor;

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

        void main() {

            float yGradient = clamp( 0.9 - vUv.y, 0.0, 1.0 ) * 1.2;

            vec3 noise = noised( vec2( 9.0 * vUv.x, 6.4 * vUv.y - uTime * 4.0 ) ) * 0.8;

            vec3 col = 0.55 + 0.99 * vec3( noise.x, noise.x, noise.x );

            vec2 centeredUv = vec2( vUv.x - 0.3, vUv.y + 0.1 );
            float distanceToCenter = length( centeredUv );
            float strength = step( distance( vec2( vUv.x, vUv.y + 0.1 ), vec2(2.5) ), 0.4 );

            if ( 8.0 * distanceToCenter * max( abs( vUv.x - 0.5 ) * 2.0, 0.1 ) * max( vUv.y, 0.24 ) > 0.5 + ( noise.x / 1.5 + noise.y / 4.0 ) ) { discard; }

            gl_FragColor = vec4( vec3(yGradient) + col + uInnerColor, 1.0 );
            gl_FragColor.rgb = mix( gl_FragColor.rgb, uOuterColor, 0.7 );

        }
        `,

        this.uniforms = {

            uTime: { value: 0 },
            uNoise: { value: noise },
            uInnerColor: { value: new Color( 0xfff30f ) },
            uOuterColor: { value: new Color( 0xfc4e03 ) }

        }

    }

};
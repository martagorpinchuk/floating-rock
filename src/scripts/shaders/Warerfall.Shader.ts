import { Color, ShaderMaterial } from "three"

//

export class WaterfallMaterial extends ShaderMaterial {

    constructor() {

        super(),

        this.vertexShader = `
        varying vec2  vUv;
        varying float vBrightness;

        attribute float brightness;

        void main () {

            gl_Position = vec4( vec3( position.x, position.y - 0.67, position.z + 0.50 ), 1.0 );

            vUv = uv;
            vBrightness = brightness;;

        }`,

        this.fragmentShader = `
        varying vec2 vUv;
        varying float vBrightness;

        uniform float uTime;
        uniform vec3 uLightColor;
        uniform vec3 uDarkColor;
        uniform vec3 uWhiteColor;
        uniform vec3 uFoamColor;

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

            vec3 noise = noised( vec2( vUv.x * 15.0 + sin( uTime * 5.0 ) * 0.15, vUv.y * 5.0 + uTime * 5.0 - 0.2 ) );

            vec2 centeredUv = vec2( ( vUv.x - 0.5 ) * 14.0, ( vUv.y - 4.0 ) * 2.0 );
            float distanceToCenter = length( centeredUv );

            vec2 centeredUvWhite = vec2( ( vUv.x - 0.5 ) * 10.0, ( vUv.y - 0.8 ) * 2.0 );
            float distanceToCenterWhite = length( centeredUvWhite );

            vec2 centeredUvFoam = vec2( ( vUv.x - 0.5 ), ( vUv.y - 1.0 ) );
            float distanceToCenterFoam = length( centeredUvFoam );

            vec3 col = 0.055 + 8.99 * vec3( noise.x, noise.x, noise.x );
            col = step( 0.1, 0.2 + col );
            float mix1 = step( 0.1 + ( sin( uTime * vBrightness ) ) * 0.0007, ( distanceToCenterWhite - 0.5 ) * noise.y * 0.09 );
            vec3 whiteCol = mix( col, uWhiteColor, mix1 );

            //

            gl_FragColor = vec4( col, 1.0 );

            if ( distanceToCenter * abs( ( vUv.x - 0.5 ) * 25.0 ) * abs( ( vUv.y - 1.55 ) * 2.0 ) > 0.5f + abs( ( noise.x + 0.8 ) * 194.7 ) ) { discard; };

            gl_FragColor.rgb = mix( gl_FragColor.rgb, uLightColor + abs( sin( uTime * 10.0 ) ) * vUv.y * vBrightness,  0.4 );
            gl_FragColor.rgb = mix( gl_FragColor.rgb, uDarkColor, 0.75 );
            gl_FragColor.rgb += mix( uDarkColor, whiteCol, mix1 );

        }`,

        this.uniforms = {

            uTime: { value: 0 },
            uLightColor: { value: new Color( 0xc0fafa ) },
            uDarkColor: { value: new Color( 0x3250a8 ) },
            uWhiteColor: { value: new Color( 0xffffff ) },
            uFoamColor: { value: new Color( 0xf5f6ff ) },
            uRandom: { value: Math.random() }
        }

    }

};

import * as THREE from "three";
 
const grassVertexShader = `
    attribute float aRandom;   // random phase offset per blade [0..1]

    uniform float uTime;
    uniform float uWindStrength;
    uniform float uWindFrequency;

    varying float vHeight;
    varying vec3  vNormal;

    void main() {
    vHeight = position.y;   // 0 at base → bladeHeight at tip

    // ── Place vertex in world space via instance matrix ───────────────────
    vec4 worldPos = instanceMatrix * vec4(position, 1.0);

    // ── Wind sway (only bends vertices above the base) ────────────────────
    float windAngle = (worldPos.x * uWindFrequency + worldPos.z * uWindFrequency * 0.7)
                    + uTime * 2.5
                    + aRandom * 6.28318;

    float bend = pow(vHeight, 1.8);                          // more at tip
    worldPos.x += sin(windAngle)        * uWindStrength * bend;
    worldPos.z += cos(windAngle * 0.8)  * uWindStrength * 0.4 * bend;

    vNormal     = normalize(mat3(instanceMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
`;
 
const grassFragmentShader = `
    varying float vHeight;
    varying vec3  vNormal;

    uniform float uMaxHeight;

    void main() {
    float t = clamp(vHeight / uMaxHeight, 0.0, 1.0);

    vec3 baseColor = vec3(0.05, 0.25, 0.05);   // dark green root
    vec3 tipColor  = vec3(0.25, 0.90, 0.15);   // bright lime tip

    vec3 color = mix(baseColor, tipColor, pow(t, 0.8));

    // Simple diffuse shading
    vec3 lightDir = normalize(vec3(0.4, 1.0, 0.3));
    float diff    = max(dot(vNormal, lightDir), 0.15);
    color *= diff;

    gl_FragColor = vec4(color, 1.0);
    }
`;
 
export interface GrassOptions {
  count?: number;
  patchSize?: number;
  bladeHeight?: number;
  bladeWidth?: number;
  windStrength?: number;
  windFrequency?: number;
}
 
export default class Grass {
    private _mesh: THREE.InstancedMesh;
    private _material: THREE.ShaderMaterial;

    constructor(opts: GrassOptions = {}) {
    const {
        count         = 8000,
        patchSize     = 0.1,
        bladeHeight   = 0.03,
        bladeWidth    = 0.004,
        windStrength  = 0.012,
        windFrequency = 10.9,
    } = opts;

    // ── Single-triangle blade geometry ────────────────────────────────────
    //
    //        (0, bladeHeight, 0)   ← tip
    //              /\
    //             /  \
    //  (-w, 0, 0)────(w, 0, 0)    ← base
    //
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([
        - bladeWidth,        0,           0,
          bladeWidth,        0,           0,
              0,        bladeHeight,      0,
    ]), 3));

    geometry.setAttribute("normal", new THREE.BufferAttribute(new Float32Array([
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
    ]), 3));

    geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([
        0,   0,
        1,   0,
        0.5, 1,
    ]), 2));

    const aRandom = new Float32Array(count);
    for (let i = 0; i < count; i++) aRandom[i] = Math.random();
    geometry.setAttribute("aRandom", new THREE.InstancedBufferAttribute(aRandom, 1));

    this._material = new THREE.ShaderMaterial({
        vertexShader:   grassVertexShader,
        fragmentShader: grassFragmentShader,
        uniforms: {
        uTime:          { value: 0 },
        uWindStrength:  { value: windStrength },
        uWindFrequency: { value: windFrequency },
        uMaxHeight:     { value: bladeHeight },
        },
        side: THREE.DoubleSide,
    });

    this._mesh = new THREE.InstancedMesh(geometry, this._material, count);
    this._mesh.frustumCulled = false;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
        dummy.position.set(
        (Math.random() - 0.5) * patchSize,
        0,
        (Math.random() - 0.5) * patchSize,
        );
        dummy.rotation.y = Math.random() * Math.PI * 2;

        const s = 0.8 + Math.random() * 0.4; 
        dummy.scale.set(s, s, s);

        dummy.updateMatrix();
        this._mesh.setMatrixAt(i, dummy.matrix);
    }

    this._mesh.instanceMatrix.needsUpdate = true;
    }

    public mesh(): THREE.InstancedMesh {
        return this._mesh;
    }

    public update(delta: number): void {
        (this._material.uniforms.uTime.value as number) += delta;
    }

    public dispose(): void {
        this._mesh.geometry.dispose();
        this._material.dispose();
    }
}
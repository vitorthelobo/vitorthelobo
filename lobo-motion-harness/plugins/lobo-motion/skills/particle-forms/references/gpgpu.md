# Simulação na GPU · particle-forms

Duas estratégias. Use a **stateless** até 300k pontos quando o movimento é «respirar em volta da forma» (o caso do Particle Forms); use **ping-pong** quando a partícula precisa de memória (kick de clique que decai, tornado que acumula, swarm).

## 1. Stateless no vertex shader (o template usa esta)

Posição = base + curl(base, t) · flow + repulsão do ponteiro. Sem textura, sem render target, 200k pontos em um draw call.

```glsl
uniform float uTime, uFlow, uFlowScale, uSize, uPixelScale, uPointer, uPointerRadius;
uniform vec3 uPointerPos;
attribute vec3 aBase; attribute float aRandom;
varying float vMix;
void main(){
  vec3 c = curlNoise(aBase * uFlowScale + uTime * 0.12); c = normalize(c + 1e-5) * min(length(c), 1.0);   // limite o curl a 1 ou a forma se dissolve
  vec3 p = aBase + c * uFlow * 0.25 * (0.6 + 0.4 * aRandom);
  vec3 d = p - uPointerPos; float l = length(d);
  p += normalize(d + 1e-4) * uPointer * smoothstep(uPointerRadius, 0.0, l);     // repulsão suave
  vMix = clamp(length(p - aBase) * 2.5, 0.0, 1.0);                                // cor pela velocidade aparente
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * uPixelScale * (0.6 + 0.4 * aRandom) * (300.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
```
Fragment: disco suave com `smoothstep(0.5, 0.1, length(gl_PointCoord - 0.5))`, cor `mix(uColorA, uColorB, vMix)`, blending aditivo, `depthWrite: false`. Pontos com alpha zero → `gl_Position = vec4(2.0, 2.0, 2.0, 1.0)`.

## 2. Ping-pong (memória por partícula)

Duas texturas RGBA float (posição, velocidade) de `sqrt(N)` por lado. Por frame: simular (lê A, escreve B), trocar, render lê B pelo índice da partícula.

```js
import { GPUComputationRenderer } from "three/addons/misc/GPUComputationRenderer.js";
const side = Math.ceil(Math.sqrt(count));
const gpu = new GPUComputationRenderer(side, side, renderer);
const pos0 = gpu.createTexture(), vel0 = gpu.createTexture();   // preencha pos0.image.data com shape(), vel0 com zeros
const posVar = gpu.addVariable("tPos", POS_FRAG, pos0), velVar = gpu.addVariable("tVel", VEL_FRAG, vel0);
gpu.setVariableDependencies(posVar, [posVar, velVar]); gpu.setVariableDependencies(velVar, [posVar, velVar]);
velVar.material.uniforms.uDt = { value: 0 }; /* uFlow, uSpring, uPointerPos, uKick ... */
const err = gpu.init(); if (err) throw err;
// por frame
velVar.material.uniforms.uDt.value = dt; gpu.compute();
points.material.uniforms.tPos.value = gpu.getCurrentRenderTarget(posVar).texture;
```

Shader de velocidade (o coração do efeito):
```glsl
uniform float uDt, uFlow, uSpring, uDamping, uPointer, uKick, uTime; uniform vec3 uPointerPos; uniform sampler2D tTarget;
void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 pos = texture2D(tPos, uv).xyz, vel = texture2D(tVel, uv).xyz, target = texture2D(tTarget, uv).xyz;
  vel += curlNoise(pos * 1.6 + uTime * 0.1) * uFlow * uDt;
  vel += (target - pos) * uSpring * uDt * 60.0;
  vec3 d = pos - uPointerPos; float l = length(d);
  vel += normalize(d + 1e-4) * (uPointer * smoothstep(1.2, 0.0, l) + uKick * smoothstep(2.0, 0.0, l)) * uDt * 60.0;
  vel *= pow(uDamping, uDt * 60.0);
  gl_FragColor = vec4(vel, 1.0);
}
```
Posição: `pos += vel * uDt; gl_FragColor = vec4(pos, 1.0);`. Kick de clique: `uKick = 3.0` no clique, decai com `uKick *= pow(0.02, dt)` no JS. Troca de forma com transição: `tTarget` recebe a forma nova; a mola leva as partículas até lá.

## Ponteiro

Nunca raycast na malha. Plano z = 0 (ou o plano da câmera): `raycaster.ray.intersectPlane(plane, out)`. Só ative depois do primeiro `pointermove`; um cursor parado resolve pra (0,0) e abre um buraco no centro. Em touch, não registre o listener.

## Bloom como knobs de designer

| Knob do painel | Uniform / parâmetro |
| --- | --- |
| Glow | `UnrealBloomPass.strength` |
| Glow spread | `UnrealBloomPass.radius` |
| Glow cut-off | `UnrealBloomPass.threshold` |

Phone: strength / 2, radius / 2. Pule o pass quando `strength < 0.001`, mas rode-o uma vez no primeiro frame (compilação). Clampe o DPR do composer junto com o do renderer.

## Tiers (lidos uma vez, refeitos na mudança de largura)

| | desktop | tablet | phone |
| --- | --- | --- | --- |
| count | CONFIG.count | × 0.6 | × 0.33 |
| DPR | ≤ 1.5 | ≤ 1.5 | 1 a 1.25 |
| bloom | cheio | cheio | metade |
| pointer | sim | não | não |
| MSAA | não (pontos suaves) | não | não |

Aloque o buffer do tier maior na construção e varie com `geometry.setDrawRange(0, count)`; nunca recrie buffers no resize.

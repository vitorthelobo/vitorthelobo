# Geradores de forma · particle-forms

Toda forma é `shape(name, N, seed) → Float32Array(N * 3)`. Seed determina a variação: dois CONFIGs iguais dão a mesma nuvem. Nada aqui carrega modelo 3D; 26 formas cabem em poucos kb porque são fórmulas.

## Random com seed (mulberry32)

```js
export function rng(seed) {
  let a = seed >>> 0;
  return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const gauss = (r) => { const u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.28318 * v); };
```

## Superfícies paramétricas

```js
// nó tórico (p, q): a forma mais reconhecível; tube espalha a seção
export function torusKnot(N, seed, { p = 2, q = 3, R = 0.78, r = 0.33, tube = 0.07 } = {}) {
  const r0 = rng(seed), out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const t = r0() * Math.PI * 2, s = r0() * Math.PI * 2, k = tube * Math.sqrt(r0());
    const cx = (R + r * Math.cos(q * t)) * Math.cos(p * t), cy = (R + r * Math.cos(q * t)) * Math.sin(p * t), cz = r * Math.sin(q * t);
    out.set([cx + k * Math.cos(s), cy + k * Math.sin(s), cz + k * Math.sin(s) * 0.7], i * 3);
  }
  return out;
}

// fibração de Hopf: fibras (círculos) de S3 projetadas em R3; rings controla quantos toros aninhados
export function hopf(N, seed, { rings = 7, scale = 0.55 } = {}) {
  const r0 = rng(seed), out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const ring = Math.floor(r0() * rings), eta = ((ring + 0.5) / rings) * (Math.PI / 2) * 0.92 + 0.04;
    const xi1 = r0() * Math.PI * 2, xi2 = r0() * Math.PI * 2;
    const x1 = Math.cos(eta) * Math.cos(xi1), x2 = Math.cos(eta) * Math.sin(xi1), x3 = Math.sin(eta) * Math.cos(xi2), x4 = Math.sin(eta) * Math.sin(xi2);
    const d = 1 / (1.05 - x4 * 0.6);   // projeção estereográfica amortecida: raio máximo ~1.2, nada vai pro infinito
    out.set([x1 * d * scale, x2 * d * scale, x3 * d * scale], i * 3);
  }
  return out;
}

// lótus: pétalas de uma rosácea levantadas em z
export function lotus(N, seed, { petals = 6, lift = 0.6 } = {}) {
  const r0 = rng(seed), out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const a = r0() * Math.PI * 2, u = Math.sqrt(r0());
    const rad = Math.abs(Math.cos(petals * a * 0.5)) * 1.2 * u + 0.05;
    out.set([rad * Math.cos(a), rad * Math.sin(a), lift * u * u * (0.5 + 0.5 * Math.cos(petals * a)) - 0.2], i * 3);
  }
  return out;
}

// galáxia: braços em espiral logarítmica com dispersão gaussiana e bojo
export function galaxy(N, seed, { arms = 3, twist = 2.4, spread = 0.12, bulge = 0.15 } = {}) {
  const r0 = rng(seed), out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    if (r0() < bulge) { const g = gauss(r0) * 0.12, a = r0() * Math.PI * 2, e = gauss(r0) * 0.08; out.set([g * Math.cos(a), g * Math.sin(a), e], i * 3); continue; }
    const arm = Math.floor(r0() * arms), d = Math.pow(r0(), 0.7) * 1.4;
    const a = (arm / arms) * Math.PI * 2 + d * twist + gauss(r0) * spread * (0.3 + d);
    out.set([d * Math.cos(a) + gauss(r0) * 0.03, d * Math.sin(a) + gauss(r0) * 0.03, gauss(r0) * 0.03 / (0.3 + d)], i * 3);
  }
  return out;
}

export function sphereShell(N, seed, { R = 1, thickness = 0.1 } = {}) {
  const r0 = rng(seed), out = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const z = r0() * 2 - 1, a = r0() * Math.PI * 2, rr = Math.sqrt(1 - z * z), k = R + (r0() - 0.5) * thickness;
    out.set([rr * Math.cos(a) * k, rr * Math.sin(a) * k, z * k], i * 3);
  }
  return out;
}
```

## Atratores estranhos

Integre a ODE a partir de um ponto perto do atrator, descarte os primeiros passos (burn-in) e guarde um ponto a cada `stride` passos. Várias trajetórias com seeds diferentes evitam a «linha única». Escale pro raio ~1.

```js
function integrate(N, seed, f, { dt, scale, burn = 2000, stride = 2, trails = 24, start }) {
  const r0 = rng(seed), out = new Float32Array(N * 3), per = Math.ceil(N / trails);
  let k = 0;
  for (let t = 0; t < trails && k < N; t++) {
    let [x, y, z] = start(r0);
    for (let i = 0; i < burn; i++) [x, y, z] = f(x, y, z, dt);
    for (let i = 0; i < per && k < N; i++) {
      for (let s = 0; s < stride; s++) [x, y, z] = f(x, y, z, dt);
      out.set([x * scale[0], y * scale[1], z * scale[2]], k * 3); k++;
    }
  }
  return out;
}
const step = (fx, fy, fz) => (x, y, z, dt) => [x + fx(x, y, z) * dt, y + fy(x, y, z) * dt, z + fz(x, y, z) * dt];

export const lorenz = (N, seed) => integrate(N, seed,
  step((x, y) => 10 * (y - x), (x, y, z) => x * (28 - z) - y, (x, y, z) => x * y - (8 / 3) * z),
  { dt: 0.004, scale: [0.045, 0.045, 0.04], start: (r) => [r() * 2 - 1, r() * 2 - 1, 20 + r() * 10] }).map((v, i) => i % 3 === 2 ? v - 1.0 : v);

export const aizawa = (N, seed) => integrate(N, seed,
  step((x, y, z) => (z - 0.7) * x - 3.5 * y, (x, y, z) => 3.5 * x + (z - 0.7) * y,
       (x, y, z) => 0.6 + 0.95 * z - (z * z * z) / 3 - (x * x + y * y) * (1 + 0.25 * z) + 0.1 * z * x * x * x),
  { dt: 0.01, scale: [0.6, 0.6, 0.6], start: (r) => [0.1 + r() * 0.1, r() * 0.1, r() * 0.1] });

export const thomas = (N, seed) => integrate(N, seed,
  step((x, y) => Math.sin(y) - 0.208186 * x, (x, y, z) => Math.sin(z) - 0.208186 * y, (x, y, z) => Math.sin(x) - 0.208186 * z),
  { dt: 0.05, scale: [0.25, 0.25, 0.25], start: (r) => [r() * 2 - 1, r() * 2 - 1, r() * 2 - 1] });
```

## De malha (quando o cliente manda um GLB)

Amostre triângulos por área: peso = área do triângulo, ponto = `a + u(b - a) + v(c - a)` com `u + v <= 1`. Antes, strip o modelo pra POSITION + índices (gltf-transform): 4,67 MB → 61 KB num caso medido pela Textura. Faça a amostragem num Worker acima de 100k pontos.

## Geradores diretos do template (segunda leva)
Todos são `(N, seed) => Float32Array(N*3)`, stateless, cabendo em raio ~1.4 (câmera z 3.8). Jitter gaussiano pequeno (`gauss(r0) * j`) evita moiré sem destruir a silhueta. Lição da calibração: forma fina (hélice, anel, linha de campo) pede `flow` ≤ 0.15, senão o curl noise dissolve a silhueta; onde muitos pontos convergem (ponta do cone, polos), suba `glowCutoff` pra 0.35–0.4 ou rarefaça com `pow`.

| shape | Construção | Parâmetros fixos no gerador |
| --- | --- | --- |
| membrane | folha 2.7×1.7 com z = soma de dois senos (baixa + alta frequência) | amplitude 0.22 + 0.08 |
| coral | 36 ramos radiais, t com `pow(r,0.8)` concentra na base, ondula com seno; jitter maior na base | base 0.35, altura 1.8 |
| neuron | 22 % no soma (esfera r 0.26, `cbrt` para volume) + 14 dendritos com ondulação e bifurcação após t 0.6 | D 14 |
| tornado | hélice cônica: t = r^0.6 (rarefaz a ponta), raio 0.1 + t², 22 rad de giro ao longo de y | altura 1.9 |
| gyroscope | 3 anéis ortogonais R 1 + 1 anel interno inclinado R 0.55, tubo 0.045 | 4 anéis |
| wormhole | hiperboloide com eixo y: r = 0.22 + 0.5·u², ângulo torcido por u·2.2, inclinado 0.55 rad em x pra mostrar a garganta | u ±1.5 (×0.85) |
| ribbon | banda de largura 0.5 torcida 4π ao longo de x, com onda em y | comprimento 2.6 |
| vortex | funil de 3 braços (jitter 0.7 rad), torção 1.6/r + 2.5·r, boca pra cima e inclinado −0.95 rad em x | raio até 1.28 |
| cosmicWave | 11 linhas horizontais com z senoidal defasado por linha | passo 0.16 |
| magnetosphere | linhas de campo dipolar r = L·sin²θ, 40 linhas em 10 valores de L, θ em 0.42..π−0.42 pra não estourar os polos | L 0.35..1.35 |

## Geradores diretos do template (terceira leva: volumes, curvas, objetos)
| shape | Construção | Nota |
| --- | --- | --- |
| volume | caixa uniforme `volumeX × volumeY × volumeZ` | o palco de neve, chuva, areia, fumaça; `fall`/`rise` dão a volta em y ±1.3 |
| scatter | esfera uniforme r 1.35 (`cbrt`) | vagalumes, pólen, confete |
| disc | disco plano r 1.35 (`sqrt`) | glitter, campo de cruzes |
| ring | anel r 0.95 ± 0.4 com densidade no centro | asteroides |
| cylinder | casca cilíndrica r 0.85, altura 2.2 | hologram |
| lattice | grade 9³ com jitter 0.012 | pixel, matrix |
| phyllotaxis | 2200 sementes em ângulo áureo, leve cúpula | flor, girassol |
| helixDna | dupla hélice r 0.45 (70 %) + degraus (30 %) | DNA |
| mobius | fita de Möbius R 1, largura 0.7 | laço |
| atom | núcleo r 0.22 + 3 órbitas elípticas a 60° | átomo |
| saturn | esfera r 0.62 + anel 0.85..1.4 com divisão de Cassini | planeta |
| fountain | arcos parabólicos (v 0.55..1, g 2.6) | spray; `jitter` dá vida |
| lissajous | curva (3, 2, 5) com jitter | corda luminosa; `index` colore ao longo |
| heart | cardioide paramétrica preenchida (`pow(r,0.35)`) | coração; `pulse` |
| superformula | Gielis 3D, m = 6 + seed % 5 | flores geométricas; mude a seed pra mudar os lóbulos |
| jellyfish | cúpula (45 %) + 14 tentáculos ondulados | medusa; `pulse` |
| glyph | amostra os pixels de `text` renderizado num canvas 512×160 (passo 2) | logo/palavra; qualquer fonte do sistema |

## Catálogo de nomes (como o GetLayers nomeia)
Membrane, Coral, Nebula, Neuron, Galaxy, Torus knot, Attractor, Magnetosphere, Tornado, Lotus, Gyroscope, Hopf fibration, Wormhole, Fur, Synapse, Bud, Silk, Cosmic wave, Portal, Iris, Cosmic web, Smoke, Ribbon, Tree, Horizon, Vortex. Cada um é uma das famílias acima com parâmetros diferentes; «New variation» é só outra seed.

---
name: particle-forms
description: Constrói ou afina uma cena de campo de partículas na GPU (geometria espalhada em 50k a 300k pontos com flow, ruído e resposta ao ponteiro) em three.js. Cobre geradores de forma com seed (torus knot, Hopf, lotus, galaxy, atratores Lorenz, Aizawa, Thomas, malha), simulação stateless por curl noise no vertex shader ou GPGPU ping-pong quando a partícula precisa de memória, bloom como glow, glow spread e glow cut-off, tiers por dispositivo, estado na URL e as três exportações (PNG, HTML standalone, build prompt). Use quando o usuário disser "particle field", "point cloud hero", "nuvem de partículas", "galáxia, nebulosa ou torus knot de partículas", "partículas que reagem ao mouse", ou pedir pra ajustar glow, count, size, speed ou forma de uma cena existente.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Particle Forms

Leia `references/shapes.md`, `references/gpgpu.md` e `vault/effect-catalog.md` antes de escrever código. `templates/standalone.html` é a implementação de referência (three.js por import map, stateless). Parta dele ou de um preset próximo; nunca de um shader em branco.

## 0. Intake
- Brief nos cinco eixos; density aqui mapeia pra `count` (0.2 ≈ 60k, 0.6 ≈ 180k, 1 ≈ 300k) e motionEnergy pra `flow` e `speed`.
- Referências visuais: 1 a 3 imagens ou um preset. Pergunte qual **forma** o brief evoca (ver tabela em shapes.md) e qual par de cores.
- Alvo: `standalone`, `r3f` (React Three Fiber) ou `vanilla`. Desconhecido, pergunte.
- Memória? Se a partícula precisa lembrar (kick que decai, tornado que acumula, swarm, transição entre formas), é GPGPU. Se é «respirar em volta da forma», stateless.

## 0.5 Tipo de partícula (antes da forma)
Um preset é forma × sprite × movimento × cor × blend. Decida nesta ordem: o que cai/sobe/gira (`motion`), se é luz ou matéria (`blend` add/normal), o glifo (`sprite`), de onde vem a cor (`colorMode`), e só então a forma. Tabelas em `references/config-schema.md`; os 44 presets do template cobrem as combinações mais pedidas (neve, chuva, brasas, vagalumes, confete, glitter, DNA, átomo, saturno, texto).

## 1. CONFIG primeiro
Chaves do template, todas obrigatórias (ranges em `references/config-schema.md`): `shape`, `seed`, `count`, `size`, `speed`, `flow`, `flowScale`, `pointer`, `pointerRadius`, `colorA`, `colorB`, `glow`, `glowSpread`, `glowCutoff`, `autoRotate`, `rotateSpeed`, `dprMax`. Variante GPGPU adiciona `spring`, `damping`, `kick`. Nenhuma cor, contagem ou intensidade literal fora do objeto.

## 2. Forma
`SHAPES[name](N, seed)` devolve `Float32Array(N * 3)` no raio ~1. Para forma nova, siga shapes.md: paramétrica com hash semeado, ou atrator integrado com burn-in e trilhas. Acima de 100k pontos, gere num Worker e transfira o buffer. Malha do cliente: strip pra POSITION + índices e amostre por área.

## 3. Simulação
- Stateless (template): `p = base + curl(base * flowScale + t) * flow`; ponteiro como repulsão suave por `smoothstep(radius, 0, dist)`; cor por `length(curl)` e `push`.
- GPGPU: siga gpgpu.md (duas texturas, `GPUComputationRenderer`, mola pro alvo, kick com decaimento no JS).
- Ponteiro: raycast no plano z = 0, nunca na malha; em espaço local do objeto (`worldToLocal`) se ele gira; só depois do primeiro movimento; listener nenhum no tier phone.

## 4. Render
`THREE.Points`, `AdditiveBlending`, `depthWrite: false`, `frustumCulled: false`. `gl_PointSize` multiplicado por `uPixelScale = dpr`. Bloom por `UnrealBloomPass` com strength = glow, radius = glowSpread, threshold = glowCutoff; phone pela metade; `enabled = strength > 0.001`; **rode o composer uma vez na construção** pra compilar tudo antes do primeiro frame visível. `renderer.debug.checkShaderErrors = false` em produção.

## 5. Tiers
| | desktop | tablet | phone |
| --- | --- | --- | --- |
| count | × 1 | × 0.6 | × 0.33 |
| DPR | ≤ 1.5 | ≤ 1.5 | ≤ 1.25 |
| bloom | cheio | cheio | metade |
| pointer | sim | não | não |

Buffer alocado no `count` do CONFIG; o tier só muda `setDrawRange`. Releia o tier na mudança de largura; nunca recrie buffers no resize.

## 6. Verifique
Mesmas sondas da skill `shader-background` mais: `renderer.info.programs.length` estável depois do primeiro frame (o template expõe em `__lobo.stats.links`); screenshot de 3 s comparada com a referência em densidade, paleta e silhueta da forma. Em phone, a silhueta precisa continuar legível com 1/3 dos pontos: se sumiu, aumente `size` no tier, não a contagem.

## 7. Exporte e registre
PNG, HTML standalone com CONFIG inline, componente quando o alvo pede, build prompt pela skill `build-prompt` (inclua o gerador de forma no prompt, ele é parte da receita), entrada no catálogo pela skill `catalog-entry`.

## Erros comuns
- `intersectObject` na nuvem a cada `pointermove`: 1 a 3% de frames dropados sozinho. Plano analítico.
- Ponteiro em espaço de mundo com o objeto girando: a repulsão «escorrega». Converta pra local.
- Curl noise avaliado no fragment: 18 `snoise` por pixel. É por vértice, ou na textura de velocidade.
- Cap de 30 fps no celular pra «economizar»: parece 20 fps. Corte DPR e contagem.

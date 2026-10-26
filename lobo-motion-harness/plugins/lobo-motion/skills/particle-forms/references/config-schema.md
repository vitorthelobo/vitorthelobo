# CONFIG schema · particle-forms (template stateless)

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | string | nome no catálogo | nebula-drift | rótulo |
| shape | enum | 35 geradores (shapes.md): torusKnot, hopf, lotus, galaxy, sphere, lorenz, aizawa, thomas, membrane, coral, neuron, tornado, gyroscope, wormhole, ribbon, vortex, cosmicWave, magnetosphere, volume, scatter, disc, ring, cylinder, lattice, phyllotaxis, helixDna, mobius, atom, saturn, fountain, lissajous, heart, superformula, jellyfish, glyph | hopf | distribuição espacial |
| sprite | enum | disc, dot, ring, square, diamond, star, cross, streak, bokeh, triangle | disc | o glifo de cada partícula (fragment) |
| sizeVar | number | 0..1 | 0.5 | variação de tamanho por partícula (0 = todas iguais) |
| spin | number | 0..2 | 0 | rotação do sprite por partícula (visível em square, diamond, triangle, cross, streak) |
| blend | enum | add, normal | add | aditivo (luz) ou normal (opaco: confete, neve, fumaça, areia) |
| motion | enum | flow, fall, rise, drift, orbit, swirl, pulse, jitter | flow | movimento stateless além do curl noise (tabela abaixo) |
| motionSpeed | number | 0..3 | 1 | velocidade do movimento |
| twinkle | number | 0..1 | 0 | cintilação de alpha por partícula (vagalume, estrela, glitter) |
| hover | enum | push, pull, vortex, scatter, glow | push | efeito do cursor (tabela abaixo); desligado em touch |
| pointer | number | 0..1 | 0.7 | força do hover |
| pointerRadius | number | 0.2..3 | 1.2 | raio do hover em unidades de cena (a forma cabe em ~1.4) |
| hoverGlow | number | 0..2 | 0.6 | quanto as partículas perto do cursor acendem e crescem, em qualquer modo |
| hoverSoft | number | 0..1 | 0.5 | borda do raio: 0 corte duro, 1 bem suave |
| colorMode | enum | flow, depth, axis, random, radial, index | flow | de onde vem a cor (tabela abaixo) |
| colorC, colorD | hex | | #FFFFFF, #FFD166 | terceira e quarta cores (random e index) |
| bg | hex | | #05060A | fundo (clear color e fallback) |
| text | string | | LOBO | só a forma glyph |
| tiltX | number | −1.5..1.5 | 0 | inclina a forma em x (rad); discos e anéis gerados em XZ precisam de 0.7–1.25 |
| volumeX, volumeY, volumeZ | number | 0.5..6 | 3.4, 2.6, 1.6 | só a forma volume (caixa) |
| seed | integer | 0..9999 | 4821 | variação da forma e do aRandom |
| count | integer | 20000..300000 | 180000 | pontos alocados; o tier corta por drawRange |
| size | number | 0.5..4 | 1.95 | tamanho do ponto em px CSS (× DPR no shader) |
| speed | number | 0..2 | 0.45 | velocidade do tempo |
| flow | number | 0..1.5 | 0.6 | amplitude do curl noise |
| flowScale | number | 0.3..4 | 1.6 | frequência do curl noise |
| pointer | number | 0..1.5 | 0.7 | força da repulsão do ponteiro (0 em tablet e phone) |
| pointerRadius | number | 0.3..3 | 1.2 | raio da repulsão em unidades de cena |
| colorA, colorB | hex | #RRGGBB | #25B8FF, #B04DFF | gradiente por velocidade aparente |
| glow | number | 0..2 | 0.75 | bloom strength (phone ÷ 2) |
| glowSpread | number | 0..1 | 0.08 | bloom radius (phone ÷ 2) |
| glowCutoff | number | 0..1 | 0.21 | bloom threshold |
| autoRotate | bool | | true | rotação lenta em y |
| rotateSpeed | number | 0..0.5 | 0.08 | rad/s da rotação |
| dprMax | number | 1..2 | 1.5 | teto de DPR (phone clampado em 1.25) |

Variante GPGPU (gpgpu.md) adiciona: `spring (0..1)`, `damping (0.8..0.99)`, `kick (0..5)`, `transition (s)`.

## Operações
`setConfig(changes)` → `{ ignored }`. Trocar `shape` ou `seed` regenera o buffer (custo único; acima de 100k, Worker). Tint = `colorA`/`colorB`. Variação = `seed`.

## Hover (`hover`)
Todos partem de `near` = `pointer · smoothstep(raio, raio − borda, distância)`. Em touch o template zera `pointer`.

| hover | Deslocamento | Pra quê |
| --- | --- | --- |
| push | afasta radialmente (0.6 · near) | o clássico: abre um buraco onde o cursor passa |
| pull | puxa em direção ao cursor, limitado a 0.6 pra não atravessar | magnetismo, a nuvem segue o mouse |
| vortex | tangencial em volta do eixo da câmera + leve afastamento | redemoinho que acompanha o cursor |
| scatter | ruído 3D animado · near | explode/turbilhona onde o cursor toca |
| glow | nenhum; só `hoverGlow` (acende, cresce 1.6×) | destaque sem bagunçar a forma; bom em texto e logo |

`hoverGlow` vale nos cinco (acende e cresce 0.5× nos de deslocamento, 1.6× no glow). Cores do hover: no `colorMode: "flow"` o `near` empurra pra `colorB`; nos outros modos só o alpha e o tamanho sobem.

## Movimentos (`motion`)
| motion | O que faz | Pra quê |
| --- | --- | --- |
| flow | só o curl noise (`flow`, `flowScale`) | respiração em volta da forma |
| fall | cai em y e dá a volta em ±1.3, com balanço lateral | neve, chuva, confete, areia, matrix |
| rise | sobe e dá a volta | brasas, bolhas, fumaça, pólen |
| drift | deriva lenta nos três eixos por seno | vagalumes, estrelas, pólen |
| orbit | cada partícula gira em y no seu ritmo (0.3–1.0×) | átomo, anel de asteroides, saturno |
| swirl | rotação diferencial pelo raio (centro gira mais) | tinta, galáxia, glitter |
| pulse | a forma respira (±8 %) | coração, flor, medusa |
| jitter | ruído de alta frequência pequeno | spray, texto vivo, estática |

## Cores (`colorMode`)
| colorMode | Mistura | Pra quê |
| --- | --- | --- |
| flow | A→B pela energia do curl + ponteiro (default) | o look clássico |
| depth | A (perto) → B (longe) pela distância à câmera | estrelas, chuva, anéis |
| axis | A (baixo) → B (cima) por y | brasas, aurora, hologram |
| random | uma das 4 cores por partícula | confete, neve, areia, vagalumes |
| radial | A (centro) → B (borda) pela distância ao centro | flor, átomo, glitter |
| index | gradiente A→B→C→D ao longo do índice da partícula (segue a ordem do gerador) | DNA, lissajous, curvas |

## Sprites
`disc` suave (default) · `dot` duro · `ring` · `square` · `diamond` · `star` (núcleo + 4 braços) · `cross` · `streak` (vertical; `spin` inclina) · `bokeh` (disco com borda clara) · `triangle`. Com `blend: "normal"` o sprite fica opaco e `glow` deve ser ≤ 0.2.

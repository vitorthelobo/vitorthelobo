# CONFIG schema · particle-forms (template stateless)

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | string | nome no catálogo | nebula-drift | rótulo |
| shape | enum | torusKnot, hopf, lotus, galaxy, sphere, lorenz, aizawa, thomas | hopf | gerador de forma (shapes.md) |
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

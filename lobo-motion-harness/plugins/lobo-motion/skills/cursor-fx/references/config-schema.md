# CONFIG schema · cursor-fx

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | enum | 17 nomes em `presets.md` | dot-ring | aplica o grupo e os defaults do preset |
| group | enum | pointer, trail, field | pointer | derivado do preset |
| follow | number | 0.05..1 | 0.14 | fator de lerp por frame a 60 Hz (1 = segue direto) |
| ringSize, dotSize | px | 0..80 | 36, 6 | tamanhos do anel e do ponto |
| hoverScale | number | 1..3 | 1.9 | escala sobre `a, button, [data-cursor]` |
| colorMode | enum | solid, gradient, difference | solid | gradient mistura `color` → `color2`; difference usa mix-blend |
| color, color2 | hex | | #FFFFFF, #C8FF5A | cores |
| trailLength | integer | 1..80 | 24 | pontos de histórico (trail, ribbon, cascading) |
| trailDecay | number | 0.5..0.98 | 0.85 | quanto do frame anterior sobrevive (fade do canvas) |
| fieldSpacing | px | 12..60 | 28 | passo da grade (field e pixel-trail) |
| fieldStrength | number | 0..1.5 | 0.8 | intensidade da resposta do campo |
| hideNative | bool | | true | `cursor: none` só no grupo pointer e só com mouse |
| demo | bool | | true | ponteiro fantasma em Lissajous até o primeiro movimento real (preview, touch) |
| seed, dprMax | | | 0, 1.5 | |

## API (`window.__lobo`)
`config`, `presets`, `stats` (frames, moves, demo, preset, particles), `setConfig(changes)` → `{ ignored }`, `setPreset(nome)`, `exportState()`.

## Garantias
- Em `(hover: none) and (pointer: coarse)` nada de cursor custom; o demo roda só pra preview e a página mostra o aviso.
- Reduced motion: pointer segue direto (`follow = 1`); trail e field caem pra `dot-ring`.
- Um rAF por página; para 2 s depois do último movimento quando não há partículas vivas.
- Camadas `pointer-events: none`; o cursor nativo volta em inputs porque `cursor: none` só vale em `body`, `a` e `button`.

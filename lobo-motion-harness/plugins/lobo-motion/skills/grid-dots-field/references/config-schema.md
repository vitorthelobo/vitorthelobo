# CONFIG schema · grid-dots-field

Canvas 2D. Uma grade de células a cada `spacing` px; cada célula desloca por ruído, onda e ponteiro, e acende (`color` → `color2`) pela energia local.

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | string | nome no catálogo | dot-matrix | rótulo |
| mode | enum | dots, lines, plus, cross, ascii | dots | o glifo de cada célula |
| spacing | number | 12..64 | 28 | distância entre células (px CSS); custo ∝ 1/spacing² |
| size | number | 0.5..14 | 1.6 | raio do ponto; metade do braço (plus/cross); tamanho da fonte (ascii) |
| color, color2 | hex | | #FFFFFF, #25B8FF | repouso → aceso |
| bg | hex | | #0A0A0C | fundo (também o fallback) |
| warp | number | 0..1 | 0.35 | deslocamento por ruído, em frações de spacing |
| warpScale | number | 0.3..3 | 1.2 | frequência do ruído |
| wave | number | 0..1 | 0 | onda radial pulsando do centro (sonar) |
| speed | number | 0..2 | 0.4 | velocidade do tempo |
| pointer | number | 0..1 | 0.8 | força do campo do cursor (repele e acende); 0 em touch |
| pointerRadius | number | 60..400 | 160 | raio do campo em px CSS |
| fade | number | 0..1 | 0.35 | vinheta: células somem nas bordas |
| seed | integer | 0..9999 | 7 | desloca o ruído |
| dprMax | number | 1..2 | 1.5 | teto de DPR (phone 1.25) |

## Operações
- `setConfig(changes)` → `{ ignored }`. Tudo aplica no próximo frame; nada realoca.
- Tint: `color`, `color2`, `bg`. Variação: `seed`. Intensidade: `warp`, `wave`, `pointer`.
- Reduced motion: desenha uma vez e redesenha só em mudança ou ponteiro.
- Custo: 1440×900 com spacing 28 ≈ 1.7k células; spacing 18 em ascii ≈ 4k (o teto confortável em phone).

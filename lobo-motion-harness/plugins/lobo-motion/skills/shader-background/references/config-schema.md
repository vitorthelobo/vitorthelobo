# CONFIG schema · shader-background

Um objeto plano. Painel, URL (`?s=` base64url do JSON), favorito e build prompt leem exatamente estas chaves. Chave fora do schema é ignorada e reportada em `ignored`.

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | string | nome no catálogo | graphite | só rótulo; o CONFIG completo é o que vale |
| colors | hex[2..6] | #RRGGBB | 5 cinzas | stops de cor, misturados em OKLab |
| stops | number[] | 0..1 crescente, mesmo tamanho de colors | [0,.25,.5,.75,1] | posição de cada cor no gradiente |
| shape | enum | linear, radial, conic, mesh, warped, aurora, rays, ripples, stripes, caustics, blobs | warped | como o parâmetro t é calculado a partir da posição |
| zoom | number | 0.3..3 | 1.3 | escala do campo |
| swirl | number | 0..1.5 | 0.3 | rotação proporcional ao raio |
| movement | number | 0..1 | 0.35 | quanto o ruído deforma o gradiente |
| speed | number | 0..2 | 0.6 | velocidade do tempo |
| angle | number | 0..360 | 220 | direção do gradiente em graus |
| centerX, centerY | number | 0..1 | 0.5 | centro do campo |
| detail | number | 0.25..3 | 1 | frequência do ruído |
| contrast | number | 0.5..2 | 1.1 | contraste final |
| grain | number | 0..0.4 | 0.1 | intensidade do grão |
| grainSize | number | 1..4 | 1 | tamanho do grão em pixels de framebuffer (também escala a célula do dither) |
| dither | number | 0..1 | 0 | quantiza t com matriz Bayer 4×4; 0 desliga, 1 = 4 níveis |
| halftone | number | 0 ou 3..16 | 0 | tamanho da célula em px CSS; pontos de tinta (cor 0) sobre papel (última cor); 0 desliga |
| vignette | number | 0..1 | 0 | escurece as bordas |
| seed | integer | 0..9999 | 0 | desloca o campo de ruído |
| dprMax | number | 1..2 | 1.5 | teto de DPR (phone é clampado em 1.25) |

## Operações
- `setConfig(changes)` devolve `{ ignored: [] }`; nunca cria chave nova.
- Tint: trocar `colors` (e opcionalmente `stops`). Nunca o shader.
- Variação: trocar `seed`. A fórmula fica.
- Favorito: `{ preset: "lagoon", changes: { swirl: 0.6 } }`.

## Campos (shape)
| shape | O que é | Chaves que mais importam |
| --- | --- | --- |
| linear / radial / conic | gradiente clássico deformado por ruído | angle, centerX/Y, movement |
| mesh | fbm puro, manchas suaves | detail, movement |
| warped | domain warping (default) | movement, swirl |
| aurora | cortinas verticais que ondulam no eixo x | movement (altura das cortinas), speed |
| rays | raios angulares a partir do centro, decaem com o raio | detail (número de raios), centerX/Y |
| ripples | anéis concêntricos que se expandem | detail (frequência), speed |
| stripes | listras diagonais dobradas pelo ruído | angle, movement (dobra), detail |
| caustics | diferença de dois fbm elevada, veios claros tipo fundo de piscina | contrast, detail, speed |
| blobs | 6 metaballs orbitando (lava lamp) | movement (raio da órbita), speed |

## Efeitos empilháveis (já no template)
`dither`, `halftone` e `vignette` são chaves planas, desligadas em 0. Ordem de aplicação: shape → dither (sobre t) → gradient → contrast → halftone → vignette → grain. Ficam para a próxima versão: `light` (glow, iridescence), `glass` (fluted, mosaic, frosted) e `pixelate`.

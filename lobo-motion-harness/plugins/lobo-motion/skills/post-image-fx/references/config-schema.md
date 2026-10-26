# CONFIG schema · post-image-fx

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | enum | terminal, amber-binary, newsprint, film-noir, toxic-grid, cyber-rain, fluted, cross-reeded, rain, frosted | terminal | |
| mode | enum | ascii, dither, refract | ascii | ramo do shader |
| source | enum | sample, upload | sample | a amostra procedural ou o arquivo do usuário (`loadFile`, drag and drop, clique) |
| exposure, contrast, gamma, brightness | number | 0..3, 0.5..2, 0.3..3, −0.5..0.5 | 1.2, 1.3, 1, 0 | grade antes do efeito |
| temporal | number | 0..1 | 0.5 | mistura com o frame anterior (só vídeo): alto fica calmo, borra movimento rápido |
| ink, paper, accent | hex | | | cores do ascii e do dither |
| ascii.charset | enum | boldLines, classic70, blocks, minimal, shade, code, binary | classic70 | atlas de glifos gerado em canvas |
| ascii.cellSize | px | 6..40 | 14 | célula (× DPR) |
| ascii.glow | bool | | true | glow: cor segue a luminância em bandas; density: binário |
| ascii.bands, ascii.gamma, ascii.invert | | 2..32, 0.3..2, bool | 16, 0.7, false | |
| dither.pattern | enum | bayer8, crosshatch, lines, dots, noise | bayer8 | |
| dither.dotSize, cutoff, strength, accentAmount | | 1..8, 0..1, 0..1, 0..1 | 2, 0.5, 0.6, 0 | |
| refract.pattern | enum | fluted, crossReeded, glassBlock, ripple, rain, frosted | fluted | normal procedural do vidro |
| refract.cellSize, curve, depth, angle, dispersion, sheen, parallax | | 6..80, 0..2, 0..1.5, 0..180, 0..0.5, 0..1, 0..1 | 26, 1, 0.9, 0, 0.12, 0.3, 1 | |
| post.scanlines, vignette, grain, crt, posterize, chroma | number | 0..1 | 0, 0.25, 0.04, 0, 0, 0 | pós-efeitos single-pass |
| seed, dprMax | | | 0, 1.5 | |

## API (`window.__lobo`)
`setConfig` (objetos aninhados mesclam), `exportState`, `loadFile(File)`, `stats` (source, mode, links, frames).

## Notas
- Vídeo: textura re-enviada por frame; `temporal` usa um ping-pong de framebuffer. Imagem: desenha uma vez e só redesenha em mudança (ou com grain ligado).
- Bot e sem WebGL: fundo de linhas estático, sem download.

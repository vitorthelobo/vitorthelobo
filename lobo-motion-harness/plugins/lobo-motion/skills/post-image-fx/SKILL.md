---
name: post-image-fx
description: Aplica efeitos procedurais sobre imagem, vídeo ou webcam: ASCII por shader (charsets, glow e density), dither animado (bayer ordenado, 9 padrões, paletas) e refração por vidro procedural (fluted, cross-reeded, ripple, rain, frosted, com dispersão por canal e parallax), mais os 27 pós-efeitos (bloom, chromatic aberration, scanlines, CRT, glitch, god rays, film grain, halftone). Use quando o usuário pedir "ASCII art de vídeo", "dither", "efeito retrô", "CRT", "vidro canelado", "refract", "glitch", "halftone" ou "pós-processamento de imagem".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Post image FX

Três famílias, uma casca: um quad WebGL2 com a mídia como textura (`texImage2D` do `<video>` por frame, `texSubImage2D` quando o tamanho não muda) e um fragment que aplica a cadeia de efeitos na ordem do CONFIG. Dither simples pode ser Canvas 2D (é o que o GetLayers faz); ASCII e refract são shader.

## 0. Intake
Fonte (imagem, vídeo, webcam, ou a própria cena de outra skill), tamanho de saída, se exporta frame ou vídeo, paleta.

## 1. CONFIG
Bloco comum: `source, aspect, exposure, gamma, contrast, brightness, invert, paper, ink, palette, blend, temporalStability (0..1), seed`.
- ASCII: `mode (glow|density), charset (boldLines|classic70|blocks|minimal|shade|code|binary), cellSize (px), cellAspect, bands, threshold, glowGamma, accent {on, color, channel}, edges {on, threshold, softness}`.
- Dither: `effect, pattern (bayer2|bayer4|bayer8|crosshatch|lines|dots|noise|halftone|spiral), dotSize, cutoff, accentBlend (hard|soft), accentAmount, patternStrength, sizeJitter, frameRate (max|30|15|12)`.
- Refract: `pattern (fluted|crossReeded|glassBlock|ripple|rain|wave|hammered|flemish|frosted), cellSize, curve, depth, angle, dispersion, sheen, gap, variation, parallax`.
- Post (lista ordenada): `[{ type: bloom, intensity }, { type: chromaticAberration, amount }, { type: scanlines, intensity }, { type: vignette }, { type: crtCurvature }, { type: filmGrain }, { type: glitch, amount }, { type: godRays, source }, ...]`.

## 2. ASCII por shader
1. Atlas de glifos: desenhe o charset num canvas 2D uma vez (uma linha de N células), suba como textura.
2. No fragment: célula = `floor(fragCoord / cellSize)`; luminância média da célula amostrando a mídia no centro (ou 4 taps); glifo = `floor(luma * N)`; UV dentro da célula amostra o atlas.
3. Glow mode: cor da célula = luminância elevada a `glowGamma` vezes a cor do ink; bands quantizam. Density mode: glifo pela tonalidade, edges por Sobel na mídia colocam `- / | \`.
4. Temporal stability: mistura a luminância com a do frame anterior (ping-pong de uma textura R8) por `temporalStability`; alto demais borra movimento rápido.

## 3. Dither
Ordenado: `luma + (bayer(fragCoord / dotSize) - 0.5) * patternStrength > cutoff` escolhe ink ou paper; accent entra num segundo threshold. Difusão de erro (Floyd-Steinberg) é sequencial: só em Canvas 2D e só pra imagem estática. `sizeJitter` varia `dotSize` por célula com `hash21`. `frameRate` limita o redraw por `setTimeout`, nunca a velocidade do tempo.

## 4. Refract
Normal map procedural: fluted = `sin(x * freq)` em um eixo; cross-reeded = produto nos dois; block = células com borda (`gap`); ripple/rain = ondas radiais somadas com seed. Refração: `uv' = uv + n.xy * depth * curve`; dispersão: três amostras com `depth * (1 ± dispersion)` por canal; sheen = `pow(n.z, k)` somado; parallax desloca mídia e vidro em sentidos opostos pelo ponteiro.

## 5. Pós-efeitos
Cada um é uma função `vec3 fx(vec3 col, vec2 uv)` aplicada em ordem; bloom precisa de passes extras (downsample + blur), o resto é single-pass. Em phone, limite a 3 efeitos e pule bloom.

## 6. Verifique e registre
Screenshots com uma imagem de referência fixa (não a webcam) pra comparar entre builds; `fps-probe` com vídeo rodando; entrada no catálogo com a imagem de teste.

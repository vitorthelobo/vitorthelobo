---
name: cursor-fx
description: Constrói cursores customizados: estáticos em SVG e efeitos vivos em JS + CSS nos três grupos pointer (dot & ring, velocity squish, crosshair, custom pointer, eyes), trail (trail, cascading dots, swirl, ribbon, pixel trail, smoke, ghost) e field (magnet lines, ASCII field, dot grid warp), com lerp por dt, hover scale e desligamento em touch. Use quando o usuário pedir "cursor customizado", "cursor com rastro", "dot e ring", "cursor magnético", "efeito de cursor", "custom pointer".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Cursor FX

`templates/standalone.html` é a implementação de referência: os 17 efeitos (7 pointer, 7 trail, 3 field) em vanilla JS + CSS, lerp por dt, hover scale, demo em Lissajous até o primeiro movimento real, nada montado em touch, um rAF que para em repouso. Schema em `references/config-schema.md`, tabela em `references/presets.md`.

## 0. Intake
- Grupo: pointer (substitui o cursor), trail (deixa rastro) ou field (o fundo reage ao cursor).
- Alvo: vanilla JS + CSS (default, funciona em qualquer stack) ou componente.
- Hover: quais elementos escalam o cursor (`a, button, [data-cursor]`).

## 1. CONFIG
`preset, group (pointer|trail|field), follow (0.05..0.4, fator de lerp por frame a 60 Hz), ringSize (px), dotSize (px), hoverScale (×), colorMode (solid|gradient|invert), color, trailLength (n), trailDecay (0..1), fieldSpacing (px), fieldStrength (0..1), mixBlend (normal|difference|exclusion), hideNative (bool)`.

## 2. Pointer
- Dois elementos `position: fixed; pointer-events: none; will-change: transform`, movidos por `transform: translate3d()` (nunca `left/top`).
- Dot segue o mouse direto; ring segue com lerp `1 - pow(1 - follow, dt * 60)` (independente do refresh rate).
- Hover: `scale(hoverScale)` por `transition` CSS de 150 ms, acionado por `mouseover` delegado no `document`.
- Velocity squish: escala em x pela velocidade (`clamp(|v| / 40, 1, 1.6)`) e rotaciona pelo ângulo do vetor.
- `cursor: none` só em `(hover: hover) and (pointer: fine)`; em touch nada é montado.

## 3. Trail
- Buffer circular de `trailLength` posições; canvas 2D full-screen `pointer-events: none`.
- Por frame: limpa com `globalAlpha = trailDecay` (fade) em vez de `clearRect` (deixa o rastro); desenha segmentos com largura decrescente.
- Smoke e ghost: partículas emitidas por movimento (`|v| > 2`), vida 0.6 a 1.2 s, `globalCompositeOperation: 'lighter'`.
- Pare o rAF quando o mouse ficar 2 s parado e o buffer esvaziar.

## 4. Field
- Grade de pontos ou linhas desenhada em canvas; cada ponto desloca em direção (ou contra) ao cursor por `fieldStrength * smoothstep(raio, 0, dist)`.
- ASCII field: glifos escolhidos pela distância ao cursor (`.:-=+*#%@`).
- Redesenhe só quando o cursor se move ou enquanto há pontos fora do repouso.

## 5. Regras
- Um rAF por efeito, parado em repouso. Escreva estilo só quando mudou.
- Nunca variável CSS no `<html>` por frame (restiliza a página inteira).
- `prefers-reduced-motion`: pointer sem lerp (segue direto), trail e field desligados.
- Acessibilidade: o cursor custom nunca é foco; o nativo volta em inputs de texto.

## 6. Verifique e registre
Sonda com `page.mouse.move` em trajetória e screenshots a cada 100 ms; `check-motion`; teste em touch emulado (nada montado). Entrada no catálogo.

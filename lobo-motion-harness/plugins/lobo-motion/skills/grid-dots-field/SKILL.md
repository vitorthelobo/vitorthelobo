---
name: grid-dots-field
description: Constrói fundos de grade — dot grid, linhas, plus/cross marks, ASCII field — em canvas 2D, com deformação por ruído (warp), onda radial (sonar) e campo do cursor, vinheta e fallback em CSS. Use quando o usuário pedir "dot grid", "grade de pontos", "fundo técnico", "blueprint", "ASCII de fundo", "grid que reage ao mouse", "fundo de dashboard", "textura de grid".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Grid Dots Field

`templates/standalone.html` é a referência: canvas 2D, 5 modos (dots, lines, plus, cross, ascii), ruído por valor com seed, onda radial, campo do ponteiro com lerp por dt, vinheta, rAF que para em repouso e assenta em reduced motion. Schema em `references/config-schema.md`. Diferença pro `cursor-fx` grupo field: aqui o fundo existe sem cursor; o cursor é só um dos três deslocamentos.

## 0. Intake
- Modo pelo brief: técnico/dashboard → `dots` ou `plus`; blueprint/arquitetura → `lines`; terminal/hacker → `ascii`; mapa/topografia → `cross` com `warp` alto; radar/sonar → `dots` + `wave`.
- Densidade: `spacing` 22–36 pra fundo de hero; 40+ atrás de texto denso.
- Vai ter conteúdo por cima? `fade` ≥ 0.35 e `color` com alpha efetiva baixa (células já têm alpha 0.35–1 pela energia).

## 1. CONFIG
`preset, mode, spacing, size, color, color2, bg, warp, warpScale, wave, speed, pointer, pointerRadius, fade, seed, dprMax`. Cores só aqui: o `draw` lê `cfg`, nunca literal.

## 2. Técnica
- Grade centrada (`ox/oy`), uma célula a mais em cada borda pra o warp não mostrar vazio.
- Deslocamento = ruído 2D (`warp`) + onda radial (`wave`) + ponteiro (`pointer`, decai com `(1 − d/r)²`). Energia `e` (0..1) vem do mesmo ruído e acende a cor e o tamanho.
- Vinheta por `max(|x−cx|/cx, |y−cy|/cy)`; células com alpha < 0.03 nem desenham.
- Um `fillStyle` por célula é o custo dominante; acima de 4k células agrupe por 8 níveis de energia (`e` quantizado) e desenhe por `beginPath` compartilhado.
- O ponteiro desliga sozinho 2.5 s após parar (volta ao repouso), e nada monta em touch.

## 3. Regras
- Canvas com `desynchronized: true` e `alpha: false`; o fundo é pintado pelo `fillRect` com `cfg.bg`.
- `setTransform(dpr)` uma vez por resize; nunca `scale()` acumulado.
- Reduced motion: desenha uma vez; redesenha só por `dirty`, resize ou ponteiro.
- Robot form: `.fallback` com `radial-gradient` repetido (`--sp`, `--c`) e nada de JS.
- Nunca mais de um rAF; nunca `getBoundingClientRect` fora do `resize()`.

## 4. Verifique e registre
`screenshot-grid` nos dois tiers; `check-motion` (reduced motion responde e assenta; bot sem canvas); `page.mouse.move` em trajetória e screenshot a 300 ms pra ver o campo; `fps-probe` com `spacing` 18 em phone. Entrada no catálogo com `mode` e `spacing`.

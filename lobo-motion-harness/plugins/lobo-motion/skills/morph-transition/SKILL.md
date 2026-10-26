---
name: morph-transition
description: Transição entre formas de partículas (A → B) e sequências cíclicas — esfera vira nó, lótus vira coral — com stagger por partícula, espalhamento no meio do caminho, cor cruzando com o progresso, dirigida por tempo, clique, API (morphTo/next) ou scroll (t). Use quando o usuário pedir "partículas que viram outra forma", "morph", "transição entre formas", "a nuvem vira o logo", "sequência de formas", "troca de forma no scroll".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Morph Transition

`templates/standalone.html` é a referência: a casca do particle-forms com dois buffers e um progresso, 18 formas (cópia literal dos geradores), `morphTo()` que grava a posição atual como origem, ciclo automático com hold, easing global + smoothstep por partícula, cor A→B pelo progresso, bloom e tiers iguais ao particle-forms. Schema em `references/config-schema.md`. Memória de verdade (acúmulo, rastro, swarm) continua sendo o caminho GPGPU de `particle-forms/references/gpgpu.md`; o morph não precisa dela.

## 0. Intake
- Formas: duas (A → B) ou uma sequência. Logo do cliente como forma? Gere pontos a partir do SVG (amostragem do path) ou do GLB (superfície) e registre como shape novo no gerador (ver `particle-forms/references/shapes.md` §De malha).
- Driver: tempo (`auto`), interação (clique → `next()`), scroll (`auto: false` + `scroll-grammar` escrevendo `t`), ou evento do app (`morphTo("galaxy")` quando o usuário escolhe algo).
- Caráter: explosivo (`scatter` 0.8+, `stagger` 0.6, atratores) ou organizado (`scatter` 0.3, `stagger` 0.2, anéis e superfícies).

## 1. CONFIG
`preset, from, to, sequence, t, auto, duration, hold, easing, scatter, stagger, count, size, flow, flowScale, colorA, colorB, glow, glowSpread, glowCutoff, autoRotate, rotateSpeed, seed, dprMax`.

## 2. Técnica
- Vertex: `tp = clamp((uT − r·stagger) / (1 − r·stagger))`, `e = smoothstep(tp)`, `p = mix(from, to, e)`, `mid = sin(πe)`, `p += curl · (flow + scatter·mid)`. Tamanho cresce com `mid`, cor cruza com `e`.
- `morphTo`: antes de trocar `aTo`, aplica a interpolação atual **sem ruído** no buffer `position` (N×3 na CPU, ~1 ms pra 160k) e zera `t`. Sem isso, trocar no meio salta.
- Ciclo: `morph` (t 0→1 em `duration`) → `hold` (`hold` s) → `next()`. `auto: false` deixa `t` manual.
- Mesma `seed` em todas as formas: a partícula i sempre é a mesma, então o morph lê como transformação, não como troca.
- Reduced motion: `t` fica onde está (ou no valor do scroll); sem ciclo, sem rotação.

## 3. Regras
- `flow` ≤ 0.2 em repouso: a forma precisa ler nas duas pontas (lição do particle-forms).
- `scatter` alto + `glowCutoff` baixo estoura o bloom no meio do morph; suba `glowCutoff` pra 0.3+ quando `scatter` > 0.7.
- `count` igual em todas as formas (os geradores recebem N); nunca realoque o buffer pra trocar de forma.
- Não misture com `pointer` do particle-forms no mesmo template (dois campos de deslocamento confundem a leitura); se precisar, o pointer entra só no `hold`.

## 4. Verifique e registre
Screenshots em `?t=0`, `?t=0.5`, `?t=1` (as pontas leem como as formas prometidas, o meio tem o espalhamento); captura do ciclo automático em 3 s; `check-motion` (reduced motion parado em `t`); `context-loss-probe`; `fps-probe` com `count` 200k em phone (o morph custa o mesmo que o particle-forms: um mix a mais no vertex). Entrada no catálogo com a sequência.

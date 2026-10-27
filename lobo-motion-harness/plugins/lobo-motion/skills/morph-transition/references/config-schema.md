# CONFIG schema · morph-transition

three.js Points com dois buffers (`position` = origem, `aTo` = destino) e um progresso `t`. Stateless: o vertex shader interpola por partícula com stagger, espalha no meio do caminho (scatter) e aplica curl noise. `morphTo()` grava a posição atual como nova origem (CPU, N×3) e zera `t`, então trocar de forma no meio de um morph não pula. Formas: as 18 do particle-forms (`skills/particle-forms/references/shapes.md`), copiadas literalmente no template.

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | string | nome no catálogo | sphere-to-knot | rótulo |
| from, to | enum | shape | sphere, torusKnot | origem e destino atuais |
| sequence | string[] | shapes | [sphere, torusKnot, galaxy, hopf] | ciclo com `auto: true`; `next()` avança |
| t | number | 0..1 | 0 | progresso; `scroll-grammar` escreve aqui com `auto: false` (`?t=` na URL também) |
| auto | bool | | true | anima sozinho: morph → hold → próximo da sequence |
| duration | number | 0.3..6 | 2.2 | segundos do morph |
| hold | number | 0..10 | 1.6 | segundos parado em cada forma |
| easing | enum | smooth, elastic, linear | smooth | curva global de `t` (cada partícula ainda tem smoothstep próprio) |
| scatter | number | 0..1 | 0.6 | quanto voam no meio do caminho (curl × sin(πe)) |
| stagger | number | 0..1 | 0.35 | atraso por partícula (aRandom); 0 = bloco único, 1 = fila longa |
| count | integer | 20000..300000 | 160000 | pontos (tier corta por drawRange) |
| size | number | 0.5..4 | 1.8 | px CSS (cresce 60 % no meio do morph) |
| flow, flowScale | number | 0..1.5, 0.3..4 | 0.15, 1.6 | curl noise em repouso (baixo: a forma precisa ler) |
| colorA, colorB | hex | | #25B8FF, #F72585 | cor da origem → cor do destino, cruzada pelo progresso |
| glow, glowSpread, glowCutoff | number | | 0.8, 0.1, 0.22 | bloom |
| autoRotate, rotateSpeed | bool, number | | true, 0.1 | |
| seed | integer | | 11 | mesma seed = mesmas partículas em todas as formas (correspondência por índice) |
| zoom, dof, focus, parallax, parallaxAmount | | | 1, 0, 0, false, 0.5 | câmera e profundidade de campo, iguais ao particle-forms |
| dprMax | number | 1..2 | 1.5 | |

## API
`setConfig`, `exportState`, `morphTo(shape)` (origem = posição atual), `next()` (avança a sequence), `?preset=`, `?t=`, `?s=`. Clique chama `next()`.

## Correspondência
Partícula i da origem vai pra partícula i do destino. Geradores com ordem espacial (anéis, linhas de campo, hélices) produzem morphs "organizados"; atratores (lorenz, aizawa, thomas) produzem morphs "explosivos". Pra embaralhar de propósito, mude `seed` só no destino (uma linha no `buildBuffers`).

# Presets · text-motion (28)

Cada preset é `unit` + `from` + `to` + `stagger` + mola (`tension`, `friction` como multiplicadores de 170 e 26). `%` em `y` é relativo à altura da unidade, em `x` à largura. `clip` corta a unidade na caixa da linha; `perspective` liga `perspective: 700px` no elemento; `origin` muda o `transform-origin`.

| Preset | Unidade | from → to | stagger | mola | extras |
| --- | --- | --- | --- | --- | --- |
| rise-settle | letra | y 110% → 0, opacity 0 → 1 | 28 | 1.2 / 1.0 | clip |
| blur-in | letra | opacity 0 → 1, blur 12 → 0 (na linha) | 22 | 1.0 / 1.1 | |
| pop-scale | letra | scale 0.4 → 1, opacity | 30 | 1.4 / 0.7 | |
| flip-in | letra | rotateX −90 → 0, y 30% → 0, opacity | 30 | 1.1 / 0.9 | perspective |
| typewriter | letra | opacity 0 → 1 | 42 | 4.0 / 2.0 | |
| drop-in | letra | y −120% → 0, opacity | 26 | 1.1 / 0.75 | |
| bounce-up | letra | y 60% → 0, opacity | 24 | 1.6 / 0.55 | |
| skew-in | letra | x −40% → 0, skewX −20 → 0, opacity | 24 | 1.2 / 0.9 | |
| tilt-3d | letra | rotateY 60 → 0, x 20% → 0, opacity | 26 | 1.0 / 0.9 | perspective |
| fade-scale | letra | scale 1.3 → 1, opacity | 20 | 0.9 / 1.1 | |
| squeeze-in | letra | scaleX 0.2 → 1, opacity | 22 | 1.3 / 0.8 | |
| swing-in | letra | rotate −25 → 0, y −30% → 0, opacity | 28 | 1.2 / 0.6 | origin top center |
| scale-y | letra | scaleY 0 → 1, opacity | 20 | 1.3 / 0.9 | origin bottom center |
| fade-letters | letra | opacity 0 → 1 | 18 | 1.0 / 1.2 | |
| fade-cascade | palavra | opacity 0 → 1, y 20% → 0 | 60 | 1.0 / 1.0 | |
| curtain-up | palavra | y 100% → 0 | 50 | 1.1 / 1.0 | clip |
| word-rise | palavra | y 60% → 0, opacity | 45 | 1.2 / 0.95 | |
| zoom-blur | palavra | scale 1.6 → 1, blur 10 → 0 (na linha), opacity | 55 | 0.9 / 1.0 | |
| rotate-in | palavra | rotateX 80 → 0, opacity | 50 | 1.0 / 0.9 | perspective |
| rise-wide | palavra | y 50% → 0, scaleX 1.25 → 1, opacity | 50 | 1.0 / 1.0 | |
| pop-words | palavra | scale 0.6 → 1, opacity | 55 | 1.5 / 0.6 | |
| soft-focus | palavra | blur 8 → 0 (na linha), scale 1.05 → 1, opacity | 45 | 0.8 / 1.2 | |
| cascade-down | palavra | y −60% → 0, opacity | 50 | 1.1 / 0.9 | |
| slide-from-left | linha | x −60px → 0, opacity | 120 | 1.0 / 1.0 | |
| stagger-reveal-lines | linha | y 100% → 0 | 110 | 1.1 / 1.0 | clip |
| wipe-down | linha | y −100% → 0 | 100 | 1.1 / 1.0 | clip |
| slide-from-right | linha | x 60px → 0, opacity | 120 | 1.0 / 1.0 | |
| unblur-lines | linha | blur 14 → 0, opacity | 110 | 0.9 / 1.1 | |

## Traduzindo pra uma biblioteca instalada
- **react-spring + spring-text-engine:** `unit` vira `letterIn/Out`, `wordIn/Out`, `lineIn/Out`; `stagger` vira `letterStagger` etc.; `tension`/`friction` vão em `letterConfig`; `clip` vira `overflow`; o trigger `progress` vira `mode="progress"` com `start`/`end` na mesma gramática.
- **GSAP:** `from`/`to` viram `gsap.from(units, { ..., stagger, ease: "elastic.out(1, 0.5)" })`; mola de verdade só com o plugin Physics2D ou `CustomEase`; `progress` vira `ScrollTrigger` com `scrub: true`.
- **motion (Framer/vanilla):** `animate(units, keyframes, { type: "spring", stiffness: 170 × tension, damping: 26 × friction, delay: stagger(stagger / 1000) })`.

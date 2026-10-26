# Receitas de scroll por família

| Família | switch | scrub | progress | pin |
| --- | --- | --- | --- | --- |
| shader-background | `preset` por seção (cores + shape); crossfade das cores em OKLab | `swirl`, `zoom`, `movement`, `vignette`, `centerY` (o centro acompanha o scroll) | — | sim: fundo de página inteira, um canvas fixed |
| particle-forms | `shape` via morph-transition; `colorA/colorB` | `flow`, `size`, `glow`, `rotateSpeed`; `pointer` 0 fora da hero | — | sim: a forma muda por capítulo |
| orb-reactive | `state` (idle → listening → thinking) por seção | `level` (0..1) como progresso: o orb "acorda" | — | sim: orb fixo enquanto o texto passa |
| holo-material | `preset` (foil → chrome) | `rainbowStrength`, `reflections`, poke programado no `onEnter` | — | raro |
| text-motion | `trigger: "inview-once"` por título | — | `trigger: "progress"` + `progress` 0..1 | parágrafo longo revelado por linha |
| cursor-fx | `preset` por seção (dot-ring no conteúdo, magnet-lines na hero) | `fieldStrength` | — | — |
| post-image-fx | `preset` ao entrar (ascii → refract) | `exposure`, `dither`, `pixelSize`: imagem "resolve" ao rolar | — | sim: imagem fixa que muda de tratamento |
| image-reveal | `reveal: 0 → 1` ao entrar (inview-once) | `reveal` como progresso | — | — |
| grid-dots-field | `preset` | `warp`, `spacing` | — | sim: grid fixa de fundo |
| 3d-object-scene | `preset` de material | `rotationY`, `cameraZ`, `exposure` | — | sim: produto fixo, texto passa (o clássico Apple) |
| morph-transition | `to` (forma alvo) por seção | `t` (0..1) como progresso do morph | — | sim |

## Mapeamentos prontos (progress p ∈ 0..1)
- Entrada suave: `v = lerp(a, b, smoothstep(0, 1, p))`.
- Pico no meio: `v = lerp(a, b, sin(p * π))`.
- Só no último terço: `v = lerp(a, b, smoothstep(0.66, 1, p))`.
- Centro acompanhando: `centerY = 0.5 + (p - 0.5) * 0.4`.

## Sonda
```js
// tools/qa: scroll programado
for (let y = 0; y <= total; y += innerHeight * 0.5) { await page.mouse.wheel(0, innerHeight * 0.5); await page.waitForTimeout(400); await page.screenshot({ path: `scroll-${y}.png` }); }
```
Leia as screenshots: cada seção tem o estado certo, sem frame preto no switch.

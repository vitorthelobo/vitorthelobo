---
tags: [catalog, presets]
updated: 2026-10-25
---

# Catálogo de efeitos

Toda entrada tem CONFIG completo, screenshot, prompt e tags nos cinco eixos. Preset é CONFIG completo; favorito é `{ preset, changes }`. Template de entrada: [[templates/catalog-entry]].

## shader-background

Renderer: `skills/shader-background/templates/standalone.html`. Abra com `?preset=<nome>` ou `?s=<estado base64url>`.

### graphite
- Eixos: 2d · calm · dark · motionEnergy 0.3 · density 0.2
- CONFIG: `{ "colors": ["#0A0A0A","#262626","#525252","#A3A3A3","#F5F5F5"], "stops": [0,0.25,0.5,0.75,1], "shape": "warped", "zoom": 1.3, "swirl": 0.3, "movement": 0.35, "speed": 0.6, "angle": 220, "detail": 1, "contrast": 1.1, "grain": 0.1 }`
- Screenshot: `catalog/shader-background/graphite.png`
- Prompt: `catalog/shader-background/graphite.prompt.md` (gerar com `/export-prompt`)

### lagoon
- Eixos: 2d · dreamy · dark · motionEnergy 0.4 · density 0.3
- CONFIG: `{ "colors": ["#041A2E","#0B4F6C","#01BAEF","#8AE9C1","#F6FFF8"], "shape": "warped", "zoom": 1.1, "swirl": 0.45, "movement": 0.5, "speed": 0.5, "angle": 200, "contrast": 1.05, "grain": 0.06 }`

### molten
- Eixos: 2d · dramatic · dark · motionEnergy 0.6 · density 0.4
- CONFIG: `{ "colors": ["#0B0302","#5A0F07","#C8320E","#FF8A1F","#FFE6A7"], "shape": "mesh", "zoom": 1.0, "swirl": 0.2, "movement": 0.6, "speed": 0.8, "angle": 160, "contrast": 1.15, "grain": 0.12 }`

### neon-dream
- Eixos: 2d · electric · dark · motionEnergy 0.5 · density 0.3
- CONFIG: `{ "colors": ["#0A0014","#3A0CA3","#7209B7","#F72585","#FFD6FF"], "shape": "radial", "zoom": 1.4, "swirl": 0.6, "movement": 0.4, "speed": 0.7, "angle": 240, "contrast": 1.1, "grain": 0.08 }`

### Segunda leva (10 presets, campos e efeitos novos)
Todos no template, abrem com `?preset=<nome>`. Screenshots de QA em `catalog/shader-background/<nome>.png` quando gerados.

| preset | shape | Eixos | Diferencial |
| --- | --- | --- | --- |
| aurora-veil | aurora | 2d · dreamy · dark · energy 0.5 | cortinas verde/roxo, vignette 0.35 |
| sun-rays | rays | 2d · warm · dark · energy 0.4 | raios do centro deslocado (centerY 0.65) |
| pond-ripples | ripples | 2d · calm · dark · energy 0.5 | anéis concêntricos azul/ciano |
| silk-stripes | stripes | 2d · electric · dark · energy 0.5 | listras diagonais dobradas (angle 35) |
| pool-caustics | caustics | 2d · fresh · mid · energy 0.7 | veios claros de piscina, contrast 1.25 |
| lava-blobs | blobs | 2d · dramatic · dark · energy 0.5 | metaballs laranja (lava lamp) |
| glacier | linear | 2d · calm · light · energy 0.3 | dither 0.6 (retro, poucos níveis) |
| halftone-noir | radial | 2d · editorial · mono · energy 0.4 | halftone 7 px, preto sobre branco |
| cyber-bloom | conic | 2d · electric · dark · energy 0.6 | swirl 0.5 + vignette 0.4 |
| twilight-haze | mesh | 2d · soft · mid · energy 0.3 | contrast 0.95, pastel |

## particle-forms

Renderer: `skills/particle-forms/templates/standalone.html` (three.js por import map).

### nebula-drift
- Eixos: 3d · dreamy · dark · motionEnergy 0.45 · density 0.6
- CONFIG: `{ "shape": "hopf", "seed": 4821, "count": 180000, "size": 1.95, "speed": 0.45, "flow": 0.35, "flowScale": 1.6, "pointer": 0.7, "pointerRadius": 1.2, "colorA": "#25B8FF", "colorB": "#B04DFF", "glow": 0.75, "glowSpread": 0.08, "glowCutoff": 0.21, "autoRotate": true, "rotateSpeed": 0.08, "dprMax": 1.5 }`
- Presets irmãos no template: `ember-knot` (torusKnot), `frost-galaxy` (galaxy), `abyss-lorenz` (lorenz). Abra com `?preset=<nome>`.

### Segunda leva (10 presets, 10 shapes novos)
Abrem com `?preset=<nome>`; shapes descritos em `skills/particle-forms/references/shapes.md`.

| preset | shape | Eixos | Diferencial |
| --- | --- | --- | --- |
| silk-membrane | membrane | 3d · calm · dark · energy 0.35 | folha ondulada teal, rotação lenta (0.05) pra revelar o relevo |
| coral-bloom | coral | 3d · organic · dark · energy 0.3 | 36 ramos rosa/âmbar |
| synapse | neuron | 3d · electric · dark · energy 0.5 | soma + 14 dendritos, glow alto |
| dust-tornado | tornado | 3d · dramatic · dark · energy 0.5 | hélice cônica, rotateSpeed 0.25, flow baixo (0.12) pra hélice não virar fumaça |
| gyro-core | gyroscope | 3d · tech · dark · energy 0.6 | 4 anéis, lima/ciano |
| wormhole | wormhole | 3d · dramatic · dark · energy 0.7 | hiperboloide torcido, glow 0.9 |
| ribbon-twist | ribbon | 3d · playful · dark · energy 0.45 | banda torcida, amarelo/coral |
| vortex-fall | vortex | 3d · dramatic · dark · energy 0.6 | funil de 3 braços inclinado pra câmera, branco/teal |
| cosmic-wave | cosmicWave | 3d · calm · dark · energy 0.5 | 11 linhas senoidais, sem autoRotate |
| magnetosphere | magnetosphere | 3d · tech · dark · energy 0.4 | linhas de campo dipolar roxo/laranja |

## orb-reactive

Renderer: `skills/orb-reactive/templates/standalone.html`. Abra com `?preset=<nome>`, `?state=<estado>`, `?level=0.8` (teste) ou `?s=`. API: `setState`, `setLevel`, `startMic`.

### core-teal
- Eixos: 2.5d · calm · dark · motionEnergy 0.4 · density 0.4
- CONFIG: `{ "colorBase": "#07262B", "colorInterior": "#050809", "accentDust": "#00C2A8", "accentStars": "#38E1FF", "accentAurora": "#FFC65C", "errorColor": "#FF3B30", "intensity": 0.95, "detail": 0.8, "glass": 0.35, "glow": 0.9, "speed": 0.8, "drift": 0.6, "audioBrightness": 1.2, "audioMotion": 0.55, "audioPulse": 0.85, "state": "idle", "quality": "balanced", "size": 264, "transparent": false, "grain": 0.03, "seed": 0, "dprMax": 1.5 }`

### ember-core
- Eixos: 2.5d · dramatic · dark · motionEnergy 0.5 · density 0.5
- CONFIG: core-teal com `{ "colorBase": "#1A0A05", "colorInterior": "#0B0302", "accentDust": "#FF8A1F", "accentStars": "#FFE6A7", "accentAurora": "#C8320E", "intensity": 1.05, "detail": 0.7, "glass": 0.3, "glow": 1.0, "speed": 0.9, "drift": 0.5 }`

### cyan-spiral
- Eixos: 2.5d · electric · dark · motionEnergy 0.6 · density 0.5
- CONFIG: core-teal com `{ "colorBase": "#04101C", "colorInterior": "#02070D", "accentDust": "#01BAEF", "accentStars": "#8AE9C1", "accentAurora": "#3A0CA3", "intensity": 1.0, "detail": 1.0, "glass": 0.4, "glow": 0.8, "speed": 1.0, "drift": 0.8 }`

### violet-nebula
- Eixos: 2.5d · dreamy · dark · motionEnergy 0.4 · density 0.6
- CONFIG: core-teal com `{ "colorBase": "#0A0014", "colorInterior": "#06000C", "accentDust": "#7209B7", "accentStars": "#F72585", "accentAurora": "#4CC9F0", "intensity": 1.1, "detail": 0.9, "glass": 0.35, "glow": 1.1, "speed": 0.7, "drift": 0.7 }`

### aurora-field
- Eixos: 2.5d · calm · dark · motionEnergy 0.3 · density 0.4
- CONFIG: core-teal com `{ "colorBase": "#061410", "colorInterior": "#03090A", "accentDust": "#19B5A8", "accentStars": "#C5F2E6", "accentAurora": "#9D4EDD", "intensity": 0.9, "detail": 0.6, "glass": 0.45, "glow": 0.85, "speed": 0.6, "drift": 0.9 }`

## text-motion

Renderer: `skills/text-motion/templates/standalone.html`. Abra com `?preset=<nome>`, `?text=<frase>`, `?trigger=mount|inview-once|inview-always|progress` ou `?s=`. Os 28 presets estão em `skills/text-motion/references/presets.md`; cada um já é uma entrada do catálogo (CONFIG = `{ "preset": "<nome>", "tension": 1, "friction": 1, "stagger": null, "delay": 0, "speed": 1, "trigger": "inview-once" }`).

### hero-rise (o default da página)
- Eixos: 2d · calm · dark · motionEnergy 0.4 · density 0.3
- Composição: h1 `rise-settle`, eyebrow `fade-letters`, lead `fade-cascade` com delay 500, h2 abaixo da dobra `stagger-reveal-lines`, parágrafo `unblur-lines` com delay 150.

## cursor-fx

Renderer: `skills/cursor-fx/templates/standalone.html`. Abra com `?preset=<nome>` (17 em `skills/cursor-fx/references/presets.md`), `?demo=0` desliga o ponteiro fantasma. Cada preset é uma entrada: CONFIG = o preset mais `{ "colorMode": "solid", "color": "#FFFFFF", "color2": "#C8FF5A", "hideNative": true }`.

## holo-material

Renderer: `skills/holo-material/templates/standalone.html` (three.js por import map). `?preset=black-gloss|holo|chrome|oil-slick|pearl-silk|aurora-foil`. API: `poke(x, y)`, `reset()`.

### holo
- Eixos: 3d · luxurious · dark · motionEnergy 0.4 · density 0.5
- CONFIG: `{ "baseColor": "#d9dde6", "rainbowStrength": 1.0, "patternSize": 14, "colorShift": 0.5, "glitter": 0.6, "finish": "glossy", "metallic": 0.95, "pearl": 0.1, "scratches": 0.5, "roughness": null, "clearcoat": null, "background": "#0b0c12", "brightness": 0.6, "reflections": 1.1, "toneMapping": "ACES", "cloth": { "cols": 40, "rows": 28, "stiffness": 1.0, "solverIterations": 10, "grabSize": 0.27, "wind": 0.6 }, "quality": "high", "autoSway": true, "seed": 7, "dprMax": 1.5 }`
- Irmãos: black-gloss, chrome, oil-slick, pearl-silk, aurora-foil (diffs em `PRESETS` do template).

## post-image-fx

Renderer: `skills/post-image-fx/templates/standalone.html`. `?preset=terminal|amber-binary|newsprint|film-noir|toxic-grid|cyber-rain|fluted|cross-reeded|rain|frosted`. Solte uma imagem ou vídeo em cima, ou `__lobo.loadFile(file)`.

### terminal
- Eixos: 2d · electric · dark · motionEnergy 0.1 · density 0.8
- CONFIG: `{ "mode": "ascii", "ink": "#39FF88", "paper": "#020904", "accent": "#39FF88", "exposure": 1.2, "contrast": 1.3, "ascii": { "charset": "classic70", "cellSize": 14, "glow": true, "bands": 16, "gamma": 0.7, "invert": false }, "post": { "scanlines": 0, "vignette": 0.25, "grain": 0.04, "crt": 0, "posterize": 0, "chroma": 0 } }`
- Irmãos: amber-binary, newsprint (ascii); film-noir, toxic-grid, cyber-rain (dither); fluted, cross-reeded, rain, frosted (refract).

Todas as sete famílias têm template testado. Novos presets entram aqui com screenshot e prompt. Cada uma tem SKILL.md com o procedimento; o primeiro preset de cada entra aqui quando passar pelo `visual-judge` e pelo `qa-motion`.

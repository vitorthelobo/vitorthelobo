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

## particle-forms

Renderer: `skills/particle-forms/templates/standalone.html` (three.js por import map).

### nebula-drift
- Eixos: 3d · dreamy · dark · motionEnergy 0.45 · density 0.6
- CONFIG: `{ "shape": "hopf", "seed": 4821, "count": 180000, "size": 1.95, "speed": 0.45, "flow": 0.35, "flowScale": 1.6, "pointer": 0.7, "pointerRadius": 1.2, "colorA": "#25B8FF", "colorB": "#B04DFF", "glow": 0.75, "glowSpread": 0.08, "glowCutoff": 0.21, "autoRotate": true, "rotateSpeed": 0.08, "dprMax": 1.5 }`
- Presets irmãos no template: `ember-knot` (torusKnot), `frost-galaxy` (galaxy), `abyss-lorenz` (lorenz). Abra com `?preset=<nome>`.

## Famílias sem preset ainda
orb-reactive · holo-material · text-motion · cursor-fx · post-image-fx. Cada uma tem SKILL.md com o procedimento; o primeiro preset de cada entra aqui quando passar pelo `visual-judge` e pelo `qa-motion`.

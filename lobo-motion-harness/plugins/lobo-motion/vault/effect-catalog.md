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

## Famílias sem preset ainda
holo-material · text-motion · cursor-fx · post-image-fx. Cada uma tem SKILL.md com o procedimento; o primeiro preset de cada entra aqui quando passar pelo `visual-judge` e pelo `qa-motion`.

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
| aurora-band | band | 2d · calm · dark · energy 0.4 | reconstrução do Aurora do React Bits: faixa roxo→verde→roxo, 1 camada, segue o cursor |
| aurora-trio | band | 2d · dreamy · dark · energy 0.5 | 3 camadas, teal→ciano→roxo→rosa |
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

## image-reveal

Renderer: `skills/image-reveal/templates/standalone.html`. Abra com `?preset=<nome>`, `?src=<url>` ou `?s=`. API: `play()`, `replay()`; `reveal` por scroll.

| preset | mode | Eixos | Diferencial |
| --- | --- | --- | --- |
| liquid-reveal | liquid | 2d · organic · any · energy 0.5 | limiar de fbm com borda clara; hover desloca |
| pixel-resolve | pixel | 2d · tech · any · energy 0.4 | mosaico 64 px que resolve |
| tiles-flip | tiles | 2d · editorial · any · energy 0.5 | 10 colunas crescendo em ordem diagonal |
| wipe-warp | wipe | 2d · dramatic · any · energy 0.5 | varredura a 20° com borda deformada |
| hover-ripple | ripple | 2d · playful · any · energy 0.4 | ondas concêntricas no ponteiro |
| hover-liquid | displace | 2d · dreamy · any · energy 0.5 | fbm animado + velocidade do ponteiro |

## grid-dots-field

Renderer: `skills/grid-dots-field/templates/standalone.html` (canvas 2D). Abra com `?preset=<nome>` ou `?s=`.

| preset | mode | Eixos | Diferencial |
| --- | --- | --- | --- |
| dot-matrix | dots | 2d · tech · dark · energy 0.3 | pontos brancos acendendo em ciano |
| blueprint | lines | 2d · precise · dark · energy 0.25 | traços orientados pelo ruído, azul |
| plus-grid | plus | 2d · tech · dark · energy 0.4 | cruzes lima, warp alto |
| sonar | ring | 2d · tech · dark · energy 0.6 | anéis com onda radial pulsando, hover pull |
| ascii-rain | ascii | 2d · hacker · dark · energy 0.7 | glifos `.:-=+*#%@` pela energia |
| star-dust | star | 2d · premium · dark · energy 0.3 | estrelas de 5 pontas, hover glow |
| diamond-net | diamond | 2d · electric · dark · energy 0.4 | losangos magenta→ciano, hover push |
| topo | triangle | 2d · organic · dark · energy 0.2 | warp 0.8 em frequência baixa (mapa), hover scatter |

## 3d-object-scene

Renderer: `skills/3d-object-scene/templates/standalone.html` (three.js). Abra com `?preset=<nome>`, `?src=<glb>` ou `?s=`.

| preset | objeto · material | Eixos | Diferencial |
| --- | --- | --- | --- |
| chrome-knot | torusKnot · chrome | 3d · premium · dark · energy 0.35 | roughness 0.08, clearcoat 0.6, rim ciano |
| frosted-glass | icosahedron · glass | 3d · tech · dark · energy 0.25 | transmission 0.9, iridescence 0.35, env 2.2 |
| clay-sphere | sphere · clay | 3d · soft · dark · energy 0.2 | roughness 0.9, luz quente |
| oil-capsule | capsule · iridescent | 3d · premium · dark · energy 0.4 | iridescence 1, clearcoat 1, rim magenta |
| wire-gem | dodecahedron · wire | 3d · tech · dark · energy 0.3 | LineSegments lima |
| gold-logo | box · metal | 3d · premium · dark · energy 0.3 | ouro #D4A017, substitua o box pelo GLB do logo |

## morph-transition

Renderer: `skills/morph-transition/templates/standalone.html` (three.js). Abra com `?preset=<nome>`, `?t=0.5` ou `?s=`. API: `morphTo(shape)`, `next()`.

| preset | sequence | Eixos | Diferencial |
| --- | --- | --- | --- |
| sphere-to-knot | sphere → torusKnot → galaxy → hopf | 3d · dreamy · dark · energy 0.6 | scatter 0.6, stagger 0.35 |
| bloom-cycle | lotus → coral → membrane → neuron | 3d · organic · dark · energy 0.5 | rosa → verde-água |
| tech-rings | gyroscope → wormhole → magnetosphere → ribbon | 3d · tech · dark · energy 0.6 | easing elastic |
| storm | tornado → vortex → cosmicWave → lorenz | 3d · dramatic · dark · energy 0.8 | scatter 0.9, cutoff 0.38 |
| scroll-driven | sphere → galaxy | 3d · calm · dark · energy 0.4 | `auto: false`; `t` pelo scroll |

### Hover
Cinco modos em todos os presets (`hover`): push, pull, vortex, scatter, glow; sliders `pointer`, `pointerRadius`, `hoverGlow`, `hoverSoft`. Presets com modo próprio: ember-knot vortex, frost-galaxy glow, abyss-lorenz scatter, synapse pull, fireflies scatter, glitter-dust glow, ink-swirl vortex, lobo-glyph scatter, starfield glow, atom-orbits pull, phyllotaxis vortex, heartbeat pull, digital-matrix scatter.

### Terceira leva (30 presets: tipos de partícula)
Cada um combina forma × sprite × movimento × cor × blend. Abrem com `?preset=<nome>`.

| preset | shape · sprite · motion · colorMode · blend | Eixos | Lê como |
| --- | --- | --- | --- |
| snowfall | volume · disc · fall · random · normal | 3d · calm · dark · energy 0.3 | neve lenta, flocos opacos de 4 brancos |
| rain-streaks | volume · streak · fall ×3 · depth · add | 3d · dramatic · dark · energy 0.9 | chuva em riscos, longe mais escura |
| embers-rise | volume · bokeh · rise · axis · add | 3d · warm · dark · energy 0.6 | brasas subindo e cintilando |
| fireflies | scatter · bokeh · drift · random · add | 3d · dreamy · dark · energy 0.3 | 2.5k vagalumes piscando |
| confetti-burst | scatter · square · fall · random · normal | 3d · playful · dark · energy 0.6 | confete opaco girando (spin 1.6) |
| glitter-dust | disc · star · swirl · radial · add | 3d · premium · dark · energy 0.4 | estrelinhas de 4 pontas cintilando |
| starfield | volume (z 3) · dot · drift · depth · add | 3d · calm · dark · energy 0.15 | céu com profundidade |
| pixel-lattice | lattice · square · flow · axis · normal | 3d · tech · dark · energy 0.3 | cubo de pixels magenta→azul |
| dna-helix | helixDna · ring · flow · index · add | 3d · tech · dark · energy 0.4 | dupla hélice com gradiente de 4 cores |
| phyllotaxis | phyllotaxis · disc · pulse · radial · add | 3d · organic · dark · energy 0.4 | girassol respirando |
| mobius-band | mobius · dot · flow · axis · add | 3d · precise · dark · energy 0.3 | fita de Möbius ciano→magenta |
| atom-orbits | atom · bokeh · orbit ×1.6 · radial · add | 3d · tech · dark · energy 0.7 | elétrons correndo nas órbitas |
| saturn | saturn · dot · orbit · depth · add | 3d · calm · dark · energy 0.25 | planeta com anel e divisão |
| fountain-spray | fountain · streak · jitter · axis · add | 3d · fresh · dark · energy 0.7 | jato de água em arcos |
| lissajous-string | lissajous · disc · flow · index · add | 3d · electric · dark · energy 0.4 | corda luminosa de 4 cores |
| lobo-glyph | glyph "LOBO" · dot · jitter · axis · add | 3d · brand · dark · energy 0.3 | palavra em partículas (troque `text`) |
| jellyfish-glow | jellyfish · disc · pulse · axis · add | 3d · dreamy · dark · energy 0.5 | medusa pulsando |
| superformula | superformula · diamond · flow · radial · add | 3d · organic · dark · energy 0.3 | flor geométrica (seed muda os lóbulos) |
| bubbles-rise | volume · ring · rise · depth · add | 3d · fresh · dark · energy 0.4 | 4k bolhas subindo |
| smoke-plume | volume (1.4×3) · disc 26 px · rise · axis · normal | 3d · soft · dark · energy 0.3 | fumaça opaca |
| pollen-drift | scatter · bokeh · drift · random · add | 3d · soft · dark · energy 0.25 | 1.8k grãos de pólen |
| neon-cross-field | disc · cross · swirl · flow · add | 3d · electric · dark · energy 0.5 | campo de cruzes neon girando |
| asteroid-belt | ring · dot · orbit · depth · add | 3d · calm · dark · energy 0.3 | cinturão de 140k rochas |
| digital-matrix | lattice · square · fall ×1.4 · axis · add | 3d · hacker · dark · energy 0.7 | chuva de quadrados verdes |
| sand-storm | volume (x 4) · dot · fall ×2.2 · random · normal | 3d · dramatic · dark · energy 0.9 | areia opaca em 4 tons |
| ink-swirl | sphere · disc · swirl ×1.4 · flow · add | 3d · editorial · dark · energy 0.6 | tinta prata girando |
| hologram-scan | cylinder · dot · orbit · axis · add | 3d · tech · dark · energy 0.4 | cilindro holográfico cintilando |
| heartbeat | heart · disc · pulse ×1.3 · radial · add | 3d · warm · dark · energy 0.6 | coração batendo |
| triangle-mesh | sphere · triangle · orbit · random · normal | 3d · playful · dark · energy 0.3 | 9k triângulos opacos girando |
| aurora-curtain | membrane · streak · drift · axis · add | 3d · dreamy · dark · energy 0.4 | cortina de riscos verde→roxo |

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

Todas as onze famílias têm template testado. Novos presets entram aqui com screenshot e prompt. Cada uma tem SKILL.md com o procedimento; o primeiro preset de cada entra aqui quando passar pelo `visual-judge` e pelo `qa-motion`.

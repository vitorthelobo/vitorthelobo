---
name: 3d-object-scene
description: Monta uma cena 3D de produto ou logo — GLB do cliente ou objeto procedural — com material físico (chrome, vidro, clay, iridescente, metal, wire), ambiente PMREM, luzes key/rim, auto-rotação e órbita limitada por arrasto, com tiers e fallback. Use quando o usuário pedir "logo em 3D", "produto girando", "objeto 3D no hero", "mostra o GLB", "cena 3D", "vidro 3D", "cromado girando".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# 3D Object Scene

`templates/standalone.html` é a referência: three.js por import map, `MeshPhysicalMaterial` com todas as chaves físicas no CONFIG, RoomEnvironment em PMREM, key + rim + hemisfério, arrasto com inércia (sem OrbitControls), GLB normalizado e centrado, procedural como fallback, prewarm, tiers. Schema em `references/config-schema.md`; valores por material em `references/materials.md`. `optimize-3d-scene` cuida do peso depois.

## 0. Intake
- Objeto: GLB (URL/arquivo), logo em SVG pra extrudar, ou procedural (torusKnot, icosahedron, sphere, capsule, box, dodecahedron, torus).
- Material pelo brief: luxo → chrome/metal; tech → glass/iridescent; humano/soft → clay; esquema/blueprint → wire.
- Interação: só gira sozinho, ou o usuário arrasta? Scroll gira (`scroll-grammar` scrub em `rotationY` via `setConfig({ tiltX })` ou `rotateSpeed`)?
- Fundo: a cena tem `bg` sólido; pra ficar sobre um shader-background, `alpha: true` no renderer e `setClearColor(0, 0)` (uma linha, e cuide de ter um só canvas pesado).

## 1. CONFIG
`preset, src, object, material, color, bg, roughness, metalness, transmission, ior, iridescence, clearcoat, envIntensity, exposure, keyColor, rimColor, autoRotate, rotateSpeed, tiltX, cameraZ, scale, wire, drag, seed, dprMax`.

## 2. Técnica
- Pivot `Group` recebe rotação; o mesh fica em (0,0,0). GLB: `Box3` → centraliza e escala pra 2 unidades.
- Material único compartilhado (GLB com várias malhas usa o mesmo): consistência e um programa só.
- Arrasto: `pointerdown/move/up` com `setPointerCapture`; velocidade vira inércia (`×0.9` por frame a 60 Hz), `tiltX` limitado a ±1.2 rad. `touch-action: pan-y` deixa a página rolar.
- Loop para quando não há autoRotate e a inércia assentou (`settling` < 1e-3).
- Tiers: phone tessela pela metade (`detail`), DPR 1.25. Vidro (`transmission`) custa um render extra da cena; em phone considere `roughness` maior e `envIntensity` menor em vez de desligar.

## 3. Regras
- Nenhuma cor literal: luzes, clear color e material leem o CONFIG.
- Sem sombras (shadow map = 1 render extra + aliasing); profundidade vem do rim e do ambiente.
- Nunca OrbitControls em hero (zoom e pan roubam o scroll); a órbita limitada é proposital.
- GLB > 2 MB: avise e rode `optimize-3d-scene` (Draco/meshopt, texturas KTX2) antes de publicar.
- `preserveDrawingBuffer` nunca; screenshot é pelo Playwright.

## 4. Verifique e registre
`screenshot-grid` nos dois tiers (prewarm: o primeiro frame já tem o objeto), `check-motion` (reduced motion: parado e desenhado uma vez; bot sem WebGL), `context-loss-probe`, `fps-probe` (triângulos em `stats.triangles`; vidro em phone é o teste que importa). Entrada no catálogo com objeto, material e peso do GLB.

# CONFIG schema · holo-material

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | enum | black-gloss, holo, chrome, oil-slick, pearl-silk, aurora-foil | holo | |
| baseColor | hex | | #d9dde6 | cor difusa / metálica |
| rainbowStrength | number | 0..1 | 1 | `iridescence` do MeshPhysicalMaterial (thin-film físico) |
| patternSize | number | 2..40 | 14 | escala do ruído que modula a espessura do filme (bandas) |
| colorShift | number | 0..1 | 0.5 | desloca a faixa de espessura (100..1200 nm) |
| glitter | number | 0..1 | 0.6 | pontos de rugosidade baixa (brilhos) |
| finish | enum | glossy, satin, matte | glossy | define roughness, clearcoat e clearcoatRoughness |
| metallic | number | 0..1 | 0.95 | |
| pearl | number | 0..1 | 0.1 | sheen |
| scratches | number | 0..4 | 0.5 | normal map procedural de riscos |
| roughness, clearcoat | number ou null | 0..1 | null | sobrescrevem o finish |
| background | hex | | #0b0c12 | |
| brightness | number | 0..1 | 0.6 | intensidade da key light |
| reflections | number | 0..2 | 1.1 | envMapIntensity (RoomEnvironment via PMREM) |
| toneMapping | enum | ACES, AgX, Neutral | ACES | |
| cloth.cols, cloth.rows | integer | 8..60 | 40, 28 | grade (phone usa metade) |
| cloth.stiffness | number | 0..2 | 1 | rigidez das constraints |
| cloth.solverIterations | integer | 2..20 | 10 | «solver accuracy» (phone ≤ 6) |
| cloth.grabSize | number | 0.05..0.6 | 0.27 | raio do agarre em unidades de cena |
| cloth.wind | number | 0..2 | 0.6 | vento procedural |
| quality | enum | low, medium, high | high | low limita iterações a 4 |
| autoSway | bool | | true | câmera balança devagar |
| seed, dprMax | | | 7, 1.5 | |

## API (`window.__lobo`)
`setConfig`, `exportState`, `poke(x, y)` (impulso radial em coordenadas de cena), `reset()` (reconstrói o tecido), `stats` (particles, grabbing, links, tier).

## Interação
Arrastar sobre o tecido agarra as partículas dentro de `grabSize`; clicar fora cutuca. Em touch, um toque cutuca. Raycast sempre no plano z = 0, nunca na malha.

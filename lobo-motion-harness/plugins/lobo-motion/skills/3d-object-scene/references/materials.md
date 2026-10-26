# Materiais prontos (valores das chaves físicas)

| material | roughness | metalness | transmission | ior | iridescence | clearcoat | envIntensity | Nota |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| chrome | 0.05–0.12 | 1 | 0 | 1.5 | 0 | 0.4–0.8 | 1.2–1.6 | `color` claro (#E8E8EE); o ambiente é o que aparece |
| metal (ouro, cobre) | 0.25–0.4 | 1 | 0 | 1.5 | 0 | 0.2–0.4 | 1.1–1.4 | ouro #D4A017, cobre #B87333, alumínio #D9D9D9 |
| glass | 0.0–0.15 (clear) · 0.3–0.5 (frosted) | 0 | 1 | 1.45–1.52 | 0 | 0 | 1.0–1.3 | `color` quase branco; `bg` escuro ou o vidro some |
| clay / matte | 0.85–1 | 0 | 0 | 1.5 | 0 | 0 | 0.6–0.9 | a cor manda; rim forte dá volume |
| iridescent (oil, beetle) | 0.15–0.3 | 0.5–0.8 | 0 | 1.5 | 1 | 1 | 1.3–1.6 | `color` escuro (#101014); iridescenceIOR 1.3 fixo |
| wire | — | — | — | — | — | — | 0.5 | `wire: 1`, cor = `color`, opacidade 0.85 |

## Luz
- Key (2.5, 3, 2.5) intensidade 2, cor `keyColor`; rim (−3, 1.5, −2.5) 1.6, cor `rimColor`; hemisfério 0.35. Ambiente PMREM da RoomEnvironment dá os reflexos.
- Metal e vidro vivem do ambiente: `envIntensity` ≥ 1.2. Clay vive das luzes: `envIntensity` ≤ 0.9.

## GLB do cliente
- Exporte com Draco **desligado** (o loader Draco é mais um worker + wasm; só compense acima de 5 MB) e normais incluídas.
- Materiais do GLB são **substituídos** pelo `MeshPhysicalMaterial` do CONFIG (consistência com o preset). Pra manter os do arquivo, troque a linha `o.material = mat` por `o.material.envMapIntensity = cfg.envIntensity`.
- Logo em extrusão: SVG → Blender (extrude 0.2, bevel 0.02) → GLB. Ou `ExtrudeGeometry` a partir do path com `SVGLoader` (ver `optimize-3d-scene`).

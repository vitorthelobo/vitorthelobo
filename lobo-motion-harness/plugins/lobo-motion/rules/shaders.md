---
paths:
  - "**/*.glsl"
  - "**/*.frag"
  - "**/*.vert"
  - "**/shaders/**"
  - "**/*shader*"
description: Shaders GLSL e WebGL. Uniforms, cores, tempo, precisão, compilação.
---

# Shaders neste harness

Cookbook: `${CLAUDE_PLUGIN_ROOT}/skills/shader-background/references/glsl-cookbook.md`

1. **Cor entra por uniform.** Nenhuma cor de marca literal dentro do shader. A paleta vem do CONFIG e o shader só interpola (de preferência em OKLab).
2. **Tempo em segundos, um relógio só.** `uTime` em segundos, `uDelta` clampado em 0.05. `frameCount` nunca é tempo.
3. **Resolução e DPR como uniforms.** `uResolution` em pixels do framebuffer. `uPixelScale = renderDpr / baseDpr` corrige `gl_PointSize` quando o DPR é clampado.
4. **Ruído vem do cookbook.** `snoise`, `fbm`, `curlNoise`, SDFs e paletas estão escritos e testados. Inclua, não reescreva.
5. **Precisão explícita.** `precision highp float` em simulação; `mediump` em visual quando o celular aguenta.
6. **Compile tudo na construção.** Toda variante (defines, blending, luzes, tone mapping) existe desde o primeiro frame. Mudança em runtime é só uniform.
7. **Tier muda contagem, DPR e passes.** Nunca a fórmula. Um preset precisa parecer o mesmo no celular e no desktop, só mais barato.
8. **Teste o shader isolado.** Um shader que não compila em WebGL2 headless não entra no catálogo. `tools/qa/screenshot-grid.mjs` falha se o canvas ficar preto.

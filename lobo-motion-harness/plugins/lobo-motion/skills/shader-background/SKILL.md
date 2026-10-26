---
name: shader-background
description: Constrói ou afina um background procedural animado em WebGL2 cru (fragment shader lendo um CONFIG map) com gradiente de 2 a 6 cores misturado em OKLab, 11 campos (linear, radial, conic, mesh, warped, aurora, rays, ripples, stripes, caustics, blobs), swirl, movimento por ruído, grain e efeitos empilháveis (dither, halftone, vinheta). Entrega HTML standalone, componente e build prompt. Use quando o usuário pedir "shader background", "gradiente animado", "fundo procedural", "mesh gradient", "aurora de fundo", "background de hero", ou quando pedir pra afinar cores, swirl, zoom, grain ou velocidade de um background existente.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Shader background

Leia antes de escrever código: `references/config-schema.md` (as chaves e ranges), `references/glsl-cookbook.md` (ruído, OKLab, SDFs, grain, dither) e `vault/effect-catalog.md` (presets existentes). O template `templates/standalone.html` já implementa tudo o que as hard rules exigem: copie-o, não comece do zero.

## 0. Intake
- Brief nos cinco eixos (dimensionality é sempre 2d aqui): mood, tone, motionEnergy, density. Faltando, pergunte uma vez e assuma calm · dark · 0.3 · 0.2.
- Referências: 1 a 3 imagens ou um preset do catálogo. A paleta sai da referência, nunca de adjetivo.
- Alvo: `standalone` (um HTML, sem build), `react` (componente com o mesmo shader) ou `vanilla` (módulo). Desconhecido, pergunte.

## 1. CONFIG primeiro
Preencha o objeto completo com todas as chaves do schema, inclusive `seed`. Escolha `shape` pelo brief:

| Brief diz | shape |
| --- | --- |
| direção, varredura, luz entrando | linear |
| foco, vinheta, respiração | radial |
| giro, relógio, espectro | conic |
| manchas, nuvem, aquarela | mesh |
| fluido, seda, óleo | warped |
| aurora boreal, cortina de luz | aurora |
| sol, farol, explosão de luz | rays |
| gota na água, sonar, pulso | ripples |
| listras, tecido, zebra | stripes |
| fundo de piscina, água rasa | caustics |
| lava lamp, bolhas, metaballs | blobs |

Paleta: 4 ou 5 stops, do escuro pro claro, com um stop de acento na posição 0.5 a 0.75. Mistura é em OKLab no shader, então cores saturadas não lavam.

## 2. Shader
- Copie `templates/standalone.html`. O fragment lê **só uniforms**; a única mudança de código aceitável é em `shapeT()` (o campo) e nos efeitos empilháveis.
- `dither`, `halftone` e `vignette` já existem como chaves planas (0 = off). Para um efeito novo (luz, glass, pixelate): adicione a chave no CONFIG, um uniform `uX` e um bloco no fragment aplicado na ordem shape → dither → gradient → contrast → halftone → vignette → grain. Funções no cookbook.
- Nunca troque define ou precisão em runtime. Tudo que muda é uniform.

## 3. Tiers e sobrevivência (o template já faz; não remova)
- DPR: `min(cfg.dprMax, phone ? 1.25 : 1.5, devicePixelRatio)`. Resize só quando tamanho ou DPR mudam.
- Loop só visível e na viewport; sem frame cap; `dt` clampado em 50 ms; tempo em segundos.
- `prefers-reduced-motion`: desenha uma vez e redesenha só em resize ou mudança de CONFIG.
- User agent de bot: classe `static`, gradiente CSS com as cores do CONFIG, nenhum WebGL.
- `webglcontextlost` com `preventDefault`, rebuild no restore.

## 4. Verifique
```bash
node ${CLAUDE_PLUGIN_ROOT}/tools/qa/screenshot-grid.mjs --url <arquivo.html> --out qa-shots --times 1,3,8
node ${CLAUDE_PLUGIN_ROOT}/tools/qa/fps-probe.mjs --url <arquivo.html>
node ${CLAUDE_PLUGIN_ROOT}/tools/qa/check-motion.mjs --url <arquivo.html>
node ${CLAUDE_PLUGIN_ROOT}/tools/qa/context-loss-probe.mjs --url <arquivo.html>
${CLAUDE_PLUGIN_ROOT}/scripts/verify-motion.sh <pasta>
```
Leia as screenshots (Read). Bar: nenhuma em branco, 1 programa linkado e nenhum depois do settle, reduced motion assenta com canvas visível, bot sem WebGL, contexto volta. Compare a screenshot de 3 s com a referência: paleta, direção, densidade.

## 5. Exporte e registre
- `standalone.html` com o CONFIG inline no topo e o estado na URL (`window.__lobo.exportState()`).
- Componente React quando o alvo pede: mesmo shader, CONFIG via props, mesmo ciclo de vida (useEffect monta, limpa no unmount).
- Build prompt pela skill `build-prompt`; teste em diretório limpo.
- Entrada no `vault/effect-catalog.md` pela skill `catalog-entry`.

## Erros comuns
- Mistura de cor em sRGB (fica cinza no meio): use OKLab como no template.
- Grain fixo por pixel de CSS: multiplique `grainSize` pelo DPR, ou o grão muda de tamanho entre telas.
- `uniform vec3 uColors[6]` lido por `getUniformLocation("uColors")`: alguns drivers exigem `"uColors[0]"`.
- Esquecer `seed` no CONFIG: o preset vira irreprodutível.

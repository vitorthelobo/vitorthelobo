---
tags: [knowledge, performance]
updated: 2026-10-25
---

# Fix catalog

Correções que moveram um número medido. Grau de evidência: **rule** (segurou em 3 ou mais projetos) ou **observed** (1 a 2; teste e meça antes de assumir). Entradas marcadas `fonte: Textura` vêm do fix-catalog público do next16-claude-starter (domínio público) e ainda não foram re-medidas neste harness. Formato: [[templates/catalog-entry]].

## 1. Frames e tempo

### Sem frame cap fixo em celular · rule · fonte: Textura (5 sites)
- Sintoma: «parece pouco fps» num iPhone, mesmo com scroll limpo.
- Causa: `t - last <= 1000/30` desenha a cada 3º frame em 60 Hz (20 fps) e a cada 5º em 120 Hz (26 fps).
- Correção: tirar o cap, pagar com DPR, contagem e passes. Medido: 26 → 120 fps em repouso, scroll igual ou melhor.

### Incremento por frame escalado por dt · rule · fonte: Textura
- Sintoma: cena «2 a 4 vezes rápida e tremendo» num celular de 120 Hz.
- Correção: `x += k * dt * 60`; `lerp(a, b, 1 - pow(1 - k, dt * 60))`; dt clampado; um relógio em segundos.

## 2. Fill e GPU

### DPR clampado por tier, renderer e composer · rule · fonte: Textura (3 sites)
- Correção: phone 1 a 1,5, tablet até 1,5, desktop até 1,5. Medido: PC «janky» 4,8% → «ideal» 0,2%.
- Armadilha: abaixo de 1 vira ruído; em `THREE.Points` o tamanho muda, multiplique por `uPixelScale`.

### Partícula invisível sai do clip no vertex shader · observed · fonte: Textura
- Com blending aditivo, ponto com brilho zero não soma nada: `gl_Position = vec4(2.0, 2.0, 2.0, 1.0)`. Medido: 7,8 → 4,6 ms de GPU por frame, imagem idêntica.

### Raycast na forma analítica, não na malha · observed · fonte: Textura
- `intersectObject` numa malha densa por `pointermove` segurou 1 a 3% de frames dropados sozinho; `ray.intersectPlane` ou esfera: 0%.

## 3. Carga

### Pré-aquecer contra os targets reais · rule · fonte: Textura (4 sites)
- Com pós-processamento, o prewarm contra a tela re-linka tudo no primeiro frame. Medido: primeiro frame 1032 → 48 ms aquecendo contra os targets do composer.

### Geometria pesada em Worker · rule · fonte: Textura (6 sites)
- Amostragem de 140k pontos num `useMemo`: 2,6 s a 4x CPU. Em Worker: TBT mobile 4,3 → 0,2 s, performance 52 → 85.

## 4. iOS

### Caixa da cena em lvh · rule · fonte: Textura (4 sites)
- Sintoma: «a cena pisca no scroll». Causa: barra do Safari muda `innerHeight`, o renderer realoca. Correção: `100lvh` medido uma vez, remedido em touch só na largura.

### Recuperar contexto perdido · rule · fonte: Textura
- iOS derruba o contexto sob pressão de memória e nada reconstrói. Correção: `preventDefault` no `webglcontextlost`, rebuild ao voltar pra viewport, `forceContextLoss` no teardown. Prova: `tools/qa/context-loss-probe.mjs`.

## Medido neste harness
_(vazio; a primeira entrada entra quando um preset passar pelo perf-auditor com antes e depois)_

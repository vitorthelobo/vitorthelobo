---
paths:
  - "**/*scene*"
  - "**/*Scene*"
  - "**/*canvas*"
  - "**/*webgl*"
  - "**/*three*"
  - "**/*.worker.ts"
  - "**/*.worker.js"
description: Cenas WebGL, three.js e canvas. Viewport, frame rate, tempo, perda de contexto.
---

# Cenas (three.js, WebGL cru, canvas)

Skill completa: `optimize-3d-scene`. Cada linha abaixo foi defeito em celular real que nenhum instrumento de laboratório viu (fonte: fix-catalog da Textura, confirmado em 3 ou mais sites).

1. **Caixa no large viewport.** Cena full-screen em `100lvh`, medida uma vez, remedida em touch só quando a **largura** muda. Nunca `h-dvh`, `fixed inset-0` ou `innerHeight` em volta de um canvas: a barra do Safari redimensiona no meio do scroll e o renderer realoca (frame em branco = «flicker»).
2. **Resize só em mudança real.** Pule um resize cujo tamanho CSS e DPR não mudaram; depois de um real, desenhe na hora.
3. **Nunca pare de desenhar um canvas visível.** Pause só fora da tela (IntersectionObserver com uma viewport de margem). iOS descarta o último frame depois de um resize de toolbar.
4. **Perda de contexto é recuperável.** `webglcontextlost` com `preventDefault`, rebuild em contexto novo quando a cena volta pra viewport, `forceContextLoss` em todo teardown.
5. **Tempo em segundos, um relógio.** Todo `+=` por frame escalado por `dt`; `lerp(a, b, k)` vira `lerp(a, b, 1 - pow(1 - k, dt * 60))`. Um celular de 120 Hz roda o dobro sem isso.
6. **Sem frame cap fixo em celular.** `t - last < 1000/30` desenha 20 fps num painel de 60 Hz e 26 num de 120. Pague com frame mais barato (DPR, contagem, passes). Desktop em painel de 120 Hz: gate do draw a cada 12,5 ms, easing continua por tick.
7. **DPR entre 1 e 1,5.** Abaixo de 1 vira ruído; 3x é 9 vezes o fill por nada. Clampe renderer **e** composer pela mesma função.
8. **Robot form e reduced motion.** User agent de bot recebe uma imagem estática, sem download de three. `prefers-reduced-motion`: toca a entrada, para de avançar o tempo, continua desenhando.
9. **Pré-aqueça debaixo do loader.** Compile shaders, suba texturas e rode cada pass de pós uma vez antes do primeiro frame visível. `programs.length` não pode crescer depois do loader.

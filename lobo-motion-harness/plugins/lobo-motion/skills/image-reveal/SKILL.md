---
name: image-reveal
description: Constrói efeitos de imagem para hero e galeria — reveal líquido, pixel que resolve, tiles, wipe deformado, ripple e líquido no hover — num único shader WebGL2 sobre a imagem do cliente, com object-fit cover, fallback em <img> (SEO) e progresso por scroll. Use quando o usuário pedir "imagem com efeito no hover", "reveal da foto", "distorção na imagem", "ripple na imagem", "pixelado que resolve", "imagem de produto animada", "galeria com efeito".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Image Reveal

`templates/standalone.html` é a referência: textura + fragment shader com `reveal` (0..1) e `hover`, 6 modos, amostra procedural quando não há `src`, `<img>` no fallback (robot form vê a imagem de verdade), prewarm, context loss recarrega a textura. Schema em `references/config-schema.md`. Diferença pro `post-image-fx`: lá o tratamento é contínuo (ASCII, dither, vidro); aqui é **entrada e interação**.

## 0. Intake
- A imagem: URL com CORS (`crossOrigin = "anonymous"`) ou arquivo local no projeto. Sem imagem, a amostra serve pra calibrar.
- Entrada ou interação? Entrada → `liquid`, `pixel`, `tiles`, `wipe` com `autoReveal`. Interação → `ripple`, `displace` com `reveal: 1`.
- Scroll? `autoReveal: false` e `scroll-grammar` escrevendo `reveal` (scrub) ou chamando `play()` (switch).
- Galeria com N imagens: um canvas por imagem é caro acima de 4 visíveis; use um canvas por imagem **só na viewport** (o IO do template já faz isso) ou um atlas.

## 1. CONFIG
`preset, src, mode, reveal, autoReveal, duration, hover, hoverRadius, noiseScale, pixelSize, tiles, direction, edge, tint, speed, seed, dprMax`.

## 2. Técnica
- `cover` em uv: `uScale` calculado no JS pelo aspecto do canvas vs da imagem; a textura nunca distorce.
- Reveal é uma máscara (0..1) por modo, multiplicada na cor; liquid e wipe somam a borda clara (`tint`) enquanto `r < 1`.
- Hover é deslocamento em uv em volta do ponteiro (`smoothstep(radius, 0, dist)`); displace usa também a velocidade do ponteiro (lerp por dt).
- O rAF roda só enquanto anima, há ponteiro ativo nos modos com tempo, ou `reveal < 1`. Imagem parada = zero frames.
- `UNPACK_FLIP_Y_WEBGL` pra uv de cima pra baixo igual ao DOM.

## 3. Regras
- Imagem sempre no `<img>` do fallback (SEO, bot, sem WebGL). Em produção, com `src` real, ponha `alt`.
- Textura: no máximo 2048 px no lado maior em phone (redimensione no servidor; não no cliente).
- Reduced motion: `reveal = 1` na hora; hover desligado.
- Nunca `texImage2D` por frame; só no load e no restore.
- Um efeito de imagem com `displace` + um shader-background com bloom na mesma viewport pesa; escolha um.

## 4. Verifique e registre
`screenshot-grid` em dois instantes (`?s=` com `reveal: 0.45, autoReveal: false` e o estado final); `page.mouse.move` pra ripple/displace; `check-motion` (reduced motion mostra a imagem inteira; bot tem `<img>` e zero contextos); `context-loss-probe` (a textura volta). Entrada no catálogo.

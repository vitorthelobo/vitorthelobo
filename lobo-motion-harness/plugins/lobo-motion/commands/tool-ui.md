---
description: Construir o tuner (painel, presets, favoritos, URL state, exports) de uma família de efeitos
argument-hint: <família> [--target leva|vanilla]
---

Construa o tuner para: **$ARGUMENTS**

Siga a skill `effect-tool-ui`. Antes: confirme que o renderer da família expõe `window.__lobo` (ou o contrato equivalente) com `config`, `presets`, `setConfig` e `exportState`; se não expõe, adicione isso ao template primeiro (é parte do contrato, não da UI).

Ordem: painel gerado do schema → presets com miniaturas → favoritos como diff em localStorage → randomize com ranges → new variation por seed → `?s=` na URL → exports (PNG no mesmo tick, vídeo por MediaRecorder, HTML standalone, prompt via `build-prompt`).

Verifique: carregar o `?s=` de um favorito reproduz a screenshot; PNG exportado não é preto; `setConfig` de chave inválida aparece como `ignored` na UI. Em `(pointer: coarse)` o painel só aparece após «Tune».

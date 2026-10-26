---
tags: [knowledge, pitfalls]
updated: 2026-10-25
---

# Pitfalls

Leituras que enganam e armadilhas de ferramenta. Cada uma custou tempo real em algum lugar.

## Medição
- **SwiftShader não é GPU.** fps absoluto em Chrome headless não significa nada. Só contagens transferem: draws, programs linkados, frames desenhados, duração de bloqueio da main thread. `tools/qa/fps-probe.mjs` reporta contagens por esse motivo.
- **User agent de bot ou headless recebe o robot form.** O template serve a imagem estática pra `HeadlessChrome`, `bot`, `crawl`, `lighthouse`. Uma sonda com o UA padrão do Playwright «prova» que a cena sumiu. Todas as ferramentas em `tools/qa` setam UA de Chrome de pessoa; os seus scripts precisam fazer o mesmo. (Confirmado no GetLayers: o UA headless recebe a página sem canvas.)
- **`networkidle` nunca dispara em alguns servidores.** Use `load` mais um settle fixo.
- **Dev server dobra tudo.** Strict Mode monta duas vezes, chunks chegam cedo. Meça só build de produção.
- **Uma máquina compartilhada move números.** Intercale A e B (velho, novo, velho, novo).

## WebGL
- **Uniform array em WebGL2:** `getUniformLocation('uColors[0]')`, não `'uColors'` em alguns drivers. Use `[0]`.
- **`toDataURL` de canvas WebGL devolve preto** sem `preserveDrawingBuffer`. Pra sondar pixels, tire screenshot da página.
- **Trocar define, blending ou contagem de luzes em runtime recompila o programa.** Fixe a variante na construção e mude só uniforms.
- **`gl_PointSize` é em pixels do framebuffer.** Clampar DPR muda o tamanho do ponto; corrija com `uPixelScale`.

## CONFIG e estado
- **`atob` não lê base64url.** Troque `-` por `+` e `_` por `/` antes.
- **Chave desconhecida no `?s=` não pode virar knob.** `setConfig` ignora e devolve `ignored`; o prompt só carrega chaves do schema.
- **Seed é parte do CONFIG.** Preset sem seed é irreprodutível; dois CONFIGs iguais precisam dar o mesmo frame.

## Agentes
- **Rules disparam na leitura, não na escrita.** Um arquivo criado do zero pode nunca disparar sua rule. O que precisa valer sempre vive em `verify-motion.sh` e nos hooks.
- **O agent não vê o que o outro viu.** Relatório de agent precisa listar arquivos, CONFIG final e números, não «ficou bom».

## Calibração visual (segunda leva de presets)
- **Curl noise come forma fina.** Hélice, anel, linha de campo e fita precisam de `flow` ≤ 0.15; com 0.3+ viram fumaça. Formas volumétricas (nebulosa, coral) aguentam 0.3.
- **Convergência estoura o bloom.** Ponta de cone, polos de dipolo e soma de neurônio concentram pontos; `glowCutoff` 0.35–0.4 ou rarefação com `pow(t, 0.6)` resolve, baixar `glow` não.
- **Eixo apontado pra câmera vira círculo.** Hiperboloide, funil e hélice precisam do eixo em y (ou inclinado 0.5–1 rad em x); o autoRotate em y só mostra a silhueta se ela não for simétrica em torno de z.
- **Ângulo aleatório uniforme apaga espiral.** Braços precisam de k discretos (3 braços + jitter), não `rng()*2π`.
- **Conic com `fract` tem costura.** Onda triangular `1 - abs(2a - 1)` fecha o círculo sem emenda.
- **Metaball: calcule o pico.** Depois de mudar `f += k/(d²+e)`, confira que o centro passa de 1 e o ponto médio entre dois blobs passa de ~0.3; senão apaga ou não funde.

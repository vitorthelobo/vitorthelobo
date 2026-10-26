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
- **Canvas 2D no SwiftShader não mede nada.** 2k células ficam em 6–11 fps em raster por software em qualquer variante (arc, fillRect, drawImage); em GPU real o mesmo código roda a 60. Use a sonda só pra comparar modos entre si. O que ajuda de verdade em GPU: nunca `stroke()` de traço curto (fillRect girado), nunca um path com milhares de subpaths (um `arc` por célula ou sprite por `drawImage`), estilo por balde.
- **Transmission sem nada atrás é uma esfera preta.** Vidro em cena com clear color sólido só lê com `envIntensity` ≥ 2, `roughness` ≤ 0.2 e um toque de `iridescence`; ou ponha algo atrás pra refratar.
- **Enquadre pela diagonal, não pelo raio.** TorusKnot(0.75, 0.26) ocupa ~1.3 unidades; com fov 35 a câmera precisa de z ≥ 5.5 pra sobrar respiro. Regra: `cameraZ ≈ 2.2 × extensão do objeto / tan(fov/2)`.
- **Morph precisa de origem "assada".** Trocar `aTo` no meio de um morph sem gravar a posição interpolada atual em `position` faz as partículas pularem; `bakeCurrentAsFrom` custa 1 ms pra 160k e resolve.
- **Clear color com EffectComposer chega sem conversão.** `renderer.setClearColor("#0B1422")` dentro de um composer com OutputPass sai como (59,79,102): o valor é tratado como linear e codificado pra sRGB. Passe `new THREE.Color(hex).convertSRGBToLinear()`. Medido com pixel do canto: #808080 → 188 antes, 128 depois. Sem composer (3d-object-scene) não acontece.
- **Sprite com ângulo aleatório some como forma.** Riscos de chuva com `vAngle = aRandom·2π` viram pontinhos; o ângulo inicial só entra quando `spin > 0`.
- **Forma plana em XZ vista de frente é uma linha.** Disco, anel e flor gerados no plano XZ precisam de `tiltX` 0.7–1.25 (chave nova) ou são invisíveis na câmera padrão em z.
- **Contagem é intensidade com blend aditivo.** 130k pontos numa casca pequena viram um disco branco qualquer que seja o `glow`; o teto por área é ~50k pra ler forma. Com `blend: "normal"` a contagem vira só densidade.
- **Wrap de `fall`/`rise` corta sprites grandes.** Fumaça de 26 px mostrava a linha do `mod`; `wrapFade` zera o alpha nos últimos 0.25 do percurso.
- **Ponteiro que lerpa desde (99,99,99) demora segundos em fps baixo.** O primeiro `pointermove` precisa saltar a posição suavizada pro alvo; o lerp só vale a partir do segundo evento. Sem isso, em 10 fps o hover parecia desligado.
- **Sonda de hover: mova o mouse depois do boot.** Com three.js o listener de `pointermove` só existe depois dos imports; `page.mouse.move` 200 ms após o load não chega a ninguém. Espere `ready` (ou 1.5 s) antes de mover.

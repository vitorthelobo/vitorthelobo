---
name: optimize-3d-scene
description: Otimiza uma cena three.js ou WebGL cru para celular, painéis de 120 Hz e máquinas fracas: tiers de dispositivo, pré-aquecimento de tudo debaixo do loader, loop só na viewport, orçamento de DPR, partículas e bloom (nunca frame cap fixo), gate de 60 fps em desktop, transforms na GPU, worker com OffscreenCanvas, compressão de modelos, sobrevivência ao iOS (toolbar, contexto perdido) e robot form. Use quando o usuário disser "otimiza o 3D", "a cena trava no celular", "fps baixo", "engasga no scroll", "deixa mobile-friendly", "reduz o custo do WebGL", ou antes de publicar qualquer página com cena WebGL.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Otimizar uma cena 3D

Adaptado da skill pública da Textura (next16-claude-starter, domínio público), reescrita sem dependência dos módulos do starter deles. Cada regra marca o grau de evidência: **rule** (3 ou mais sites) ou **observed** (1 a 2). Antes de mexer, leia `vault/fix-catalog.md` e `vault/pitfalls.md`.

## 0. Meça antes (nunca otimize cego)
```bash
grep -rn "setPixelRatio\|requestAnimationFrame\|UnrealBloom\|Points\|InstancedMesh\|1000 / 30\|frameloop" src/ --include=*.ts --include=*.tsx --include=*.js
node ${CLAUDE_PLUGIN_ROOT}/tools/qa/fps-probe.mjs --url <build de produção>
```
three.js: `renderer.info.render` (calls, triangles, points), `renderer.info.programs.length`, `renderer.info.memory`. WebGL cru: a sonda já conta draws, clears e `linkProgram` com timestamps. Anote os números; uma mudança sem antes e depois não existe.

Ambiente: build de produção, user agent de pessoa (bot recebe o robot form), `load` + settle fixo, SwiftShader só pra contagens, A/B intercalado numa máquina ocupada.

## 1. Nunca mande a cena pra um robô · rule
Crawler e Lighthouse robô recebem uma imagem estática, sem download de three. A cena é um leaf carregado por `import()`; nunca re-exportada de um barrel (puxa three pro chunk principal, observed). Capture a imagem da cena rodando (`screenshot-grid`) e sirva via `<picture>` com crops desktop e phone.

## 2. Tier na construção, releia na mudança de largura · rule
`mobile = innerWidth < 768 || matchMedia("(hover: none) and (pointer: coarse)")`. Um módulo decide DPR, contagens, bloom e se o ponteiro é ouvido. Releia quando a largura ou o media query de ponteiro mudar (DevTools device mode flipa tudo de uma vez); `retune()` só toca uniforms, tamanhos, visibilidade e listeners, nunca defines ou luzes. Buffer do tier maior alocado uma vez; `setDrawRange` varia a contagem.

## 3. Pré-aqueça tudo debaixo do loader · rule
Depois do handoff, o loop não aloca, compila nem sobe nada. Os cinco culpados de um stall: compile/link de shader (`renderer.compileAsync(scene, camera)`; cru: poll de `KHR_parallel_shader_compile`, nunca ler `COMPILE_STATUS` na mesma task), variante de programa (nunca troque define, `transparent`, blending ou luz em runtime), upload de textura e buffer (`renderer.initTexture`, buffers grandes um por frame), render targets e passes de pós (rode cada um uma vez, mesmo bloom com strength 0), e decode/geração na CPU (Worker acima de 100k pontos; TBT 4,3 → 0,2 s medido). Aqueça contra os targets reais do composer, com os objetos visíveis, um passo por rAF (`setTimeout(0)` não cede frame). Verifique: `programs.length` não cresce depois.

## 4. Desenhe só visível, e sempre que visível · rule
Gate por `document.hidden`, IntersectionObserver com uma viewport de margem e opacidade do wrapper. Um ticker por página. **Nunca pare de desenhar um canvas visível**: iOS descarta o último frame depois de um resize de toolbar e a cena «some». Contexto perdido: `preventDefault`, rebuild ao voltar pra viewport, `forceContextLoss` no teardown (`context-loss-probe` prova).

## 5. Frame rate · rule
Sem frame cap fixo em celular (26 → 120 fps medido ao tirar). Desktop em 120 Hz com cena GPU-bound: gate do **draw** a cada 12,5 ms, easing continua por tick. Toda velocidade por `dt` em segundos; `dt` clampado. Simule 120 Hz trocando rAF por timer de 8 ms e compare o deslocamento por 1/60 s.

## 6. DPR · rule
Phone 1 a 1,5 (pontos suaves em 1; modelo com aresta em 1,5 + MSAA), tablet ≤ 1,5, desktop ≤ 1,5. Abaixo de 1 é ruído visível. Renderer **e** composer pela mesma função. Nunca deixe o buffer seguir uma caixa que o scroll redimensiona: segure o buffer no tamanho final e estique com CSS.

## 7. Corte fill, não detalhe
Contagem de partículas por tier (um terço em phone, cortando a borda esparsa primeiro); partículas invisíveis fora do clip no vertex shader (7,8 → 4,6 ms, observed); bloom pela metade em phone e desligado quando não contribui; `CubeCamera` a cada 3 ou 6 frames, nunca todo frame; menos sprites maiores, `depthWrite: false`; composers que renderizam vazio são deletados; `alpha: false`, `stencil: false`, `depth: false` quando dá; sombras off em phone; sem `filter: blur()` por letra sobre um canvas.

## 8. Luzes
Uma direcional + environment map (PMREM de `RoomEnvironment`). Fresnel em `onBeforeCompile` substitui rim light. Nunca adicione ou remova luz em runtime (recompila tudo).

## 9. Transforms na GPU
Tudo que o scroll move é uniform no vertex shader (`uProgress`), não loop JS por objeto. `frustumCulled = false` no que o shader posiciona. Instancing pro repetido. Sem `Vector3` novo por frame. `scrollY` lido uma vez por frame no ticker. Nunca variável CSS em `<html>` por frame (571 elementos restilizados, rule).

## 10. Scroll em touch
`smoothed += (raw - smoothed) * (1 - pow(1 - k, dt * 60))`, k 0,2 a 0,3; salto maior que 1,5 vh atribui direto.

## 11. Ponteiro
Sem `mousemove` no tier phone. Só depois do primeiro movimento (cursor parado resolve pra (0,0) e abre um buraco no centro). Raycast em plano ou esfera analítica, nunca na malha densa (1 a 3% de frames dropados, observed). Gyroscope em phone é escolha de gosto: pergunte.

## 12. Assets
Modelo de partículas: só POSITION + índices (4,67 MB → 61 KB, observed). Draco pra geometria, WebP pra texturas (`gltf-transform`), KTX2 pra pressão de VRAM, tamanho por tier, `anisotropy = 1` em cenas suaves. Vídeo de fundo por papel (desktop e phone).

## 13. iOS
Caixa em `100lvh`; listener de resize em todo tier, ignorando mudança só de altura em pointer coarse; pule resize sem mudança de tamanho e DPR; canvas wrapper em layer própria (`transform: translateZ(0)`); listeners `passive`; dispose completo no unmount. Bug só de iOS: reproduza em WebKit, não em Chrome.

## 14. Verifique e escreva
Antes e depois de: `programs.length`, draws por frame, `fps-probe` nos dois tiers, `screenshot-grid` lida (o corte de fill precisa continuar parecendo desenhado), `context-loss-probe`, tier round-trip (DevTools phone on → off: buffer volta, pointer volta, programs não cresce). Registre no `fix-catalog` com grau de evidência e no `changelog`.

## O que não fazer
Derrubar a cena no celular (a cena é o produto; tier). Frame cap. Parar de desenhar visível. Tunar «no olho» num desktop. Um segundo `device.ts` ou ticker. `lil-gui` ou `Stats` escondidos em produção.

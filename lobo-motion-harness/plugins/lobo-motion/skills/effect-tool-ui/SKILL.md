---
name: effect-tool-ui
description: Constrói o "tuner" de um efeito, a UI que o GetLayers chama de AI design tool: painel gerado do schema do CONFIG, presets com filtro e favoritos, randomize com ranges, new variation por seed, estado compartilhável na URL, e exportação em PNG, vídeo, HTML standalone e build prompt. Em React usa Leva (padrão do Motion Labs); em standalone usa um painel vanilla. Use quando o usuário pedir "painel de controles", "tuner", "UI do efeito", "ferramenta tipo GetLayers", "presets e favoritos", "copy prompt", "exportar PNG/vídeo", "estado na URL".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Effect tool UI

O tuner é genérico: ele não sabe o que é um shader. Sabe que existe um CONFIG com schema, um renderer que expõe `setConfig`, e exportações. Construa uma vez, use em toda família.

## 0. Contrato com o renderer
Todo template do harness expõe `window.__lobo` (ou o equivalente em módulo):
```ts
{ family: string, config: Config, presets: Record<string, Partial<Config>>, stats: Stats,
  setConfig(changes: Partial<Config>): { ignored: string[] }, exportState(): string }
```
O painel só fala com isso. Schema por família em `skills/<família>/references/config-schema.md` (chave, tipo, range, default, grupo).

## 1. Painel do schema
- React: Leva. Um `folder` por grupo do schema; `number` com `min/max/step` do range; `string` com `options` pra enum; cor com o picker. `onChange` chama `setConfig({ [key]: value })` debounced a 16 ms. Motion Labs já faz isso via Recipe; registre a família como Recipe.
- Vanilla: gere `<input type=range|color|select>` a partir de um array `SCHEMA` (o mesmo do markdown, em JSON). Um listener delegado.
- Mostre `ignored` quando um preset ou URL trouxer chave desconhecida.

## 2. Presets, favoritos, variação
- Presets: tiles com nome e miniatura (PNG capturada na criação); filtro All / Favourites; clique carrega `setConfig(preset)`; clique no selecionado = «New variation» (`seed = random()`).
- Favorito: `localStorage` com `{ family, preset, changes, name, createdAt }`, onde `changes` é o **diff** sobre o preset. Reproduzir = preset + changes.
- Randomize: sorteia cada chave numérica dentro do range, enum uniforme, cores por paleta cosseno (cookbook) e seed nova. Botão Reset volta ao preset.

## 3. Estado na URL
`?s=` = base64url do JSON do CONFIG (o template já faz). Pra ficar curto, serialize só o diff sobre o preset: `?p=lagoon&s=<diff>`. Atualize a URL com `history.replaceState` debounced a 300 ms; nunca por frame.

## 4. Exportações
- PNG: o canvas WebGL sem `preserveDrawingBuffer` fica preto no `toBlob`. Renderize um frame e chame `canvas.toBlob` **no mesmo tick**, antes do próximo rAF; ou crie o contexto com `preserveDrawingBuffer: true` só durante o export. Escala 2× = render target maior por um frame.
- Vídeo: `canvas.captureStream(60)` + `MediaRecorder` (`video/webm;codecs=vp9`), duração do CONFIG (`loopSeconds`), bitrate 8 a 12 Mbps. Para loop perfeito, faça `time` cíclico: `t = loopSeconds * fract(frame / totalFrames)` e ruído com período (`sin/cos` do ângulo) em vez de `uTime` linear.
- HTML standalone: o template com o CONFIG serializado no topo e `?s=` removido. Um arquivo, sem build.
- Prompt: skill `build-prompt`. Botão «Copy prompt» com estados Copying / Copied / Try again.

## 5. Robustez
- Painel fora do DOM em `(pointer: coarse)` até um toque num botão «Tune»; em phone a cena é o produto.
- O painel nunca escreve no shader; se um knob precisa de código novo, é uma mudança de schema + template, não de UI.
- Teclado: `R` randomize, `S` salvar favorito, `C` copiar prompt, `Esc` fecha o painel.

## 6. Verifique
Carregar `?s=` de um favorito reproduz a screenshot 1:1 (compare); PNG exportado não é preto; vídeo tem a duração pedida; `ignored` aparece pra chave inválida. Registre o tuner no README do projeto.

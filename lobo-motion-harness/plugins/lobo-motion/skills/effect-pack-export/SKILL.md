---
name: effect-pack-export
description: Empacota N presets do catálogo (ou de uma marca) num entregável — pasta ou zip com os HTMLs standalone já com o CONFIG embutido, um index.html de navegação, os build prompts, screenshots, README de uso e licença — pronto pra mandar pro cliente ou vender como pack. Use quando o usuário pedir "exporta o pack", "zip pros efeitos", "entrega pro cliente", "kit da marca", "pacote de presets", "lobo-layers pack".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Effect Pack Export

Um pack é uma pasta auto-suficiente: abre no navegador sem build, cada efeito é um HTML com o CONFIG já aplicado, e o `index.html` lista tudo com preview. Layout em `references/pack-layout.md`; o script é `tools/pack.mjs`.

## 0. Intake
- Seleção: lista de `<família>/<preset>`, ou `--brand <marca>` (tudo com tag `brand:<marca>`), ou `--family <família>` (todos dela).
- Destino: `packs/<nome>/` (default) e `--zip`.
- Para quem: cliente final (README em PT, sem prompts), designer/dev (README com integração e prompts), venda (licença + preview público).
- Nome do pack: `<marca-ou-tema>-motion-kit-v<N>`.

## 1. Gere
```bash
node ${CLAUDE_PLUGIN_ROOT}/tools/pack.mjs --out packs/superwash-motion-kit-v1 --brand superwash --zip
node ${CLAUDE_PLUGIN_ROOT}/tools/pack.mjs --out packs/shader-vol1 --family shader-background --presets aurora-veil,sun-rays,glacier
```
O script, por preset:
1. Lê o template da família e injeta o CONFIG do preset como default (`const CONFIG = {...}` substituído), remove `?preset=`/`?s=` do boot (o pack não depende de URL), mantém `window.__lobo` (o cliente pode afinar no console).
2. Copia pra `effects/<família>/<preset>.html`.
3. Escreve `effects/<família>/<preset>.config.json` e, se existir, `<preset>.prompt.md` (do catálogo ou gerado pela skill `build-prompt`).
4. Screenshot desktop 1440×900 em `previews/<família>-<preset>.jpg` (Playwright, via `tools/qa/_lib.mjs`).
5. Monta `index.html` com grid de cards (preview, nome, família, botão abrir, botão copiar CONFIG).
6. README.md do pack + LICENSE.

## 2. README do pack (o que vai escrito)
- O que é cada efeito, em uma linha, com o preview.
- Como usar: "abra o HTML", "pra colocar no site veja `INTEGRATE.md`" (gerado pela skill `integrate-effect` com a receita da stack do cliente).
- Como afinar: as 5 chaves que o cliente pode mexer com segurança (cores, speed, intensity, preset, seed) e onde ficam no arquivo.
- Requisitos: navegador com WebGL2; three.js vem do CDN (ou embutido com `--inline-three`).
- A frase de posicionamento da marca que justificou as escolhas (vem do `brand-to-preset`).

## 3. Licença
- Cliente: "uso ilimitado nos canais da marca X; sem revenda". Modelo em `references/pack-layout.md`.
- Venda (pack público): uma licença por comprador, sem redistribuição dos HTMLs como pack.
- Sempre cite `three.js` (MIT) e Ashima noise (MIT) no LICENSE.

## 4. Verifique antes de entregar
- Abra o `index.html` pelo `file://` **e** por um servidor (`npx serve packs/<nome>`): import map e `file://` têm diferenças de CORS em alguns navegadores; o README avisa.
- `verify-motion.sh` no diretório do pack.
- Cada preview lido (skill `qa-motion`): nenhum card preto.
- Peso: um pack de 10 efeitos sem three embutido fica < 2 MB; com `--inline-three` ~ 1.2 MB a mais.

## 5. Regras
- O pack nunca referencia caminhos do harness; é auto-contido.
- Versão no nome e no README; o cliente vai pedir "a v2".
- Nunca inclua `tools/`, `vault/` ou prompts quando for pra cliente final.

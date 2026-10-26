# Lobo Motion Harness

Plugin de Claude Code pra construir efeitos visuais de interface no nível do GetLayers: shader backgrounds, campos de partículas, orbs reativos, materiais holográficos, text motion, cursores e pós-efeitos de imagem. Tudo nasce de um **CONFIG**, passa por **QA medido** com Playwright e sai como **HTML standalone + build prompt**.

Nasceu do estudo do GetLayers e do harness público da Textura (`next16-claude-starter`, domínio público). O relatório que originou este repo explica o porquê de cada peça.

## O que tem dentro

```
lobo-motion-harness/
├── .claude-plugin/marketplace.json     # catálogo do marketplace (instale a partir daqui)
└── plugins/lobo-motion/
    ├── .claude-plugin/plugin.json      # manifesto do plugin
    ├── skills/        22 skills        # 11 famílias com template + 11 de processo (integrar, scroll, marca, pack, QA…)
    ├── agents/         6 agents        # builder, judge, reviewer, auditor, librarian, tester
    ├── commands/       7 commands      # /effect /preset /tool-ui /export-prompt /qa-motion /perf-3d /harness-init
    ├── rules/          4 rules         # shaders, scenes, motion, config-first (copiadas pro projeto por /harness-init)
    ├── hooks/hooks.json                # SessionStart, PostToolUse (GLSL), Stop (catálogo em dia)
    ├── scripts/verify-motion.sh        # verificador mecânico das hard rules
    ├── tools/qa/                       # 4 sondas Playwright + helper
    └── vault/                          # hard rules, catálogo, fix-catalog, pitfalls, ADRs
```

### Status honesto

| Peça | Estado |
| --- | --- |
| `shader-background` | **Pronta.** Template WebGL2 testado pelas 4 sondas (1 programa, reduced motion assenta, bot sem WebGL, contexto volta). 14 presets, 11 campos (linear, radial, conic, mesh, warped, aurora, rays, ripples, stripes, caustics, blobs) e efeitos dither, halftone e vinheta. Cookbook GLSL e schema. |
| `particle-forms` | **Pronta.** Template three.js testado, 35 formas com seed, 10 sprites, 8 movimentos stateless, 6 modos de cor, blend aditivo ou opaco, curl noise, bloom, tiers. 44 presets. Geradores e GPGPU documentados. |
| `effect-tool-ui`, `build-prompt`, `qa-motion`, `optimize-3d-scene`, `catalog-entry` | **Prontas** como procedimento; o contrato `window.__lobo` já está nos dois templates. |
| `orb-reactive` | **Pronta.** Template WebGL2 testado: 5 presets, 6 estados com transição, áudio por microfone ou `setLevel`, modo widget (264 px) e hero (`size: 0`), fundo transparente opcional. |
| `text-motion` | **Pronta.** Template vanilla JS + CSS testado: 28 presets por letra, palavra e linha, mola própria, 4 gatilhos, texto no DOM pra SEO, reduced motion sem split. |
| `cursor-fx` | **Pronta.** 17 efeitos em vanilla JS + CSS (pointer, trail, field), demo automático, desligado em touch. |
| `holo-material` | **Pronta.** Tecido verlet com iridescência física do three.js, 6 presets, agarre e cutucão. |
| `post-image-fx` | **Pronta.** ASCII, dither e refração num shader WebGL2, 10 presets, upload de imagem ou vídeo. |
| `image-reveal` | **Pronta.** Reveal líquido, pixel, tiles, wipe, ripple e líquido no hover num shader sobre a imagem, 6 presets, `<img>` no fallback. |
| `grid-dots-field` | **Pronta.** Grade em canvas 2D (dots, lines, plus, cross, ascii) com warp, onda e cursor, 6 presets. |
| `3d-object-scene` | **Pronta.** GLB ou objeto procedural com material físico, PMREM, órbita por arrasto, 6 presets. |
| `morph-transition` | **Pronta.** Transição entre as 18 formas de partícula com stagger e scatter, ciclo ou scroll, 5 presets. |
| `integrate-effect` | **Pronta (doc).** Receitas React/Next, Vue, Astro/HTML, Framer, Webflow; cleanup, SSR, uma lib de motion. |
| `scroll-grammar` | **Pronta (doc).** switch/scrub/progress/pin, driver próprio ou ScrollTrigger/Lenis, receitas por família. |
| `brand-to-preset` | **Pronta (doc).** Paleta em OKLab, tom → energia, onde vai → densidade, nome e tags. |
| `effect-pack-export` | **Pronta.** `tools/pack.mjs` gera pasta/zip com HTMLs embutidos, index, previews, README e licença. |
| `add-family` | **Pronta (doc).** O procedimento de família nova como skill, com checklist de registro. |
| `tier-calibrate` | **Pronta.** `tools/qa/tier-calibrate.mjs` varre count × dpr × glow por tier e recomenda. |
| Sondas `tools/qa` | **Testadas** nos dois templates neste ambiente (Chromium headless com SwiftShader). |

## Instalar

Pré-requisitos: Claude Code, Node 20+, Playwright com Chromium pra rodar as sondas (`npm i -D playwright && npx playwright install chromium`, ou o Playwright global do ambiente).

**Enquanto a pasta vive dentro de outro repo** (como agora), instale pelo caminho local:

```
/plugin marketplace add /caminho/para/lobo-motion-harness
/plugin install lobo-motion@lobo-motion-harness
```

**Quando virar repo próprio** (`vitorthelobo/lobo-motion-harness`):

```
/plugin marketplace add vitorthelobo/lobo-motion-harness
/plugin install lobo-motion@lobo-motion-harness
```

Pra extrair a pasta como repo próprio sem perder histórico:

```bash
git subtree split -P lobo-motion-harness -b harness-only
git push git@github.com:vitorthelobo/lobo-motion-harness.git harness-only:main
```

Confira: `/help` lista `/effect`, `/preset`, `/tool-ui`, `/export-prompt`, `/qa-motion`, `/perf-3d`, `/harness-init`. Na primeira sessão o hook `SessionStart` avisa que o harness está ativo.

## Tutorial: primeiro efeito em 10 minutos

### 1. Prepare o projeto
Dentro do projeto (Motion Labs, um site de cliente, uma pasta vazia):

```
/harness-init
```

Isso copia as 4 rules pra `.claude/rules/`, cria um `vault/` do projeto (catálogo, fix-catalog, pitfalls, ADRs vazios), adiciona o script `verify:motion` e uma seção no `CLAUDE.md`. Ele pergunta antes de sobrescrever qualquer coisa.

### 2. Peça o efeito

```
/effect "fundo de hero pra uma fintech, escuro, calmo, verde-petróleo com um acento ciano, quase parado" --family shader-background
```

O que acontece, em ordem:

1. **Intake.** A skill lê o brief nos cinco eixos (dimensionality, mood, tone, motionEnergy, density). Se faltar algo essencial (a paleta, por exemplo), ela pergunta **uma vez** e depois assume o default.
2. **Catálogo.** Procura um preset próximo em `vault/effect-catalog.md` (aqui, `lagoon`) e parte do CONFIG dele.
3. **CONFIG antes do código.** Escreve o objeto completo, com `seed`. Nenhuma cor vai pro shader.
4. **Template.** Copia `skills/shader-background/templates/standalone.html` e troca só o CONFIG (e `shapeT()` se o brief pedir um campo novo).
5. **QA.** Roda `verify-motion.sh` e as quatro sondas, lê as screenshots de desktop e phone e corrige até limpar.
6. **Exporta.** `effects/shader-background/<nome>/standalone.html`, `config.json`, `prompt.md`.
7. **Registra.** Entrada no catálogo com CONFIG, screenshots e tags.

O relatório final traz os números por tier e o que não foi verificado (celular real, sempre).

### 3. Abra e afine
Abra o `standalone.html` no navegador. No console:

```js
__lobo.config                       // o CONFIG vivo
__lobo.setConfig({ swirl: 0.6 })    // muda ao vivo; devolve { ignored: [] }
__lobo.setConfig({ foo: 1 })        // { ignored: ["foo"] }: chave fora do schema não vira knob
__lobo.exportState()                // URL com ?s= que reproduz exatamente este estado
__lobo.stats                        // frames, draws, programas linkados, contextos perdidos
```

Também dá pra abrir `standalone.html?preset=molten`. No orb: `__lobo.setState("thinking")`, `__lobo.setLevel(0.7)` ou `__lobo.startMic()` num clique.

### 4. Derive um preset

```
/preset shader-background lagoon reef-glow colors=["#02141C","#0B4F6C","#19B5A8","#C5F2E6","#FFFFFF"] swirl=0.55
```

Só chaves do schema passam; a seed é sorteada se você não fixar; a entrada vai pro catálogo com a origem.

### 5. Exporte o prompt (o produto)

```
/export-prompt effects/shader-background/reef-glow
```

A skill `build-prompt` escreve o prompt com CONFIG literal, receita numerada, shaders completos e critérios de aceite. Depois o agent `prompt-tester` reconstrói o efeito em um diretório vazio **só com o prompt** e compara as screenshots. Reprovou? Corrige-se o prompt, nunca a reconstrução.

### 6. Variações em paralelo (best-of-N)

```
/effect "nuvem de partículas em forma de galáxia, roxo e ciano, energia média" --family particle-forms --n 4
```

Quatro agents `effect-builder` constroem quatro variações (seeds e paletas diferentes), o `visual-judge` pontua as oito screenshots numa rubrica fixa e devolve o ranking com motivo. Você escolhe entre as duas primeiras.

## Comandos

| Command | Faz |
| --- | --- |
| `/effect <brief> [--family] [--n]` | brief → efeito pronto, QA, export, catálogo; com `--n` roda best-of-N |
| `/preset <família> <base> <novo> [k=v]` | preset derivado por diff de CONFIG |
| `/tool-ui <família> [--target leva\|vanilla]` | o tuner: painel do schema, presets, favoritos, URL, exports |
| `/export-prompt <efeito>` | build prompt + teste em diretório limpo |
| `/qa-motion <html\|url>` | verify + 4 sondas + leitura das screenshots |
| `/perf-3d <url>` | mede, atribui, muda uma coisa, re-mede |
| `/harness-init` | rules, vault e verify dentro do projeto |

## Skills

| Skill | Técnica | Tem template |
| --- | --- | --- |
| shader-background | WebGL2 cru, CONFIG map, OKLab, grain, shapes | sim, testado |
| particle-forms | three.js Points, 35 formas, 10 sprites, 8 movimentos, 6 modos de cor, bloom, tiers | sim, testado |
| orb-reactive | SDF de esfera, fbm em camadas, Web Audio, 6 estados | sim, testado |
| holo-material | thin-film físico, cloth verlet, mapas procedurais | sim, testado |
| text-motion | split letra/palavra/linha, 28 presets, scroll grammar | sim, testado |
| cursor-fx | pointer, trail, field; off em touch | sim, testado |
| post-image-fx | ASCII, dither, refract, pós-efeitos | sim, testado |
| image-reveal | reveal líquido/pixel/tiles/wipe, ripple e líquido no hover | sim, testado |
| grid-dots-field | canvas 2D, 5 glifos, warp, onda, cursor, sprites | sim, testado |
| 3d-object-scene | GLB/procedural, MeshPhysicalMaterial, PMREM, arrasto | sim, testado |
| morph-transition | dois buffers + progresso, stagger, scatter, morphTo/next | sim, testado |
| integrate-effect | componente React/Vue/Astro/Framer/Webflow com cleanup | receitas |
| scroll-grammar | switch, scrub, progress, pin; um driver por página | receitas |
| brand-to-preset | marca → CONFIGs por família (OKLab, tom, uso) | mapeamentos |
| effect-pack-export | pack auto-contido (HTML + index + previews + licença) | `tools/pack.mjs` |
| add-family | família nova do zero com checklist | checklist |
| tier-calibrate | count × dpr × glow por tier em GPU real | `tools/qa/tier-calibrate.mjs` |
| effect-tool-ui | painel do schema, presets, favoritos, URL, PNG/vídeo/HTML/prompt | contrato nos templates |
| build-prompt | o formato do «Copy prompt» e o teste | — |
| optimize-3d-scene | tiers, prewarm, DPR, fill, iOS, worker | — |
| qa-motion | verify + sondas + julgamento | — |
| catalog-entry | registro no vault | — |

## Agents

| Agent | Papel | Quando |
| --- | --- | --- |
| effect-builder | um efeito por agent, do brief ao standalone verificado | `/effect --n`, lotes |
| visual-judge | ranking de N variações por screenshot, rubrica de 6 critérios | fim do best-of-N |
| motion-reviewer | audita hard rules de motion; corrige só violação clara | depois de qualquer build |
| perf-auditor | mede antes e depois, nunca opina sem número | antes de publicar |
| catalog-librarian | mantém catálogo, fix-catalog, pitfalls, ADRs | fim de turno |
| prompt-tester | reconstrói só com o prompt e compara | antes do prompt virar produto |

## As hard rules em uma tela

1. CONFIG-first: preset, URL, favorito e prompt são o mesmo objeto; nada literal no shader.
2. Uma biblioteca de motion por projeto; a instalada vence.
3. Um ticker por página; tempo em segundos; tudo por `dt`; nenhum frame cap fixo.
4. DPR entre 1 e 1,5, renderer e composer juntos; partícula invisível fora do clip; bloom pela metade em phone.
5. Pré-aqueça tudo antes do primeiro frame visível; `programs.length` não cresce depois.
6. Canvas em `100lvh`; resize só em mudança real; nunca parar de desenhar visível; contexto perdido reconstrói.
7. Reduced motion assenta sem esconder; bot recebe imagem estática.
8. Meça em build de produção com user agent de pessoa; SwiftShader só conta; leia toda screenshot.
9. Nunca reporte verificação que não rodou; nunca invente preset; nunca edite `templates/` sem sign-off.
10. Registre: catálogo, fix-catalog com grau de evidência, pitfalls, ADR.

A lista completa, com o porquê de cada uma: `plugins/lobo-motion/vault/workflows/ai-agent-guide.md`.

## As sondas de QA (rodam sozinhas também)

```bash
Q=plugins/lobo-motion/tools/qa
node $Q/screenshot-grid.mjs --url efeito.html --out qa-shots --times 1,3,8   # desktop 1440x900 e phone 390x844 DPR 3
node $Q/fps-probe.mjs --url efeito.html --seconds 4                          # rAF/s, draws/s, programas e quando linkaram
node $Q/check-motion.mjs --url efeito.html                                   # reduced motion responde e assenta; bot sem WebGL
node $Q/context-loss-probe.mjs --url efeito.html                             # perde o contexto, restaura, volta a desenhar
bash plugins/lobo-motion/scripts/verify-motion.sh pasta/                     # greps das hard rules
```

Todas aceitam `--url http://localhost:3000/rota` pra uma build servida. SwiftShader não dá fps absoluto: as contagens servem pra comparar builds, não pra citar como número de telefone. Celular real continua sendo o último passo.

## Como adicionar uma família nova

1. `skills/<família>/SKILL.md` com frontmatter (`name`, `description` cheia de gatilhos, `allowed-tools`), intake nos cinco eixos, CONFIG, algoritmo, tiers, verificação, export e registro.
2. `references/config-schema.md` (chave, tipo, range, default, o que faz) e as referências técnicas que a família precisa.
3. `templates/standalone.html` expondo `window.__lobo` (`config`, `presets`, `stats`, `setConfig`, `exportState`, `family`) e cumprindo as hard rules (copie a casca do shader-background).
4. Rode as quatro sondas e o verify no template. Leia as screenshots.
5. Primeiro preset no `vault/effect-catalog.md`; linha nas tabelas deste README; ADR se a família trouxe uma decisão nova.

## Convenções

- Presets: duas palavras evocativas, minúsculas, hífen (`nebula-drift`, `oil-slick`). Variação = `<preset>-001`.
- Efeitos construídos: `effects/<família>/<nome>/{standalone.html, config.json, prompt.md, README.md}`.
- Catálogo (a library futura): `catalog/<família>/<preset>.{config.json, png, phone.png, prompt.md}`.
- Vault do plugin = referência; vault do projeto = só o que é daquele projeto.

## Roadmap

1. Stickers e artwork no tecido do `holo-material`; DOF opcional em desktop.
2. `effect-tool-ui` implementado no Motion Labs como Recipe com Leva, usando `window.__lobo` dos templates.
3. Efeitos empilháveis no shader-background (luz, glass, blobs, dither, halftone), um bloco opcional do CONFIG cada.
4. `catalog/` com 30 presets → repo próprio `lobo-layers` → MCP próprio com `search`, `tool_look` e `reproduce`.

## Créditos

Harness, skill de otimização 3D e padrões de QA adaptados do `next16-claude-starter` da Textura (Unlicense). Ruído simplex de Ashima Arts e Stefan Gustavson (MIT). Paleta cosseno de Inigo Quilez. OKLab de Björn Ottosson. ACES de Krzysztof Narkowicz. GetLayers (Textura) como referência de produto: vocabulário dos cinco eixos, knobs de designer, prompt como produto.

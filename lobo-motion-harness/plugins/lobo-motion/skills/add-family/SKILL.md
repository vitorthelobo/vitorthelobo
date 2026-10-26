---
name: add-family
description: Cria uma família nova no harness (skill + template standalone + schema + presets + catálogo + showroom + testes) seguindo o contrato CONFIG-first e as hard rules, do zero ou a partir de uma referência (GetLayers, React Bits, Codrops). Use quando o usuário pedir "nova família", "adiciona o efeito X como skill", "cria a skill de Y", "quero um template pra Z", ou quando um brief não cabe em nenhuma das famílias existentes.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Add Family

Uma família é: uma técnica de render, um CONFIG com schema, um template que cumpre as hard rules e passa nas 4 sondas, presets no catálogo, e um chip no showroom. Checklist completo em `references/checklist.md`.

## 0. Decida se é família ou preset
- Mesma técnica e mesmo schema de uma família existente (só muda fórmula ou cores) → é **preset** (ou um `shape` novo). Não crie família.
- Técnica diferente (outro tipo de canvas, outro shader, outro DOM) ou schema diferente → família.
- Nome: kebab, substantivo do efeito (`grid-dots-field`, não `grid-thing`).

## 1. Escolha a casca
| Técnica | Copie de | Por quê |
| --- | --- | --- |
| fragment shader full-screen (WebGL2 cru) | `shader-background` | menor casca; prewarm, context loss, DPR, loop já prontos |
| pontos/malha com three.js + bloom | `particle-forms` | import map, composer, tiers, pointer raycast |
| material físico/three.js com env | `holo-material` | PMREM, RoomEnvironment, verlet |
| imagem/vídeo como textura + shader | `post-image-fx` | upload, ping-pong, sample procedural |
| canvas 2D | `cursor-fx` (grupo field) | rAF que para em repouso, resize, DPR |
| DOM + CSS + mola | `text-motion` | split, spring engine, triggers |

## 2. Escreva na ordem (CONFIG antes de código)
1. `skills/<família>/references/config-schema.md`: tabela chave/tipo/range/default/efeito. Todo número que o designer mexe está aqui. Inclua `preset`, `seed`, `dprMax`.
2. `skills/<família>/SKILL.md`: frontmatter (`name`, `description` com os gatilhos entre aspas, `allowed-tools`), seções 0 Intake · 1 CONFIG · 2–4 técnica · 5 regras · 6 verifique e registre. Modelo: `cursor-fx/SKILL.md`.
3. `skills/<família>/templates/standalone.html`: copie a casca, troque `family`, `title`, CONFIG, PRESETS (mínimo 4), e o miolo. **Mantenha:** `data-lobo-scene`, `.fallback`, `isBot`, `motionOff`, `coarse`, `stats`, `setConfig` com `ignored`, `?preset=`/`?s=`, `exportState`, `window.__lobo`, DPR clamp, um rAF, dt clampado, IO + visibilitychange, `webglcontextlost/restored` (ou `WebGLRenderer`), variáveis do loop declaradas antes do `setConfig` (TDZ).
4. Presets: 4 a 6, com nomes que descrevem o look, seeds fixas, cobrindo pelo menos um calmo e um intenso.

## 3. Verifique (não pule)
```bash
bash scripts/verify-motion.sh
node tools/qa/screenshot-grid.mjs --url skills/<família>/templates/standalone.html --out /tmp/qa-<família>
node tools/qa/check-motion.mjs --url skills/<família>/templates/standalone.html
node tools/qa/context-loss-probe.mjs --url skills/<família>/templates/standalone.html
node tools/qa/fps-probe.mjs --url skills/<família>/templates/standalone.html
```
Leia as screenshots de cada preset (skill `qa-motion`). Calibre o que não lê como o nome promete; as lições vão pra `vault/pitfalls.md`.

## 4. Registre em todo lugar que lista famílias
`references/checklist.md` tem a lista exata: `commands/effect.md` (roteamento), `agents/effect-builder.md`, `README.md` (tabela de skills e status), `vault/effect-catalog.md` (seção + presets), `vault/templates/catalog-entry.md`, `tools/pack.mjs` (FAMILIES), `skills/scroll-grammar/references/recipes.md` (linha da família), showroom (`FAMILIES` com presets e knobs, e o arquivo em `files`).

## 5. Regras
- Nenhuma cor, contagem ou intensidade literal fora do CONFIG.
- Uma biblioteca de motion por projeto; three só se a técnica exige.
- O template é referência, não demo: sem painel, sem lil-gui, sem console.log.
- Se precisou de memória entre frames (acúmulo, transição), documente a opção GPGPU em `references/` mesmo que o template seja stateless.
- Reporte com números: sondas por tier, screenshots lidas, o que não verificou.

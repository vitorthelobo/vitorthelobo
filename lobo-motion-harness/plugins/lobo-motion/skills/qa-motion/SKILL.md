---
name: qa-motion
description: Verifica um efeito ou cena antes de reportar done: roda o verificador mecânico (verify-motion.sh), as quatro sondas Playwright (screenshot-grid por tier e tempo, fps-probe com contagens, check-motion para reduced motion e robot form, context-loss-probe), lê as screenshots e aplica os critérios de julgamento que um script não decide. Use depois de construir ou mudar qualquer efeito, antes de commitar, e quando o usuário disser "QA isso", "testa o efeito", "tá pronto pra publicar?".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# QA de motion

Duas camadas. O script decide o decidível; você decide o resto. Nunca reporte «done» só com o script.

## Camada 1 · mecânica
```bash
${CLAUDE_PLUGIN_ROOT}/scripts/verify-motion.sh <pasta do efeito>
```
Todo FAIL se corrige. WARN é julgamento: corrija ou justifique no relatório, nunca ignore em silêncio.

## Camada 2 · sondas (Playwright já instalado no ambiente, ou `npm i -D playwright && npx playwright install chromium`)
```bash
Q=${CLAUDE_PLUGIN_ROOT}/tools/qa
node $Q/screenshot-grid.mjs --url <html ou url> --out qa-shots --times 1,3,8   # desktop 1440x900 e phone 390x844 DPR 3
node $Q/fps-probe.mjs --url <html ou url> --seconds 4                          # rAF/s, frames/s, draws/s, programas e quando linkaram
node $Q/check-motion.mjs --url <html ou url>                                   # reduced motion responde e assenta; bot sem WebGL
node $Q/context-loss-probe.mjs --url <html ou url>                             # perde o contexto, restaura, volta a desenhar
```
Páginas servidas (`next start`, Vite preview) aceitam `--url http://localhost:...`. Arquivo `.html` é aberto por `file://`.

**Leia toda screenshot** (Read). O tamanho do JPEG só sinaliza «provavelmente preto»; o olho decide.

## Barras
| Verificação | Passa quando |
| --- | --- |
| screenshot-grid | nenhuma em branco; a de 3 s bate com a referência em paleta, densidade e silhueta; phone continua legível com 1/3 dos pontos |
| fps-probe | `linked after settle` = 0 nos dois tiers; draws/s > 0; canvas no tamanho do tier (phone ≤ 1.25 × 390) |
| check-motion | responde com reduced motion; frames/s ≈ 0 depois de assentar; canvas visível; bot com 0 contextos WebGL |
| context-loss | volta a desenhar depois do restore, `aindaPerdido=false` |
| verify-motion | FAIL = 0 |

SwiftShader não dá fps absoluto: compare contagens entre builds, nunca com um número de telefone real. Celular real é o último passo; se não houve, diga no relatório.

## Julgamento (o que o script não vê)
- O efeito responde ao brief nos cinco eixos? Compare com a referência, não com a memória.
- Tiers: o corte de phone (contagem, bloom, DPR) ainda parece desenhado, ou virou poeira?
- Entrada: há uma entrada (reveal), ou o efeito «já está lá»? Loader gateia o conteúdo?
- Reduced motion mostra o estado final completo, sem buraco onde a cena ficaria?
- Robot form tem um fallback com as cores do CONFIG (não um retângulo preto)?
- O CONFIG tem seed e todas as chaves do schema; `setConfig` devolve `ignored` pra chave errada?
- Nenhuma dependência além das declaradas; nenhum `console.log` ou painel de debug em produção.

## O loop
1. Camada 1, corrija FAILs. 2. Sondas, leia as imagens, corrija. 3. Camada 1 de novo (uma correção pode violar outra regra). 4. Repita até limpo.

## Relatório
O que falhou e foi corrigido, WARNs mantidos e por quê, números das sondas por tier, screenshots lidas (caminhos), o que não foi verificado (celular real, iOS) e por quê. Nunca um «passou» que não aconteceu.

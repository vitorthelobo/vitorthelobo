---
name: catalog-entry
description: Registra um preset aprovado no catálogo de efeitos do vault (CONFIG completo, screenshots por tier, build prompt, tags nos cinco eixos, números medidos) e mantém o fix-catalog, pitfalls e changelog em dia. Use ao final de todo efeito aprovado, quando o usuário disser "registra no catálogo", "salva o preset", ou quando o hook de Stop pedir atualização do catálogo.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Entrada no catálogo

O catálogo é o produto futuro (library). Entrada sem CONFIG completo, sem screenshot ou sem prompt testado não entra.

## 1. Arquivos
```
catalog/<família>/<preset>.config.json      # CONFIG completo, com seed
catalog/<família>/<preset>.png              # 1440x900, t = 3 s
catalog/<família>/<preset>.phone.png        # 390x844 DPR 3, t = 3 s
catalog/<família>/<preset>.prompt.md        # build prompt testado (skill build-prompt)
catalog/<família>/<preset>.html             # standalone, CONFIG inline (opcional quando o renderer é compartilhado)
```
`catalog/` fica no projeto da library (hoje, dentro do Motion Labs; depois, repo `lobo-layers`). Screenshots vêm de `tools/qa/screenshot-grid.mjs --times 3`.

## 2. A entrada em `vault/effect-catalog.md`
Siga `vault/templates/catalog-entry.md`: nome, família, eixos (dimensionality, mood, tone, motionEnergy, density), CONFIG inline, caminhos, números medidos (draws/s por tier, programas), origem (brief ou referência). Nome do preset: duas palavras evocativas, minúsculas com hífen (`nebula-drift`, `oil-slick`, `midnight-prism`), nunca o nome técnico.

## 3. Variações e favoritos
Variação é outra seed do mesmo CONFIG: registre como `<preset>-001`, `-002` com só o diff. Favorito de usuário não entra no catálogo; entra o preset que ele derivou, se for bom.

## 4. Conhecimento
- Número que moveu com uma mudança → `vault/fix-catalog.md` como `observed` (1 a 2 projetos) ou `rule` (3 ou mais), com instrumento e config.
- Leitura que enganou → `vault/pitfalls.md`.
- Decisão com alternativas → ADR em `vault/decisions-log.md`.
- Linha datada em `vault/changelog.md` (crie o arquivo na primeira entrada).

## 5. Checagem final
`grep` do nome do preset no catálogo (sem duplicata), JSON válido (`jq . <config>`), as duas screenshots existem e foram lidas, o prompt tem o bloco CONFIG idêntico ao JSON (`diff` dos dois).

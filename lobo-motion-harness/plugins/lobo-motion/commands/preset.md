---
description: Criar um preset novo a partir de um existente (diff de CONFIG, seed nova, paleta nova) e registrar no catálogo
argument-hint: <família> <preset-base> <nome-novo> [chave=valor ...]
---

Crie o preset: **$ARGUMENTS**

1. Carregue o CONFIG do preset base em `vault/effect-catalog.md`. Se não existe, pare e liste os que existem.
2. Aplique as mudanças pedidas **só em chaves do schema** da família (`skills/<família>/references/config-schema.md`). Chave desconhecida: recuse e diga qual.
3. Sem mudança explícita de `seed`, sorteie uma e diga qual.
4. Gere `?s=` com o novo CONFIG no template da família, rode `tools/qa/screenshot-grid.mjs --times 3` e leia as duas screenshots.
5. Nome: duas palavras evocativas em minúsculas com hífen. Registre pela skill `catalog-entry` com a origem «derivado de <base>».

Um preset que na screenshot ficou igual ao base (só seed) é variação, não preset: registre como `<base>-00N`.

---
description: Gerar o build prompt de um efeito aprovado e testá-lo em diretório limpo
argument-hint: <caminho do efeito ou preset do catálogo>
---

Exporte e teste o prompt de: **$ARGUMENTS**

1. Skill `build-prompt`: escreva `prompt.md` com a estrutura obrigatória (Objetivo, Stack alvo, CONFIG literal, Receita, Shaders completos, Interação e tiers, Integração, Critérios de aceite).
2. `diff` entre o bloco CONFIG do prompt e o `config.json`: precisam ser idênticos.
3. Lance o agent `prompt-tester` com **só** o `prompt.md`. Ele reconstrói em diretório limpo e compara screenshots.
4. REPROVA → corrija o prompt (nunca a reconstrução) e repita. PASSA → mova pra `catalog/<família>/<preset>.prompt.md` e atualize a entrada do catálogo.

Diga claramente se o prompt está em português ou inglês e pra qual stack alvo foi escrito.

---
description: Rodar o verificador mecânico e as quatro sondas Playwright num efeito ou página, ler as screenshots e reportar
argument-hint: <arquivo.html ou http://localhost:porta/rota> [--times 1,3,8]
---

QA em: **$ARGUMENTS**

Siga a skill `qa-motion` inteira: `verify-motion.sh`, depois `screenshot-grid`, `fps-probe`, `check-motion`, `context-loss-probe`. Leia todas as screenshots geradas. Aplique as barras e os critérios de julgamento. Corrija FAILs, re-rode, repita até limpo.

Relatório: números por tier, screenshots lidas (caminhos), WARNs mantidos e por quê, o que não foi verificado (celular real) e por quê. Nunca um «passou» que não aconteceu.

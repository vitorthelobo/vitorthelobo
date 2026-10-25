---
description: Medir e otimizar uma cena three.js ou WebGL (tiers, prewarm, DPR, fill, iOS), com antes e depois
argument-hint: <url da build de produção ou arquivo.html>
---

Otimize a cena em: **$ARGUMENTS**

Skill `optimize-3d-scene`, na ordem dela. O loop é o ponto: meça (agent `perf-auditor` ou as sondas direto), atribua o sintoma a um dos cinco culpados, mude **uma coisa**, re-meça com a mesma config.

Nunca: frame cap fixo em celular, parar de desenhar canvas visível, derrubar a cena no mobile, tunar no olho em desktop, reportar ganho não re-medido.

Relatório: tabela antes → depois por tier, o que mudou, o que foi revertido, trade-offs visuais com screenshots, o que precisa de celular real. Registre o que valeu no `vault/fix-catalog.md`.

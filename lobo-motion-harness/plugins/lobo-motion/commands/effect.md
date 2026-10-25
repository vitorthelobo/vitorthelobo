---
description: Construir um efeito visual do brief ao HTML standalone (roteia pra skill da família, best-of-N opcional)
argument-hint: <brief em uma frase> [--family shader-background|particle-forms|orb-reactive|holo-material|text-motion|cursor-fx|post-image-fx] [--n 3]
---

Construa o efeito: **$ARGUMENTS**

1. **Roteie.** Sem `--family`, escolha pela tabela: gradiente ou fundo procedural → `shader-background`; nuvem, galáxia, pontos → `particle-forms`; esfera que reage → `orb-reactive`; foil, iridescente, tecido → `holo-material`; título ou texto animado → `text-motion`; cursor → `cursor-fx`; ASCII, dither, vidro sobre mídia → `post-image-fx`. Diga qual escolheu e por quê.
2. **Intake curto.** Cinco eixos (dimensionality, mood, tone, motionEnergy, density) e referência visual. Faltando, pergunte **uma vez**; depois assuma os defaults da skill.
3. **Catálogo primeiro.** `vault/effect-catalog.md`: se existe preset próximo, parta dele.
4. **Construa.** Com `--n` maior que 1, lance um agent `effect-builder` por variação em paralelo (seeds e paletas diferentes), depois o `visual-judge` com as screenshots. Com `--n 1` ou sem, siga a skill na thread principal.
5. **QA obrigatório** pela skill `qa-motion`; leia as screenshots.
6. **Exporte**: `effects/<família>/<nome>/standalone.html`, `config.json`, `prompt.md` (skill `build-prompt`).
7. **Registre** pela skill `catalog-entry` (ou delegue ao `catalog-librarian`).

Não negociáveis: CONFIG antes do código; nenhuma cor literal no shader; sem frame cap; sondas rodadas de verdade; relatório com números por tier e o que não foi verificado.

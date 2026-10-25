---
tags: [vault, moc]
updated: 2026-10-25
---

# Lobo Motion Harness · mapa do vault

O vault guarda o **porquê**: regras, decisões, o que foi medido e o que já existe. A execução (skills, agents, commands, hooks, scripts) mora na raiz do plugin.

## Leia nesta ordem antes de trabalhar
1. [[workflows/ai-agent-guide]] · as hard rules e como reportar
2. [[effect-catalog]] · o que já existe antes de começar do zero
3. A skill da família do efeito (`skills/<família>/SKILL.md`)
4. [[fix-catalog]] e [[pitfalls]] quando for otimizar ou medir

## Notas
- [[workflows/ai-agent-guide]] · regras de engajamento para agentes
- [[effect-catalog]] · todo preset com CONFIG, screenshot, prompt e tags nos cinco eixos
- [[fix-catalog]] · correções que moveram um número medido, com grau de evidência
- [[pitfalls]] · leituras que enganam e armadilhas de ferramenta
- [[decisions-log]] · ADRs: por que as convenções existem
- [[templates/catalog-entry]] · template de entrada do catálogo

## Os cinco eixos de vocabulário
Todo preset e todo brief são descritos nos mesmos cinco eixos, copiados do GetLayers porque funcionam como linguagem entre designer, agent e catálogo:

| Eixo | Valores |
| --- | --- |
| dimensionality | 2d, 2.5d, 3d |
| mood | calm, dreamy, electric, dramatic, playful, luxurious |
| tone | dark, light |
| motionEnergy | 0 a 1 |
| density | 0 a 1 |

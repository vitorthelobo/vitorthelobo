---
tags: [meta, adr]
updated: 2026-10-25
---

# Decisions log (ADRs)

## ADR-0001 · O harness é um plugin de Claude Code, não uma pasta por projeto
- Contexto: três projetos (Motion Labs, Shader Factory, sites de cliente) precisam das mesmas skills.
- Decisão: um repo com `.claude-plugin/marketplace.json` e o plugin em `plugins/lobo-motion/`, instalável com `/plugin install`.
- Consequências: uma fonte, versionada; rules e vault viajam com o plugin; o projeto só recebe o que `/harness-init` copia.

## ADR-0002 · CONFIG-first
- Contexto: GetLayers prova que preset, favorito, URL e prompt podem ser o mesmo objeto.
- Decisão: todo efeito nasce de um CONFIG com schema; o renderer lê uniforms; tint e variação são operações sobre o objeto.
- Consequências: o build prompt vira determinístico; o painel é gerado do schema; shader sem cor literal.

## ADR-0003 · Uma biblioteca de motion por projeto, não «springs only»
- Contexto: a Textura proíbe GSAP porque o starter deles é react-spring. Motion Labs já usa GSAP e Leva.
- Decisão: a regra é «a que já está instalada vence; duas é violação». A escolha fica em cada projeto.
- Consequências: skills descrevem contratos (reveal, scrub, hover, split text), não uma lib.

## ADR-0004 · Conhecimento com grau de evidência
- Contexto: um número medido uma vez vira regra errada com facilidade.
- Decisão: fix-catalog marca `rule` (3 ou mais projetos) ou `observed` (1 a 2). Entradas importadas da Textura levam `fonte: Textura` até serem re-medidas.
- Consequências: skills citam o grau; agents não promovem `observed` a regra.

## ADR-0005 · Harness, factory e library são repos separados; começa com dois
- Contexto: o plugin sabe construir, o Motion Labs executa, o catálogo de presets é o produto.
- Decisão: plugin agora; o catálogo nasce como `catalog/` dentro do Motion Labs e vira repo próprio (`lobo-layers`) ao passar de 30 presets.
- Consequências: o MCP futuro lê só a library; o plugin nunca carrega presets pesados.

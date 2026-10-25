---
name: build-prompt
description: Escreve o build prompt que reconstrói um efeito ou preset 1:1 em qualquer stack (o "Copy prompt" do GetLayers): CONFIG literal, receita procedural numerada, shaders completos, interação, tiers, integração e critérios de aceite verificáveis. Também testa o prompt reconstruindo em diretório limpo e comparando screenshots. Use quando o usuário pedir "copy prompt", "prompt que reconstrói", "exportar como prompt", "prompt pra vender", ou ao final de qualquer efeito aprovado.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Build prompt

O prompt é o produto. Ele funciona porque junta três coisas que um modelo reproduz com fidelidade: um CONFIG determinístico, uma receita procedural numerada e critérios de aceite verificáveis. Adjetivos não entram; código entra inteiro.

## 1. Entrada
O efeito aprovado: `standalone.html` (ou componente), `config.json`, a screenshot de referência em 1440x900 a 3 s, e o schema da família.

## 2. Estrutura obrigatória (nesta ordem)
```markdown
# Build: <nome do preset> (<família>)

## Objetivo
Uma frase: o que o espectador vê e onde (hero, background, loader, widget).

## Stack alvo
<HTML standalone sem build | React + three.js | vanilla three.js | WebGL2 cru>. Dependências exatas com versão (ex.: three@0.170.0 por import map). Nada além.

## CONFIG (fonte da verdade, copie literalmente)
<JSON completo do config.json, incluindo seed>

## Receita
1. Canvas, contexto e flags (alpha, antialias, DPR clampado em [1, 1.5], phone 1.25).
2. Geração de dados (forma, atlas, buffers), com a fórmula e a seed.
3. Simulação ou campo (a equação, por frame, com dt em segundos).
4. Render (material, blending, depthWrite, tamanho de ponto com uPixelScale).
5. Pós (bloom: strength = glow, radius = glowSpread, threshold = glowCutoff; aquecer no primeiro frame).
6. Interação (ponteiro em plano analítico, só após o primeiro movimento; clique; touch).

## Shaders
<vertex e fragment completos, com os uniforms nomeados igual ao CONFIG>

## Interação e tiers
Desktop, tablet, phone: count, DPR, bloom, pointer. Sem frame cap. Reduced motion: entrada, tempo parado, canvas continua desenhando. User agent de bot: imagem estática.

## Integração
Montagem no DOM ou em React, props expostas, pausa fora da viewport, destruição (dispose, forceContextLoss, listeners).

## Critérios de aceite
- programs.length estável depois do primeiro frame.
- Frames contados por `tools/qa/fps-probe.mjs` nos dois tiers; nenhum programa linkado depois do settle.
- Screenshot em t = 3 s bate com a referência anexa em paleta, densidade e silhueta.
- Nenhuma cor literal no shader fora dos uniforms; `setConfig` ignora chaves fora do schema.
```

## 3. Regras
- **Mudança só por chave conhecida.** O prompt carrega exatamente as chaves do schema. Se o cliente pediu um knob que o renderer não lê, o knob não existe até o template mudar.
- **Favorito é diff.** O prompt de um favorito é o prompt do preset com o CONFIG já mesclado; não gere um prompt por usuário.
- **Código inteiro, não resumo.** Shaders e geradores de forma vão completos. «Use curl noise» não reconstrói nada; a função reconstrói.
- **Idioma:** português pro uso interno, inglês quando o alvo é venda internacional ou MCP. O CONFIG e o código são idênticos nos dois.
- **Sem dependência escondida:** se o template usa CDN, o prompt diz a URL e a versão.

## 4. Teste (obrigatório antes de virar produto)
1. Crie um diretório vazio; dê o prompt (só ele) pra um agent `prompt-tester` reconstruir.
2. Rode `screenshot-grid` no original e na reconstrução, mesmos tempos.
3. Leia as duas screenshots lado a lado. Diferença de paleta, densidade ou silhueta reprova; micro-diferença de ruído aprova.
4. Reprovou: a diferença mostra o que faltou no prompt (quase sempre seed, uma constante ou a ordem dos passes). Corrija o prompt, não a reconstrução.

## 5. Saída
`catalog/<família>/<preset>.prompt.md`, referenciado na entrada do catálogo.

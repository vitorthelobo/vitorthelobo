---
name: orb-reactive
description: Constrói um orb de vidro (esfera com interior de ruído, refração, brilho e poeira) que reage a áudio ou a estados de produto (idle, listening, thinking, speaking, success, error), em WebGL2 cru ou three.js. Use quando o usuário pedir "orb", "esfera de IA", "assistente de voz visual", "bola de vidro que reage à voz", "estado de listening/thinking", ou um indicador animado de agente de IA.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Orb reativo

Status: skill procedural; o primeiro template entra quando um preset passar por `visual-judge` e `qa-motion`. Reaproveite `shader-background/templates/standalone.html` como casca (loop, tiers, reduced motion, context loss, URL state) e `glsl-cookbook.md` (snoise, fbm, OKLab, ACES).

## 0. Intake
- Onde o orb vive: hero (400 a 800 px), widget (120 a 264 px) ou ícone (≤ 64 px). Abaixo de 64 px desligue refração: invisível e cara.
- Reage a quê: microfone (Web Audio), nível de áudio vindo do app (número 0..1 por frame) ou só estados.
- Paleta: base, interior, 3 acentos (poeira, estrelas, aurora). Referência visual obrigatória.

## 1. CONFIG
`preset, colorBase, colorInterior, accentDust, accentStars, accentAurora, intensity (0..2), detail (0..1), glass (0..1), glow (0..2), speed (0..2), drift (0..1), audioBrightness (0..2), audioMotion (0..1), audioPulse (0..2), state (idle|listening|thinking|speaking|success|error), quality (low|balanced|high), size (px), seed, dprMax`.

## 2. Render (fragment, um quad)
1. SDF de esfera: `d = length(p) - r`; máscara com `aa(d)`; normal analítica `n = vec3(p, sqrt(max(0, r² - dot(p, p)))) / r`.
2. Interior: 3 a 4 camadas de `fbm(p * k + t)` em coordenadas esféricas, cada uma com uma cor de acento, somadas com pesos por `intensity` e `detail`. Poeira = pontos de `hash31` acima de um threshold; estrelas = picos de ruído de alta frequência.
3. Vidro: refração aproximada deslocando a amostra do interior por `n.xy * glass * 0.15`; fresnel `pow(1 - n.z, 3)` como aro; highlight especular num ponto fixo.
4. Glow: halo `exp(-d * k) * glow` fora da esfera, com a cor dominante do interior.
5. Tone mapping ACES, grain leve, saída em sRGB.

## 3. Estados (uniform `uState` e `uStateT` de transição 0..1)
| Estado | O que muda |
| --- | --- |
| idle | drift lento, brilho base |
| listening | aro pulsa com o nível de áudio, interior acelera 1.3× |
| thinking | interior gira em espiral, poeira sobe, brilho oscila em 0.8 Hz |
| speaking | pulso segue o envelope do áudio (`audioPulse`), brilho sobe (`audioBrightness`) |
| success | flash curto do acento, depois assenta |
| error | tinge pro vermelho do CONFIG, treme 200 ms, volta |

Transições por `uStateT` com `smoothstep`; nunca troque uniform de forma brusca. Speaking sem áudio real fica em idle (não invente pulso).

## 4. Áudio
`AudioContext` + `AnalyserNode` (fftSize 256). Nível = RMS do domínio do tempo; brilho = energia em 200 a 2000 Hz. Suavize no JS com `lerp(level, raw, 1 - pow(1 - 0.3, dt * 60))`. Peça o microfone só num clique; mostre «analisado localmente». Sem permissão, caia pra estados.

## 5. Tiers e verificação
Quality low: sem refração, 2 camadas; balanced: 3 camadas; high: 4 camadas e grain. DPR e loop como nas outras skills. Sondas de `qa-motion`. Screenshots em cada estado (6) nos dois tiers; leia todas.

## 6. Exporte e registre
Standalone com CONFIG, componente com props `state` e `level`, build prompt, entrada no catálogo.

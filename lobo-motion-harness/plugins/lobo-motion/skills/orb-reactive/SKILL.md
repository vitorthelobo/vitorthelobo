---
name: orb-reactive
description: Constrói um orb de vidro (esfera com interior de ruído, refração, brilho e poeira) que reage a áudio ou a estados de produto (idle, listening, thinking, speaking, success, error), em WebGL2 cru ou three.js. Use quando o usuário pedir "orb", "esfera de IA", "assistente de voz visual", "bola de vidro que reage à voz", "estado de listening/thinking", ou um indicador animado de agente de IA.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Orb reativo

Leia `references/config-schema.md` (chaves, API em runtime, tabela de estados) e `vault/effect-catalog.md`. `templates/standalone.html` é a implementação de referência: WebGL2 cru, 5 presets, máquina de 6 estados com transição de 450 ms, análise de áudio local, tiers, reduced motion, context loss, robot form e o contrato `window.__lobo`. Parta dele; o cookbook da skill `shader-background` tem as funções de ruído e cor.

## 0. Intake
- Onde o orb vive: hero (400 a 800 px), widget (120 a 264 px) ou ícone (≤ 64 px). Abaixo de 64 px desligue refração: invisível e cara.
- Reage a quê: microfone (Web Audio), nível de áudio vindo do app (número 0..1 por frame) ou só estados.
- Paleta: base, interior, 3 acentos (poeira, estrelas, aurora). Referência visual obrigatória.

## 1. CONFIG
`preset, colorBase, colorInterior, accentDust, accentStars, accentAurora, intensity (0..2), detail (0..1), glass (0..1), glow (0..2), speed (0..2), drift (0..1), audioBrightness (0..2), audioMotion (0..1), audioPulse (0..2), state (idle|listening|thinking|speaking|success|error), quality (low|balanced|high), size (px), seed, dprMax`.

## 2. Render (fragment, um quad; é o que o template faz)
1. SDF de esfera: `d = length(p) - r`; máscara com `aa(d)`; normal analítica `n = vec3(p, sqrt(max(0, r² - dot(p, p)))) / r`.
2. Interior: 3 a 4 camadas de `fbm(p * k + t)` em coordenadas esféricas, cada uma com uma cor de acento, somadas com pesos por `intensity` e `detail`. Poeira = pontos de `hash31` acima de um threshold; estrelas = picos de ruído de alta frequência.
3. Vidro: refração aproximada deslocando a amostra do interior por `n.xy * glass * 0.15`; fresnel `pow(1 - n.z, 3)` como aro; highlight especular num ponto fixo.
4. Glow: halo `exp(-d * k) * glow` fora da esfera, com a cor dominante do interior.
5. Tone mapping ACES, grain leve, saída em sRGB.

## 3. Estados (parâmetros por estado no JS, misturados por smoothstep em 450 ms e passados como uniforms)
| Estado | O que muda |
| --- | --- |
| idle | drift lento, brilho base |
| listening | aro pulsa com o nível de áudio, interior acelera 1.3× |
| thinking | interior gira em espiral, poeira sobe, brilho oscila em 0.8 Hz |
| speaking | pulso segue o envelope do áudio (`audioPulse`), brilho sobe (`audioBrightness`) |
| success | flash curto do acento, depois assenta |
| error | tinge pro vermelho do CONFIG, treme 200 ms, volta |

A mistura entre o estado anterior e o atual acontece no JS (`STATES[prev]` → `STATES[state]`), e o shader recebe só os parâmetros derivados (`uRim`, `uSpiral`, `uDustRise`, `uPulse`, `uBright`, `uFlash`, `uErrorTint`, `uBreath`). Nunca troque uniform de forma brusca. Speaking sem áudio há mais de 1 s se comporta como idle (não invente pulso).

## 4. Áudio
`AudioContext` + `AnalyserNode` (fftSize 256). Nível = RMS do domínio do tempo; brilho = energia em 200 a 2000 Hz. Suavize no JS com `lerp(level, raw, 1 - pow(1 - 0.3, dt * 60))`. Peça o microfone só num clique; mostre «analisado localmente». Sem permissão, caia pra estados.

## 5. Tiers e verificação
Quality low: 2 camadas; balanced: 3; high: 4 (phone no máximo 3). Refração desliga sozinha abaixo de 64 px. DPR e loop como nas outras skills. Sondas de `qa-motion`; pra screenshots por estado use `?state=<nome>` e `?level=0.8` (gancho de teste). Leia todas: o listening precisa mostrar o anel, o thinking a espiral e a poeira subindo, o error a tinta, o success o flash.

## 6. Exporte e registre
Standalone com CONFIG, componente com props `state` e `level`, build prompt, entrada no catálogo.

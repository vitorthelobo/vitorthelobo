---
name: tier-calibrate
description: Calibra os tiers de performance (desktop, tablet, phone) de um efeito numa GPU real — mede fps, frame time p95, draw calls e tempo de compilação por combinação de count/dprMax/bloom, acha o maior preset que segura 55+ fps em cada tier e grava os valores no CONFIG e no catálogo. Use quando o usuário pedir "calibra os tiers", "quanto aguenta no celular", "ajusta o count pro mobile", "mede na minha GPU", "o efeito está pesado", ou antes de publicar um efeito com partículas ou bloom.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Tier Calibrate

`perf-auditor` mede; esta skill **decide**: por tier, o teto de `count`, `dprMax` e intensidade de bloom que mantém o alvo, e grava. Script: `tools/qa/tier-calibrate.mjs`.

## 0. Onde medir
- SwiftShader (este container) **não calibra nada**: só serve pra comparar relativo (A é 2× mais pesado que B). Os números absolutos vêm de GPU real.
- Ordem de prioridade: (1) o laptop/desktop do cliente ou o seu (RTX 2060 = teto confortável, calibre pra metade dele), (2) um Android médio via `chrome://inspect` ou `adb`, (3) iPhone real via Safari remoto. Sem device físico, use os **perfis de referência** abaixo e marque no catálogo como "estimado".
- Alvo: desktop 60 fps p95 < 20 ms; tablet 60/≤ 22 ms; phone 55/≤ 24 ms. Compilação de shader < 400 ms no phone.

## 1. Rode
```bash
# varre count × dprMax × glow e devolve a tabela por tier
node tools/qa/tier-calibrate.mjs --url skills/particle-forms/templates/standalone.html?preset=nebula-drift \
  --tiers desktop,tablet,phone --counts 80000,120000,180000,240000 --dpr 1,1.25,1.5 --glow 0,0.5,0.9 --seconds 4
```
Saída: uma linha por combinação (`tier count dpr glow fps p95 drawCalls compileMs`) e, no fim, **a recomendação** por tier: a combinação mais rica que cumpre o alvo. Em GPU real adicione `--real` pra o script gravar `tools/qa/tier-profiles.json` com o nome da GPU (`WEBGL_debug_renderer_info`).

## 2. Interprete
- fps cai com `count` mas p95 não → gargalo é vertex/fill, reduza `count` ou `size`.
- fps cai com `dpr` → fill rate; baixe `dprMax` antes de `count` (phone 1.25 → 1.0 custa pouco visualmente).
- fps cai com `glow` → bloom (5 passes de blur); reduza `glowSpread` antes de `glow`, e em phone `bloomMul` 0.5 já está na casca.
- `compileMs` alto → shader grande; prewarm já existe, mas em phone > 400 ms vale uma variante `lite` do shader (menos oitavas de fbm).
- Variância > 15 % entre repetições → thermal throttling ou outro processo; repita com `--seconds 8`.

## 3. Grave
1. No template, a função `tier()`: `countMul`, `dprMax`, `bloomMul` por tier com os valores encontrados.
2. No preset, se um preset específico precisou de teto menor: chave `tiers: { phone: { count: 60000, glow: 0.4 } }` (o `applyConfig` mescla por tier; se o template ainda não suporta, adicione: três linhas).
3. No catálogo: linha `Perf: desktop 60/14 ms · tablet 60/19 ms · phone 56/23 ms (GPU: <nome> ou "estimado")`.
4. `vault/fix-catalog.md`: o que mudou e os números antes/depois.

## 4. Perfis de referência (sem device)
| Tier | Referência | O que segura (particle-forms com bloom) | shader-background |
| --- | --- | --- | --- |
| desktop | GTX 1650 / M1 | 220k pontos, dpr 1.5, glow 0.9 | 5 oitavas fbm, dpr 1.5, qualquer efeito |
| tablet | iPad 9ª / A13 | 120k, dpr 1.25, glow 0.6 | 5 oitavas, dpr 1.25 |
| phone | Pixel 6a / iPhone 12 | 60–70k, dpr 1.0–1.25, glow 0.4, `glowSpread` 0.05 | 4 oitavas, dpr 1.25, halftone/dither ok, caustics (2 fbm) pede dpr 1.0 |
| phone-low | Moto G / A12 | 35k, dpr 1.0, sem bloom | 3 oitavas, dpr 1.0 |

## 5. Regras
- Nunca calibre pelo seu desktop e publique. Pelo menos um device fraco real ou o perfil `phone-low`.
- `count` é alocado no tier máximo e cortado por `drawRange`; calibrar nunca realoca o buffer.
- Não troque de técnica pra ganhar fps (ex. tirar o bloom e desenhar halo no fragment) sem registrar como decisão em `vault/decisions-log.md`.
- Reporte sempre com a tabela, não com "ficou leve".

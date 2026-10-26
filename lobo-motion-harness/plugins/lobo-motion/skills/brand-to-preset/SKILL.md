---
name: brand-to-preset
description: Deriva presets do harness a partir de uma marca — paleta, tipografia, tom de voz, arquétipo — gerando os CONFIGs certos em cada família (cores em OKLab ordenadas por luminância, energia de movimento pelo tom, densidade pelo posicionamento) e um pacote "brand motion kit". Use quando o usuário pedir "faz os efeitos da marca X", "aplica a identidade", "versão da marca", "brand motion", ou quando vier do pipeline-de-marca com um brandbook pronto.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Brand → Preset

Entrada: o que a marca já tem (brandbook, `brand.json`, ou 5 cores + 2 fontes + 3 adjetivos). Saída: um CONFIG por família escolhida, nomeado `<marca>-<família>-<variante>`, registrado no catálogo, mais o kit. Tabelas de mapeamento em `references/mapping.md`.

## 0. Intake (uma pergunta, depois assume)
- Cores: primária, secundária, acento, fundo escuro, fundo claro. Hex.
- Tom: 3 adjetivos (ex. "premium, calmo, técnico"). Se vier arquétipo (Explorer, Sage, Creator…), a tabela converte.
- Onde vai: hero de site, fundo de app, abertura de vídeo, assinatura de posts. Define densidade e energia.
- Famílias pedidas; sem lista, o default é shader-background + text-motion + uma de partículas/orb.

## 1. Paleta → `colors`
1. Converta tudo pra OKLab (`references/mapping.md` tem a função). Ordene por L (luminância) crescente: o gradiente sempre vai do escuro pro claro.
2. 5 stops: `[fundo escuro, primária escurecida (L −0.15), primária, acento, claro]`. Se a marca só tem 3 cores, interpole em OKLab pra fabricar os intermediários; nunca em RGB (lava).
3. Marca clara (fundo branco): inverta a ordem **e** suba `contrast` pra 1.15; `grain` ≤ 0.05.
4. Monocromática: 5 stops da mesma matiz variando L; `swirl` alto compensa a falta de cor.
5. Verifique: contraste entre `colors[0]` e `colors[4]` ≥ 4.5:1 (texto por cima). Se não, escureça o stop 0.

## 2. Tom → movimento
| Adjetivos | motionEnergy | `speed` | `movement`/`flow` | `swirl` | `glow` |
| --- | --- | --- | --- | --- | --- |
| premium, calmo, sóbrio, institucional | 0.2–0.35 | 0.3–0.45 | 0.25–0.35 | 0.1–0.3 | 0.4–0.6 |
| técnico, preciso, limpo | 0.3–0.45 | 0.4–0.6 | 0.2–0.3 | 0.0–0.15 | 0.5–0.7 |
| criativo, ousado, jovem | 0.6–0.8 | 0.6–0.9 | 0.5–0.7 | 0.4–0.6 | 0.8–1.0 |
| orgânico, humano, acolhedor | 0.4–0.55 | 0.4–0.55 | 0.45–0.6 | 0.25–0.4 | 0.6–0.8 |
| enérgico, esportivo, urgente | 0.8–1.0 | 0.9–1.3 | 0.6–0.8 | 0.5–0.8 | 0.9–1.2 |

Shape pelo tom: sóbrio → `linear`/`warped`; técnico → `stripes`/`rays`/`gyroscope`; criativo → `conic`/`blobs`/`torusKnot`; orgânico → `mesh`/`aurora`/`coral`/`membrane`; enérgico → `caustics`/`tornado`/`vortex`.

## 3. Onde vai → densidade e tier
- Hero de site: densidade 0.3–0.5, `count` 150–200k, `dprMax` 1.5, `vignette` 0.2.
- Fundo de app (conteúdo por cima o tempo todo): densidade ≤ 0.25, `glow` ≤ 0.5, `contrast` ≤ 1.05, `speed` ≤ 0.4. O efeito é textura, não protagonista.
- Abertura de vídeo (vai ser gravado): densidade 0.6+, `speed` 0.8+, `grain` 0.1, sem pointer.
- Assinatura de post (1080×1350): `centerY` 0.4, `zoom` 0.9, texto no terço inferior.

## 4. Tipografia → text-motion
- Serif / editorial → `rise-settle`, `unblur-lines`, `fade-cascade`; `tension` 0.9, `friction` 1.1.
- Grotesk / tech → `typewriter`, `slide-from-left`, `skew-in`; `tension` 1.2.
- Display / expressiva → `pop-scale`, `flip-in`, `tilt-3d`; `stagger` maior.
- Sempre: o `font-family` do CONFIG é a da marca; o split espera `fonts.ready`.

## 5. Produza
1. Um CONFIG por família, nome `<marca>-<família>-<variante>` (ex. `superwash-shader-hero`), `seed` fixa, todas as chaves do schema.
2. Rode cada um no template da família com `?s=` e leia a screenshot (skill `qa-motion`). Compare lado a lado com a cor da marca: o acento tem que aparecer, não só o fundo.
3. Registre no catálogo (skill `catalog-entry`) com tag `brand:<marca>`.
4. Kit: skill `effect-pack-export` com `--brand <marca>` (gera o zip com HTMLs, prompts, README e a paleta).

## 6. Regras
- A marca manda nas cores; o harness manda na física. Nunca invente uma sexta cor "pra ficar bonito".
- Um preset "hero" e um "quiet" por família é o mínimo; o cliente sempre pede os dois.
- Escreva no README do kit a frase de posicionamento que justificou a energia escolhida. Vira argumento de venda.

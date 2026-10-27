# BRANDFORGE — 5 runs · clínicas odontológicas e de estética (donas mulheres)

Vitrine gerada em 27/10/2026 com o Space **BRANDFORGE — Mockup a partir de LOGO + BRIEFING** (Magnific Spaces) + renderização no Magnific (Nano Banana Pro, 2K, 3:2).

Cada run tem: **brief** · **prancha de cores** · **prancha de tipografia** · **logo hero** · **logo detalhe** · **10 mockups** (cartões, fachada, recepção, landing page, dashboard, Instagram, uniforme, kit, papelaria, tote) = 14 imagens.

| Run | Marca | Segmento | Pasta | Space (Brandforge) |
|---|---|---|---|---|
| 01 | LUME Odontologia | odonto estética premium · Maceió | `01-lume-odontologia/` | [abrir](https://www.magnific.com/app/spaces/a31522ff-3ece-49d3-b02a-2c59bd7bfb6c) |
| 02 | AURA Estética Avançada | estética facial/corporal · Recife | `02-aura-estetica/` | [abrir](https://www.magnific.com/app/spaces/a3152303-55fb-4350-b988-f550960565ac) |
| 03 | NUVEM Odontologia | odonto família/infantil · Fortaleza | `03-nuvem-odontologia/` | [abrir](https://www.magnific.com/app/spaces/a3152307-5711-4662-ac80-1c13abd79842) |
| 04 | MAISON DERMA | dermato estética de luxo · SP Jardins | `04-maison-derma/` | [abrir](https://www.magnific.com/app/spaces/a315230d-0ced-42cc-a121-e8a683fd2d46) |
| 05 | ALINHE Ortodontia | alinhadores invisíveis · Brasília | `05-alinhe-ortodontia/` | [abrir](https://www.magnific.com/app/spaces/a3152310-9dc2-4ac5-9e8c-25daef47e4ce) |

## Arquivos
- `0X-marca/brief.md` — brief da marca (essência, posicionamento, logo, paleta, tipografia, tom)
- `0X-marca/00-cores.*`, `00-tipografia.*`, `01-logo-hero.*` … `12-tote.*` — imagens 2K (2528×1696)
- `0X-marca-prancha-contato.jpg` — prancha com as 14 imagens da marca
- `manifest.json` — ids das criações no Magnific por cena
- `urls.tsv` — URLs de download (tokens expiram)

> As imagens 2K (~400 MB) ficam fora do git (`.gitignore`); estão na pasta local e no projeto Pessoal do Magnific. Só briefs, pranchas de contato e manifest são versionados.

## Como foi feito
1. Space BRANDFORGE duplicado 5× (original intocado). Em cada cópia: briefing trocado e o prompt-generator (Claude Sonnet) reescrito para 12 cenas **brandadas** (o original gerava superfícies em branco).
2. Os 5 Spaces rodaram e o Brandforge escreveu as 12 cenas por marca (7 blocos: subject/scene/light/camera/material/palette/negatives).
3. O nó de imagem do Space gerou só 1 imagem por marca (usou o prompt inline antigo), então as 60 cenas foram renderizadas direto no Magnific com o mesmo modelo. As pranchas de cores/tipografia foram geradas à parte.

## Pontos a refazer se for usar fora da vitrine
- NUVEM · fachada: letras com pontos "n·u·v·e·m" e símbolo duplicado.
- ALINHE · tote: texto "ORTODONTIA IN MENTA"; símbolo às vezes na diagonal.
- Consistência de logo entre cenas é boa, não perfeita (sem referência de imagem, só descrição).

## Custo
~5.700 créditos Magnific (76 imagens × 75; inclui 5 imagens descartadas do primeiro run do Space).

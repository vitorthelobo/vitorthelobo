# CONFIG schema · text-motion

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | enum | um dos 28 em `presets.md` | rise-settle | preset do elemento `data-hero`; outros elementos usam `data-preset` |
| tension | number | 0.5..2 | 1 | multiplicador da rigidez do preset (k = 170 × tension do preset × este) |
| friction | number | 0.5..2 | 1 | multiplicador do amortecimento (c = 26 × friction do preset × este); menor = mais bounce |
| stagger | number ou null | 0..200 ms | null | intervalo entre unidades; null usa o do preset |
| delay | number | 0..3000 ms | 0 | atraso somado ao `data-delay` do elemento |
| speed | number | 0.25..3 | 1 | divide o stagger (não muda a física da mola) |
| trigger | enum | mount, inview-once, inview-always, progress | inview-once | quando tocar; `data-trigger` no elemento sobrescreve |
| start, end | string | gramática `"<borda do elemento> <borda da viewport>[±=px|%]"` | `top bottom-=10%`, `center center` | só para `progress` |
| scope | enum | all, hero, headings | all | quais `[data-lobo-text]` animam |
| text | string ou null | | null | troca o texto do hero (`?text=`) |
| seed | integer | | 0 | reservado para presets com aleatoriedade |

## Atributos por elemento
`data-lobo-text` (ativa), `data-hero` (recebe `cfg.preset` e `?preset=`), `data-preset="<nome>"`, `data-delay="<ms>"`, `data-trigger="<modo>"`.

## API em runtime (`window.__lobo`)
`config`, `presets`, `stats` (elements, units, frames, active, plays, resplits), `setConfig(changes)` → `{ ignored }` e re-split, `replay()`, `split(el)` para elementos novos, `exportState()`.

## Garantias do template
- O texto original fica no DOM em `.lm-sr` e em `aria-label`; o split é `aria-hidden`. Crawlers e leitores de tela leem a frase inteira.
- Reduced motion e user agent de bot: nenhum split, texto pronto.
- Blur é propriedade da linha (`.lm-clip`), nunca de letra ou palavra. `will-change` só durante a animação da unidade.
- Um `requestAnimationFrame` para todos os elementos; para quando tudo assenta.
- Palavras nunca quebram no meio (`white-space: nowrap`); re-split em mudança de largura (debounce 150 ms) e quando as fontes carregam.

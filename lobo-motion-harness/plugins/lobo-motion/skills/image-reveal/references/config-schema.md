# CONFIG schema · image-reveal

Uma textura (imagem do cliente ou amostra procedural) e um fragment shader com dois eixos: `reveal` (0..1, entrada) e `hover` (ponteiro). `src` vazio desenha a amostra; `?src=` na URL também funciona.

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | string | nome no catálogo | liquid-reveal | rótulo |
| src | string | URL (CORS) ou vazio | "" | imagem; vazio = amostra procedural |
| mode | enum | liquid, pixel, tiles, wipe, ripple, displace | liquid | o efeito |
| reveal | number | 0..1 | 0 | progresso; `scroll-grammar` escreve aqui (scrub) |
| autoReveal | bool | | true | anima 0→1 ao entrar na viewport (e ao clicar) |
| duration | number | 0.3..4 | 1.6 | segundos do reveal automático (ease in-out cúbico) |
| hover | number | 0..1 | 0.5 | força do ponteiro (0 em touch) |
| hoverRadius | number | 0.05..0.6 | 0.22 | raio do ponteiro em fração da largura |
| noiseScale | number | 0.5..6 | 2.2 | frequência do ruído (liquid, wipe, displace) |
| pixelSize | number | 0..160 | 0 | tamanho inicial do mosaico (pixel), em px CSS |
| tiles | number | 0..40 | 0 | colunas de tiles (tiles); linhas seguem o aspecto |
| direction | number | 0..360 | 90 | direção em graus (wipe, tiles) |
| edge | number | 0.005..0.4 | 0.08 | largura da borda do reveal (liquid, wipe) |
| tint | hex | | #FFFFFF | multiplica a imagem e colore a borda |
| speed | number | 0..2 | 1 | velocidade do tempo (ripple, displace, liquid) |
| seed | integer | | 3 | desloca o ruído e a ordem dos tiles |
| dprMax | number | 1..2 | 1.5 | teto de DPR |

## Modos
| mode | reveal | hover |
| --- | --- | --- |
| liquid | limiar de fbm com borda clara (queimada) | deslocamento suave em volta do ponteiro |
| pixel | mosaico grande que resolve (pixelSize → 1) | — |
| tiles | grade de tiles crescendo do centro de cada um, em ordem na `direction` | leve deslocamento |
| wipe | varredura na `direction` com borda deformada por ruído | deslocamento |
| ripple | (imagem sempre visível) | ondas concêntricas a partir do ponteiro |
| displace | (imagem sempre visível) | líquido: fbm animado + velocidade do ponteiro |

## API
`setConfig`, `exportState`, `play()`/`replay()` (reanima o reveal), `?src=`, `?preset=`, `?s=`. Clique reinicia o reveal (exceto ripple/displace).

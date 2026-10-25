# CONFIG schema · orb-reactive

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | string | nome no catálogo | core-teal | rótulo |
| colorBase | hex | | #07262B | fundo (ignorado quando `transparent`) |
| colorInterior | hex | | #050809 | base escura do interior |
| accentDust, accentStars, accentAurora | hex | | #00C2A8, #38E1FF, #FFC65C | as três camadas de luz, a poeira e as estrelas |
| errorColor | hex | | #FF3B30 | tinta do estado error |
| intensity | number | 0..2 | 0.95 | peso das camadas de ruído |
| detail | number | 0..1 | 0.8 | frequência das camadas |
| glass | number | 0..1 | 0.35 | refração e highlight (0 automático abaixo de 64 px) |
| glow | number | 0..2 | 0.9 | halo externo |
| speed | number | 0..2 | 0.8 | velocidade base do tempo |
| drift | number | 0..1 | 0.6 | deriva do interior |
| audioBrightness | number | 0..2 | 1.2 | quanto o brilho sobe com o áudio (speaking) |
| audioMotion | number | 0..1 | 0.55 | quanto a velocidade sobe com o áudio (speaking) |
| audioPulse | number | 0..2 | 0.85 | quanto o raio pulsa com o áudio (speaking) |
| state | enum | idle, listening, thinking, speaking, success, error | idle | estado inicial; mude por `__lobo.setState` |
| quality | enum | low, balanced, high | balanced | 2, 3 ou 4 camadas (phone no máximo 3) |
| size | integer | 0 ou 64..1200 | 264 | px do orb; 0 preenche a caixa (hero) |
| transparent | bool | | false | fundo transparente pra sobrepor num layout |
| grain | number | 0..0.1 | 0.03 | grão |
| seed | integer | 0..9999 | 0 | desloca o ruído |
| dprMax | number | 1..2 | 1.5 | teto de DPR (phone 1.25) |

## API em runtime (`window.__lobo`)
- `setState(name)` → transição de 450 ms por smoothstep; `success` dispara um flash que decai; `error` tinge e treme 200 ms.
- `setLevel(level, bright?)` → nível 0..1 vindo do app (TTS, player); `speaking` sem áudio há mais de 1 s se comporta como idle.
- `startMic()` (só num clique) / `stopMic()` → análise local por `AnalyserNode`: RMS como nível, energia em 200 a 2000 Hz como brilho.
- `states` → a lista; `state` → o atual.
- URL: `?state=thinking`, `?level=0.8` (gancho de teste e screenshot), `?preset=`, `?s=`.

## Estados → parâmetros internos
| Estado | speed | rim | spiral | dust | bright | breath |
| --- | --- | --- | --- | --- | --- | --- |
| idle | 1.0 | 0 | 0 | 0 | 1.0 | 0 |
| listening | 1.3 | 1 (× nível) | 0 | 0.2 | 1.1 | 0 |
| thinking | 1.2 | 0.2 | 1 | 1 | 1.0 | 1 (0.8 Hz) |
| speaking | 1 + nível × audioMotion | 0.3 | 0 | 0.3 | 1 + nível × audioBrightness | 0 |
| success | 0.8 | 0.5 | 0 | 0 | 1.15 + flash | 0 |
| error | 0.6 | 0.2 | 0 | 0 | 0.9, tinta errorColor | 0 |

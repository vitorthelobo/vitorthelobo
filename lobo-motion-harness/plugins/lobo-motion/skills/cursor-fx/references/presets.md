# Presets · cursor-fx (27)

| Grupo | Preset | O que faz | Knobs que importam |
| --- | --- | --- | --- |
| pointer | dot-ring | ponto no cursor, anel com lerp, escala no hover | follow, ringSize, dotSize, hoverScale |
| pointer | velocity-squish | disco que estica na direção da velocidade | follow, ringSize |
| pointer | crosshair-hud | linhas cruzadas full-screen, caixa e coordenadas | ringSize, color |
| pointer | custom-pointer | seta SVG que inclina com a velocidade | ringSize, color, color2 |
| pointer | figma-cursor | seta + etiqueta com nome | ringSize, color2 |
| pointer | eyes | dois olhos cujas pupilas olham pra onde o cursor vai | ringSize, dotSize |
| pointer | butterfly | duas asas batendo que seguem devagar | follow, ringSize, colorMode gradient |
| trail | trail | linha que afina e some | trailLength, trailDecay, dotSize |
| trail | cascading-dots | corrente de pontos, cada um seguindo o anterior | trailLength |
| trail | swirl | pontos orbitando o cursor com rastro | trailLength, trailDecay |
| trail | silky-ribbon | fita com largura em seno e gradiente | trailLength, ringSize |
| trail | pixel-trail | células da grade acendem e apagam | fieldSpacing, trailDecay |
| trail | fluid-smoke | partículas aditivas emitidas pela velocidade | trailDecay, colorMode |
| trail | cursor-ghost | blob translúcido que ondula e segue lento | follow, ringSize |
| field | magnet-lines | grade de traços que aponta pro cursor | fieldSpacing, fieldStrength |
| field | ascii-field | glifos mais densos perto do cursor | fieldSpacing, fieldStrength |
| field | dot-grid-warp | pontos empurrados pelo cursor | fieldSpacing, fieldStrength |
| field | spotlight | escurece a página e abre um círculo de luz suave no cursor, com anel de acento | ringSize (raio = 4.5×), color (véu), color2 (anel) |
| trail | comet | cauda aditiva que engrossa até a cabeça brilhante | trailLength, dotSize, colorMode gradient |
| trail | sparkle-burst | estrelas de 4 pontas emitidas pela velocidade, caem com gravidade | dotSize, trailDecay (vida) |
| trail | ripple-rings | anéis que se expandem a cada `fieldSpacing` px percorridos | ringSize (velocidade), fieldSpacing, trailDecay |
| field | radar-sweep | varredura giratória acende a grade de pontos em volta do cursor; gira mesmo parado | fieldSpacing, fieldStrength (velocidade do giro) |
| trail | rainbow-trail | `fx: trail` com gradiente magenta→ciano e 40 pontos | trailLength, dotSize |
| trail | bubble-chain | `fx: cascading-dots` com bolhas grandes em gradiente | trailLength, dotSize |
| pointer | invert-ring | `fx: dot-ring` grande em `difference` (inverte o que passa embaixo) | ringSize, hoverScale |
| field | matrix-field | `fx: ascii-field` verde denso | fieldSpacing, fieldStrength |
| field | magnet-dense | `fx: magnet-lines` em grade de 20 px, gradiente quente | fieldSpacing, fieldStrength |

`fx` (chave de preset): a implementação a usar. Sem `fx`, vale a de mesmo nome do preset. Variações de estilo (cor, tamanho, densidade) entram como preset novo com `fx` apontando pra um efeito existente, sem duplicar código.

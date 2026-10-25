---
name: text-motion
description: Constrói animações de texto por split em letra, palavra e linha (rise, blur in, pop, flip, typewriter, curtain, cascade, wipe) com spring e stagger, acionadas por scroll ou por montagem, com cópia em texto puro no DOM pra SEO e leitores de tela. Use quando o usuário pedir "animação de texto", "título que sobe letra por letra", "split text", "reveal de heading", "typewriter", "texto com blur", "stagger de palavras", ou pra afinar tension, friction, stagger ou delay de um texto animado.
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Text motion

Contrato primeiro, biblioteca depois. A biblioteca é a que o projeto já usa (regra «uma por projeto»): GSAP, react-spring (com `spring-text-engine`), motion ou `svelte/motion`. Se não há nenhuma, proponha uma e pergunte antes de instalar.

## 0. Intake
- Unidade: letra (títulos curtos), palavra (frases) ou linha (parágrafos). Letra por letra em texto longo é ruído.
- Gatilho: montagem, entrada na viewport (`once` / `always` / `forward`) ou progresso de scroll (`scrub` / `toggle`).
- Escopo: só o hero, todos os headings ou todo texto.

## 1. CONFIG
`preset, unit (letter|word|line), tension (0.5..2 ×), friction (0.5..2 ×), stagger (ms), delay (ms), speed (×), trigger (mount|inview-once|inview-always|progress), start ("top bottom+=200"), end ("bottom top-=100"), from {y, x, opacity, blur, scale, rotateX, skew}, to {...}, overflow (bool), scope (hero|headings|all)`.

## 2. Os 28 presets (nomes do catálogo, como no GetLayers)
| Unidade | Presets |
| --- | --- |
| letra (14) | Rise & Settle, Blur In, Pop Scale, Flip In, Typewriter, Drop In, Bounce Up, Skew In, Tilt 3D, Fade Scale, Squeeze In, Swing In, Scale Y, Fade Letters |
| palavra (9) | Fade Cascade, Curtain Up, Word Rise, Zoom Blur, Rotate In, Rise Wide, Pop Words, Soft Focus, Cascade Down |
| linha (5) | Slide From Left, Stagger Reveal Lines, Wipe Down, Slide From Right, Unblur Lines |

Cada preset é só um `from`/`to` mais `unit` e `stagger`. Rise & Settle: `from {y: '110%', opacity: 0}` com `overflow` e tension 1.2. Blur In: `from {blur: 12, opacity: 0}`; **blur uma vez por linha, nunca por letra** (5 a 6% de frames dropados vira < 1%).

## 3. A receita de split
1. Divida em linhas pelo layout real (meça `getClientRects` das palavras), depois em palavras, depois em letras. Nunca quebre palavra no meio: cada palavra num `span` com `white-space: nowrap`.
2. Cada unidade num `span` inline-block; se `from.y` desliza, embrulhe a linha num wrapper com `overflow: hidden` e `line-height ≥ 1.1` (leading menor corta glifos).
3. Um relógio por efeito, não uma spring por letra: calcule `progress` uma vez e aplique com offset por índice.
4. Deixe uma cópia em texto puro visually-hidden (ou `aria-label`) pra crawlers e leitores de tela. O texto existe no DOM antes de animar.
5. `prefers-reduced-motion`: estado final direto, sem split.
6. Re-split no resize de largura (debounce) porque as linhas mudam.

## 4. Scroll
Gramática `"<borda do elemento> <borda da viewport>[±=px]"` (`top bottom`, `center center`, `bottom top-=100`). Leia layout uma vez por frame no ticker, nunca por elemento.

## 5. Verifique e registre
Screenshot em t = 0.2 s, 0.6 s e 1.5 s por tier (o meio da animação é o que o cliente vê); `check-motion` com reduced motion; o texto precisa estar no DOM com `curl`. Entrada no catálogo com o preset e o CONFIG.

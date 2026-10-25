---
paths:
  - "**/components/**/*.tsx"
  - "**/components/**/*.jsx"
  - "**/views/**/*.tsx"
  - "**/app/**/*.tsx"
  - "**/*.svelte"
  - "**/*.vue"
description: Motion de interface. Uma biblioteca por projeto, um ticker, reduced motion, custo por frame.
---

# Motion neste harness

1. **Uma biblioteca de motion por projeto.** GSAP, react-spring, framer-motion ou motion: a que já está instalada vence. Duas é violação. Preferência pessoal não é motivo pra adicionar outra.
2. **Um ticker rAF por página.** Todo subscriber por frame passa por um loop só (`lib/animation/ticker`). Vinte elementos scroll-driven são um rAF, não vinte. Se há smooth scroll (Lenis), ele dirige o loop.
3. **Anime transform e opacity.** width, height, top e margin colocam layout em todo frame.
4. **Conteúdo existe no DOM independente do estado da animação.** Motion muda aparência, nunca presença. Crawlers e leitores de tela veem tudo.
5. **Reduced motion por instância.** `prefers-reduced-motion: reduce` pula pro estado final; nada fica invisível ou no meio de uma transição. Loops leem a flag no primeiro render, ou a página trava (defeito visto em 6 sites).
6. **Hover só onde há mouse.** Desligado em `(hover: none) and (pointer: coarse)`.
7. **Custo por frame.** Blur uma vez por linha, nunca por letra; `will-change` só durante o reveal; estilo por frame escrito só quando muda, no menor elemento, nunca em `<html>`.
8. **Texto anima por split.** Letra, palavra e linha em slots com stagger, clip wrapper quando desliza, cópia em texto puro no DOM pra SEO.

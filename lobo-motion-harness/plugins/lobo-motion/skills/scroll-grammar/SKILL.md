---
name: scroll-grammar
description: Liga qualquer efeito do harness ao scroll — fundo que troca de preset por seção, partículas que mudam de forma, texto por progresso, parallax de canvas, pin de hero — com IntersectionObserver e um só driver de scroll por página (próprio, GSAP ScrollTrigger ou Lenis, nunca dois). Use quando o usuário pedir "muda conforme rola", "por seção", "scroll-driven", "pin a hero", "parallax", "transição entre seções", "storytelling com scroll".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Scroll Grammar

Scroll é um **número de 0 a 1 por seção** que o efeito recebe via `setConfig` ou via uma chave `progress`. O efeito nunca lê `scrollY` sozinho; quem lê é um driver único na página. Receitas em `references/recipes.md`.

## 0. Intake
- Que efeito e qual chave do CONFIG responde ao scroll (preset inteiro, uma chave numérica, `shape`, `progress` do text-motion).
- Driver já existente? `gsap` + ScrollTrigger, `lenis`, `locomotive`, `framer-motion useScroll`. **Um só.** Se não existe, use o driver próprio (IO + rAF, abaixo).
- Seções: lista ordenada com o estado alvo de cada uma (`[{ id: "hero", preset: "lagoon" }, { id: "about", preset: "graphite" }]`).

## 1. Os quatro verbos
| Verbo | O que faz | Chave | Exemplo |
| --- | --- | --- | --- |
| **switch** | troca de estado ao entrar na seção (discreto, com crossfade de 450–700 ms) | `preset` ou `shape` | fundo muda de cor por seção; partículas trocam de forma (via `morph-transition`) |
| **scrub** | mapeia progresso 0..1 da seção numa chave numérica (contínuo) | `swirl`, `zoom`, `flow`, `intensity`, `level` | orb cresce enquanto a hero sai |
| **progress** | o efeito tem a própria timeline e recebe `progress` | `progress` (text-motion `trigger: "progress"`) | título se revela linha a linha com o scroll |
| **pin** | o canvas fica fixo enquanto N seções passam por cima e cada uma faz switch ou scrub | canvas `position: fixed` + seções `min-height: 100lvh` | storytelling: um fundo, cinco capítulos |

## 2. Driver próprio (sem lib)
```js
const sections = [...document.querySelectorAll("[data-lobo-section]")];
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) apply(e.target.dataset.loboSection); }), { threshold: 0.5 });
sections.forEach((s) => io.observe(s));
// scrub: só nos frames em que houve scroll, com rAF coalescido
let ticking = false;
addEventListener("scroll", () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; sections.forEach(scrub); }); }, { passive: true });
function scrub(s) { const r = s.getBoundingClientRect(), p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1); if (Math.abs(p - s._p) > 0.002) { s._p = p; effect.setConfig(mapKeys(s.dataset, p)); } }
```
- `threshold: 0.5` pra switch; scrub lê `getBoundingClientRect` só no rAF coalescido (uma leitura por frame por seção).
- `setConfig` só quando mudou mais que 0.002: evita redesenho por micro-scroll.
- `prefers-reduced-motion`: switch continua (é estado, não movimento), scrub e pin viram o estado final da seção.

## 3. Com GSAP ScrollTrigger (quando o projeto já tem GSAP)
```js
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({ trigger: "#about", start: "top 50%", onEnter: () => fx.setConfig(PRESETS.graphite), onLeaveBack: () => fx.setConfig(PRESETS.lagoon) });
gsap.to(proxy, { swirl: 1.2, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.4 }, onUpdate: () => fx.setConfig({ swirl: proxy.swirl }) });
```
- `scrub: 0.4` (não `true`) suaviza; o efeito não precisa de easing próprio.
- Pin: `pin: "#canvas-wrap", pinSpacing: false`, e as seções com `min-height: 100lvh`.
- Com Lenis: `lenis.on("scroll", ScrollTrigger.update)` e `gsap.ticker.add((t) => lenis.raf(t * 1000))`; o efeito continua no próprio rAF (ele só desenha quando visível).

## 4. Crossfade de estado (switch bonito)
- Chaves numéricas: interpole no efeito com `k = 1 - pow(1 - 0.12, dt * 60)` por 450–700 ms. Cores: interpole em OKLab (o shader já mistura em OKLab; passe as cores alvo e deixe o `mix` do gradiente fazer o resto ou interpole no JS com a função do cookbook).
- `shape` (partículas): não interpola; use `morph-transition`.
- Texto: `trigger: "inview-once"` por seção, ou `progress` se for scrub.

## 5. Regras
- Nunca `scrollY` dentro do efeito. Nunca dois drivers (ScrollTrigger + Lenis sem o bridge, ou IO próprio + ScrollTrigger).
- Leitura de layout só no rAF coalescido. Escrita de estilo só no efeito.
- Hero com pin: o canvas é `fixed`, `pointer-events: none`, e o `inView` do efeito é sempre true (desligue o IO interno ou observe o wrapper).
- Mobile: scrub por seção funciona; pin com `100lvh` funciona; `background-attachment: fixed` não (iOS).
- Verifique com `tools/qa/check-motion.mjs` **e** com um scroll programado no Playwright (`page.mouse.wheel`), screenshots a cada seção.

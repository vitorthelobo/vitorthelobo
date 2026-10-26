---
name: integrate-effect
description: Leva um efeito do harness (o standalone.html de qualquer família) para dentro de um projeto real — React/Next, Vue/Nuxt, Astro, HTML puro, Framer, Webflow — como componente com mount/cleanup, CONFIG por props, SSR seguro e uma só biblioteca de motion. Use quando o usuário pedir "coloca no meu site", "vira componente", "integra no Next", "embed no Webflow", "code component do Framer", "usa no projeto".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Integrate Effect

O standalone é a referência; o componente é a mesma lógica com três mudanças: o `.scene` vira o elemento raiz do componente, o CONFIG vira props (ou `config` único), e tudo que o standalone pendura em `window` passa a viver na instância e morre no cleanup.

## 0. Intake
- Stack e versão (`package.json`, `next.config`, `astro.config`, ou "é Webflow").
- Onde o efeito entra: hero full-bleed, seção, card, fundo de página inteira.
- Já existe motion lib no projeto (`gsap`, `framer-motion`, `motion`, `lenis`)? **Uma só** por projeto: se já tem, o efeito usa o rAF dela ou o próprio rAF, nunca uma segunda lib.
- SSR? (Next/Nuxt/Astro) → o efeito só monta no cliente.

## 1. Escolha a receita (references/)
| Stack | Arquivo | Forma |
| --- | --- | --- |
| React, Next (app ou pages), Remix, Gatsby | `react.md` | componente `use client` com `useEffect` + `useRef`, `config` por prop |
| Vue 3, Nuxt | `react.md` §Vue | `onMounted/onUnmounted`, `<ClientOnly>` no Nuxt |
| Astro, HTML puro, 11ty, Hugo | `astro-html.md` | `<script>` inline ou módulo por `data-lobo-*`, `client:visible` no Astro |
| Framer | `framer-webflow.md` §Framer | code component com `addPropertyControls` espelhando o schema |
| Webflow, Squarespace, Wix | `framer-webflow.md` §Embed | embed HTML com o standalone inteiro dentro de um `div` com altura fixa |

## 2. O que muda do standalone pro componente (sempre)
1. **Raiz:** `document.querySelector("[data-lobo-scene]")` → `ref.current`. O canvas é filho do ref. `100lvh` só se for hero full-bleed; senão a altura é do container (`height: 100%` e o pai decide).
2. **CONFIG:** o objeto vira `props.config` mesclado sobre o default da família: `const cfg = { ...DEFAULT, ...props.config }`. Mudança de prop chama `setConfig(diff)`, não remonta.
3. **`window.__lobo`:** vira `ref` exposto (`useImperativeHandle`) ou evento custom. Em produção pode sumir; em dev ajuda o `/tool-ui`.
4. **Cleanup obrigatório:** `cancelAnimationFrame`, `IntersectionObserver.disconnect()`, `removeEventListener` (resize, visibilitychange, pointermove, contextlost), `renderer.dispose()` + `geometry.dispose()` + `material.dispose()` no three, `gl.getExtension("WEBGL_lose_context")?.loseContext()` no WebGL cru.
5. **StrictMode / HMR:** o `useEffect` roda duas vezes em dev; o boot tem que ser idempotente (guarda `if (started.current) return`).
6. **Bot e reduced motion:** mesma detecção do standalone; o fallback estático é o `background` CSS do container (as cores do CONFIG viram `--c0..--c4` no `style` do root).
7. **Import map não existe em bundler:** `import * as THREE from "three"`; a versão fixa fica no `package.json` (`three@0.170.0`). Nunca dois `three` no bundle (`npm ls three`).
8. **Texto por SEO** (text-motion): o conteúdo renderiza no servidor; o split acontece no cliente depois do `fonts.ready`.

## 3. CONFIG como API pública
- Props planas só para o que o designer mexe (`preset`, `colors`, `speed`, `intensity`); o resto vai num `config` opcional. Nunca exponha chave fora do schema da família.
- `preset` resolve primeiro, `config` sobrescreve por cima (mesma ordem do standalone).
- Tipos: gere o `type Config` a partir de `references/config-schema.md` da família.

## 4. Performance no projeto real
- Lazy: `next/dynamic` com `ssr: false`, ou `client:visible` no Astro. O efeito nunca entra no bundle crítico.
- Só um efeito WebGL pesado por viewport. Dois canvases bloom ao mesmo tempo é o erro clássico.
- Fundo de página inteira: um canvas `position: fixed` atrás do conteúdo, `pointer-events: none`, e o `inView` sempre true.
- Teste com o `fps-probe` apontando pra página do projeto, não pro standalone.

## 5. Entregue
- O arquivo do componente, o `config` default exportado, um exemplo de uso, e a nota de "uma lib de motion" no README do projeto.
- Rode `scripts/verify-motion.sh` no diretório do projeto (ele lê qualquer `.tsx/.vue/.astro/.html` que crie contexto WebGL).
- Screenshot da página real nos dois tiers (skill `qa-motion`).

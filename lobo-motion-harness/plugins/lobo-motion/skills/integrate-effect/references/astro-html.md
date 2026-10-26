# Receita Astro / HTML puro / geradores estáticos

## HTML puro
O standalone já é a integração: copie o `<style>` do `.scene`, o markup `<div class="scene" data-lobo-scene>` e o `<script>` inteiro. Pra mais de um efeito na página, cada `.scene` tem seu `id` de canvas e o script lê `data-lobo-config` em vez do CONFIG global:

```html
<div class="scene" data-lobo-scene data-lobo-config='{"preset":"lagoon","speed":0.4}'>
  <canvas aria-hidden="true"></canvas><div class="fallback" aria-hidden="true"></div>
</div>
<script type="module" src="/effects/shader-background.js"></script>
```
No módulo: `document.querySelectorAll("[data-lobo-scene]").forEach((el) => boot(el, { ...DEFAULT, ...JSON.parse(el.dataset.loboConfig || "{}") }))`.

## Astro
```astro
---
import "../effects/shader-background.css";
const { preset = "graphite", config = {} } = Astro.props;
---
<div class="scene" data-lobo-scene data-lobo-config={JSON.stringify({ preset, ...config })}>
  <canvas aria-hidden="true"></canvas><div class="fallback" aria-hidden="true"></div>
</div>
<script>
  import { boot, DEFAULT, PRESETS } from "../effects/shader-background.core";
  document.querySelectorAll<HTMLElement>("[data-lobo-scene]:not([data-booted])").forEach((el) => {
    const c = JSON.parse(el.dataset.loboConfig || "{}");
    boot(el, { ...DEFAULT, ...(PRESETS[c.preset] || {}), ...c }); el.dataset.booted = "1";
  });
</script>
```
- O `<script>` do Astro já é módulo e já roda só no cliente. Pra adiar até ficar visível, use um componente framework com `client:visible`, ou o próprio IntersectionObserver do efeito (ele já só desenha em view; o custo que sobra é compilar shader, que o prewarm faz uma vez).
- View Transitions (`<ViewTransitions />`): escute `astro:page-load` pra rebootar e `astro:before-swap` pra `destroy()`.

## 11ty / Hugo / Jekyll
Igual ao HTML puro; o módulo vai pra `/assets/effects/` e o include recebe o `preset` como parâmetro do shortcode.

## three.js sem bundler
Mantenha o import map do standalone no `<head>` da página (uma vez, não por efeito). Em bundler, remova e importe de `node_modules`.

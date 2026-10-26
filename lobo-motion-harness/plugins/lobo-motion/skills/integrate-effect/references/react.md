# Receita React / Next (e Vue no fim)

## Componente mínimo (WebGL cru, ex. shader-background)
```tsx
"use client";
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { DEFAULT, boot, type Config } from "./shader-background.core"; // o miolo do standalone, sem DOM global

export type Handle = { setConfig: (c: Partial<Config>) => void; exportState: () => string };

export const ShaderBackground = forwardRef<Handle, { config?: Partial<Config>; className?: string }>(
  function ShaderBackground({ config, className }, ref) {
    const root = useRef<HTMLDivElement>(null);
    const inst = useRef<ReturnType<typeof boot> | null>(null);

    useEffect(() => {
      if (!root.current || inst.current) return;           // idempotente (StrictMode, HMR)
      inst.current = boot(root.current, { ...DEFAULT, ...config });
      return () => { inst.current?.destroy(); inst.current = null; };
    }, []);                                                 // monta uma vez

    useEffect(() => { inst.current?.setConfig(config ?? {}); }, [config]);   // prop muda → setConfig, não remonta

    useImperativeHandle(ref, () => ({
      setConfig: (c) => inst.current?.setConfig(c),
      exportState: () => inst.current?.exportState() ?? "",
    }));

    return <div ref={root} className={className} data-lobo-scene style={{ position: "relative", overflow: "hidden" }} />;
  }
);
```

## O `.core.ts` (o que sai do standalone)
- Tudo que estava dentro da IIFE vira `export function boot(root: HTMLElement, cfg: Config)` que **cria** o canvas (`root.appendChild`), roda o mesmo código e devolve `{ setConfig, exportState, destroy, stats }`.
- `destroy()`: cancela o rAF, desconecta o IntersectionObserver, remove listeners (resize, visibilitychange, pointermove, webglcontextlost/restored), `gl.getExtension("WEBGL_lose_context")?.loseContext()`, remove o canvas.
- Nada de `document.querySelector`, nada de `window.__lobo`. Em dev: `if (import.meta.env?.DEV) (window as any).__lobo = api;`.
- Bot/reduced motion/coarse: mesmas três constantes, calculadas dentro do `boot` (não no módulo: SSR não tem `matchMedia`).

## three.js (particle-forms, holo-material, 3d-object-scene, morph-transition)
- `import * as THREE from "three"` e `import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"`; `three` fixo no `package.json`. Confirme `npm ls three` com uma única versão.
- `destroy()` adicional: `composer.dispose?.()`, `renderer.dispose()`, `renderer.forceContextLoss()`, `geometry.dispose()`, `material.dispose()`, texturas `.dispose()`.
- Next: `const ParticleForms = dynamic(() => import("./ParticleForms"), { ssr: false, loading: () => <div className="fallback" /> })`.

## Altura
- Hero full-bleed: o container tem `height: 100lvh` (não `100vh`, não `100dvh`: a barra do Safari realoca).
- Seção/card: `height: 100%` e o pai define. O `resize()` já lê `getBoundingClientRect()`.

## Vue 3 / Nuxt
```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { DEFAULT, boot } from "./shader-background.core";
const props = defineProps<{ config?: Partial<Config> }>();
const root = ref<HTMLDivElement>(); let inst: ReturnType<typeof boot> | null = null;
onMounted(() => { inst = boot(root.value!, { ...DEFAULT, ...props.config }); });
onUnmounted(() => { inst?.destroy(); inst = null; });
watch(() => props.config, (c) => inst?.setConfig(c ?? {}), { deep: true });
</script>
<template><div ref="root" data-lobo-scene /></template>
```
Nuxt: envolva em `<ClientOnly>`.

## Erros comuns
- `window is not defined` → `matchMedia` ou `navigator` fora do `boot`.
- Dois canvases depois de HMR → faltou a guarda de idempotência.
- Efeito congela ao trocar de rota → faltou `destroy()`; o rAF antigo continua desenhando num canvas removido.
- Bundle com dois `three` → um vem do import map copiado, outro do `node_modules`.

# Receita Framer / Webflow / embeds

## Framer (code component)
```tsx
import { addPropertyControls, ControlType } from "framer";
import { useEffect, useRef } from "react";
import { boot, DEFAULT, PRESETS } from "./shader-background.core";

export default function ShaderBackground(props) {
  const root = useRef<HTMLDivElement>(null); const inst = useRef<any>(null);
  const cfg = { ...DEFAULT, ...(PRESETS[props.preset] || {}), speed: props.speed, swirl: props.swirl, colors: props.colors?.length ? props.colors : DEFAULT.colors };
  useEffect(() => { if (!root.current) return; inst.current = boot(root.current, cfg); return () => inst.current?.destroy(); }, []);
  useEffect(() => { inst.current?.setConfig(cfg); }, [props.preset, props.speed, props.swirl, JSON.stringify(props.colors)]);
  return <div ref={root} style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }} />;
}
addPropertyControls(ShaderBackground, {
  preset: { type: ControlType.Enum, options: Object.keys(PRESETS), defaultValue: "graphite" },
  speed:  { type: ControlType.Number, min: 0, max: 2, step: 0.05, defaultValue: 0.6 },
  swirl:  { type: ControlType.Number, min: 0, max: 1.5, step: 0.01, defaultValue: 0.3 },
  colors: { type: ControlType.Array, control: { type: ControlType.Color }, maxCount: 6 },
});
```
- Property controls espelham o `config-schema.md` (mesmos ranges). Só exponha o que o designer mexe.
- O canvas do Framer no editor é um iframe: o efeito roda no canvas de edição; se pesar, `if (RenderTarget.current() === RenderTarget.canvas) return <div style={{ background: cfg.colors[0] }} />`.
- three.js: `import * as THREE from "three"` funciona (Framer resolve do npm); fixe a versão no import (`three@0.170.0`).

## Webflow / Squarespace / Wix (embed)
- Elemento Embed com o standalone **inteiro** (style + markup + script), com `.scene { height: 100% }` e o elemento embed com altura definida no Designer (ex. 100vh na hero).
- Webflow bloqueia `type="importmap"` em alguns planos: use `import("https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js")` direto no módulo.
- Custom code no `<head>` só para o CSS; o script vai no embed (ordem garante que o `.scene` existe).
- Interações do Webflow (IX2) e o efeito não devem animar o mesmo elemento. O canvas é `pointer-events: none` quando for fundo.

## Checklist comum
- Um efeito WebGL pesado por viewport.
- Fallback estático visível no editor e pra bot.
- `prefers-reduced-motion` assenta.
- Teste em iOS Safari real: barra dinâmica e `100lvh`.

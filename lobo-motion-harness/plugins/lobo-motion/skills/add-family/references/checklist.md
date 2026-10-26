# Checklist de família nova

## Arquivos
- [ ] `skills/<f>/SKILL.md` (frontmatter + 7 seções)
- [ ] `skills/<f>/references/config-schema.md`
- [ ] `skills/<f>/references/<técnica>.md` (cookbook, shapes, presets… o que a skill cita)
- [ ] `skills/<f>/templates/standalone.html`

## Contrato do template (grep)
- [ ] `data-lobo-scene` + `.fallback` + `.scene.static`
- [ ] `isBot` → `static` e `return` antes de qualquer WebGL
- [ ] `motionOff` → assenta (draw once) e redesenha só em `dirty`/resize
- [ ] `coarse` → DPR 1.25, pointer off
- [ ] `setConfig(changes) → { ignored }`, `?preset=`, `?s=`, `exportState`
- [ ] `window.__lobo = { family, config, presets, stats, setConfig, exportState }`
- [ ] variáveis do loop declaradas antes do primeiro `setConfig` (TDZ)
- [ ] `resize()` só em mudança real, DPR ≤ `dprMax` e ≤ 1.5
- [ ] um rAF; `dt = min(0.05, …)`; sem frame cap
- [ ] IntersectionObserver `100% 0px` + `visibilitychange` + `resize` passivo
- [ ] `webglcontextlost` (preventDefault) + `restored` (rebuild), ou `WebGLRenderer`
- [ ] prewarm: compila/renderiza uma vez antes do primeiro frame visível
- [ ] `100lvh` no `.scene`, canvas `position:absolute; inset:0`
- [ ] nenhuma cor literal no shader (vem de uniform)

## Sondas
- [ ] `verify-motion.sh` FAIL 0
- [ ] `screenshot-grid` desktop + phone, nenhuma em branco, lidas
- [ ] `check-motion`: reduced-motion responde e assenta; robot form 0 contextos WebGL
- [ ] `context-loss-probe`: restored ≥ 1 e volta a desenhar
- [ ] `fps-probe` anotado por tier

## Registro
- [ ] `commands/effect.md`: linha de roteamento (`<brief> → <f>`) e `--family` no argument-hint
- [ ] `agents/effect-builder.md`: família na lista da description
- [ ] `README.md`: tabela «Skills» (técnica, tem template) e «Status honesto»
- [ ] `vault/effect-catalog.md`: seção `## <f>` + presets com eixos e CONFIG
- [ ] `vault/templates/catalog-entry.md`: família na lista
- [ ] `tools/pack.mjs`: `FAMILIES`
- [ ] `skills/scroll-grammar/references/recipes.md`: linha da família
- [ ] `skills/brand-to-preset/references/mapping.md`: onde a família entra por objetivo
- [ ] showroom: `FAMILIES.<f>` com `presets` e `knobs`, e `templates/<f>.html` em `files`
- [ ] `vault/pitfalls.md`: o que foi calibrado

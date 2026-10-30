# Showroom

`index.html` é a página publicada em https://claude.ai/artifact/6LjeR65wbx691NWpP5Mwy8 (Version 13). Ela espera os templates em `templates/<família>.html`, no mesmo diretório.

Pra rodar local:
```bash
cd plugins/lobo-motion/tools/showroom && mkdir -p templates
for f in shader-background particle-forms orb-reactive text-motion cursor-fx holo-material post-image-fx image-reveal grid-dots-field 3d-object-scene morph-transition; do cp ../../skills/$f/templates/standalone.html templates/$f.html; done
npx serve .      # file:// isola o iframe; precisa de http
```

Pra republicar no artifact: publique `index.html` com `files` mapeando `templates/<família>.html` → `skills/<família>/templates/standalone.html`, e declare `capabilities: {sample: {}, downloads: true}` (sem isso a aba Studio não consegue chamar o Claude nem salvar o HTML).

## Aba Studio (prompt → efeito)

Equivalente ao "crie com um prompt" do Unicorn Studio, só que compondo dentro dos 11 motores do harness: o Claude da página não escreve shader novo, ele escolhe família + CONFIG. Cinco modos:

| Modo | O que manda pro Claude | O que volta |
|---|---|---|
| Criar | o pedido + spec das 11 famílias (defaults, enums, ranges, presets) | `{family, mode:"replace", config, note}` |
| Editar | pedido + CONFIG atual | `mode:"patch"` aplicado ao vivo via `setConfig` (ou `replace` se trocar de família) |
| Otimizar | CONFIG atual, alvo "celular" por padrão | patch que reduz `count`, `dprMax`, `glow`, `layers`, `solverIterations`, `detail` |
| Variações | CONFIG atual | array de 4 `{name, config(patch), note}`; vira botões A/B/C/D |
| Explicar | CONFIG atual | texto em streaming, `modelTier: "quick"` |

Regras de segurança na página: `coerce()` descarta chave que a família não tem e clampa pelos ranges da spec (string numérica vira número); histórico de 8 turnos vai junto pra o Claude lembrar do contexto; `cache: false` porque é chat; Stop usa `AbortController`. Estado (família, CONFIG, histórico) fica em `localStorage["lobo-studio"]`. "Baixar HTML" lê o template da família, troca o bloco `const CONFIG = {...};` e salva via `downloads.save` (ou âncora blob fora do claude.ai). "Abrir na aba da família" leva o CONFIG pros sliders normais.

A spec vem de `tools/qa/spec.mjs` (lê `FAMILIES` do showroom e os templates) e é embutida como `STUDIO_SPEC`; quando mudar um template, regenere e cole de novo. Fora do claude.ai a aba mostra o aviso e o resto do showroom funciona. Teste com mock: `scratchpad/w5/studio-mock.mjs` injeta um `window.claude.use` falso e passa por criar → editar → variações → explicar → baixar.

## Próximos passos (anotados em 2026-10-26)
1. Testar o plugin num projeto limpo: instalar o marketplace, pedir "um fundo aurora pro hero" e ver se o agent chega no preset.
2. Showroom como produto: deploy próprio, URL por preset (`?s=`), botão "Copiar prompt" (build prompt por preset ainda não existe), export PNG/vídeo. Studio fora do claude.ai precisa de um backend próprio chamando a API da Anthropic (a página hoje só usa `claude.use("sample")`).
3. Catálogo com imagem e prompt pros 118 presets (`tools/pack.mjs` já gera previews; falta um `catalog-build`).
4. `tier-calibrate` na RTX 2060 e num celular real; os `count` por tier são estimados.
5. Pontas: hover de 5 modos só existe em particle-forms e grid-dots-field; `touch: "drag"` sequestra o scroll em hero full-bleed; fountain-spray lê como "V"; showroom no celular não foi testado em telefone real.

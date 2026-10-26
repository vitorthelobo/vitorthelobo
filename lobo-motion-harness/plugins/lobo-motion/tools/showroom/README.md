# Showroom

`index.html` é a página publicada em https://claude.ai/artifact/6LjeR65wbx691NWpP5Mwy8 (Version 9). Ela espera os templates em `templates/<família>.html`, no mesmo diretório.

Pra rodar local:
```bash
cd plugins/lobo-motion/tools/showroom && mkdir -p templates
for f in shader-background particle-forms orb-reactive text-motion cursor-fx holo-material post-image-fx image-reveal grid-dots-field 3d-object-scene morph-transition; do cp ../../skills/$f/templates/standalone.html templates/$f.html; done
npx serve .      # file:// isola o iframe; precisa de http
```

Pra republicar no artifact: publique `index.html` com `files` mapeando `templates/<família>.html` → `skills/<família>/templates/standalone.html`.

## Próximos passos (anotados em 2026-10-26)
1. Testar o plugin num projeto limpo: instalar o marketplace, pedir "um fundo aurora pro hero" e ver se o agent chega no preset.
2. Showroom como produto: deploy próprio, URL por preset (`?s=`), botão "Copiar prompt" (build prompt por preset ainda não existe), export PNG/vídeo.
3. Catálogo com imagem e prompt pros 118 presets (`tools/pack.mjs` já gera previews; falta um `catalog-build`).
4. `tier-calibrate` na RTX 2060 e num celular real; os `count` por tier são estimados.
5. Pontas: hover de 5 modos só existe em particle-forms e grid-dots-field; `touch: "drag"` sequestra o scroll em hero full-bleed; fountain-spray lê como "V"; showroom no celular não foi testado em telefone real.

---
paths:
  - "**/effects/**"
  - "**/presets/**"
  - "**/config.json"
  - "**/*.preset.*"
description: CONFIG é a fonte da verdade de todo efeito. Preset, favorito, URL e prompt são o mesmo objeto.
---

# CONFIG-first

1. **Todo efeito nasce de um CONFIG.** Objeto plano com cores, contagens, intensidades, seed e tier. Ranges e defaults documentados em `references/config-schema.md` da skill.
2. **Um objeto, quatro usos.** O mesmo CONFIG alimenta o painel de controles, o estado na URL, o favorito salvo e o build prompt. Se um knob não está no CONFIG, ele não existe.
3. **Preset é CONFIG completo; favorito é diff.** Um look salvo é `{ preset, changes }`, mesclado sobre o preset. Um prompt por família, não um por usuário.
4. **Mudança só por chave conhecida.** `applyChanges(config, changes)` ignora chaves que o renderer não lê e devolve a lista `ignored`. O prompt nunca carrega knob fantasma.
5. **Tint é operação sobre o CONFIG.** Trocar paleta é trocar `colors`. Nunca editar o shader pra recolorir.
6. **Seed determina variação.** «New variation» muda `seed`; a fórmula fica. Dois CONFIGs iguais produzem o mesmo frame.

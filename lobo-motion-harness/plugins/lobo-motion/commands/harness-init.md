---
description: Instalar as rules, o vault e o verify do harness dentro do projeto atual (as skills, agents, commands e hooks já vêm do plugin)
argument-hint: [--vault-dir vault] [--no-rules]
---

Inicialize o Lobo Motion Harness neste projeto: **$ARGUMENTS**

O plugin já fornece skills, agents, commands e hooks. O que precisa viver **dentro do projeto** é o que o Claude Code lê por caminho:

1. **Rules** (a menos que `--no-rules`): copie `${CLAUDE_PLUGIN_ROOT}/rules/*.md` para `.claude/rules/`. Se já existe um arquivo com o mesmo nome, mostre o diff e pergunte antes de sobrescrever.
2. **Vault do projeto**: crie `<vault-dir>/` (padrão `vault/`) com `effect-catalog.md`, `fix-catalog.md`, `pitfalls.md`, `decisions-log.md` e `changelog.md` vazios a partir dos templates em `${CLAUDE_PLUGIN_ROOT}/vault/templates/`. O vault do plugin continua sendo a referência; o do projeto guarda só o que é deste projeto.
3. **Verify**: adicione ao `package.json` o script `"verify:motion": "bash ${CLAUDE_PLUGIN_ROOT}/scripts/verify-motion.sh src"` (ou o caminho absoluto do plugin, resolvido em runtime) e mostre como rodar.
4. **CLAUDE.md**: adicione uma seção curta «Motion e efeitos» apontando pras rules, pro vault do projeto e pros commands `/effect`, `/preset`, `/qa-motion`, `/perf-3d`. Não sobrescreva o resto.
5. **Playwright**: verifique `node -e "require('playwright')"`; se falhar, diga o comando de instalação (`npm i -D playwright && npx playwright install chromium`) e não instale sem perguntar.

Termine listando o que foi criado e o que foi pulado.

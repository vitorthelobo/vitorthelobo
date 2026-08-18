# Claude Code no terminal — instalação e sincronização

Guia prático para rodar o Claude Code na sua máquina e deixar tudo
(GitHub, sessões da web, skills, conectores) falando a mesma língua.

---

## 1. Instalar

**macOS / Linux / WSL**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**macOS com Homebrew** (alternativa)

```bash
brew install --cask claude-code
```

**Windows — PowerShell**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows — CMD**

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Confirme:

```bash
claude --version
```

Deve imprimir a versão seguida de `(Claude Code)`.

> A instalação nativa (`install.sh` / `install.ps1`) se atualiza sozinha em segundo plano.
> Homebrew e WinGet **não** atualizam: rode `brew upgrade claude-code` ou
> `winget upgrade Anthropic.ClaudeCode` de vez em quando.

No Windows nativo, instale também o [Git for Windows](https://git-scm.com/downloads/win)
para o Claude ter um shell Bash decente.

---

## 2. Entrar na sua conta

```bash
claude
```

Na primeira execução ele abre o navegador para autenticar. Use a **mesma conta
claude.ai** que você usa na web — é isso que faz a sincronização funcionar.

Para trocar de conta depois, dentro da sessão: `/login`.

Checagem rápida de saúde:

```
/status    # mostra conta, modelo e quais arquivos de config estão ativos
/doctor    # diagnostica instalação e configuração
```

---

## 3. Trabalhar no seu repositório

```bash
git clone https://github.com/vitorthelobo/vitorthelobo.git
cd vitorthelobo
claude
```

Tudo que estiver em `.claude/` dentro do repositório (skills, commands, agents,
settings) carrega automaticamente. É por isso que `/brand-mockup` funciona aqui.

---

## 4. Sincronizar tudo

### 4.1 GitHub

Duas formas — qualquer uma serve:

- **GitHub App**: autorize em https://github.com/apps/claude (necessário para o
  auto-fix de PRs).
- **Token do `gh` CLI**: dentro do Claude Code rode `/web-setup`. Ele sincroniza o
  token local do `gh` com a sua conta Claude.

### 4.2 Sessões da web ↔ terminal

| O que você quer | Comando |
| --- | --- |
| Puxar uma sessão da web para o terminal | `claude --teleport` (abre seletor) ou `claude --teleport <session-id>` |
| Mesma coisa, sem sair da sessão atual | `/teleport` ou `/tp` |
| Ver sessões rodando na nuvem | `/tasks` |
| Mandar uma tarefa do terminal para a nuvem | `claude --cloud "descrição da tarefa"` |
| Mandar recado para uma sessão da nuvem | `claude -p "sua mensagem" --cloud <session-id>` |

Requisitos do `--teleport`: estar logado na mesma conta, estar dentro de um clone
do **mesmo** repositório, sem alterações não commitadas, e a branch da sessão já
publicada no remoto.

> O handoff é de mão única: web → terminal. Depois de teleportar, o trabalho
> local não volta a aparecer na sessão da web.

`claude --cloud` clona o **remoto** na branch atual, não o seu diretório local —
então dê `git push` antes.

### 4.3 Skills da claude.ai no terminal

As skills que você habilita na sua conta claude.ai não aparecem no terminal por
padrão. Para baixá-las:

```bash
CLAUDE_CODE_SYNC_SKILLS=1 claude -p "liste as skills disponíveis"
```

Elas ficam em `~/.claude/skills/synced/` e passam a carregar em todas as sessões
locais. Rode o comando de novo sempre que habilitar/alterar uma skill na web.
Dentro de uma sessão, `/skills` lista tudo — as sincronizadas aparecem sob o
rótulo `claude.ai sync`.

Skill com nome igual a um comando local é ignorada: o local ganha.

### 4.4 Conectores / MCP

Conectores da claude.ai (Figma, Canva, Supabase, Vercel…) **não** migram
sozinhos. No terminal se adiciona assim:

```bash
claude mcp add --transport http <nome> <url-do-servidor>
claude mcp list
```

Depois, dentro da sessão, `/mcp` faz o login OAuth de cada servidor.

Escopos: `--scope user` (todas as suas pastas), `--scope project` (grava em
`.mcp.json`, versionado com o time), `local` (padrão, só você neste projeto).

### 4.5 Suas configurações entre máquinas

```
~/.claude/settings.json     configuração pessoal (todos os projetos)
~/.claude/CLAUDE.md         suas instruções permanentes
~/.claude/skills/           skills pessoais
~/.claude/agents/           subagentes
~/.claude/commands/         comandos legados (ainda funcionam)
~/.claude.json              ⚠️ credenciais + estado — NUNCA versionar
```

Para levar isso de um computador para outro, versione um repositório de dotfiles
com `settings.json`, `CLAUDE.md`, `skills/`, `agents/` e crie symlinks para
`~/.claude/`. Deixe `~/.claude.json` de fora — ele guarda token de sessão.

No projeto:

```
.claude/settings.json         config compartilhada (vai pro git)
.claude/settings.local.json   sua config pessoal do projeto (fica no gitignore)
.claude/skills/               skills do projeto
CLAUDE.md                     memória do projeto
```

Precedência: gerenciado pela empresa > flags de linha de comando > local >
projeto > usuário.

---

## 5. Comandos do dia a dia

**No shell**

| Comando | O que faz |
| --- | --- |
| `claude` | inicia sessão interativa |
| `claude "tarefa"` | inicia já com uma tarefa |
| `claude -p "pergunta"` | responde e sai (modo headless) |
| `claude -c` | continua a última conversa desta pasta |
| `claude -r` | escolhe uma conversa anterior local |

**Na sessão**

| Comando | O que faz |
| --- | --- |
| `/help` | lista comandos |
| `/status` | conta, modelo, configs carregadas |
| `/config` | painel de configurações |
| `/model` | troca de modelo |
| `/skills` | lista skills disponíveis |
| `/mcp` | gerencia servidores MCP |
| `/clear` | limpa o contexto |
| `/compact` | resume a conversa para liberar contexto |
| `Shift+Tab` | alterna o modo de permissão |
| `/exit` | sai |

---

## 6. Se algo der errado

- `Unable to get organization UUID` no `--cloud`/`--teleport`: você está
  autenticado por API key. Rode `/login` e entre com a conta claude.ai.
- `Remote Control session expired`: rode `/login` para renovar credenciais.
- Erro de curl / `403` / `syntax error near unexpected token '<'` na instalação:
  veja https://code.claude.com/docs/en/troubleshoot-install
- Config estranha: `/doctor`.

---

## Referências

- Quickstart: https://code.claude.com/docs/en/quickstart
- Claude Code na web (`--cloud`, `--teleport`): https://code.claude.com/docs/en/claude-code-on-the-web
- Skills: https://code.claude.com/docs/en/skills
- Settings: https://code.claude.com/docs/en/settings
- MCP: https://code.claude.com/docs/en/mcp

# Hub de configuração do Claude

Agents e skills versionados aqui viajam junto com o repo — funcionam em
qualquer máquina e em qualquer sessão remota, com o desktop desligado.

## No desktop (antes de viajar)

    ./scripts/export-claude-config.sh

Copia `~/.claude/agents/*.md` e as skills locais para cá, commita e dá push.
Skills que já sincronizam pela conta (`~/.claude/skills/synced/`) são ignoradas
de propósito — elas chegam sozinhas em qualquer lugar.

## No notebook

    ./scripts/install-claude-config.sh

Instala o conteúdo do repo no `~/.claude` da máquina, valendo para todos os
projetos. Reinicie o Claude Code depois.

## O que sincroniza sozinho

| Item | Sincroniza pela conta |
|---|---|
| Skills enviadas em claude.ai → Settings → Capabilities | sim |
| Skills soltas em `~/.claude/skills/` | não — use os scripts |
| Agents (`~/.claude/agents/*.md`) | não — use os scripts |
| Plugins e marketplaces locais | não |

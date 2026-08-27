#!/usr/bin/env bash
# Roda no NOTEBOOK. Instala os agents e skills deste repo no ~/.claude local,
# deixando-os disponiveis em qualquer projeto do Claude Code daquela maquina.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="${CLAUDE_HOME:-$HOME/.claude}"

mkdir -p "$DEST/agents" "$DEST/skills"

echo "==> agents"
if compgen -G "$REPO/.claude/agents/*.md" > /dev/null; then
  cp -f "$REPO"/.claude/agents/*.md "$DEST/agents"/
  ls -1 "$REPO"/.claude/agents/*.md | xargs -n1 basename | sed 's/^/    + /'
else
  echo "    (nenhum agent no repo)"
fi

echo "==> skills"
found=0
for dir in "$REPO"/.claude/skills/*/; do
  [ -d "$dir" ] || continue
  name="$(basename "$dir")"
  [ -f "$dir/SKILL.md" ] || continue
  rm -rf "${DEST:?}/skills/$name"
  cp -R "$dir" "$DEST/skills/$name"
  echo "    + $name"
  found=1
done
[ "$found" -eq 1 ] || echo "    (nenhuma skill no repo)"

echo
echo "pronto. reinicie o Claude Code para carregar."

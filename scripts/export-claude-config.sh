#!/usr/bin/env bash
# Roda no DESKTOP. Copia agents e skills locais do ~/.claude para este repo.
# Skills que ja sincronizam pela conta (~/.claude/skills/synced) sao ignoradas.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${CLAUDE_HOME:-$HOME/.claude}"
DEST_A="$REPO/.claude/agents"
DEST_S="$REPO/.claude/skills"

[ -d "$SRC" ] || { echo "erro: $SRC nao existe"; exit 1; }
mkdir -p "$DEST_A" "$DEST_S"

echo "==> agents"
if compgen -G "$SRC/agents/*.md" > /dev/null; then
  cp -f "$SRC"/agents/*.md "$DEST_A"/
  ls -1 "$SRC"/agents/*.md | xargs -n1 basename | sed 's/^/    + /'
else
  echo "    (nenhum agent em $SRC/agents)"
fi

echo "==> skills locais"
found=0
for dir in "$SRC"/skills/*/; do
  [ -d "$dir" ] || continue
  name="$(basename "$dir")"
  [ "$name" = "synced" ] && continue          # vem da conta, nao versiona
  [ -f "$dir/SKILL.md" ] || continue          # precisa ser uma skill de verdade
  rm -rf "${DEST_S:?}/$name"
  cp -R "$dir" "$DEST_S/$name"
  echo "    + $name"
  found=1
done
[ "$found" -eq 1 ] || echo "    (nenhuma skill local fora de synced/)"

echo
echo "==> git"
cd "$REPO"
git add .claude
if git diff --cached --quiet; then
  echo "    nada mudou, repo ja esta em dia"
else
  git commit -m "chore(claude): sincroniza agents e skills do desktop"
  branch="$(git rev-parse --abbrev-ref HEAD)"
  git push -u origin "$branch"
  echo "    enviado para origin/$branch"
fi

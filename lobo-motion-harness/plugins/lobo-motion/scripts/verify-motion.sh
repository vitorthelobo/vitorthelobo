#!/usr/bin/env bash
# Verificação mecânica das hard rules do Lobo Motion Harness.
# Só o que é decidível por grep mora aqui. Julgamento (o efeito ficou bonito, o preset faz sentido)
# é da skill qa-motion e do agent visual-judge. Este script é o piso, não o teto.
#
# Uso:  verify-motion.sh [caminho ...]      (padrão: diretório atual)
# Saída: 0 = sem FAIL, 1 = um ou mais FAIL. WARN nunca derruba.
set -u
scope=("${@:-.}")
fails=0; warns=0
report() { # LEVEL "regra" "por quê" "saída"
  local lvl="$1" rule="$2" why="$3" out="$4"
  if [ -z "$out" ]; then printf "  ok    %s\n" "$rule"; return; fi
  if [ "$lvl" = FAIL ]; then fails=$((fails+1)); else warns=$((warns+1)); fi
  printf "  %-5s %s\n        %s\n" "$lvl" "$rule" "$why"
  printf '%s\n' "$out" | sed 's/^/        /' | head -12
}
src() { # arquivos de código, sem node_modules, dist, .git
  find "${scope[@]}" -type f \( -name '*.js' -o -name '*.mjs' -o -name '*.ts' -o -name '*.tsx' -o -name '*.jsx' -o -name '*.html' -o -name '*.glsl' -o -name '*.frag' -o -name '*.vert' -o -name '*.svelte' -o -name '*.vue' \) \
    -not -path '*/node_modules/*' -not -path '*/dist/*' -not -path '*/.git/*' -not -path '*/.next/*' -not -path '*/tools/qa/*' 2>/dev/null
}
code() { grep -nHE "$1" $(src) 2>/dev/null | grep -vE '^\S+:[0-9]+:\s*(//|\*|#|<!--)' ; }

echo "── Frames e tempo ────────────────────────────────────────────"
report FAIL "sem frame cap fixo por orçamento (1000/30, 1000 / 30, 33.3)" \
  "um throttle por orçamento desenha 20 fps em 60 Hz e 26 em 120 Hz; pague com DPR ou contagem" \
  "$(code '1000 ?/ ?30\b|< ?33\.3|>= ?33\.3')"
report WARN "incremento por frame sem dt (time += 0.01, t += .0)" \
  "um celular de 120 Hz roda o dobro; escale por dt em segundos" \
  "$(code '\b(time|t|uTime|angle|rot|phase)\s*\+=\s*0?\.[0-9]+\s*;')"
report WARN "rAF sem prefers-reduced-motion no mesmo arquivo" \
  "reduced motion precisa parar de avançar o tempo e manter o conteúdo visível" \
  "$(for f in $(grep -lE 'requestAnimationFrame' $(src) 2>/dev/null); do grep -qE 'prefers-reduced-motion|reducedMotion|motionOff' "$f" || echo "$f"; done)"

echo "── Canvas e WebGL ────────────────────────────────────────────"
report FAIL "DPR sem clamp (setPixelRatio(window.devicePixelRatio) ou dpr = devicePixelRatio)" \
  "3x é nove vezes o fill de 1x; clampe em [1, 1.5]" \
  "$(code 'setPixelRatio\(\s*(window\.)?devicePixelRatio\s*\)|dpr\s*=\s*(window\.)?devicePixelRatio\s*;')"
report WARN "getContext(webgl) sem tratamento de webglcontextlost" \
  "iOS derruba contextos sob pressão de memória; sem rebuild a cena fica em branco pra sempre" \
  "$(for f in $(grep -lE "getContext\(['\"]webgl" $(src) 2>/dev/null); do grep -qE 'webglcontextlost|WebGLRenderer|THREE' "$f" || echo "$f"; done)"
report WARN "canvas full-screen em dvh ou innerHeight" \
  "a barra do Safari muda a altura no meio do scroll e o renderer realoca; use 100lvh" \
  "$(code '(100dvh|h-dvh|inset-0)[^\n]*(canvas|scene)|(canvas|scene)[^\n]*(100dvh|h-dvh|innerHeight)')"

echo "── CONFIG-first e shaders ────────────────────────────────────"
report WARN "cor literal em shader (vec3(0.x, 0.x, 0.x) em linha de cor)" \
  "paleta vem do CONFIG por uniform; literal no shader quebra tint, favorito e prompt" \
  "$(grep -nHE 'vec3\(\s*[01]?\.[0-9]+\s*,\s*[01]?\.[0-9]+\s*,\s*[01]?\.[0-9]+\s*\)' $(src) 2>/dev/null | grep -iE 'col|color|tint|rgb' | grep -vE '^\S+:[0-9]+:\s*(//|\*|#)' | grep -vE 'oklab|aces|pal\(|palette|luma|dot\(')"
report WARN "lil-gui, Stats ou console.log em arquivo de efeito" \
  "painel escondido ainda é parseado; tree-shake atrás de flag de dev" \
  "$(code "lil-gui|from ['\"]stats\.js|new Stats\(|console\.log\(" | grep -iE '^[^:]*(effect|scene|preset|\.glsl|\.frag)[^:]*:' | grep -v '/tools/qa/')"

echo "── Uma biblioteca de motion ──────────────────────────────────"
pk=$(find "${scope[@]}" -maxdepth 2 -name package.json -not -path '*/node_modules/*' 2>/dev/null | head -1)
if [ -n "$pk" ]; then
  libs=$(grep -oE '"(gsap|@react-spring/web|framer-motion|motion|motion-v|@motionone/dom|animejs)"' "$pk" | sort -u | tr '\n' ' ')
  n=$(echo "$libs" | wc -w)
  report WARN "uma biblioteca de motion por projeto" "a que já está instalada vence; duas é violação" "$([ "$n" -gt 1 ] && echo "$pk: $libs")"
fi

echo "──────────────────────────────────────────────────────────────"
echo "FAIL: $fails   WARN: $warns"
[ "$fails" -eq 0 ]

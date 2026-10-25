---
name: holo-material
description: Constrói materiais holográficos e iridescentes (foil, thin-film, oil slick, chrome, pearl) em three.js, inclusive sobre um tecido simulado (cloth verlet que o usuário arrasta e cutuca) com stickers, DOF e tone mapping. Use quando o usuário pedir "holográfico", "iridescente", "foil", "thin film", "oil slick", "tecido holográfico", "cloth simulation", "cartão holo", "chrome líquido" ou "material que muda de cor com o ângulo".
allowed-tools: Bash, Read, Grep, Glob, Edit, Write
---

# Material holográfico

Status: skill procedural; o primeiro template entra depois do primeiro preset aprovado. O princípio que separa holo bom de gradiente colorido: **o arco-íris mora na reflexão, não na difusa**. Ele segue o ângulo entre a normal e a câmera, não a posição no plano.

## 0. Intake
- Superfície: plano (cartão, poster), tecido (cloth) ou malha (logo em 3D).
- Acabamento: glossy, satin ou matte; com ou sem scratches; com ou sem pearl.
- Referência obrigatória: foto de foil real sob luz. Holo sem referência vira vaporwave.

## 1. CONFIG
`baseColor, rainbowStrength (0..1), patternSize (1..32), colorShift (0..1), glitter (0..1), finish (glossy|satin|matte), metallic (0..1), pearl (0..1), scratches (0..4), roughness (0..1), clearcoat (0..1), clearcoatRoughness (0..1), bandDensity (0..1), highlightTint (0..1), background, brightness, reflections (0..1), glow (0..1), glowThreshold, grain, toneMapping (AgX|ACES|Neutral), dof {aperture, blur, focus}, cloth {thickness, stiffness, solverIterations (4..20), smoothing, grabSize}, quality (low|medium|high), seed`.

## 2. Thin-film (o núcleo)
Em `onBeforeCompile` de um `MeshPhysicalMaterial` (ou num ShaderMaterial próprio):
```glsl
float cosT = clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0);
float phase = (uPatternSize * cosT + uColorShift) * 6.2831853;        // espessura óptica vira fase
vec3 film = 0.5 + 0.5 * cos(phase + vec3(0.0, 2.094, 4.188));          // três comprimentos de onda
vec3 iri = mix(vec3(1.0), film, uRainbowStrength);
```
Multiplique `iri` na componente especular (não na difusa). `bandDensity` modula `uPatternSize` por um ruído de baixa frequência pra quebrar as bandas em padrão de foil; `glitter` adiciona pontos de `hash` modulados por `pow(cosT, 8)`. Scratches: normal map procedural de riscos anisotrópicos com `scratchTiling`.

## 3. Cloth verlet (quando a superfície é tecido)
- Grade `cols × rows` de partículas com posição atual e anterior; integração verlet `p += (p - prev) * damping + g * dt²`.
- Constraints estruturais (vizinhos), de cisalhamento (diagonais) e de flexão (distância 2); `solverIterations` passadas por frame. Mais iterações = mais rígido e mais caro; é o knob «solver accuracy».
- Grab: raycast no plano do tecido, prende as partículas dentro de `grabSize` ao ponteiro com uma mola; «poke» aplica impulso radial.
- Normais recalculadas por frame (cross de vizinhos), suavizadas por `smoothing`. Quality baixa reduz a grade (32×32 → 16×16).
- Atualize `BufferAttribute` de posição e normal com `needsUpdate` uma vez por frame; nunca recrie geometria.

## 4. Luz, pós e tiers
Um `RoomEnvironment` por PMREM como IBL, uma key light. Bloom pelo `glowThreshold`, DOF opcional só em desktop high. Tone mapping do CONFIG. Phone: sem DOF, grade do cloth pela metade, `solverIterations` ≤ 8. Nunca mude contagem de luzes em runtime (recompila).

## 5. Verifique e registre
Sondas de `qa-motion`; screenshots com a câmera em 3 ângulos (o arco-íris precisa mudar com o ângulo, senão é textura). Entrada no catálogo com a referência de foil usada.

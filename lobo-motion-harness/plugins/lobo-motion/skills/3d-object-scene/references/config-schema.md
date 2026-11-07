# CONFIG schema · 3d-object-scene

three.js. Um objeto (GLB do cliente ou procedural), um `MeshPhysicalMaterial`, ambiente PMREM (RoomEnvironment), key + rim + hemisfério, órbita limitada por arrasto com inércia. Sem OrbitControls, sem sombras.

| Chave | Tipo | Range / valores | Default | O que faz |
| --- | --- | --- | --- | --- |
| preset | string | nome no catálogo | chrome-knot | rótulo |
| src | string | URL .glb/.gltf ou vazio | "" | objeto do cliente; vazio = procedural. Normalizado pra caber em 2 unidades e centrado |
| object | enum | torusKnot, icosahedron, sphere, capsule, box, dodecahedron, torus | torusKnot | procedural (ignorado com src ou image) |
| image | string | URL ou data URL de imagem, ou vazio | "" | logo, símbolo ou foto que vira objeto 3D; tem prioridade sobre src. `exportState` não põe data URL na URL (o HTML standalone leva no CONFIG) |
| imageMode | enum | extrude, relief, voxel | extrude | extrude traça o contorno da silhueta (com furos) e extruda com bisel; relief é baixo-relevo (claro sobe) com a imagem como textura; voxel é um cubinho por célula sólida |
| imageDepth | number | 0.02..1 | 0.35 | espessura em unidades de cena (o lado maior da imagem mede 2) |
| imageThreshold | number | 0.05..0.95 | 0.5 | corte da silhueta: com alpha usa a transparência; sem alpha, pixel escuro é sólido |
| imageInvert | bool | | false | inverte o que é sólido (logo claro em fundo escuro → true); no relief inverte a altura |
| imageRes | integer | 24..200 | 96 | células no lado maior; phone usa 60 %. Extrude e voxel ficam mais caros com mais células |
| imageBevel | number | 0..0.15 | 0.04 | bisel do extrude |
| imageSmooth | number | 0..1 | 0.6 | suavização do contorno (Douglas-Peucker + Chaikin acima de 0.3); 0 = pixel fiel |
| imageColor | bool | | true | relief e voxel pintam com a própria imagem; extrude usa sempre o material |
| material | enum | chrome, glass, clay, iridescent, metal, wire | chrome | rótulo; as chaves físicas abaixo são o que vale (materials.md) |
| color | hex | | #E8E8EE | albedo / cor do wire |
| bg | hex | | #0A0A0C | clear color e fallback |
| roughness | number | 0..1 | 0.08 | |
| metalness | number | 0..1 | 1 | |
| transmission | number | 0..1 | 0 | vidro (liga `transparent`, thickness 1.2) |
| ior | number | 1..2.33 | 1.5 | |
| iridescence | number | 0..1 | 0 | thin-film |
| clearcoat | number | 0..1 | 0.6 | verniz |
| envIntensity | number | 0..3 | 1.4 | peso do ambiente |
| exposure | number | 0.3..2 | 1.1 | tone mapping ACES |
| keyColor, rimColor | hex | | #FFFFFF, #25B8FF | luz principal e contraluz |
| autoRotate | bool | | true | gira em y |
| rotateSpeed | number | 0..2 | 0.35 | rad/s |
| tiltX | number | −1.2..1.2 | 0.25 | inclinação inicial |
| cameraZ | number | 2..10 | 4.2 | distância (fov 35) |
| scale | number | 0.2..3 | 1 | escala do pivot |
| wire | 0/1 | | 0 | wireframe (LineSegments) em vez de malha |
| drag | number | 0..1 | 1 | sensibilidade do arrasto; 0 desliga |
| seed | integer | | 1 | reservado |
| parallax, parallaxAmount | bool, number | | false, 0.5 | a câmera inclina com o mouse ou giroscópio; o zoom é `cameraZ` |
| dprMax | number | 1..2 | 1.5 | teto de DPR (phone 1.25; phone também usa metade da tesselação) |

## Operações
- `setConfig`: `object`, `src`, `wire` e qualquer chave `image*` reconstroem a geometria; o resto aplica na hora. `?src=` na URL. Rebuilds concorrentes (upload no meio de um build) ficam com o mais novo.
- Imagem → 3D: a imagem é amostrada em `imageRes` células; a silhueta vira máscara (alpha ou luminância). Extrude: cada célula sólida contribui 4 arestas orientadas, arestas compartilhadas cancelam, o que sobra fecha laços; laço com área positiva é contorno externo, negativa é furo (atribuído ao menor externo que o contém); os 96 maiores laços viram `THREE.Shape` + `ExtrudeGeometry`. Silhueta vazia cai no objeto procedural com erro no console.
- Tiers: `detail` 0.5 no phone (segmentos pela metade), antialias ligado em todos (MSAA do contexto, barato pra uma malha).
- Reduced motion: sem autoRotate; arrasto ainda funciona (é interação, não movimento).

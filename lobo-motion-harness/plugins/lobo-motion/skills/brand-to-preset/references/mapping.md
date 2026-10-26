# Mapeamentos brand → CONFIG

## OKLab em JS (pra ordenar e interpolar)
```js
const lin = (c) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const hexToRgb = (h) => [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16) / 255);
function toOklab([r, g, b]) { r = lin(r); g = lin(g); b = lin(b);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s]; }
function fromOklab([L, a, b]) { const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.2914855480 * b; const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const g = (x) => { x = Math.max(0, Math.min(1, x)); return x <= 0.0031308 ? x * 12.92 : 1.055 * Math.pow(x, 1 / 2.4) - 0.055; };
  return [g(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), g(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), g(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)]; }
const toHex = (rgb) => "#" + rgb.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
const mixLab = (h1, h2, t) => toHex(fromOklab(toOklab(hexToRgb(h1)).map((v, i) => v + (toOklab(hexToRgb(h2))[i] - v) * t)));
const sortByL = (hexes) => [...hexes].sort((a, b) => toOklab(hexToRgb(a))[0] - toOklab(hexToRgb(b))[0]);
```
- 5 stops a partir de 3 cores `[dark, primary, light]`: `[dark, mixLab(dark, primary, 0.55), primary, mixLab(primary, light, 0.5), light]`.
- Escurecer a primária: `L − 0.15` em OKLab, a e b iguais.

## Arquétipo → adjetivos → linha da tabela de tom
| Arquétipo | Adjetivos | Linha |
| --- | --- | --- |
| Ruler, Sage | sóbrio, premium, preciso | premium/técnico |
| Creator, Magician | criativo, ousado, surpreendente | criativo |
| Caregiver, Innocent, Everyman | acolhedor, humano, leve | orgânico |
| Hero, Rebel, Explorer | enérgico, urgente, intenso | enérgico |
| Lover, Jester | sensual/divertido, fluido | criativo com `swirl` alto e `glow` médio |

## Família por objetivo de marca
| Objetivo | Famílias |
| --- | --- |
| "parecer tech/IA" | orb-reactive (idle + listening), grid-dots-field, shader `stripes`/`rays` |
| "premium/luxo" | holo-material (`black-gloss`, `pearl-silk`), shader `warped` escuro, text `unblur-lines` |
| "orgânico/saúde/bem-estar" | shader `aurora`/`mesh`, particle `coral`/`membrane`, text `fade-cascade` |
| "jovem/cultura/música" | shader `conic`/`blobs` com `halftone`, cursor `silky-ribbon`, post-image `dither` |
| "produto físico" | 3d-object-scene com o GLB, image-reveal no catálogo |
| "editorial/mídia" | shader `halftone-noir`, text `typewriter`, post-image `newsprint` |

## Nome e tags
`<marca>-<família>-<variante>` em kebab, variantes: `hero`, `quiet`, `loud`, `light`, `dark`, `post`. Tags no catálogo: `brand:<marca>`, `tone:<adjetivo>`, `use:<hero|app|video|post>`.

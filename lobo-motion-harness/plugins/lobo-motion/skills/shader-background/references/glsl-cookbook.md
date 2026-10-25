# GLSL cookbook · funções testadas em WebGL2 (GLSL ES 3.00)

Inclua, não reescreva. Tudo aqui compila em `#version 300 es` com `precision highp float`. As funções de ruído são as de Ashima Arts / Stefan Gustavson (MIT); paleta cosseno de Inigo Quilez; OKLab de Björn Ottosson; ACES de Krzysztof Narkowicz.

## Hash e ruído de valor

```glsl
float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float hash31(vec3 p){ p = fract(p * vec3(443.897, 441.423, 437.195)); p += dot(p, p.yxz + 19.19); return fract((p.x + p.y) * p.z); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1,0)), u.x), mix(hash21(i + vec2(0,1)), hash21(i + vec2(1,1)), u.x), u.y);
}
```

## Simplex 2D (Ashima)

```glsl
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
```

## Simplex 3D (Ashima)

```glsl
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
```

## fbm e domain warp

```glsl
float fbm(vec2 p){
  float v = 0.0, a = 0.5; mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++){ v += a * snoise(p); p = r * p * 2.0 + 17.3; a *= 0.5; }
  return v * 0.5 + 0.5;            // 0..1
}
vec2 warp(vec2 p, float t, float amount){  // domain warp: p deformado por dois fbm
  return p + amount * vec2(fbm(p + t) - 0.5, fbm(p + 5.2 - t) - 0.5) * 2.0;
}
```

## Curl noise (campo de velocidade sem divergência)

```glsl
vec3 pot(vec3 p){ return vec3(snoise(p), snoise(p + vec3(31.416)), snoise(p - vec3(47.853))); }
vec3 curlNoise(vec3 p){
  const float e = 0.1;
  vec3 dx = vec3(e, 0.0, 0.0), dy = vec3(0.0, e, 0.0), dz = vec3(0.0, 0.0, e);
  vec3 px0 = pot(p - dx), px1 = pot(p + dx);
  vec3 py0 = pot(p - dy), py1 = pot(p + dy);
  vec3 pz0 = pot(p - dz), pz1 = pot(p + dz);
  float x = (py1.z - py0.z) - (pz1.y - pz0.y);
  float y = (pz1.x - pz0.x) - (px1.z - px0.z);
  float z = (px1.y - px0.y) - (py1.x - py0.x);
  return vec3(x, y, z) / (2.0 * e);
}
```
Custo: 18 chamadas de `snoise`. Em simulação de 200k partículas, avalie a cada frame só na textura de velocidade (GPGPU), nunca no fragment da tela.

## SDFs 2D

```glsl
float sdCircle(vec2 p, float r){ return length(p) - r; }
float sdBox(vec2 p, vec2 b){ vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
float sdRing(vec2 p, float r, float w){ return abs(length(p) - r) - w; }
float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float aa(float d){ return 1.0 - smoothstep(0.0, fwidth(d) * 1.5, d); }   // borda antialiased
```

## Paleta cosseno (Inigo Quilez)

```glsl
vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d){ return a + b * cos(6.28318530718 * (c * t + d)); }
// exemplos: pal(t, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.0, 0.33, 0.67))  arco-íris
//           pal(t, vec3(0.5), vec3(0.5), vec3(1.0, 0.7, 0.4), vec3(0.0, 0.15, 0.2))  quente
```
Use só como gerador de paleta em design-time. Em produção a paleta vem do CONFIG.

## OKLab (mistura perceptual)

```glsl
vec3 toLinear(vec3 c){ return pow(c, vec3(2.2)); }
vec3 toSrgb(vec3 c){ return pow(max(c, 0.0), vec3(1.0 / 2.2)); }
vec3 toOklab(vec3 c){
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  float l_ = pow(max(l, 0.0), 1.0 / 3.0), m_ = pow(max(m, 0.0), 1.0 / 3.0), s_ = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
              1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
              0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_);
}
vec3 fromOklab(vec3 c){
  float l_ = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m_ = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s_ = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  float l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_;
  return vec3( 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
              -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
              -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
}
vec3 mixOklab(vec3 a, vec3 b, float t){ return toSrgb(fromOklab(mix(toOklab(toLinear(a)), toOklab(toLinear(b)), t))); }
```

## Tone mapping, grain, dither, vinheta

```glsl
vec3 aces(vec3 x){ const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14; return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0); }
float grain(vec2 fragCoord, float t, float size){ return hash21(floor(fragCoord / max(size, 1.0)) + fract(t) * 13.0) - 0.5; }
float bayer4(vec2 fragCoord){
  ivec2 i = ivec2(mod(fragCoord, 4.0));
  float m[16] = float[16](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
  return m[i.x + i.y * 4] / 16.0;
}
float vignette(vec2 uv, float strength){ vec2 d = uv - 0.5; return 1.0 - strength * dot(d, d) * 2.0; }
```

## Vertex shader de partículas (three.js) · cull e pixel scale

```glsl
uniform float uSize, uPixelScale, uTime;
attribute vec3 aBase; attribute float aRandom;   // em three.js r160+: `in` com GLSL3
varying float vAlpha;
void main(){
  vec3 p = aBase + curlNoise(aBase * 0.8 + uTime * 0.1) * 0.25;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vAlpha = smoothstep(0.0, 0.2, aRandom);
  gl_PointSize = uSize * uPixelScale * (300.0 / -mv.z);
  gl_Position = vAlpha < 0.01 ? vec4(2.0, 2.0, 2.0, 1.0) : projectionMatrix * mv;   // invisível sai do clip
}
```

## Coordenadas

```glsl
vec2 uv = gl_FragCoord.xy / uResolution;                                   // 0..1
vec2 p  = (uv - uCenter) * vec2(uResolution.x / uResolution.y, 1.0);       // centrado, aspecto corrigido
mat2 rot(float a){ return mat2(cos(a), -sin(a), sin(a), cos(a)); }
```

// Empacota presets em um pack auto-contido. Uso:
//   node tools/pack.mjs --out packs/<nome> [--family f] [--presets a,b,c] [--brand marca] [--zip] [--inline-three] [--no-prompts] [--no-previews]
import { mkdirSync, readFileSync, writeFileSync, existsSync, cpSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const a = Object.fromEntries(process.argv.slice(2).map((s, i, arr) => s.startsWith("--") ? [s.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true] : []).filter(Boolean));
if (!a.out) { console.error("--out obrigatório"); process.exit(1); }
const FAMILIES = ["shader-background", "particle-forms", "orb-reactive", "holo-material", "text-motion", "cursor-fx", "post-image-fx", "image-reveal", "grid-dots-field", "3d-object-scene", "morph-transition"];

function loadFamily(f) {
  const file = join(ROOT, "skills", f, "templates", "standalone.html");
  if (!existsSync(file)) return null;
  const html = readFileSync(file, "utf8");
  const m = html.match(/const PRESETS = (\{[\s\S]*?\n\});/);
  let presets = {};
  if (m) { try { presets = new Function("return " + m[1])(); } catch (e) { console.error(`PRESETS de ${f} não parseável: ${e.message}`); } }
  return { file, html, presets };
}
function catalogTags() { // brand:<x> no effect-catalog → { "<família>/<preset>": [tags] }
  const cat = existsSync(join(ROOT, "vault/effect-catalog.md")) ? readFileSync(join(ROOT, "vault/effect-catalog.md"), "utf8") : "";
  const out = {}; let fam = ""; let pre = "";
  for (const line of cat.split("\n")) { const h2 = line.match(/^## (\S+)/); if (h2) { fam = h2[1]; continue; } const h3 = line.match(/^### (\S+)/); if (h3) { pre = h3[1]; continue; } const t = line.match(/[Tt]ags?:\s*(.+)/); if (t && fam && pre) out[`${fam}/${pre}`] = t[1].split(/[,\s]+/).filter(Boolean); }
  return out;
}
const sel = []; const tags = catalogTags();
for (const f of FAMILIES) {
  if (a.family && a.family !== f) continue;
  const fam = loadFamily(f); if (!fam) continue;
  for (const p of Object.keys(fam.presets)) {
    if (a.presets && !a.presets.split(",").includes(p)) continue;
    if (a.brand && !(tags[`${f}/${p}`] || []).includes(`brand:${a.brand}`)) continue;
    sel.push({ f, p, fam });
  }
}
if (!sel.length) { console.error("nenhum preset selecionado"); process.exit(1); }
mkdirSync(join(a.out, "effects"), { recursive: true }); mkdirSync(join(a.out, "previews"), { recursive: true });

const cards = [];
for (const { f, p, fam } of sel) {
  const cfgLine = fam.html.match(/const CONFIG = \{[\s\S]*?\n\};/);
  let html = fam.html;
  if (cfgLine) {
    const base = new Function("PRESETS", "return " + cfgLine[0].replace("const CONFIG = ", "").replace(/;\s*$/, ""))(fam.presets);
    const merged = { ...base, ...fam.presets[p], preset: p };
    html = html.replace(cfgLine[0], "const CONFIG = " + JSON.stringify(merged, null, 2) + ";");
  }
  html = html.replace(/<title>.*?<\/title>/, `<title>${p} · ${f} · Lobo Motion</title>`);
  if (a["inline-three"]) html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/three@[\d.]+\/build\//g, "../../vendor/three/build/").replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/three@[\d.]+\/examples\/jsm\//g, "../../vendor/three/examples/jsm/");
  mkdirSync(join(a.out, "effects", f), { recursive: true });
  writeFileSync(join(a.out, "effects", f, `${p}.html`), html);
  writeFileSync(join(a.out, "effects", f, `${p}.config.json`), JSON.stringify(fam.presets[p], null, 2));
  const prompt = join(ROOT, "catalog", f, `${p}.prompt.md`);
  if (!a["no-prompts"] && existsSync(prompt)) cpSync(prompt, join(a.out, "effects", f, `${p}.prompt.md`));
  cards.push({ f, p });
  console.log(`+ ${f}/${p}`);
}
if (a["inline-three"]) {
  const three = execSync("node -p \"require.resolve('three/package.json')\"", { encoding: "utf8" }).trim().replace(/package\.json$/, "");
  cpSync(join(three, "build"), join(a.out, "vendor/three/build"), { recursive: true });
  cpSync(join(three, "examples/jsm"), join(a.out, "vendor/three/examples/jsm"), { recursive: true });
}
if (!a["no-previews"]) {
  try {
    const { open } = await import(pathToFileURL(join(ROOT, "tools/qa/_lib.mjs")).href);
    for (const { f, p } of cards) {
      const { browser, page } = await open({ url: pathToFileURL(join(a.out, "effects", f, `${p}.html`)).href, profile: "desktop", settle: 2500 });
      writeFileSync(join(a.out, "previews", `${f}-${p}.jpg`), await page.screenshot({ type: "jpeg", quality: 70 })); await browser.close();
      console.log(`  preview ${f}-${p}.jpg`);
    }
  } catch (e) { console.error("previews puladas (Playwright indisponível): " + e.message); }
}
const name = a.out.split("/").pop();
writeFileSync(join(a.out, "index.html"), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name}</title>
<style>:root{--bg:#0b0b0d;--fg:#f2f2f2;--mut:#8a8a93;--card:#141418}@media(prefers-color-scheme:light){:root{--bg:#fafafa;--fg:#111;--mut:#666;--card:#fff}}
body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.5 system-ui,sans-serif}header{padding:24px 20px 8px}h1{margin:0 0 4px;font-size:22px}p{margin:0;color:var(--mut)}
.bar{display:flex;gap:8px;padding:8px 20px 16px;flex-wrap:wrap}input,select{background:var(--card);color:var(--fg);border:1px solid #333;border-radius:8px;padding:8px 10px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;padding:0 20px 40px}.card{background:var(--card);border-radius:12px;overflow:hidden;border:1px solid #222}
.card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;background:#000}.card .b{padding:10px 12px}.card b{display:block}.card small{color:var(--mut)}
.card .a{display:flex;gap:8px;margin-top:8px}.card a,.card button{flex:1;text-align:center;padding:7px 8px;border-radius:8px;border:1px solid #333;background:transparent;color:var(--fg);text-decoration:none;cursor:pointer;font-size:12px}</style></head>
<body><header><h1>${name}</h1><p>${cards.length} efeitos · abra cada um, ou copie o CONFIG pra afinar.</p></header>
<div class="bar"><input id="q" placeholder="buscar"><select id="f"><option value="">todas as famílias</option>${[...new Set(cards.map((c) => c.f))].map((f) => `<option>${f}</option>`).join("")}</select></div>
<div class="grid" id="g">${cards.map((c) => `<div class="card" data-f="${c.f}" data-p="${c.p}"><img src="previews/${c.f}-${c.p}.jpg" alt="" loading="lazy"><div class="b"><b>${c.p}</b><small>${c.f}</small><div class="a"><a href="effects/${c.f}/${c.p}.html" target="_blank">abrir</a><button data-cfg="effects/${c.f}/${c.p}.config.json">copiar CONFIG</button></div></div></div>`).join("")}</div>
<script>const q=document.getElementById("q"),f=document.getElementById("f");function filt(){document.querySelectorAll(".card").forEach(c=>{c.style.display=(!f.value||c.dataset.f===f.value)&&c.dataset.p.includes(q.value.toLowerCase())?"":"none"})}q.oninput=f.onchange=filt;
document.querySelectorAll("button[data-cfg]").forEach(b=>b.onclick=async()=>{const t=await (await fetch(b.dataset.cfg)).text();await navigator.clipboard.writeText(t);b.textContent="copiado";setTimeout(()=>b.textContent="copiar CONFIG",1200)});</script></body></html>`);
writeFileSync(join(a.out, "README.md"), `# ${name}\n\n${cards.length} efeitos prontos. Abra \`index.html\` no navegador (ou \`npx serve .\` se o seu navegador bloquear módulos em file://).\n\n## Efeitos\n${cards.map((c) => `- **${c.p}** (${c.f}) — \`effects/${c.f}/${c.p}.html\``).join("\n")}\n\n## Como afinar\nCada HTML tem um bloco \`const CONFIG = {...}\` no topo do script. Mexa com segurança em: \`colors\`/\`colorA\`/\`colorB\`, \`speed\`, \`preset\`, \`seed\`, intensidade (\`glow\`, \`movement\`, \`intensity\`). O resto está documentado no \`.config.json\` ao lado.\n\n## Requisitos\nNavegador com WebGL2. Efeitos 3D carregam three.js do CDN${a["inline-three"] ? " (versão embutida em \`vendor/\`)" : ""}. Fallback estático automático para leitores sem WebGL e para \`prefers-reduced-motion\`.\n\n## Integração\nVeja \`INTEGRATE.md\` (gerado pela skill integrate-effect) para a sua stack.\n`);
writeFileSync(join(a.out, "LICENSE"), `Licença de uso — ${name}\n\nOs arquivos deste pacote foram produzidos por The Lobo Design. Uso, modificação e publicação permitidos em canais próprios do licenciado, sem limite de tempo. Revenda, sublicenciamento ou redistribuição como produto não são permitidos.\n\nTerceiros: three.js (MIT, © three.js authors); simplex noise (MIT, © Ashima Arts / Stefan Gustavson).\n`);
if (a.zip) { execSync(`cd "${dirname(a.out)}" && zip -qr "${name}.zip" "${name}"`); console.log(`zip: ${join(dirname(a.out), name + ".zip")}`); }
console.log(`OK: ${cards.length} efeitos em ${a.out}`);

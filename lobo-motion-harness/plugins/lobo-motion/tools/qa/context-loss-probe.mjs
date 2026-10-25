// A cena volta depois de perder o contexto WebGL? Uso: node context-loss-probe.mjs --url <url>
// iOS derruba contextos sob pressão de memória; sem rebuild a cena fica em branco pra sempre (rule, fix-catalog §4).
import { open, probe, args } from "./_lib.mjs";

const a = args();
const { browser, page, errors } = await open({ url: a.url, settle: 2500 });
const before = await probe(page);
if (!before.contexts) { console.log("sem contexto WebGL na página; nada a sondar"); await browser.close(); process.exit(0); }
const lost = await page.evaluate(() => { const gl = window.__probe.gl; const ext = gl.getExtension("WEBGL_lose_context"); if (!ext) return "no-ext"; ext.loseContext(); window.__ext = ext; return gl.isContextLost(); });
await page.waitForTimeout(800);
const during = await probe(page);
await page.evaluate(() => window.__ext && window.__ext.restoreContext());
await page.waitForTimeout(2500);
const after = await probe(page);
const stillLost = await page.evaluate(() => window.__probe.gl.isContextLost());
const drewAgain = after.draws - during.draws;
console.log(`perdeu=${lost}  drawsAntes=${before.draws}  drawsDuranteAPerda=${during.draws - before.draws}  drawsDepoisDoRestore=${drewAgain}  aindaPerdido=${stillLost}  lobo=${JSON.stringify(after.lobo?.stats || null)}  erros=${errors.length}`);
let ok = true;
if (lost === "no-ext") { console.log("WARN: WEBGL_lose_context indisponível; não dá pra sondar aqui"); }
else if (drewAgain < 1 || stillLost) { ok = false; console.log("FAIL: a cena não voltou a desenhar depois do restore (trate webglcontextlost com preventDefault e reconstrua no restore)"); }
else console.log("OK: a cena reconstruiu e voltou a desenhar");
await browser.close();
process.exit(ok ? 0 : 1);

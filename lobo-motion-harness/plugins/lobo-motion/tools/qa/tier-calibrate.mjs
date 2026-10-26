// Varre count × dprMax × glow por tier e recomenda o teto que cumpre o alvo.
// Uso: node tier-calibrate.mjs --url <url> [--tiers desktop,tablet,phone] [--counts 80000,120000,180000] [--dpr 1,1.25,1.5] [--glow 0,0.5,0.9] [--seconds 4] [--real]
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { args, open, probe, PROFILES } from "./_lib.mjs";

const a = args({ tiers: "desktop,tablet,phone", counts: "", dpr: "1,1.25,1.5", glow: "", seconds: "4" });
const TARGET = { desktop: { fps: 58, p95: 20 }, tablet: { fps: 58, p95: 22 }, phone: { fps: 54, p95: 24 } };
const tiers = a.tiers.split(","), dprs = a.dpr.split(",").map(Number), secs = Number(a.seconds);
const counts = a.counts ? a.counts.split(",").map(Number) : [null], glows = a.glow ? a.glow.split(",").map(Number) : [null];
const rows = [];
for (const tier of tiers) {
  const profile = tier === "phone" ? "phone" : "desktop";
  for (const dpr of dprs) for (const count of counts) for (const glow of glows) {
    const { browser, page } = await open({ url: a.url, profile, settle: 300 });
    if (tier === "tablet") await page.setViewportSize({ width: 820, height: 1180 });
    const t0 = Date.now();
    const changes = { dprMax: dpr }; if (count != null) changes.count = count; if (glow != null) changes.glow = glow;
    await page.evaluate((c) => window.__lobo && window.__lobo.setConfig(c), changes);
    await page.waitForTimeout(800);   // regenera buffer / recompila
    const compileMs = Date.now() - t0;
    const m = await page.evaluate((s) => new Promise((res) => { const ft = []; let last = performance.now(); const end = last + s * 1000;
      function f(now) { ft.push(now - last); last = now; if (now < end) requestAnimationFrame(f); else { ft.sort((x, y) => x - y); res({ fps: 1000 / (ft.reduce((p, c) => p + c, 0) / ft.length), p95: ft[Math.floor(ft.length * 0.95)] }); } }
      requestAnimationFrame(f); }), secs);
    const p = await probe(page);
    const gpu = await page.evaluate(() => { try { const c = document.createElement("canvas").getContext("webgl2"); const e = c.getExtension("WEBGL_debug_renderer_info"); return e ? c.getParameter(e.UNMASKED_RENDERER_WEBGL) : "?"; } catch { return "?"; } });
    const row = { tier, count, dpr, glow, fps: +m.fps.toFixed(1), p95: +m.p95.toFixed(1), drawCalls: p.lobo?.stats?.drawCallsPerFrame ?? p.draws, compileMs, gpu };
    rows.push(row);
    console.log(`${tier.padEnd(8)} count=${String(count ?? "-").padEnd(7)} dpr=${String(dpr).padEnd(5)} glow=${String(glow ?? "-").padEnd(4)} fps=${row.fps.toString().padStart(5)} p95=${row.p95.toString().padStart(5)}ms draws=${row.drawCalls} compile=${compileMs}ms`);
    await browser.close();
  }
}
console.log("\nRecomendação por tier (mais rico que cumpre o alvo):");
const rec = {};
for (const tier of tiers) {
  const ok = rows.filter((r) => r.tier === tier && r.fps >= TARGET[tier].fps && r.p95 <= TARGET[tier].p95);
  const best = ok.sort((x, y) => ((y.count ?? 0) * (y.dpr) * (1 + (y.glow ?? 0))) - ((x.count ?? 0) * (x.dpr) * (1 + (x.glow ?? 0))))[0];
  rec[tier] = best ? { count: best.count, dprMax: best.dpr, glow: best.glow, fps: best.fps, p95: best.p95 } : null;
  console.log(`  ${tier}: ${best ? `count ${best.count ?? "-"} · dprMax ${best.dpr} · glow ${best.glow ?? "-"} (${best.fps} fps, p95 ${best.p95} ms)` : "nenhuma combinação cumpre o alvo; reduza a grade"}`);
}
const sw = /swiftshader|llvmpipe|software/i.test(rows[0]?.gpu || "");
if (sw) console.log("\nAVISO: renderer por software (" + rows[0].gpu + "). Use só como comparação relativa; calibre em GPU real com --real.");
if (a.real && !sw) {
  const f = new URL("./tier-profiles.json", import.meta.url); const prev = existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : {};
  prev[rows[0].gpu] = { url: a.url, at: new Date().toISOString(), rec, rows }; writeFileSync(f, JSON.stringify(prev, null, 2)); console.log("gravado em tools/qa/tier-profiles.json");
}

// Utilidades compartilhadas das sondas. Sem dependências além do Playwright já instalado.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright")); } catch { console.error("Playwright não encontrado. No projeto: npm i -D playwright && npx playwright install chromium (ou defina PLAYWRIGHT_PATH)"); process.exit(2); } }
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
export const BOT_UA = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
export const PROFILES = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  phone:   { viewport: { width: 390,  height: 844 }, deviceScaleFactor: 3, isMobile: true,  hasTouch: true }
};
export const GPU_ARGS = ["--ignore-gpu-blocklist", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--enable-webgl"];

export function args(spec = {}) {
  const out = { ...spec };
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith("--")) { const k = a[i].slice(2); const v = a[i + 1] && !a[i + 1].startsWith("--") ? a[++i] : "true"; out[k] = v; }
  }
  if (!out.url) { console.error("uso: --url <http://... | arquivo.html> [--out dir] [--seconds n]"); process.exit(2); }
  if (!/^https?:/.test(out.url)) out.url = pathToFileURL(resolve(out.url)).href;
  return out;
}

// Conta draws, frames (clears), programas linkados e rAF antes de qualquer código da página.
export const HOOK = `
(() => {
  const S = window.__probe = { draws: 0, clears: 0, links: [], rafs: 0, contexts: 0, t0: performance.now(), gl: null };
  const raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => raf((t) => { S.rafs++; cb(t); });
  const gc = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (kind, attrs) {
    const ctx = gc.call(this, kind, attrs);
    if (ctx && (kind === "webgl" || kind === "webgl2") && !ctx.__hooked) {
      ctx.__hooked = true; S.contexts++; S.gl = S.gl || ctx; S.attrs = attrs || null;
      for (const m of ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced"]) {
        if (!ctx[m]) continue; const f = ctx[m].bind(ctx); ctx[m] = (...a) => { S.draws++; return f(...a); };
      }
      const clear = ctx.clear.bind(ctx); ctx.clear = (m) => { S.clears++; return clear(m); };
      const link = ctx.linkProgram.bind(ctx); ctx.linkProgram = (p) => { S.links.push(Math.round(performance.now() - S.t0)); return link(p); };
    }
    return ctx;
  };
})();`;

export async function open({ url, profile = "desktop", ua = UA, reducedMotion = "no-preference", hook = true, settle = 2500 }) {
  const browser = await chromium.launch({ args: GPU_ARGS });
  const ctx = await browser.newContext({ ...PROFILES[profile], userAgent: ua, reducedMotion });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
  if (hook) await page.addInitScript(HOOK);
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(settle);
  return { browser, page, errors };
}

export const probe = (page) => page.evaluate(() => {
  const S = window.__probe || {};
  const L = window.__lobo ? { family: window.__lobo.family, stats: window.__lobo.stats } : null;
  return { draws: S.draws, clears: S.clears, links: S.links, rafs: S.rafs, contexts: S.contexts, attrs: S.attrs, lobo: L,
           canvases: [...document.querySelectorAll("canvas")].map((c) => ({ w: c.width, h: c.height, visible: c.getClientRects().length > 0 })) };
});

export const fmt = (o) => JSON.stringify(o, null, 1).replace(/\n\s*/g, " ");

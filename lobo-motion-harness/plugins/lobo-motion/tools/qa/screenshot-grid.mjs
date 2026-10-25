// Screenshots por tier e por tempo. Uso: node screenshot-grid.mjs --url <url> [--out qa-shots] [--times 1,3,8]
// Leia as imagens depois (Read). O tamanho do JPEG é um proxy de «tem textura»: < 4 KB em 1440x900 quase sempre é canvas preto ou vazio.
import { mkdirSync, writeFileSync } from "node:fs";
import { args, open, probe, fmt } from "./_lib.mjs";

const a = args({ out: "qa-shots", times: "1,3,8" });
const times = a.times.split(",").map(Number);
mkdirSync(a.out, { recursive: true });
let bad = 0;
for (const profile of ["desktop", "phone"]) {
  const { browser, page, errors } = await open({ url: a.url, profile, settle: 200 });
  const t0 = Date.now();
  for (const t of times) {
    const wait = t * 1000 - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait);
    const jpg = await page.screenshot({ type: "jpeg", quality: 35 });
    const png = await page.screenshot({ type: "png" });
    const file = `${a.out}/${profile}-t${t}.png`; writeFileSync(file, png);
    const blank = jpg.length < (profile === "desktop" ? 4000 : 2500);
    if (blank) bad++;
    console.log(`${profile.padEnd(8)} t=${String(t).padStart(2)}s  ${file}  jpeg=${(jpg.length / 1024).toFixed(1)}kb ${blank ? "LIKELY-BLANK" : "ok"}`);
  }
  const p = await probe(page);
  console.log(`${profile.padEnd(8)} probe ${fmt({ draws: p.draws, programs: p.links.length, canvases: p.canvases, lobo: p.lobo?.stats })}`);
  if (errors.length) console.log(`${profile.padEnd(8)} erros: ${errors.join(" | ")}`);
  await browser.close();
}
console.log(bad ? `\nFAIL: ${bad} screenshot(s) provavelmente em branco` : "\nOK: nenhuma screenshot em branco (confirme lendo as imagens)");
process.exit(bad ? 1 : 0);

// Quantos frames a cena realmente desenha, por tier. Uso: node fps-probe.mjs --url <url> [--seconds 4]
// SwiftShader não é GPU: só as CONTAGENS valem (draws/s, frames/s, programas linkados e quando). Nunca cite o número como fps absoluto.
import { args, open, probe, fmt } from "./_lib.mjs";

const a = args({ seconds: "4" });
const secs = Number(a.seconds);
const rows = [];
for (const profile of ["desktop", "phone"]) {
  const { browser, page, errors } = await open({ url: a.url, profile, settle: 2000 });
  await page.mouse.move(400, 300); await page.waitForTimeout(300);
  const before = await probe(page);
  await page.waitForTimeout(secs * 1000);
  const after = await probe(page);
  const linksAfter = after.links.length - before.links.length;
  rows.push({ profile, "raf/s": ((after.rafs - before.rafs) / secs).toFixed(1), "clears/s": ((after.clears - before.clears) / secs).toFixed(1), "draws/s": ((after.draws - before.draws) / secs).toFixed(1),
              programs: after.links.length, "linked after settle": linksAfter, "first link ms": after.links[0] ?? "-", "last link ms": after.links.at(-1) ?? "-", canvas: after.canvases[0] ? `${after.canvases[0].w}x${after.canvases[0].h}` : "none", erros: errors.length });
  await browser.close();
}
console.table(rows);
const late = rows.filter((r) => r["linked after settle"] > 0);
console.log(late.length ? `WARN: programas linkados depois do settle em ${late.map((r) => r.profile).join(", ")} (compilação no meio do uso; pré-aqueça)` : "OK: nenhum programa compilado depois do settle");
console.log("Lembrete: contagens sob SwiftShader; compare entre builds, nunca com um número de telefone real. clears/s é 0 em cenas que desenham um quad sem clear: use draws/s.");

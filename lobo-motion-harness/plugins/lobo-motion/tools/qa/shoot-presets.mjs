// uso: node shoot3.mjs <outDir> <skillDir> <preset,preset,...> [extraQuery]
import { mkdirSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { open, probe } from "/home/user/vitorthelobo/lobo-motion-harness/plugins/lobo-motion/tools/qa/_lib.mjs";
const [OUT, skill, list, extra = ""] = process.argv.slice(2);
const file = `/home/user/vitorthelobo/lobo-motion-harness/plugins/lobo-motion/skills/${skill}/templates/standalone.html`;
mkdirSync(OUT, { recursive: true });
for (const pr of list.split(",")) {
  const { browser, page, errors } = await open({ url: pathToFileURL(file).href + `?preset=${pr}${extra}`, profile: "desktop", settle: 200 });
  await page.waitForTimeout(1800); await page.mouse.move(300, 300); await page.waitForTimeout(100); await page.mouse.move(Number(process.env.MX || 700), Number(process.env.MY || 450), { steps: 4 }); await page.waitForTimeout(2200);
  const jpg = await page.screenshot({ type: "jpeg", quality: 35 });
  writeFileSync(`${OUT}/${skill}-${pr}.png`, await page.screenshot({ type: "png" }));
  const p = await probe(page);
  console.log(`${skill.padEnd(16)} ${pr.padEnd(14)} jpeg=${(jpg.length/1024).toFixed(1)}kb draws=${p.draws} stats=${JSON.stringify(p.lobo?.stats||{})} ${jpg.length < 4000 ? "LIKELY-BLANK" : "ok"} ${errors.length ? "ERR: " + errors.join(" | ") : ""}`);
  await browser.close();
}

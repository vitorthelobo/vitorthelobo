// Reduced motion e robot form. Uso: node check-motion.mjs --url <url>
// 1) prefers-reduced-motion: a página precisa responder (sem loop travado), manter o canvas visível e parar de avançar o tempo.
// 2) user agent de bot: não deve criar contexto WebGL nem baixar a cena; o conteúdo estático precisa existir.
import { open, probe, args, BOT_UA, fmt } from "./_lib.mjs";

const a = args();
let fails = 0;
{
  const { browser, page, errors } = await open({ url: a.url, reducedMotion: "reduce", settle: 2500 });
  const responsive = await Promise.race([page.evaluate(() => 1).then(() => true), new Promise((r) => setTimeout(() => r(false), 3000))]);
  const p1 = await probe(page); await page.waitForTimeout(1500); const p2 = await probe(page);
  const framesPerSec = (p2.clears - p1.clears) / 1.5;
  const visible = p2.canvases.some((c) => c.visible && c.w > 1);
  console.log(`reduced-motion  responde=${responsive}  frames/s=${framesPerSec.toFixed(1)}  canvasVisivel=${visible}  draws=${p2.draws}  erros=${errors.length}`);
  if (!responsive) { fails++; console.log("  FAIL: página não responde com reduced motion (loop travado?)"); }
  if (framesPerSec > 5) console.log("  WARN: ainda desenha " + framesPerSec.toFixed(0) + " frames/s com reduced motion; o esperado é assentar (desenhar só em mudança)");
  if (!visible && p2.canvases.length) { fails++; console.log("  FAIL: canvas sumiu com reduced motion; conteúdo precisa continuar visível"); }
  await browser.close();
}
{
  const { browser, page } = await open({ url: a.url, ua: BOT_UA, settle: 2000 });
  const p = await probe(page);
  const text = await page.evaluate(() => document.body.innerText.trim().length);
  console.log(`robot-form      contextosWebGL=${p.contexts}  canvases=${p.canvases.length}  textoNoDOM=${text} chars`);
  if (p.contexts > 0) console.log("  WARN: user agent de bot recebeu WebGL; sirva uma imagem estática pra crawlers (robot form)");
  await browser.close();
}
console.log(fails ? `\nFAIL: ${fails}` : "\nOK");
process.exit(fails ? 1 : 0);

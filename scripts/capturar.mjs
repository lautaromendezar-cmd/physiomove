/**
 * Abre cada sitio oficial en Chrome, busca el logo en el header ya renderizado
 * y lo captura a 3x. Sirve para los sitios que arman el logo con JS y no lo
 * dejan en el HTML (Swiss Medical, Sancor, Galeno, Medicus).
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SALIDA = 'crudos';
fs.mkdirSync(SALIDA, { recursive: true });

const objetivos = JSON.parse(fs.readFileSync('objetivos.json', 'utf8'));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=3'],
});

for (const o of objetivos) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 3 });
  try {
    await page.goto(o.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await new Promise((r) => setTimeout(r, o.espera || 3500));

    const info = await page.evaluate(() => {
      const dentroDelHeader = (el) => {
        let n = el;
        for (let i = 0; i < 8 && n; i++) {
          const t = n.tagName;
          if (t === 'HEADER' || t === 'NAV') return true;
          const c = (n.className && n.className.baseVal !== undefined ? n.className.baseVal : n.className) || '';
          if (typeof c === 'string' && /header|navbar|topbar|menu-top/i.test(c)) return true;
          n = n.parentElement;
        }
        return false;
      };
      const candidatos = [...document.querySelectorAll('img, svg, picture')]
        .map((el) => {
          const r = el.getBoundingClientRect();
          const txt = [el.getAttribute('alt'), el.getAttribute('class'), el.getAttribute('id'),
                       el.getAttribute('src'), el.getAttribute('aria-label')].join(' ').toLowerCase();
          return { el, r, esLogo: /logo|isolog|marca|brand/.test(txt), header: dentroDelHeader(el) };
        })
        .filter((c) => c.r.width > 60 && c.r.height > 14 && c.r.top < 260 && c.r.width < 700)
        .sort((a, b) => (b.esLogo + b.header * 0.5) - (a.esLogo + a.header * 0.5) || a.r.top - b.r.top);

      if (!candidatos.length) return null;
      const g = candidatos[0];
      g.el.setAttribute('data-logo-elegido', '1');
      return { w: Math.round(g.r.width), h: Math.round(g.r.height), esLogo: g.esLogo, header: g.header,
               tag: g.el.tagName, src: (g.el.getAttribute('src') || '').slice(0, 90) };
    });

    if (!info) { console.log(`${o.nombre}: sin candidato`); await page.close(); continue; }
    const el = await page.$('[data-logo-elegido]');
    await el.screenshot({ path: `${SALIDA}/${o.nombre}.png`, omitBackground: false });
    console.log(`${o.nombre}: ${info.w}x${info.h} ${info.tag} logo=${info.esLogo} header=${info.header} ${info.src}`);
  } catch (e) {
    console.log(`${o.nombre}: ERROR ${e.message.slice(0, 70)}`);
  }
  await page.close();
}
await browser.close();

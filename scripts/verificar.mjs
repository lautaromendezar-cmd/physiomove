/**
 * Chequeos sobre dist/: que no quede ningun link interno roto, ninguna imagen
 * apuntando a un archivo que no existe, y que cada pagina tenga title,
 * meta description y canonical propios.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const fallos = [];
const avisos = [];

function htmls(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return htmls(p);
    return e.name.endsWith('.html') ? [p] : [];
  });
}

const paginas = htmls(DIST);
const titulos = new Map();
const descripciones = new Map();

const existeRuta = (href) => {
  const limpio = href.split('#')[0].split('?')[0];
  if (limpio === '/' || limpio === '') return fs.existsSync(path.join(DIST, 'index.html'));
  const base = path.join(DIST, limpio.replace(/^\//, ''));
  return (
    fs.existsSync(base) ||
    fs.existsSync(base + '.html') ||
    fs.existsSync(path.join(base, 'index.html'))
  );
};

for (const pagina of paginas) {
  const html = fs.readFileSync(pagina, 'utf8');
  const rel = '/' + path.relative(DIST, pagina).replace(/\\/g, '/');

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
  const desc = html.match(/<meta name="description" content="([\s\S]*?)"/)?.[1]?.trim();
  const canonical = html.match(/<link rel="canonical" href="([\s\S]*?)"/)?.[1];

  if (!title) fallos.push(`${rel}: sin <title>`);
  if (!desc) fallos.push(`${rel}: sin meta description`);
  if (!canonical) fallos.push(`${rel}: sin canonical`);
  if (title) titulos.set(title, [...(titulos.get(title) || []), rel]);
  if (desc) descripciones.set(desc, [...(descripciones.get(desc) || []), rel]);

  if (!/<h1[\s>]/.test(html)) fallos.push(`${rel}: sin <h1>`);

  // links internos
  for (const m of html.matchAll(/href="(\/[^"#][^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith('/_astro/') || /\.(png|jpg|webp|avif|svg|xml|ico|css|js)$/.test(href)) {
      if (!fs.existsSync(path.join(DIST, href.replace(/^\//, ''))))
        fallos.push(`${rel}: falta el archivo ${href}`);
      continue;
    }
    if (!existeRuta(href)) fallos.push(`${rel}: link interno roto -> ${href}`);
  }

  // imagenes
  for (const m of html.matchAll(/(?:src|srcset)="([^"]+)"/g)) {
    for (const parte of m[1].split(',')) {
      const url = parte.trim().split(' ')[0];
      if (!url.startsWith('/') || url.startsWith('//')) continue;
      if (!fs.existsSync(path.join(DIST, url.replace(/^\//, ''))))
        fallos.push(`${rel}: asset inexistente -> ${url}`);
    }
  }

  // alt en todas las imagenes
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    // Astro emite alt="" como atributo booleano vacio: `<img ... alt loading=...>`
    if (!/\salt(=|[\s>])/.test(m[0])) fallos.push(`${rel}: <img> sin alt`);
  }

  // el telefono y el whatsapp deben ser los del documento
  if (/wa\.me\/(?!542966663958)/.test(html)) fallos.push(`${rel}: link de WhatsApp incorrecto`);
}

for (const [t, en] of titulos) if (en.length > 1) avisos.push(`title repetido en ${en.join(', ')}: "${t}"`);
for (const [d, en] of descripciones)
  if (en.length > 1) avisos.push(`description repetida en ${en.join(', ')}`);

console.log(`Paginas revisadas: ${paginas.length}`);
avisos.forEach((a) => console.log('  aviso: ' + a));
if (fallos.length) {
  console.log(`\n${fallos.length} FALLOS:`);
  fallos.forEach((f) => console.log('  - ' + f));
  process.exit(1);
}
console.log('Todo OK: links, assets, alts, titles, descriptions y canonicals.');

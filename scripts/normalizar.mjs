/**
 * Deja los 13 logos en una caja uniforme: recorta el fondo sobrante, escala a
 * contain dentro de 520x180 (2x de la celda real) y exporta PNG transparente.
 * El peso optico se empareja a mano con `escala` porque un logo ancho y fino
 * (OSDE) y uno cuadrado (Avalian) no pueden compartir la misma caja a ciegas.
 */
import sharp from 'sharp';
import fs from 'node:fs';

const CAJA = { w: 520, h: 180 };
const SALIDA = 'normalizados';
fs.mkdirSync(SALIDA, { recursive: true });

const LOGOS = [
  { archivo: 'osde.svg', slug: 'osde', escala: 0.78 },
  { archivo: 'swiss.svg', slug: 'swiss-medical', escala: 1 },
  { archivo: 'galeno.png', slug: 'galeno', escala: 1 },
  { archivo: 'medicus.png', slug: 'medicus', escala: 0.92 },
  { archivo: 'medife.svg', slug: 'medife', escala: 0.85 },
  { archivo: 'sancor.png', slug: 'sancor-salud', escala: 1 },
  { archivo: 'avalian.png', slug: 'avalian', escala: 0.95 },
  { archivo: 'pami.svg', slug: 'pami', escala: 0.85 },
  { archivo: 'iosfa.svg', slug: 'iosfa', escala: 0.9 },
  { archivo: 'osdepym.png', slug: 'osdepym', escala: 1 },
  { archivo: 'ospedyc.png', slug: 'ospedyc', escala: 1 },
  { archivo: 'osmata.png', slug: 'osmata', escala: 0.9 },
  { archivo: 'osuthgra.png', slug: 'osuthgra', escala: 1 },
];

for (const l of LOGOS) {
  const ruta = `crudos/${l.archivo}`;
  if (!fs.existsSync(ruta)) { console.log('FALTA', ruta); continue; }

  // Los SVG se rasterizan grandes para que no queden blandos.
  let img = sharp(fs.readFileSync(ruta), { density: 600 });
  const meta = await img.metadata();
  if (meta.format === 'svg') {
    img = sharp(await sharp(fs.readFileSync(ruta), { density: 600 })
      .resize({ width: 1400, fit: 'inside' }).png().toBuffer());
  }

  // Recorta el fondo plano que traen las capturas del DOM.
  let base;
  try {
    base = await img.trim({ threshold: 12 }).png().toBuffer();
  } catch {
    base = await img.png().toBuffer();
  }

  const dentro = {
    w: Math.round(CAJA.w * l.escala),
    h: Math.round(CAJA.h * l.escala),
  };

  const escalado = await sharp(base)
    .resize(dentro.w, dentro.h, { fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer();
  const m = await sharp(escalado).metadata();

  await sharp({
    create: { width: CAJA.w, height: CAJA.h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: escalado, left: Math.round((CAJA.w - m.width) / 2), top: Math.round((CAJA.h - m.height) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(`${SALIDA}/${l.slug}.png`);

  console.log(`${l.slug.padEnd(16)} ${m.width}x${m.height}`);
}

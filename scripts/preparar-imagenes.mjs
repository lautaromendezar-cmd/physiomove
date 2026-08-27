/**
 * Toma el material original del cliente (HEIC/JPG pesados, hasta 5712px de lado)
 * y deja en src/assets/ versiones optimizadas y con nombre semantico.
 * Los HEIC ya vienen convertidos a JPG en _work/full por ffmpeg (ver README).
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ORIGEN = '_work/full';
const FOTOS = 'src/assets/fotos';
const MARCA = 'src/assets/marca';

const FOTOS_MAP = {
  'hero-entrenamiento':      'IMG_1750.jpg',
  'equipo-grupo':            'IMG_5955.jpg',
  'razonamiento-datos':      'IMG_4585.jpg',
  'ejercicio-planificado':   'IMG_1755.jpg',
  'espacio-recepcion':       'IMG_9856.jpg',
  'espacio-pista':           'IMG_4398.jpg',
  'espacio-gimnasio':        'IMG_1201.jpg',
  'espacio-fuerza':          'IMG_9861.jpg',
  'espacio-pasillo':         'IMG_2042.jpg',
  'evaluacion-cancha':       'IMG_6049.jpg',
  'evaluacion-plataforma':   'a2e47f68-1163-41f6-99bc-2f842e107b58.jpg',
  'consulta-evaluacion':     'IMG_6277.jpg',
  'mep-sesion':              'IMG_6452.jpg',
  'recovery-presoterapia':   'IMG_5971.jpg',
  'ninos-entrenamiento':     'IMG_2272.jpg',
  'ninos-evaluacion':        'IMG_4453.jpg',
  'equipo-hexagonos':        'IMG_5920.jpg',
};

const LADO_MAX = 1800;

fs.mkdirSync(FOTOS, { recursive: true });
fs.mkdirSync(MARCA, { recursive: true });

for (const [nombre, archivo] of Object.entries(FOTOS_MAP)) {
  const origen = path.join(ORIGEN, archivo);
  if (!fs.existsSync(origen)) { console.warn('FALTA', origen); continue; }
  const destino = path.join(FOTOS, `${nombre}.jpg`);
  const info = await sharp(origen)
    .rotate()
    .resize({ width: LADO_MAX, height: LADO_MAX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destino);
  console.log(`${nombre}.jpg`, `${info.width}x${info.height}`, `${(fs.statSync(destino).size / 1024).toFixed(0)} KB`);
}

// Logo: recorta el alfa sobrante y deja PNG con transparencia.
await sharp(path.join(ORIGEN, 'IMG_1520.PNG'))
  .trim({ threshold: 1 })
  .resize({ width: 720 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(MARCA, 'logo.png'));

// Favicons desde el mismo logo, sobre el crema de marca para que se lea en pestana clara u oscura.
for (const size of [32, 180, 512]) {
  await sharp(path.join(MARCA, 'logo.png'))
    .resize(size, size, { fit: 'contain', background: '#00000000' })
    .png()
    .toFile(`public/favicon-${size}.png`);
}

// Open Graph 1200x630: el banner de marca del cliente centrado sobre el navy del logo.
const banner = await sharp(path.join(ORIGEN, 'IMG_1519.JPG')).resize({ width: 1080 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#002B4A' } })
  .composite([{ input: banner, gravity: 'center' }])
  .jpeg({ quality: 86 })
  .toFile('public/og-physiomove.jpg');

console.log('listo');

// Fondo apaisado para la banda de cierre: se recorta una franja horizontal del
// original vertical, porque a 21:9 un recorte centrado pierde toda la escena.
// Va con un desenfoque leve horneado en el archivo: sin eso el cartel de la
// pared se lee y compite con el titulo del CTA, y hacerlo por CSS costaria GPU.
await sharp(path.join(ORIGEN, 'IMG_1201.jpg'))
  .rotate()
  .extract({ left: 0, top: 1750, width: 4284, height: 1900 })
  .resize({ width: 2400 })
  .blur(7)
  .modulate({ brightness: 0.82 })
  .jpeg({ quality: 72, mozjpeg: true })
  .toFile(path.join(FOTOS, 'cta-fondo.jpg'));
console.log('cta-fondo.jpg listo');

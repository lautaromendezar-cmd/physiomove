/**
 * Los logos capturados del DOM traen el fondo plano de la pagina pegado.
 * Se muestrea el color de las cuatro esquinas y, si son practicamente el mismo,
 * ese color se vuelve transparente con tolerancia.
 */
import sharp from 'sharp';
const TOL = 26;
for (const slug of process.argv.slice(2)) {
  const f = `normalizados/${slug}.png`;
  const { data, info } = await sharp(f).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => { const i = (y * info.width + x) * 4; return [data[i], data[i+1], data[i+2], data[i+3]]; };
  // esquina del contenido, no del lienzo transparente
  let x0 = 0, y0 = 0;
  buscar: for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) { if (px(x, y)[3] > 200) { x0 = x; y0 = y; break buscar; } }
  const fondo = px(x0, y0);
  let cambiados = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i+3] < 200) continue;
    if (Math.abs(data[i]-fondo[0]) < TOL && Math.abs(data[i+1]-fondo[1]) < TOL && Math.abs(data[i+2]-fondo[2]) < TOL) { data[i+3] = 0; cambiados++; }
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(f.replace('.png', '-limpio.png'));
  console.log(slug, 'fondo', fondo.slice(0,3).join(','), '| pixeles transparentados:', cambiados);
}

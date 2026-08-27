import type { ImageMetadata } from 'astro';

/**
 * Retratos del equipo. Aparte del mapa de fotos generales a proposito: ahi el
 * glob es eager y arrastraria al build cualquier retrato que todavia no use
 * nadie.
 */
const modulos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/retratos/*.jpg',
  { eager: true }
);

const retratos: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(modulos).map(([ruta, mod]) => [
    ruta.split('/').pop()!.replace('.jpg', ''),
    mod.default,
  ])
);

export function retrato(nombre?: string): ImageMetadata | undefined {
  if (!nombre) return undefined;
  const encontrado = retratos[nombre];
  if (!encontrado) {
    throw new Error(
      `Falta el retrato "${nombre}" en src/assets/retratos. Corré: npm run assets`
    );
  }
  return encontrado;
}

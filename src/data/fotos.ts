import type { ImageMetadata } from 'astro';

/**
 * Mapa nombre -> imagen optimizable por astro:assets.
 * Permite que src/data/contenido.ts referencie fotos por string
 * sin tener que importar cada archivo a mano.
 */
const modulos = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/fotos/*.jpg',
  { eager: true }
);

export const fotos: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(modulos).map(([ruta, mod]) => [
    ruta.split('/').pop()!.replace('.jpg', ''),
    mod.default,
  ])
);

export function foto(nombre: string): ImageMetadata {
  const encontrada = fotos[nombre];
  if (!encontrada) {
    throw new Error(
      `Falta la foto "${nombre}" en src/assets/fotos. Corré: npm run assets`
    );
  }
  return encontrada;
}

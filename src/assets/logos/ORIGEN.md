# Procedencia de los logos

Todos los logos se bajaron **del sitio oficial de cada obra social**, no de Google
Imágenes ni de bancos de logos: esas fuentes suelen tener versiones viejas, con marca de agua
o directamente de otra entidad con siglas parecidas.

Cada archivo se verificó a ojo antes de entrar al repo. Descargados el **26-08-2026**.

| Archivo             | Obra social   | Origen                                                                              |
| ------------------- | ------------- | ----------------------------------------------------------------------------------- |
| `osde.png`          | OSDE          | `osde.com.ar/hubfs/Logo OSDE.svg`                                                    |
| `swiss-medical.png` | Swiss Medical | `swissmedical.com.ar/prepagaclientes/assets/images/logo-smmp-color-new.svg`           |
| `galeno.png`        | Galeno        | `galeno.com.ar` — capturado del DOM renderizado (el sitio arma el logo con JS)        |
| `medicus.png`       | Medicus       | `medicus.com.ar` — capturado del DOM renderizado                                     |
| `medife.png`        | Medifé        | `medife.com.ar/themes/custom/medifetema/images/logo-nh.svg`                           |
| `sancor-salud.png`  | Sancor Salud  | `sancorsalud.com.ar` — capturado del DOM renderizado                                 |
| `avalian.png`       | Avalian       | `avalian.com/assets/images/logo-avalian-footer-vertical.png`                          |
| `pami.png`          | PAMI          | `pami.org.ar/imagenes/logo_pami_azul.svg`                                             |
| `iosfa.png`         | IOSFA         | `iosfa.gob.ar/img/logo.svg`                                                           |
| `osdepym.png`       | OSDEPYM       | `osdepym.com.ar` — capturado del DOM renderizado                                     |
| `ospedyc.png`       | OSPEDYC       | `ospedyc.org.ar` — capturado del DOM renderizado                                     |
| `osmata.png`        | OSMATA        | `osmata.com.ar/wp-content/uploads/2022/01/LOGO-SMATA.png` — **ver nota**              |
| `osuthgra.png`      | OSUTHGRA      | `osuthgra.org.ar/wp-content/uploads/2022/09/logoosu-328x56.png`                        |

**Nota sobre OSMATA:** el archivo dice **SMATA**, que es el sindicato, no la obra social. Es el
logo que la propia OSMATA usa en el header de su sitio, así que es defendible, pero conviene que
el cliente lo confirme.

## Procesado

`_work/logos/normalizar.mjs` recorta el fondo, escala a `contain` dentro de 520×180 px y exporta
PNG con transparencia. El peso óptico se empareja a mano con el campo `escala`: un logotipo ancho
y fino (OSDE) y uno casi cuadrado (Avalian) no pueden compartir la misma caja a ciegas. Los que se
capturan del DOM traen el fondo plano de la página pegado, y se lo saca con
`_work/logos/limpiar-fondo.mjs`.

Nada de esto corre en el build: los PNG ya procesados entran al repo y Astro los convierte a WebP.

## Sin logo (6)

Estas se muestran con el nombre en texto, en la misma celda y con el mismo peso:

- **Poder Judicial** — es de Santa Cruz; no tiene un logo web usable. (La **Caja de Servicios
  Sociales**, en la misma situación, se sacó del listado a pedido del cliente el 12-sep-2026.)
- **OSPE**, **OSPTV**, **OSPSA** y **Dasuten** — la sigla la comparten varias obras sociales
  distintas (OSPE puede ser la de petroleros, OSPEGAP, OSPECOR...). **No se adivinó ninguna**:
  poner el logo de otra entidad en el sitio de un centro de salud es peor que dejar el texto.

Para agregarlas: que el cliente confirme cuál es cada una, bajar el logo del sitio oficial,
pasarlo por `normalizar.mjs` y sumar `logo: 'slug'` en `src/data/contenido.ts`.

# PhysioMove — Centro Deportivo Especializado

Sitio institucional de **PhysioMove**, centro de kinesiología deportiva en Santiago del Estero 80,
Río Gallegos, Santa Cruz.

Sitio estático multipágina hecho con **Astro 5** + **GSAP 3.15**. Sin CMS, sin backend, sin
servicios de terceros más allá del mapa embebido de Google. Navegación tradicional (una carga de
página por navegación), así que no hay `<ClientRouter />` ni ciclo de vida de view transitions que
mantener.

---

## Correrlo en local

```bash
npm install
npm run dev        # http://localhost:4321
```

## Buildear

```bash
npm run build      # genera dist/
npm run preview    # sirve dist/ en http://localhost:4321
node scripts/verificar.mjs   # chequea dist/: links, assets, alts, titles, canonicals
```

El build es 100% estático: `dist/` se sube tal cual a cualquier hosting (Vercel, Cloudflare Pages,
Netlify o un FTP). Sin variables de entorno obligatorias.

### Dominio

El dominio definitivo todavía no está confirmado. `astro.config.mjs` usa
`https://physiomove.com.ar` por defecto, y de ahí salen el `canonical`, el `og:url` y el
`sitemap`. **Antes de publicar hay que confirmarlo**, y si es otro alcanza con:

```bash
SITE_URL=https://eldominioreal.com.ar npm run build
```

---

## Cómo está organizado

```
src/
  data/contenido.ts     ← ÚNICA fuente de textos. Todo sale del docx del cliente.
  data/fotos.ts         ← mapa nombre → imagen, para referenciar fotos por string
  assets/fotos/         ← fotos del centro ya optimizadas (1800 px máx, JPEG 82)
  assets/marca/logo.png ← logo recortado desde el original del cliente
  components/           ← Cabecera, PieDePagina, Preloader, Deco, Cierre, Retrato
  layouts/Base.astro    ← head, SEO, JSON-LD, preloader, header, footer, WhatsApp
  scripts/animaciones.js← toda la capa GSAP
  styles/global.css     ← sistema de diseño completo (una sola hoja)
  pages/                ← index, servicios/, servicios/[slug], equipo, obras-sociales,
                          contacto, 404
scripts/
  preparar-imagenes.mjs ← material original → src/assets (ver más abajo)
  verificar.mjs         ← chequeos sobre dist/
```

**Para cambiar un texto se toca `src/data/contenido.ts`, no las páginas.**

### Paleta

Sacada con un script de los archivos reales del logo (`material-drive/logo/`), no a ojo:

| Token             | Hex       | De dónde sale                       |
| ----------------- | --------- | ----------------------------------- |
| `--navy`          | `#0D4668` | azul petróleo del logo (14 % del PNG) |
| `--profundo`      | `#002B4A` | navy del banner de marca             |
| `--acero`         | `#96B9CF` | anillo interior del logo             |
| `--acero-texto`   | `#3F6C88` | versión oscura para texto chico (AA) |
| `--crema`         | `#EDE4D3` | círculo del logo (72 % del PNG)      |

Tipografía: **Oswald** para títulos (mayúsculas, condensada, como en Instagram) y **Geist** para
el cuerpo. Geist en vez de Inter a propósito: Inter es la fuente por defecto de casi todo sitio
generado con IA y se nota. Si hay que volver atrás es una línea en `global.css` (`--cuerpo`) y
otra en el `<link>` de `Base.astro`.

### Imágenes

Las fotos originales del cliente son HEIC de hasta 5712 px y no entran al repo. El pipeline es:

1. HEIC → JPG con ffmpeg (`ffmpeg -i foto.HEIC -frames:v 1 foto.jpg`), a `_work/full/`.
2. `npm run assets` (`scripts/preparar-imagenes.mjs`) redimensiona a 1800 px, comprime y las deja
   con nombre semántico en `src/assets/fotos/`. También genera favicons y el `og:image`.
3. Astro genera en el build las variantes AVIF + WebP + JPEG de respaldo, con `srcset` y `sizes`.

`material-drive/` y `_work/` están en `.gitignore`: el repo lleva el sitio, no los 257 MB de
material fuente.

### Logos de las obras sociales

13 de las 19 coberturas se muestran con el logo oficial, bajado **del sitio de cada obra social**
(no de Google Imágenes) y verificado uno por uno. La URL exacta de cada uno está en
**`src/assets/logos/ORIGEN.md`**, junto con el detalle de las 6 que quedan en texto y por qué.

Los sitios que arman el logo con JavaScript (Galeno, Medicus, Sancor, OSDEPYM, OSPEDYC) no lo
dejan en el HTML: esos se capturan del DOM ya renderizado con `scripts/capturar.mjs`.

---

## Animación

GSAP 3.15 con los plugins oficiales (gratuitos desde 3.13). Todo vive en
`src/scripts/animaciones.js`:

- **ScrollTrigger** — reveals, staggers y parallax de las formas decorativas.
- **SplitText** — título del hero y titulares de sección, por líneas con máscara.
- **ScrambleText** — sólo en los números del hero, una vez.
- **DrawSVG** — las curvas de fondo se dibujan con el scroll; el anillo del preloader también.
- **MotionPath** — un punto recorre la curva de la sección "La sede", atado al scroll.
- **Pin lateral** — el panel de servicios queda fijo con índice activo y barra de progreso.
- **Galería horizontal** — sección pineada con scroll horizontal; en mobile degrada a carrusel
  táctil con `scroll-snap`.
- **Parallax de fondo** — los círculos y las curvas de cada sección se mueven a distinta
  velocidad que el contenido, igual que la foto de la banda de cierre.

El flip de las obras sociales es CSS puro (`rotateX` sobre `preserve-3d`), no GSAP.

Con `prefers-reduced-motion: reduce` no hay preloader, ni scrambles, ni pins, ni motion path, ni
flip.

### Preloader

Espera de verdad: `document.fonts.ready` + la imagen del hero + `window load`, con techo de 3,8 s.
Se muestra **sólo en la primera carga** de la sesión (`sessionStorage`).

Dos redes de seguridad, porque un overlay colgado deja la página inutilizable:

1. El script inline del `<head>` lo saca a los 4,5 s pase lo que pase.
2. El CSS lo tiene **oculto por defecto**; sólo lo muestra la clase que pone ese script. Sin JS no
   aparece nunca.

---

## Contenido pendiente del cliente

El documento fuente tiene campos vacíos o con el placeholder de la plantilla. **Eso no se
inventó: se omitió.** Lo que falta para completar el sitio:

| Qué                              | Estado                                                                                                            |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Fotos de los profesionales**   | Hay 6 retratos en `imagenes-profesionales/` pero con nombres tipo `IMG_5903.HEIC`: no se sabe quién es quién. Se usa el monograma sobre la paleta de marca. Cuando lleguen identificadas, se le pasa `foto` a `<Retrato>`. |
| **Sección de videos**            | Punto 6 del documento sin definir. No se construyó; queda el comentario en `PieDePagina.astro`.                     |
| **Convenios y alianzas**         | Catexis y Play Inside Basketball Camp figuran sin descripción ni logos. No se construyó.                            |
| **Ficha de Graciela Sanchez**    | Sin experiencia, Instagram ni bio. Se muestra con título, matrícula, especialidad y formación.                       |
| **Ficha de Lucía Fernandez**     | Sólo nombre y título. Aparece en la grilla del equipo, sin ficha extendida.                                          |
| **Aparatología de Kinesiología Deportiva** | Campo vacío en el documento.                                                                              |
| **Quién atiende** (servicios 3, 4 y 5) | Campos vacíos.                                                                                                |
| **Facebook, TikTok y YouTube**   | En el documento estaba el texto de ejemplo de la plantilla, no cuentas reales. Sólo se publica Instagram.            |
| **Logos de 6 obras sociales**    | OSPE, OSPTV, OSPSA y Dasuten son siglas que comparten varias entidades distintas; Caja de Servicios Sociales y Poder Judicial son de Santa Cruz y no tienen logo web usable. Se muestran en texto. Detalle en `src/assets/logos/ORIGEN.md`. |
| **Logo de OSMATA**               | El archivo del sitio oficial dice SMATA (el sindicato), no OSMATA. Conviene que el cliente lo confirme.              |
| **Dominio**                      | A confirmar (ver arriba).                                                                                           |

---

## Decisiones de diseño (anti-genérico)

Repasado contra las reglas de "AI tells". Lo que se corrigió:

- **La foto manda, sin marcos.** El hero sangra arriba, a la derecha y abajo del viewport, y las
  cabeceras de las páginas internas sangran a la derecha. Antes las fotos iban dentro de un arco de
  medio punto: leía como spa, no como centro deportivo, y encajonaba la imagen. Ojo con volver a
  poner `style="margin:0"` en esas `<figure>`: pisa el margen negativo que produce el sangrado (el
  reset global ya les saca el margen).
- **Nada de cards repetidas.** Los seis servicios son una lista con hairlines y ritmo alternado
  (la foto cambia de lado y de proporción en pares e impares). En `/servicios`, además, el primero
  y el último ocupan el ancho completo y el resto va en dos columnas.
- **Cajas sólo donde la elevación significa algo.** El equipo y los bloques de aranceles no llevan
  borde: se separan con espacio y una línea. La única card real es la de "Particulares".
- **"Otros servicios"** dejó de ser tres cards iguales en fila; ahora es una lista con separadores.
- **Íconos reales.** El de WhatsApp es el path oficial de Simple Icons, no uno dibujado a ojo.
- **Sin animar propiedades de layout.** El subrayado del nav va por `transform: scaleX` y la flecha
  de los enlaces por `translateX`, no por `right` ni `gap`.
- **Feedback táctil** en `:active` (antes no había ninguno).
- **`dvh` además de `vh`** en las alturas, por la barra de direcciones de iOS.
- Sin negro puro, sin glows, sin gradientes de texto, sin cursor custom, sin emojis, un solo
  acento, y todos los datos son reales.

Dos reglas del checklist se dejaron de lado **a propósito**, porque contradicen el pedido del
cliente:

- **Título del hero grande.** El brief pedía "que impacte al abrir" y contraste fuerte de tamaños.
- **Nada en loop infinito.** El brief lo prohíbe explícitamente y para un centro de salud está
  bien: no hay pulsos, shimmers ni carruseles automáticos.

## Qué verificar antes de publicar

```bash
npm run build && node scripts/verificar.mjs
```

Confirmar con el cliente: dominio, y que el valor de $19.500 por sesión siga vigente
(está en `src/data/contenido.ts` → `aranceles.particulares`).

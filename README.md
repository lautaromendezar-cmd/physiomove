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
| `--profundo`      | `#00131F` | navy del banner (`#002B4A`) bajado a casi negro |
| `--acero`         | `#96B9CF` | anillo interior del logo             |
| `--acero-texto`   | `#3F6C88` | versión oscura para texto chico (AA) |
| `--crema`         | `#EDE4D3` | círculo del logo (72 % del PNG)      |

**Todas las superficies oscuras salen de `--profundo`** y son un solo tono: hero, la sección de
razonamiento, la galería, la banda de cierre, el pie y el preloader. El pie tenía su propio
`#001d33` hardcodeado; ya no. Se bajó de `#002B4A` a `#00131F` para que las fotos sean la fuente
de luz de esas secciones.

Si se vuelve a tocar ese valor hay que acordarse de tres degradados que funden **hacia** él y que
por eso usan `--profundo-canales` (los canales sueltos, porque `rgb()` no acepta un hex con alfa):
el velo de la banda del hero, su versión de mobile y el velo de la banda de cierre. Ese último va
sobre una foto: bajar el token sin bajarle la opacidad tapa la imagen por completo.

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

#### Si clonás en otra máquina

El material original **no está en el repo**. Con sólo clonar podés hacer todo salvo tocar las
imágenes:

| Se puede | No se puede sin `material-drive/` |
| --- | --- |
| `npm install`, `dev`, `build`, `preview` | `npm run assets` (necesita `_work/full`) |
| Editar textos, estilos, animaciones, páginas | Recortar o regenerar una foto |
| Cambiar qué foto usa cada sección, entre las 18 que ya están en `src/assets/fotos` | Sumar una foto nueva del centro |
| Agregar el logo de una obra social nueva (se baja de su sitio, ver `ORIGEN.md`) | — |

Para volver a tener el pipeline completo hay que copiar la carpeta `material-drive/` (el `.docx`,
`imagenes-centro/`, `imagenes-profesionales/` y `logo/`) y convertir los HEIC a
`_work/full/*.jpg` con ffmpeg, como se explica arriba.

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
- **Conteo** — los números del hero cuentan de cero a su valor real (`data-conteo`), una vez.
- **DrawSVG** — las curvas de fondo se dibujan con el scroll; el anillo del preloader también.
- **MotionPath** — un punto recorre la curva de la sección "La sede", atado al scroll.
- **Pin lateral** — el panel de servicios queda fijo con índice activo y barra de progreso.
- **Galería horizontal** — sección pineada con scroll horizontal; en mobile degrada a carrusel
  táctil con `scroll-snap`.
- **Parallax de fondo** — los círculos y las curvas de cada sección se mueven a distinta
  velocidad que el contenido, igual que la foto de la banda de cierre.

El flip de las obras sociales es CSS puro (`rotateX` sobre `preserve-3d`), no GSAP.

Con `prefers-reduced-motion: reduce` no hay preloader, ni conteos, ni pins, ni motion path, ni
flip.

### Preloader

Espera de verdad: `document.fonts.ready` + la imagen del hero + `window load`, con techo de 3,8 s.
Se muestra **sólo en la primera carga** de la sesión (`sessionStorage`).

Dos redes de seguridad, porque un overlay colgado deja la página inutilizable:

1. El script inline del `<head>` lo saca a los 4,5 s pase lo que pase.
2. El CSS lo tiene **oculto por defecto**; sólo lo muestra la clase que pone ese script. Sin JS no
   aparece nunca.

---

## Fotos: marco, formas y parallax

Tres piezas que se combinan, todas en `global.css`:

- **`--radio-foto` (6 px)** es el redondeo de **todas** las fotos del sitio. El `--radio` de 2 px se
  queda para botones y cajas: sobre una imagen no se ve. Única excepción, las cabeceras de las
  páginas internas, que sangran contra el borde derecho del viewport: sólo se redondean las
  esquinas de la izquierda, y en mobile —donde sangran de los dos lados— ninguna.
- **`.marco-foto`** va en el `<picture>` (por `pictureAttributes`) y es el que enmascara. **La
  relación de aspecto se declara en el marco, no en la `<img>`**, porque la imagen pasa a ser más
  alta que su marco: 118 % con `top: -9%`. Ese sobrante es de donde se corre el parallax.
- **`.foto-formas`** dibuja las dos formas desfasadas del fondo con `::before` (acero, arriba a la
  izquierda) y `::after` (crema oscurecida, abajo a la derecha). `--simple` deja sólo la primera.
  Sobre `.oscuro` la primera pasa a navy.

Dos cosas que ya mordieron:

1. **El recorrido del parallax tiene que entrar en el sobrante.** El script mueve la imagen ±3 % de
   **su propia altura**; el sobrante es 9 % del marco por lado. Se verifica barriendo **todo** el
   scroll, no en un punto suelto: el peor caso está en los extremos del recorrido, y midiendo en
   el medio daba holgura de sobra cuando en realidad se pasaba.
2. **Un `border` en el marco se come ese sobrante.** La foto chica de la sección oscura lo tenía y
   quedaba en 1,3 px en desktop y en −1,3 px en mobile, o sea dejando ver el fondo. Va `outline`,
   que dibuja por fuera y no ocupa caja.

La crema tal cual (`#EDE4D3`) sobre el hueso de las secciones (`#F7F3EC`) no se ve: es la misma
sombra. La forma se oscurece **hacia el negro y no hacia el navy** — mezclada con navy vira a gris
verdoso y ensucia.

### Retratos del equipo

Los archivos del cliente (`IMG_4406.HEIC`, `IMG_5903.HEIC`…) **no traen metadata que permita saber
quién es quién**. Los identificó él, por el **orden de la carpeta del Drive ordenada por nombre**:
la lista que pasó es de izquierda a derecha. Ese mapa vive en `scripts/preparar-imagenes.mjs`
(`RETRATOS_MAP`) y es la única fuente de la identificación — si alguna vez se reordena la carpeta,
el mapa sigue siendo válido porque guarda el nombre de archivo, no la posición.

Como control cruzado, el género de las seis fotos coincide con el de los seis nombres en ese orden.

Vienen de cuerpo entero y descentradas, así que cada una lleva **su recorte a mano** al 4:5 de las
fichas (`cx`, `arriba`, `alto`, en fracciones de la original). El recorte automático de sharp
(`strategy.attention`) no sirve acá: las fotos ya son 3:4, así que recorta apenas los costados y
deja a la persona igual de chica.

Los retratos van en `src/assets/retratos/` y **no** en `src/assets/fotos/`: el glob de `fotos.ts` es
eager y se llevaría al build cualquier retrato que todavía no use nadie.

## Contenido pendiente del cliente

El documento fuente tiene campos vacíos o con el placeholder de la plantilla. **Eso no se
inventó: se omitió.** Lo que falta para completar el sitio:

| Qué                              | Estado                                                                                                            |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Ficha de Nicolás Ovando**      | Está en la grilla del equipo con retrato (2-sep) y como "Profe." en el servicio infanto-juvenil, pero no hay título, especialidad ni bio: la ficha extendida no se emite ni se inventa. |
| **Sección de videos**            | Punto 6 del documento sin definir. No se construyó; queda el comentario en `PieDePagina.astro`.                     |
| **Convenios y alianzas**         | Catexis y Play Inside Basketball Camp figuran sin descripción ni logos. No se construyó.                            |
| **Ficha de Graciela Sanchez**    | Sin experiencia, Instagram ni bio. Se muestra con título, matrícula, especialidad y formación.                       |
| **Ficha de Lucía Fernandez**     | Sólo nombre y título. Aparece en la grilla del equipo, sin ficha extendida.                                          |
| **Foto del equipo completo**     | El PDF del 12-sep pide que la foto de cabecera de `/equipo` muestre a **todos** los profesionales, incluidos Nico y Lucía. No existe ninguna así en el material: sigue la de tres hasta que el cliente la mande. |
| **Quién atiende**                | El PDF sólo lo dice para kinesiología (todo el staff) e infanto-juvenil (Nico). Los otros siete servicios no lo tienen; nutrición se supone de Lucía, pero no está confirmado. |
| **Facebook, TikTok y YouTube**   | En el documento estaba el texto de ejemplo de la plantilla, no cuentas reales. Sólo se publica Instagram.            |
| **Logos de 5 obras sociales**    | OSPE, OSPTV, OSPSA y Dasuten son siglas que comparten varias entidades distintas; Poder Judicial es de Santa Cruz y no tiene logo web usable. Se muestran en texto. Detalle en `src/assets/logos/ORIGEN.md`. |
| **Logo de OSMATA**               | El archivo del sitio oficial dice SMATA (el sindicato), no OSMATA. Conviene que el cliente lo confirme.              |
| **Dominio**                      | A confirmar (ver arriba).                                                                                           |
| **Foto del salto en la banda**   | `evaluacion-plataforma` es la más floja de las siete del hero: el original ya viene con la cabeza fuera de cuadro. Sirve, pero es la primera a reemplazar cuando el cliente mande fotos nuevas. |

---

## Textos del 12-sep-2026 (PDF del cliente)

El cliente mandó **"PhysioMove — Textos web actualizados"**, una versión consolidada que
reescribe casi todo el sitio. El PDF queda en `modificaciones-12-09-2026/` (gitignoreado: es
material fuente). Lo que cambió y cómo se mapeó cada punto del documento:

| Punto del PDF | Dónde vive en el sitio |
| --- | --- |
| 01 Cómo nació | Sección de origen de la home (`centro.origen`, ahora dos párrafos: se suma Agustín a fines de 2023). |
| 02 ¿Qué nos diferencia? | Sección oscura de la home: título "Una mirada integral, basada en evidencia", `centro.diferencial`, claves `pacientes` y `postura`. |
| 03 Servicios | Pasan de 6 a **9**: se suman Readaptación, Nutrición y Ejercicio físico adaptado; "Fisioterapia invasiva MEP" pasa a "Técnicas complementarias". |
| 04 Nuestra forma de trabajar | Cabecera de `/servicios` (`centro.formaDeTrabajar` + `centro.lema`). |
| 05 Evaluaciones deportivas y 06 Tecnología IVOLUTION | Bloques de la página `/servicios/evaluaciones-deportivas`. El PDF pide ahí una foto real de la sede con IVOLUTION: se usó la del deportista sobre la plataforma con la kinesióloga en la laptop (`evaluacion-ivolution`). |
| 07 El centro | Cabecera de la galería de la home (`centro.espacio`). |
| 08 Quiénes te atienden | Home (texto nuevo entre el título y la grilla) y cabecera de `/equipo` (`centro.equipo`, `centro.areas`). |
| 09 Obras sociales | Se saca la Caja de Servicios Sociales (quedan 18). |
| Cierre | Banda final de la home: "Evaluar. Planificar. Acompañar." (`centro.lema`, `centro.cierre`). |
| Nombres | Se quitan los segundos nombres: Marcos Anaquín, Sofía Anaquín, Agustín Guiguet. |

Decisiones que no están en el PDF:

- **Las páginas de servicio muestran el texto del PDF y nada más de prosa.** Los bloques
  "Qué es / Para quién sirve / Por qué" de agosto tenían otro tono y el PDF los reemplaza. Quedó
  sólo la información práctica que no contradice (cómo es una sesión, clases y horarios).
  Si hace falta recuperar alguno, están en el historial (`git show 9f9ed8c:src/data/contenido.ts`).
- **Cinco slugs cambiaron con el nombre** y las URL viejas redirigen desde `vercel.json`.
  El de infanto-juvenil se mantuvo para no encadenar dos redirecciones.
- **Fotos de los servicios nuevos**, elegidas del material ya optimizado: readaptación usa
  `hero-entrenamiento` (sentadilla con banda), ejercicio adaptado `IMG_2060` (movilidad guiada)
  y nutrición `IMG_5922`, que es la foto de Lucía, la nutricionista.
- En la clave "Nuestra forma de trabajar" el PDF trae una línea ("Se cree en el movimiento como
  herramienta para transformar") que está en el texto pero **no se ve en la página**: se omitió.

### Publicar

Desde el 7-sep-2026 el push a `main` **no** dispara el deploy (la integración con GitHub quedó
rota por un problema de la cuenta). Se publica con el CLI de Vercel desde la carpeta del proyecto:

```bash
npm run build && node scripts/verificar.mjs
npx vercel            # preview, para revisar
npx vercel --prod     # producción (physiomove-tau.vercel.app)
```

En una máquina nueva hace falta `npx vercel link` una vez (proyecto `physiomove`); deja
`.vercel/` y un `.env.local`, los dos ignorados.

---
## Decisiones de diseño (anti-genérico)

Repasado contra las reglas de "AI tells". Lo que se corrigió:

- **El hero entra en una pantalla.** Mide `100dvh` menos el header y todo lo que va adentro
  escala también con el **alto** del viewport (`min(vw, dvh)`), no sólo con el ancho: con `clamp()`
  sobre `vw` el título se clavaba en su máximo y los stats terminaban fuera de la primera pantalla.
  Verificado de 1920×1080 a 1024×640.
- **El hero es una banda de fotos verticales, no una foto sola.** 16 de las 18 fotos del cliente
  son 3:4. Una imagen a ancho completo obligaba a inventar con IA más de la mitad de una **sede
  real** (y a reescribir el cartel pintado en la pared): se descartó. La banda consigue el ancho
  completo sin tocar ninguna foto — el ancho lo da la tira, no cada imagen. Detalle en
  "La banda del hero", más abajo.
- **La foto manda, sin marcos.** Las cabeceras de las páginas internas sangran a la derecha. Antes
  las fotos iban dentro de un arco de medio punto: leía como spa, no como centro deportivo, y
  encajonaba la imagen. Ojo con volver a poner `style="margin:0"` en esas `<figure>`: pisa el
  margen negativo que produce el sangrado (el reset global ya les saca el margen).
- **Nada de cards repetidas.** Los nueve servicios son una lista con hairlines y ritmo alternado
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

## La banda del hero

Siete fotos verticales a sangre en el piso del hero, sobre navy. Las siete salen de
`bandaHero` en `src/data/contenido.ts`, con su giro, su desfasaje y su velocidad de parallax.

**Se eligieron por contraste de contenido, no por calidad:** recepción, tratamiento manual,
evaluación con tecnología, entrenamiento, método, recovery y chicos. Las 18 fotos del centro
comparten pared, pasto verde y pista azul; en tarjetas de 200 px, siete del mismo tipo leen como
una sola repetida.

Cuatro cosas que parecen detalles y no lo son:

1. **Capas separadas por dueño.** El `<li>` lleva el giro y el desfasaje en su `transform` de CSS;
   el `.hero__marco` es de la entrada; el `<picture>`, del parallax; el `<img>`, del filtro del
   hover. Si GSAP toca el `transform` del `<li>` lo reescribe entero y se pierde el giro: lo lee
   del matrix computado, en px, no como está declarado. Por eso el hover anima las **variables**
   `--sube` y `--esc`, no `y` ni `scale`.
2. **El velo es de cada foto, no de la banda.** Cuando vivía en la banda, la tarjeta que sube en
   el hover se salía de esa caja y aparecía su borde de arriba sin fundir, con la foto cruda. En la
   tarjeta viaja con ella y además queda parejo entre las siete, que arrancan a distinta altura por
   su `--baja`. Por lo mismo cada tarjeta mide **44 px más que la banda**: así todas cuelgan por
   debajo del piso del hero y la de `--baja: 0`, que apoyaba justo en el borde, no despega al subir.
3. **La tira va en `position: absolute` dentro de la banda.** La banda es un item de flex, así que
   su alto no cuenta como "definido" y un `height: 100%` adentro cae a `auto`. Con las tarjetas
   midiéndose por `aspect-ratio` sobre ese alto, el cálculo se cierra en cero y **las fotos
   desaparecen**. El `inset: 0` le da un alto concreto. Por lo mismo la tira **no** puede llevar
   `width: max-content`: el sangrado lo produce `justify-content: center`.
4. **El alto de la tarjeta sale del espacio que sobra**, no de `vw` ni de `dvh`. Atado a `vw`, a
   1280×720 la banda subía y se comía la fila de stats (medido: −8 px de holgura, texto ilegible
   sobre una foto clara). Con la banda quedándose el resto del flex, la holgura queda entre 46 y
   71 px de 1920×1080 a 1024×640.

El hero **no lleva curvas**: con siete fotos abajo, las líneas cruzaban las letras del título y
competían con las imágenes. El resto del sitio las conserva (variantes `suave`, `oscura`, `sede`
y `cierre` del `Deco`).

Medido con Chrome, no a ojo: holgura stats/fotos y sangrado en 7 viewports, contraste AA de los
seis textos del hero sobre el fondo, y que ni con `prefers-reduced-motion` ni sin JavaScript quede
una foto invisible. El texto de la banda de cierre, que sí va sobre una foto, se mide sobre los
**píxeles renderizados**, capturando con el texto en `transparent`: si no, el muestreo lee las
propias letras blancas como fondo y todo da 1:1.

## Qué verificar antes de publicar

```bash
npm run build && node scripts/verificar.mjs
```

Confirmar con el cliente: dominio, y que el valor de $19.500 por sesión siga vigente
(está en `src/data/contenido.ts` → `aranceles.particulares`).

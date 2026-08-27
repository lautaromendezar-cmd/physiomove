/* =========================================================================
   PHYSIOMOVE — capa de animacion
   GSAP 3.15 con los plugins oficiales (gratuitos desde 3.13):
   ScrollTrigger · SplitText · ScrambleText · DrawSVG · MotionPath
   Reglas: nada en loop, duraciones cortas, y con prefers-reduced-motion
   se desactivan scrambles, pins y motion paths (quedan fades simples).
   ========================================================================= */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  ScrambleTextPlugin,
  DrawSVGPlugin,
  MotionPathPlugin
);

const raiz = document.documentElement;
const q = (sel, ctx = document) => ctx.querySelector(sel);
const qa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- preloader */

function esperarCriticos() {
  const pendientes = [];

  if (document.fonts && document.fonts.ready) pendientes.push(document.fonts.ready);

  const hero = q('[data-hero-img]');
  if (hero) {
    pendientes.push(
      hero.complete && hero.naturalWidth
        ? Promise.resolve()
        : new Promise((listo) => {
            hero.addEventListener('load', listo, { once: true });
            hero.addEventListener('error', listo, { once: true });
          })
    );
  }

  pendientes.push(
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((listo) => window.addEventListener('load', listo, { once: true }))
  );

  // Techo de seguridad: nunca esperar mas de 3,8 s.
  return Promise.race([
    Promise.all(pendientes),
    new Promise((listo) => setTimeout(listo, 3800)),
  ]);
}

function cerrarPreloader(pre, alTerminar) {
  const barra = q('[data-pre-barra]', pre);
  const num = q('[data-pre-num]', pre);

  // La entrada del hero se arma ahora (asi fija su estado inicial mientras el
  // overlay todavia tapa todo) y se encadena al wipe: una sola linea de tiempo.
  // Ojo: no se pausa. Un hijo pausado agregado a un timeline padre NUNCA corre,
  // y con el se cuelga el onComplete que dispara el resto del sitio.
  const hero = entradaHero();

  const salida = gsap.timeline({
    onComplete: () => {
      raiz.classList.remove('pm-cargando');
      raiz.classList.add('pm-visto');
      pre.remove();
      ScrollTrigger.refresh();
      alTerminar();
    },
  });

  salida
    .to(barra, {
      scaleX: 1,
      duration: 0.45,
      ease: 'power2.inOut',
      onStart: () => (num.textContent = '100%'),
    })
    .to([barra.parentElement, num], { opacity: 0, duration: 0.25 }, '+=0.1')
    .to(q('.pm-pre__marca', pre), { y: -20, opacity: 0, duration: 0.4, ease: 'power2.in' }, '<')
    .to(pre, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, '-=0.15')
    .add(hero, '-=0.42');

  return salida;
}

function correrPreloader(alTerminar) {
  const pre = q('[data-pre]');
  if (!pre || raiz.classList.contains('pm-visto')) {
    // Visita repetida o motion reducido: no hay pantalla de carga, pero igual
    // hay que esperar las fuentes antes de partir titulos en lineas.
    raiz.classList.remove('pm-cargando');
    if (pre) pre.remove();
    const fuentes =
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fuentes, new Promise((listo) => setTimeout(listo, 1500))]).then(() => {
      entradaHero();
      alTerminar();
    });
    return;
  }

  const barra = q('[data-pre-barra]', pre);
  const num = q('[data-pre-num]', pre);
  const anillos = qa('[data-anillo], [data-anillo-int]', pre);
  const logo = q('[data-pre-logo]', pre);

  gsap
    .timeline()
    .fromTo(
      anillos,
      { drawSVG: '0% 0%' },
      { drawSVG: '0% 100%', duration: 1.1, ease: 'power2.inOut', stagger: 0.12 }
    )
    .fromTo(logo, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.65');

  // Barra: avanza hasta 90% mientras se esperan los assets.
  const avance = { v: 0 };
  const contador = gsap.to(avance, {
    v: 90,
    duration: 3.2,
    ease: 'power1.out',
    onUpdate: () => {
      gsap.set(barra, { scaleX: avance.v / 100 });
      num.textContent = Math.round(avance.v) + '%';
    },
  });

  esperarCriticos().then(() => {
    contador.kill();
    cerrarPreloader(pre, alTerminar);
  });
}

/* ------------------------------------------------------------------- textos */

function entradaHero() {
  const titulo = q('[data-hero-titulo]');
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (reducido) {
    qa('[data-scramble]').forEach((el) => (el.textContent = el.dataset.scramble));
    return tl;
  }

  if (titulo && !reducido) {
    const partido = SplitText.create(titulo, { type: 'lines', mask: 'lines' });
    tl.from(partido.lines, { yPercent: 115, duration: 0.9, stagger: 0.09 });
  } else if (titulo) {
    tl.from(titulo, { opacity: 0, duration: 0.5 });
  }

  tl.from('[data-hero-anima]', { y: 26, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.55');

  // Cabecera de las paginas internas (contacto, equipo, ficha de servicio).
  // La home ya no tiene figura: entra por la banda de fotos, mas abajo.
  if (q('[data-hero-figura]')) {
    tl.from(
      '[data-hero-figura]',
      { opacity: 0, scale: 1.04, duration: 1, ease: 'power2.out' },
      '-=0.95'
    );
    if (q('[data-hero-sello]')) {
      tl.from('[data-hero-sello]', { opacity: 0, x: -18, duration: 0.5 }, '-=0.4');
    }
  }

  // Banda de fotos: suben desde abajo, del centro hacia afuera. Se anima el
  // .hero__marco y NO el <li>: el <li> lleva el giro y el desfasaje en su
  // transform del CSS, y GSAP lo reescribiria entero.
  const marcos = qa('[data-hero-marco]');
  if (marcos.length) {
    if (reducido) {
      tl.from('[data-hero-banda]', { opacity: 0, duration: 0.6 }, '-=0.5');
    } else {
      tl.from(
        marcos,
        {
          yPercent: 46,
          opacity: 0,
          duration: 1.15,
          ease: 'power3.out',
          stagger: { each: 0.075, from: 'center' },
        },
        '-=0.85'
      );
    }
  }

  // ScrambleText: unico lugar del sitio, y una sola vez.
  const stats = qa('[data-scramble]');
  if (stats.length && !reducido) {
    stats.forEach((el, i) => {
      const valor = el.dataset.scramble;
      tl.to(
        el,
        {
          duration: 0.9,
          scrambleText: { text: valor, chars: '0123456789', speed: 0.45, revealDelay: 0.15 },
        },
        i === 0 ? '-=0.35' : '<0.12'
      );
    });
  } else {
    stats.forEach((el) => (el.textContent = el.dataset.scramble));
  }

  return tl;
}

function titularesPorLinea() {
  qa('[data-lineas]').forEach((el) => {
    const partido = SplitText.create(el, { type: 'lines', mask: 'lines' });
    gsap.from(partido.lines, {
      yPercent: 110,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/* ------------------------------------------------------------------ reveals */

function reveals() {
  ScrollTrigger.batch('.rv', {
    start: 'top 88%',
    once: true,
    onEnter: (lote) =>
      gsap.to(lote, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: true,
      }),
  });
}

/* ------------------------------------------------------- formas decorativas */

function decorativas() {
  qa('.deco [data-draw]').forEach((linea) => {
    gsap.fromTo(
      linea,
      { drawSVG: '0%' },
      {
        drawSVG: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: linea.closest('.deco').parentElement,
          start: 'top 90%',
          end: 'bottom 40%',
          scrub: 0.8,
        },
      }
    );
  });

  // Parallax de las formas de fondo. Cada capa se mueve a distinta velocidad:
  // los circulos mas que las curvas, para que se lea profundidad y no un bloque.
  qa('.deco').forEach((deco) => {
    const seccion = deco.parentElement;
    if (!seccion) return;

    // En la primera pantalla el scroll arranca con la seccion ya encuadrada:
    // con 'top bottom' el recorrido util seria la mitad y no se notaria nada.
    const arriba = seccion.getBoundingClientRect().top + window.scrollY < 10;
    const st = {
      trigger: seccion,
      start: arriba ? 'top top' : 'top bottom',
      end: 'bottom top',
      scrub: 1,
      invalidateOnRefresh: true,
    };

    qa('.deco__blob', deco).forEach((blob, i) => {
      gsap.fromTo(
        blob,
        { yPercent: -14 - i * 4 },
        { yPercent: 20 + i * 6, ease: 'none', scrollTrigger: { ...st } }
      );
    });

    qa('svg', deco).forEach((svg) => {
      gsap.fromTo(
        svg,
        { yPercent: -6 },
        { yPercent: 9, ease: 'none', scrollTrigger: { ...st } }
      );
    });
  });

  // La foto de fondo del CTA se mueve al reves que la seccion.
  qa('[data-parallax-fondo]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -7 },
      {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  });
}

function viajeroPorLaCurva() {
  const ruta = q('[data-ruta]');
  const viajero = q('[data-viajero]');
  if (!ruta || !viajero) return;

  const seccion = ruta.closest('.deco').parentElement;
  gsap.set(viajero, { opacity: 0.9 });
  gsap.to(viajero, {
    ease: 'none',
    motionPath: { path: ruta, align: ruta, alignOrigin: [0.5, 0.5] },
    scrollTrigger: {
      trigger: seccion,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

/* --------------------------------------------------- servicios: panel fijo */

function panelServicios() {
  const seccion = q('[data-svc]');
  const panel = q('[data-svc-panel]');
  const lista = q('[data-svc-lista]');
  if (!seccion || !panel || !lista) return () => {};

  const barra = q('[data-svc-progreso]', seccion);
  const items = qa('[data-svc-indice] li', seccion);
  const cards = qa('[data-svc-card]', lista);

  const pin = ScrollTrigger.create({
    trigger: seccion,
    start: 'top 104px',
    end: () => '+=' + Math.max(0, lista.offsetHeight - panel.offsetHeight),
    pin: panel,
    pinSpacing: false,
    invalidateOnRefresh: true,
  });

  const progreso = ScrollTrigger.create({
    trigger: lista,
    start: 'top 70%',
    end: 'bottom 85%',
    onUpdate: (self) => barra && gsap.set(barra, { scaleX: self.progress }),
  });

  const activos = cards.map((card, i) =>
    ScrollTrigger.create({
      trigger: card,
      start: 'top 60%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) {
          items.forEach((li, j) => (li.dataset.activo = String(i === j)));
        }
      },
    })
  );

  return () => [pin, progreso, ...activos].forEach((st) => st.kill());
}

/* ------------------------------------------------- galeria horizontal (pin) */

function galeriaHorizontal() {
  const seccion = q('[data-galeria]');
  const pista = q('[data-galeria-pista]');
  if (!seccion || !pista) return () => {};

  const recorrido = () => Math.max(0, pista.scrollWidth - window.innerWidth + 32);

  const tween = gsap.to(pista, {
    x: () => -recorrido(),
    ease: 'none',
    scrollTrigger: {
      trigger: seccion,
      start: 'top top',
      end: () => '+=' + recorrido(),
      pin: true,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  return () => {
    tween.scrollTrigger && tween.scrollTrigger.kill();
    tween.kill();
    gsap.set(pista, { clearProps: 'x' });
  };
}

/* ----------------------------------------------------------- otros detalles */

function parallaxFotos() {
  qa('[data-parallax]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -3 },
      {
        yPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.marco-foto') || img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );
  });
}

/*
  Banda del hero: parallax por tarjeta. Va sobre el <picture>, que es 125% mas
  alto que la tarjeta justamente para tener de donde correrse. Cada una se mueve
  segun su --vel: si todas fueran a la misma velocidad la banda se desplazaria
  como un bloque solo y no se leeria la profundidad.
*/
function bandaHeroScroll() {
  const banda = q('[data-hero-banda]');
  if (!banda) return;

  qa('[data-hero-carta]', banda).forEach((li) => {
    const vel = parseFloat(getComputedStyle(li).getPropertyValue('--vel')) || 1;
    const pic = q('picture', li);
    if (!pic) return;
    gsap.fromTo(
      pic,
      { yPercent: 6 * vel },
      {
        yPercent: -6 * vel,
        ease: 'none',
        scrollTrigger: { trigger: banda, start: 'top bottom', end: 'bottom top', scrub: 1 },
      }
    );
  });
}

/*
  Hover: la que se mira sube y recupera color, las demas bajan saturacion y se
  apagan. El desplazamiento y la escala se animan como VARIABLES CSS (--sube,
  --esc) en vez de tocar el transform: asi el giro y el desfasaje de cada
  tarjeta, que viven en el CSS, siguen intactos.

  Solo con puntero fino: en tactil el hover queda pegado despues del toque.
*/
function bandaHeroHover() {
  const banda = q('[data-hero-banda]');
  if (!banda || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cartas = qa('[data-hero-carta]', banda);
  if (!cartas.length) return;

  const NORMAL = 'saturate(0.88) contrast(1.04) brightness(1)';
  const APAGADA = 'saturate(0.42) contrast(1.04) brightness(0.68)';

  const pintar = (activa) => {
    cartas.forEach((li) => {
      const esActiva = li === activa;
      gsap.to(li, {
        '--sube': activa ? (esActiva ? '-20px' : '10px') : '0px',
        '--esc': esActiva ? 1.045 : 1,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.to(q('img', li), {
        filter: activa && !esActiva ? APAGADA : NORMAL,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  };

  cartas.forEach((li) => li.addEventListener('mouseenter', () => pintar(li)));
  banda.addEventListener('mouseleave', () => pintar(null));
}

/* ------------------------------------------------------------------- arranque */

function arrancar() {
  reveals();

  if (reducido) {
    gsap.set('.rv', { opacity: 1, y: 0 });
    qa('[data-scramble]').forEach((el) => (el.textContent = el.dataset.scramble));
    qa('.deco [data-draw]').forEach((l) => gsap.set(l, { drawSVG: '100%' }));
    return;
  }

  titularesPorLinea();
  decorativas();
  viajeroPorLaCurva();
  parallaxFotos();
  bandaHeroScroll();
  bandaHeroHover();

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1001px)', () => {
    const limpiarPanel = panelServicios();
    const limpiarGaleria = galeriaHorizontal();
    return () => {
      limpiarPanel();
      limpiarGaleria();
    };
  });

  ScrollTrigger.refresh();
}

let arrancado = false;
function arrancarUnaVez() {
  if (arrancado) return;
  arrancado = true;
  arrancar();
}

correrPreloader(arrancarUnaVez);

// Red de seguridad: si algo de la linea de tiempo se cuelga, los reveals se
// activan igual y la pagina nunca queda en blanco.
setTimeout(arrancarUnaVez, 6000);

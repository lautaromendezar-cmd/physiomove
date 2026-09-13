/**
 * Única fuente de textos del sitio.
 * Base: material-drive/physiomove-material.docx (ago 2026).
 * 12/9/2026: el cliente mandó "PhysioMove — Textos web actualizados" (PDF),
 * una versión consolidada que reescribe casi todo y pasa de 6 a 9 servicios.
 * Los textos de acá son los de ese PDF, tal cual, salvo tildes evidentes.
 * Los campos que el cliente dejó vacíos NO se completan: se omiten.
 * Ver README.md > "Contenido pendiente".
 */

export const centro = {
  nombre: 'PHYSIOMOVE',
  bajada: 'Centro Deportivo Especializado',
  frase: 'Donde volvés al deporte',
  lema: 'Evaluar. Planificar. Acompañar.',
  apertura: 2023,
  /** Sección "Cómo nació PhysioMove" (home). */
  origen: [
    'PhysioMove nace de la idea de Marcos y Sofía, hermanos kinesiólogos de Río Gallegos graduados en la Universidad Nacional de Córdoba, enfocados en que la recuperación de una lesión debía darse a través del movimiento.',
    'A fines de 2023 se suma Agustín, también kinesiólogo graduado en la UNC, fortaleciendo un proyecto que continúa creciendo desde la Patagonia y ampliando su mirada sobre la rehabilitación, el entrenamiento y el deporte.',
  ],
  /*
    Sección "¿Qué nos diferencia?" (home), cabecera de /equipo y description
    del JSON-LD. Tercera version de este parrafo: el docx de agosto, el PDF del
    12/9 y esta, que el cliente mando por WhatsApp el 13/9 y es la que vale.
    La titulo "quienes te atienden" porque hasta el 12/9 se mostraba bajo ese
    H1 en /equipo; el contenido es el del punto 02 del PDF.
  */
  diferencial: [
    'PhysioMove se destaca principalmente por sus profesionales altamente capacitados y comprometidos con la actualización permanente, el trabajo basado en evidencia científica y el criterio profesional, entendiendo que cada persona tiene un contexto, objetivos y necesidades diferentes.',
    'Por eso trabajamos de manera integral e interdisciplinaria, articulando kinesiología, entrenamiento y nutrición para acompañar cada proceso.',
  ],
  /** Clave 01 de esa sección: "A quiénes acompañamos". */
  pacientes: [
    'Personas que buscan recuperarse, mejorar su rendimiento, desarrollar sus capacidades físicas o ganar independencia y calidad de vida.',
    'Trabajamos con deportistas, equipos y selecciones deportivas, niños y adolescentes en etapas formativas, adultos y adultos mayores.',
  ],
  /** Clave 02: "Nuestra forma de trabajar". */
  postura: [
    'Cada proceso parte de comprender a la persona, realizar una evaluación, establecer objetivos y desarrollar una planificación adaptada a sus necesidades.',
    'Cuando el proceso lo requiere, integramos distintas áreas para ofrecer un abordaje coordinado e interdisciplinario.',
  ],
  /** Sección 04 de la home, "Nuestra forma de trabajar". */
  formaDeTrabajar: [
    'Cada proceso comienza por comprender a la persona, su contexto y sus objetivos. A partir de ahí se evalúa, planifica y acompaña su evolución desde el área que corresponda.',
    'Movimiento, seguimiento, actualización constante y trabajo profesional coordinado en cada etapa.',
  ],
  /** El lema, palabra por palabra, para la fila grande de esa sección. */
  pasos: ['Evaluar', 'Planificar', 'Acompañar'],
  /** Sección 05 de la home, "Evaluaciones deportivas". */
  evaluaciones: [
    'Se utilizan evaluaciones y tecnología aplicada para obtener datos objetivos sobre diferentes capacidades físicas.',
    'Esta información nos permite conocer el punto de partida, orientar la planificación, monitorear cambios y acompañar decisiones durante procesos de rehabilitación, prevención, entrenamiento, rendimiento y retorno al deporte.',
  ],
  evaluacionesTipos: ['Rendimiento', 'Prevención', 'Seguimiento', 'Alta deportiva'],
  /** Sección 06 de la home, "Tecnología IVOLUTION". */
  tecnologia: [
    'En PhysioMove se utiliza tecnología IVOLUTION para evaluar de manera objetiva diferentes variables relacionadas con la fuerza, la potencia y el rendimiento neuromuscular.',
    'Los datos obtenidos complementan la evaluación profesional y nos permiten medir, comparar y monitorear la evolución, aportando información para la toma de decisiones durante cada proceso.',
  ],
  /** Sección "El centro" (galería de la home). */
  espacio: [
    'PhysioMove cuenta con espacios preparados para desarrollar procesos de rehabilitación, evaluación y entrenamiento.',
    'Un entorno pensado para trabajar de manera activa, progresiva e individualizada, desde las primeras etapas de recuperación hasta el entrenamiento y el retorno al deporte.',
  ],
  /** Sección "Quiénes te atienden" (home y /equipo). */
  equipo: [
    'PhysioMove está formado por profesionales que ofrecen distintos servicios pero comparten una misma forma de trabajar: evaluar, planificar y acompañar cada proceso de manera individualizada.',
    'La actualización constante, el trabajo interdisciplinario y la comunicación entre profesionales forman parte de nuestra manera de entender la salud, el movimiento y el deporte.',
  ],
  areas: ['Kinesiología', 'Entrenamiento', 'Nutrición'],
  /** Banda de cierre de la home. */
  cierre: 'Movimiento, ciencia y trabajo interdisciplinario para acompañarte en cada etapa.',
};

/** Métricas del hero. Datos reales pasados por el cliente (ago 2026). */
export const metricas = [
  { valor: '+4300', texto: 'Pacientes pasaron por PhysioMove' },
  { valor: '+450', texto: 'Atletas de vuelta al deporte' },
  { valor: '97%', texto: 'Llegan por recomendación' },
];

export const contacto = {
  direccion: 'Santiago del Estero 80',
  entre: 'Entre Don Bosco y Kirchner',
  localidad: 'Río Gallegos',
  provincia: 'Santa Cruz',
  pais: 'Argentina',
  codigoPostal: '9400',
  horarios: [
    { dias: 'Lunes a viernes', horas: '7 a 20 hs' },
    { dias: 'Sábados', horas: 'Exclusivo evaluaciones' },
  ],
  telefono: '2966 663958',
  telefonoE164: '+542966663958',
  whatsapp: 'https://wa.me/542966663958',
  whatsappTexto:
    'https://wa.me/542966663958?text=Hola%20PhysioMove%2C%20quiero%20agendar%20un%20turno.',
  /* Portal de autogestión de turnos (BlipDoc): el paciente elige
     profesional y horario. Lo pasó el cliente el 2/9/2026. */
  turnosOnline: 'https://blipdoc.com/portal/physiomove',
  mail: 'physiomove.depor@gmail.com',
  instagram: 'https://www.instagram.com/physiomove.rgl/',
  instagramUsuario: '@physiomove.rgl',
  mapaEmbed:
    'https://www.google.com/maps?q=PHYSIOMOVE+Kinesiologia+deportiva,+Santiago+del+Estero+80,+R%C3%ADo+Gallegos,+Santa+Cruz&output=embed',
  mapaLink:
    'https://www.google.com/maps/search/?api=1&query=PHYSIOMOVE+Kinesiologia+deportiva+Santiago+del+Estero+80+R%C3%ADo+Gallegos',
};

/**
 * Bloque de la página de un servicio.
 * texto: uno o varios párrafos. remate: una línea final en tipografía de
 * etiqueta (ej. "Rendimiento · Prevención · Seguimiento · Alta deportiva").
 */
export type Bloque = {
  titulo: string;
  texto?: string | string[];
  lista?: string[];
  remate?: string;
};

export type Servicio = {
  slug: string;
  nombre: string;
  /** Etiqueta corta para el índice del panel pineado de la home. */
  corto: string;
  numero: string;
  /** Una o dos líneas para las cards (home, /servicios, JSON-LD). */
  resumen: string;
  /** Texto completo del PDF del cliente: cabecera de la página del servicio. */
  texto: string[];
  metaDescription: string;
  foto: string;
  fotoAlt: string;
  /** object-position de la foto cuando el encuadre centrado corta algo (ej. una cabeza). */
  fotoPosicion?: string;
  bloques: Bloque[];
  atiende?: string;
};

/*
  12/9/2026: los nueve servicios y sus textos salen del PDF del cliente. Las
  páginas viejas (seis) tenían bloques "Qué es / Para quién sirve / Por qué"
  dictados en agosto con otro tono; el PDF los reemplaza. De lo viejo quedó
  sólo la información práctica que el PDF no contradice (cómo es una sesión,
  clases y horarios). Cinco slugs cambiaron con el nombre: las URL viejas
  redirigen desde vercel.json.
*/
export const servicios: Servicio[] = [
  {
    slug: 'consulta-y-evaluacion-inicial',
    nombre: 'Consulta y Evaluación Inicial',
    corto: 'Consulta y evaluación inicial',
    numero: '01',
    resumen:
      'El punto de partida para conocer a la persona, su contexto, antecedentes, necesidades y objetivos.',
    texto: [
      'El punto de partida para conocer a la persona, su contexto, antecedentes, necesidades y objetivos.',
    ],
    metaDescription:
      'Consulta y evaluación inicial en PhysioMove, Río Gallegos: el punto de partida para conocer a la persona, su contexto, antecedentes, necesidades y objetivos.',
    foto: 'consulta-evaluacion',
    fotoAlt:
      'Kinesiólogo de PhysioMove evaluando la rodilla de un paciente recostado en la camilla del box',
    bloques: [],
  },
  {
    slug: 'kinesiologia-deportiva-y-traumatologica',
    nombre: 'Kinesiología Deportiva y Traumatológica',
    corto: 'Kinesiología deportiva',
    numero: '02',
    resumen:
      'Procesos de rehabilitación activos, individualizados y orientados a recuperar capacidades y volver progresivamente a la vida diaria, el entrenamiento o el deporte.',
    texto: [
      'Procesos de rehabilitación activos, individualizados y orientados a recuperar capacidades y volver progresivamente a las actividades de la vida diaria, el entrenamiento o el deporte.',
    ],
    metaDescription:
      'Kinesiología deportiva y traumatológica en Río Gallegos: rehabilitación activa e individualizada para volver a la vida diaria, al entrenamiento o al deporte.',
    foto: 'kinesiologia-deportiva',
    fotoAlt:
      'El equipo de PhysioMove junto a un plantel de básquet bajo el cartel Kinesiología Deportiva del centro',
    bloques: [
      {
        titulo: 'Cómo es una sesión',
        lista: [
          'Anamnesis',
          'Evaluación',
          'Planificación de ejercicios',
          'Terapia manual',
          'Aplicación de agentes físicos, según corresponda',
        ],
      },
    ],
    atiende: 'Todos los kinesiólogos del staff',
  },
  {
    slug: 'readaptacion-deportiva',
    nombre: 'Readaptación Deportiva',
    corto: 'Readaptación deportiva',
    numero: '03',
    resumen:
      'La transición entre la rehabilitación y el regreso al entrenamiento y la competencia, progresiva y planificada.',
    texto: [
      'Se acompaña la transición entre la rehabilitación y el regreso al entrenamiento y la competencia. Trabajamos sobre las capacidades físicas y las demandas específicas del deporte para lograr una vuelta progresiva y planificada.',
    ],
    metaDescription:
      'Readaptación deportiva en Río Gallegos: la transición entre la rehabilitación y la vuelta al entrenamiento y la competencia, progresiva y planificada.',
    foto: 'hero-entrenamiento',
    fotoAlt:
      'Deportista haciendo una sentadilla con banda elástica sobre la pista azul del gimnasio de PhysioMove',
    bloques: [],
  },
  {
    slug: 'evaluaciones-deportivas',
    nombre: 'Evaluaciones Deportivas',
    corto: 'Evaluaciones deportivas',
    numero: '04',
    resumen:
      'Evaluaciones y tecnología aplicada para obtener información objetiva sobre diferentes capacidades físicas.',
    texto: [
      'Se utilizan evaluaciones y tecnología aplicada para obtener información objetiva sobre diferentes capacidades físicas.',
    ],
    metaDescription:
      'Evaluaciones deportivas en Río Gallegos con tecnología IVOLUTION: rendimiento, prevención, seguimiento y alta deportiva, con datos objetivos sobre las capacidades físicas.',
    foto: 'evaluacion-ivolution',
    fotoPosicion: '50% 12%',
    fotoAlt:
      'Deportista sobre la plataforma de fuerza IVOLUTION mientras una kinesióloga de PhysioMove registra los datos en la laptop, bajo el lema Medir para mejorar',
    bloques: [
      {
        titulo: 'Qué incluye',
        lista: [
          'Evaluaciones de rendimiento deportivo: para conocer el perfil físico del deportista y orientar su entrenamiento.',
          'Evaluaciones preventivas: para identificar capacidades a mejorar y orientar estrategias de trabajo.',
          'Evaluaciones de seguimiento: para medir cambios y monitorear la evolución durante procesos de rehabilitación o entrenamiento.',
          'Evaluaciones para alta deportiva: para aportar criterios objetivos durante el proceso de retorno al entrenamiento y a la competencia.',
        ],
      },
    ],
  },
  /*
    Renombrado el 2/9/2026 (era "Iniciación a la performance deportiva en
    niños") y otra vez el 12/9 con el PDF. El slug se mantiene desde el 2/9
    para no encadenar redirecciones; la URL original redirige via vercel.json.
    Los bloques de clases y horarios se conservan: son info práctica que el
    texto nuevo no reemplaza.
  */
  {
    slug: 'entrenamiento-fuerza-infanto-juvenil',
    nombre: 'Desarrollo Físico y Entrenamiento de Fuerza Infanto-Juvenil',
    corto: 'Fuerza infanto-juvenil',
    numero: '05',
    resumen:
      'Acompañamos el desarrollo de niños y adolescentes con propuestas de entrenamiento adaptadas a su edad, experiencia y etapa de crecimiento.',
    texto: [
      'Se acompaña el desarrollo de niños y adolescentes mediante propuestas de entrenamiento adaptadas a su edad, experiencia y etapa de crecimiento. Trabajamos fuerza, coordinación, movilidad, control motor y diferentes habilidades físicas, promoviendo un desarrollo progresivo y una relación saludable con el entrenamiento.',
    ],
    metaDescription:
      'Desarrollo físico y entrenamiento de fuerza infanto-juvenil en Río Gallegos: fuerza, coordinación, movilidad y control motor adaptados a la edad y la etapa de crecimiento.',
    foto: 'infanto-juvenil',
    fotoAlt:
      'El profe hablando con tres chicos sentados sobre la pista de césped del gimnasio de PhysioMove',
    bloques: [
      { titulo: 'Cuántas clases al mes', texto: 'Habitualmente son ocho clases por mes.' },
      {
        titulo: 'Horarios',
        lista: [
          'Martes y jueves — Grupo 1: 18 a 19 hs',
          'Martes y jueves — Grupo 2: 19 a 20 hs',
          'Martes y jueves — Grupo 3: 20 a 21 hs',
          'Sábados: 14 a 15 hs y 15 a 16 hs',
        ],
      },
    ],
    atiende: 'Profe. Nicolás Ovando',
  },
  {
    slug: 'nutricion-deportiva',
    nombre: 'Nutrición Deportiva',
    corto: 'Nutrición deportiva',
    numero: '06',
    resumen:
      'Evaluación y acompañamiento nutricional adaptado a las necesidades, objetivos y contexto de cada persona.',
    texto: [
      'Evaluación y acompañamiento nutricional adaptado a las necesidades, objetivos y contexto de cada persona. La nutrición forma parte del proceso de salud, recuperación, entrenamiento y rendimiento.',
    ],
    metaDescription:
      'Nutrición deportiva en Río Gallegos: evaluación y acompañamiento nutricional adaptado a las necesidades, objetivos y contexto de cada persona.',
    foto: 'nutricion-deportiva',
    fotoAlt: 'Lucía Fernández, licenciada en Nutrición de PhysioMove, en el gimnasio del centro',
    bloques: [],
  },
  {
    slug: 'ejercicio-fisico-adaptado',
    nombre: 'Ejercicio Físico Adaptado',
    corto: 'Ejercicio físico adaptado',
    numero: '07',
    resumen:
      'Programas de ejercicio individualizados para mejorar fuerza, movilidad, equilibrio, capacidad física, autonomía e independencia.',
    texto: [
      'Programas de ejercicio individualizados orientados a mejorar fuerza, movilidad, equilibrio, capacidad física, autonomía e independencia. Especialmente pensado para adultos y adultos mayores que buscan mantenerse activos y mejorar su calidad de vida.',
    ],
    metaDescription:
      'Ejercicio físico adaptado en Río Gallegos: programas individualizados de fuerza, movilidad y equilibrio para adultos y adultos mayores que buscan mantenerse activos.',
    foto: 'ejercicio-adaptado',
    fotoAlt:
      'Kinesiólogo de PhysioMove guiando un ejercicio de movilidad sobre la pista del gimnasio',
    bloques: [],
  },
  {
    slug: 'recovery-y-recuperacion-deportiva',
    nombre: 'Recovery y Recuperación Deportiva',
    corto: 'Recovery',
    numero: '08',
    resumen:
      'Estrategias para acompañar la recuperación luego del entrenamiento y la competencia, adaptadas a cada deportista.',
    texto: [
      'Estrategias orientadas a acompañar la recuperación luego del entrenamiento y la competencia, adaptadas a las necesidades y demandas de cada deportista.',
    ],
    metaDescription:
      'Recovery y recuperación deportiva en Río Gallegos: estrategias adaptadas a cada deportista para recuperarse después del entrenamiento y la competencia.',
    foto: 'recovery-presoterapia',
    fotoAlt:
      'Botas de presoterapia sobre la camilla del box de recuperación de PhysioMove',
    bloques: [
      {
        titulo: 'Cómo es una sesión',
        lista: [
          'Movilidad y liberación miofascial',
          'Terapia compresiva neumática intermitente',
          'Contraste térmico o inmersión',
          'Neuromodulación y nutrición periférica',
        ],
      },
    ],
  },
  /*
    12/9/2026: el PDF pide reemplazar "Fisioterapia invasiva / Terapias
    alternativas" por "Técnicas complementarias". Era "Fisioterapia Invasiva MEP".
  */
  {
    slug: 'tecnicas-complementarias',
    nombre: 'Técnicas Complementarias',
    corto: 'Técnicas complementarias',
    numero: '09',
    resumen:
      'Herramientas terapéuticas que se suman como complemento dentro de un proceso de rehabilitación: MEP Sport, punción seca y acupuntura deportiva.',
    texto: [
      'Herramientas terapéuticas que pueden incorporarse como complemento dentro de un proceso de rehabilitación, según la evaluación y las necesidades de cada persona.',
    ],
    metaDescription:
      'Técnicas complementarias en PhysioMove, Río Gallegos: MEP Sport, punción seca y acupuntura deportiva como complemento dentro de un proceso de rehabilitación.',
    foto: 'fisioterapia-invasiva',
    fotoAlt:
      'Primer plano de una aguja de punción seca aplicada en la rodilla de un paciente, en un box de PhysioMove',
    bloques: [
      {
        titulo: 'Técnicas',
        lista: ['MEP Sport', 'Punción seca', 'Acupuntura deportiva'],
      },
    ],
  },
];

export type Profesional = {
  nombre: string;
  /**
   * Ancla de su ficha en /equipo. La grilla de la home enlaza ahi, para que un
   * click en la persona lleve directo a su descripcion (pedido del 13/9/2026).
   * Es fija a proposito: si algun dia cambia el nombre, el link no se rompe.
   */
  ancla: string;
  iniciales: string;
  titulo: string;
  matricula?: string;
  especialidad?: string;
  formacion?: string;
  experiencia?: string;
  bio?: string;
  /** Nombre del archivo en src/assets/retratos, sin extension. */
  retrato?: string;
  fichaCompleta: boolean;
};

/* 12/9/2026: el cliente pidió quitar los segundos nombres (Exequiel,
   Alejandra) y el primero de Agustín (Eduardo). */
export const profesionales: Profesional[] = [
  {
    nombre: 'Marcos Anaquín',
    ancla: 'marcos-anaquin',
    iniciales: 'MA',
    retrato: 'retrato-marcos',
    titulo: 'Licenciado en Kinesiología y Fisioterapia',
    matricula: 'LK MP 294',
    especialidad:
      'Kinesiología deportiva. Análisis de diagnósticos médicos y kinésicos.',
    formacion:
      'Licenciatura en Kinesiología y Fisioterapia, Universidad Nacional de Córdoba. Certificado en medicina ortopédica Cyriax. Certificado en MEP Sport. Actualmente cursando la Especialización en evaluación funcional y ciencias de datos de Equipo Physical.',
    experiencia:
      'Co-fundador de PhysioMove — Centro Deportivo Especializado. Evaluaciones deportivas en Hispano Americano. Evaluaciones deportivas de alto rendimiento en el Predio AFA — Barracas Central (Primera División).',
    bio: 'Profesional asertivo, resiliente, proactivo y alentador en todo tipo de lesiones deportivas. Próximamente entrenador de tenis enfocado en la biomecánica, la estrategia y el análisis técnico del juego, potenciando el talento a través del desarrollo de la mentalidad y el cuidado del atleta.',
    fichaCompleta: true,
  },
  {
    nombre: 'Sofía Anaquín',
    ancla: 'sofia-anaquin',
    iniciales: 'SA',
    retrato: 'retrato-sofia',
    titulo: 'Licenciada en Kinesiología y Fisioterapia',
    matricula: 'LK MP 336',
    especialidad: 'Especialista en Kinesiología Deportiva',
    formacion:
      'Licenciatura en Kinesiología y Fisioterapia, Universidad Nacional de Córdoba. Especialidad en Kinesiología Deportiva, Universidad Abierta Interamericana. Actualmente cursando la Diplomatura en Deporte y Neurociencias, Universidad Favaloro. Certificada en MEP Sport. Formación continua en rehabilitación, readaptación, evaluación y tecnología aplicada al deporte.',
    experiencia:
      'Co-fundadora de PhysioMove — Centro Deportivo Especializado. Kinesióloga de la Secretaría de Deportes de Santa Cruz y de la Selección de Santa Cruz. Integrante del Observatorio de Deporte y Actividad Física de Santa Cruz. Participación en los Juegos Panamericanos Junior ASU 2025 y evaluaciones deportivas de alto rendimiento en el Predio AFA — Barracas Central y en el CENARD con la Selección Argentina de Hockey Masculino, Los Leones.',
    bio: 'Me interesa entender al deportista más allá de la lesión. Trabajo desde la evaluación y el análisis para tomar decisiones que permitan rehabilitar, prevenir y potenciar el rendimiento, integrando evidencia científica, tecnología y una mirada interdisciplinaria.',
    fichaCompleta: true,
  },
  {
    nombre: 'Agustín Guiguet',
    ancla: 'agustin-guiguet',
    iniciales: 'AG',
    retrato: 'retrato-agustin',
    titulo: 'Licenciado en Kinesiología y Fisioterapia',
    matricula: 'LK MP 385',
    especialidad: 'Kinesiología deportiva',
    formacion:
      'Licenciatura en Kinesiología y Fisioterapia, Universidad Nacional de Córdoba. Método Busquet, las cadenas fisiológicas. Experto en Rehabilitación y Readaptación deportiva, Equipo Physical. Actualmente cursando la Diplomatura de Neurociencias Aplicadas al Deporte, Universidad Favaloro. Evaluación y tecnología aplicada al deporte.',
    experiencia:
      'Socio de PhysioMove — Centro Deportivo Especializado. Ex kinesiólogo de Hispano Americano Básquet, temporada 2025. Participación en los Juegos Panamericanos Junior ASU 2025. Evaluaciones deportivas de alto rendimiento en el CENARD con la Selección Argentina de Hockey Masculino.',
    bio: 'Kinesiólogo orientado a la rehabilitación, la readaptación deportiva y al retorno seguro al deporte, con enfoque en el rendimiento, la prevención de lesiones y la recuperación funcional, integrando evidencia científica y clínica para alcanzar la performance de los deportistas.',
    fichaCompleta: true,
  },
  {
    nombre: 'Graciela Sánchez',
    ancla: 'graciela-sanchez',
    iniciales: 'GS',
    retrato: 'retrato-graciela',
    titulo: 'Licenciada en Kinesiología y Fisioterapia',
    matricula: 'LK MP 432',
    especialidad: 'Kinesiología deportiva',
    formacion:
      'Universidad Nacional de Córdoba. Actualmente cursando la formación en Osteopatía Deportiva.',
    fichaCompleta: true,
  },
  {
    nombre: 'Lucía Fernández',
    ancla: 'lucia-fernandez',
    iniciales: 'LF',
    retrato: 'retrato-lucia',
    titulo: 'Licenciada en Nutrición',
    matricula: 'MP 204',
    fichaCompleta: false,
  },
  // Sumado el 2/9/2026 a pedido del cliente. La bio todavia no llego:
  // cuando la mande, se completan los campos y pasa a fichaCompleta.
  {
    nombre: 'Nicolás Ovando',
    ancla: 'nicolas-ovando',
    iniciales: 'NO',
    retrato: 'retrato-nicolas',
    titulo: 'Profesor',
    fichaCompleta: false,
  },
];

/**
 * El asterisco del documento marca las que abonan copago.
 * `logo` es el nombre del archivo en src/assets/logos (sin extension).
 * Las que no lo tienen se muestran con el nombre en texto, en la misma celda.
 * La procedencia de cada logo esta en src/assets/logos/ORIGEN.md.
 * 12/9/2026: el cliente pidió sacar la Caja de Servicios Sociales (CSS).
 */
export type ObraSocial = { nombre: string; copago: boolean; logo?: string };

export const obrasSociales: ObraSocial[] = [
  { nombre: 'Avalian', copago: true, logo: 'avalian' },
  { nombre: 'Dasuten', copago: true },
  { nombre: 'IOSFA', copago: true, logo: 'iosfa' },
  { nombre: 'Galeno', copago: true, logo: 'galeno' },
  { nombre: 'Medicus', copago: true, logo: 'medicus' },
  { nombre: 'Medifé', copago: true, logo: 'medife' },
  { nombre: 'OSDE', copago: false, logo: 'osde' },
  { nombre: 'OSDEPYM', copago: false, logo: 'osdepym' },
  { nombre: 'OSPEDYC', copago: true, logo: 'ospedyc' },
  { nombre: 'OSMATA', copago: false, logo: 'osmata' },
  { nombre: 'OSPTV', copago: true },
  { nombre: 'OSPE', copago: true, logo: 'ospe' },
  { nombre: 'OSPSA', copago: true },
  { nombre: 'OSUTHGRA', copago: true, logo: 'osuthgra' },
  { nombre: 'PAMI', copago: false, logo: 'pami' },
  { nombre: 'Poder Judicial', copago: false },
  { nombre: 'Swiss Medical', copago: true, logo: 'swiss-medical' },
  { nombre: 'Sancor Salud', copago: true, logo: 'sancor-salud' },
];

export const aranceles = {
  notaCopago:
    'Las obras sociales marcadas con asterisco no alcanzan el mínimo ético profesional, por lo tanto abonan copago.',
  particulares:
    'Sí. El pago es al comienzo del tratamiento, según el valor mínimo ético profesional: actualmente $19.500 por sesión.',
  queTraer: 'Orden médica, credencial digital y autorización, según corresponda.',
  autorizacion:
    'Cuando se requiere autorización, el trámite queda a cargo del paciente.',
};

/** Fotos reales del centro para la galería horizontal de la home. */
export const galeria = [
  { foto: 'espacio-recepcion', titulo: 'Recepción', alt: 'Recepción de PhysioMove con la alfombra del logo PM en el piso' },
  { foto: 'espacio-gimnasio', titulo: 'Gimnasio', alt: 'Gimnasio de uso exclusivo para pacientes, con la pista azul y el cartel PHYSIOMOVE' },
  { foto: 'espacio-pista', titulo: 'La pista', alt: 'Pasillo central del centro con la pista de 4 metros y el mural de hexágonos' },
  { foto: 'espacio-fuerza', titulo: 'Sector de fuerza', alt: 'Sector de fuerza con barra, discos, mancuernas y el lema Medir para mejorar en la pared' },
  { foto: 'evaluacion-cancha', titulo: 'Evaluaciones', alt: 'Evaluación de rendimiento a una deportista en un gimnasio deportivo' },
  { foto: 'espacio-pasillo', titulo: 'En sesión', alt: 'Paciente entrenando con supervisión sobre la pista azul del centro' },
  { foto: 'equipo-hexagonos', titulo: 'El equipo', alt: 'Profesional de PhysioMove frente al mural con las etapas de la rehabilitación' },
  { foto: 'ninos-evaluacion', titulo: 'En el club', alt: 'Kinesiólogo registrando los datos de la evaluación de un chico durante un camp deportivo' },
];

/**
 * Banda de fotos del hero. Siete verticales elegidas porque muestran cosas
 * DISTINTAS: tratamiento manual, entrenamiento, evaluacion con tecnologia,
 * recovery, chicos y el metodo. Las 16 fotos del centro comparten pared, pasto
 * verde y pista azul: en tarjetas chicas, siete del mismo tipo leen como una
 * sola repetida.
 *
 * giro  = rotacion en grados (asimetrica a proposito: un arco simetrico lee a
 *         plantilla)
 * baja  = cuanto CAE la tarjeta por debajo del piso del hero, en fraccion de
 *         su alto: es lo que rompe la fila perfecta
 * vel   = velocidad relativa en el parallax del scroll
 */
/*
  Fotos nuevas del 2/9/2026 (las dejó el cliente en fotos-marcos/hero, 1 a 7).
  Pidió que la 4ta —el local con el cartel "Donde volvés al deporte"— quede en
  el medio de la banda, en PC y en mobile (el carrusel arranca centrado en ella,
  ver centrarBandaMobile en animaciones.js).
*/
export const bandaHero = [
  {
    foto: 'evaluacion-salto-rugby',
    giro: -2.6,
    baja: 0.55,
    vel: 0.55,
    alt: 'Jugador de rugby sobre la plataforma de salto durante una evaluación, con una kinesióloga revisando los datos en la laptop',
  },
  {
    foto: 'panam-sports',
    giro: 1.4,
    baja: 0.1,
    vel: 1,
    alt: 'Dos profesionales de PhysioMove frente al cartel de Panam Sports con los anillos olímpicos',
  },
  {
    foto: 'predio-afa',
    giro: -1.1,
    baja: 0.75,
    vel: 0.45,
    alt: 'Dos integrantes del equipo frente al mural de los campeones en el Predio de AFA',
  },
  {
    foto: 'centro-cartel',
    giro: 0.9,
    baja: 0,
    vel: 0.8,
    alt: 'Recepción y pista del gimnasio de PhysioMove bajo el cartel Kinesiología deportiva, donde volvés al deporte',
  },
  {
    foto: 'evaluacion-fuerza',
    giro: -1.8,
    baja: 0.6,
    vel: 1.15,
    alt: 'Plantel de rugby alrededor de la estación de registro durante una evaluación de fuerza en el gimnasio',
  },
  {
    foto: 'evaluacion-club',
    giro: 2.4,
    baja: 0.2,
    vel: 0.6,
    alt: 'Deportista acostado en la plataforma durante una evaluación de fuerza mientras dos profesionales registran los datos',
  },
  {
    foto: 'equipo-delegacion',
    giro: -2.2,
    baja: 0.85,
    vel: 1.05,
    alt: 'El equipo de PhysioMove junto a una delegación deportiva tras una jornada de evaluaciones en el gimnasio',
  },
];
